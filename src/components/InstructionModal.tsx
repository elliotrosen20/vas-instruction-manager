import { useEffect, useState } from "react";
import type { Instruction, InstructionSet } from "../types";
import { v4 as uuidv4 } from 'uuid';

interface InstructionModalProps {
  initialData: InstructionSet | null;
  onSave: (instructionSet: InstructionSet) => void;
  onClose: () => void;
}

const InstructionModal = ({
  initialData,
  onSave,
  onClose
}: InstructionModalProps) => {

  const [formData, setFormData] = useState<InstructionSet>(() => {
    if (initialData) {
      return { ...initialData };
    } else {
      return {
        id: uuidv4(),
        title: '',
        retailer: '',
        instructions: [{ id: uuidv4(), english: '', spanish: ''}],
        skuPrefixes: []
      };
    }
  });

  const [sectionsOpen, setSectionsOpen] = useState({
    generalInfo: true,
    instructions: true,
    skus: true
  })

  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [searchSku, setSearchSku] = useState<string>('');
  const [showSkuDropdown, setShowSkuDropdown] = useState<boolean>(false);

  const brands = ['Apparel Merchant'];

  const retailers = [
    'Macy\'s Store',
    'Target',
    'ULTA',
    'Nordstrom',
    'Dillard\'s',
    'FBA'
  ];

  const skusByBrand: Record<string, string[]> = {
    'Apparel Merchant': [
      '123fgd', '1912404', '1916416', 'controller', 
      'rstge456', 'SB8LEM-4PK', 'serum', 'shampoo'
    ]
  };

  const toggleSection = (section: 'generalInfo' | 'instructions' | 'skus') => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleGeneralInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInstructionChange = (index: number, field: 'english' | 'spanish', value: string) => {
    setFormData(prev => {
      const newInstructions = [...prev.instructions];
      newInstructions[index] = {
        ...newInstructions[index],
        [field]: value
      };
      return {
        ...prev,
        instructions: newInstructions
      }
    })
  }

  const addInstruction = () => {
    const newInstruction: Instruction = {
      id: uuidv4(),
      english: '',
      spanish: ''
    }

    setFormData(prev => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        newInstruction
      ]
    }));
  };

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      setFormData(prev => {
        const newInstructions = [...prev.instructions];
        newInstructions.splice(index, 1);
        return {
          ...prev,
          instruction: newInstructions
        };
      });
    }
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
  }

  const handleSkuToggle = (sku: string) => {
    setFormData(prev => {
      const skuExists = prev.skuPrefixes.includes(sku);

      if (skuExists) {
        return {
          ...prev,
          skuPrefixes: prev.skuPrefixes.filter(s => s !== sku)
        };
      } else {
        return {
          ...prev,
          skuPrefixes: [...prev.skuPrefixes, sku]
        };
      }
    });
  };

  const filteredSkus = selectedBrand
    ? skusByBrand[selectedBrand].filter(sku =>
        sku.toLowerCase().includes(searchSku.toLowerCase())
      )
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  }
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sku-drop-down-container') && showSkuDropdown) {
        setShowSkuDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSkuDropdown])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div>
        <div>
          <div>
            <h2>
              {initialData ? 'Edit': 'Create'} VAS Instruction Set
            </h2>
            <button
              type="button"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <div
                onClick={() => toggleSection('generalInfo')}
              >
                <h3>General Info</h3>
                <span>{sectionsOpen.generalInfo ? '▲' : '▼'}</span>
              </div>

              {sectionsOpen.generalInfo && (
                <div>
                  <div>
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleGeneralInfoChange}
                      placeholder="Tshirt Hang Tag"
                    />
                  </div>
                  <div>
                    <label>Retailer</label>
                    <select 
                      name="retailer"
                      value={formData.retailer}
                      onChange={handleGeneralInfoChange}
                    >
                      <option value="">Select retailer</option>
                      {retailers.map(retailer => (
                        <option key={retailer} value={retailer}>{retailer}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                onClick={() => toggleSection('instructions')}
              >
                <h3>Instructions</h3>
                <span>{sectionsOpen.instructions ? '▲' : '▼'}</span>
              </div>

              {sectionsOpen.instructions && (
                <div>
                  <div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  {formData.instructions.map((instructions, index) => (
                    <div key={instructions.id}>
                      <div>
                        <input
                          type="text"
                          value={instructions.english}
                          onChange={(e) => handleInstructionChange(index, 'english', e.target.value)}
                          placeholder="Apply hang tag on the left corner of shirt"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={instructions.spanish}
                          onChange={(e) => handleInstructionChange(index, 'spanish', e.target.value)}
                          placeholder="Aplica la etiqueta colgante en la esquina izquierda de la camisa"
                        />
                      </div>
                      <div>
                        <div>
                          {index === 0 ? (
                            <div>
                              <img
                                src="/t-shirt-icon.png"
                                alt="T-shirt"
                              />
                              <button
                                type="button"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span>Drag and drop image, or click to select</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div>
                    <button
                      type="button"
                      onClick={addInstruction}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                onClick={() => toggleSection('skus')}
              >

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;