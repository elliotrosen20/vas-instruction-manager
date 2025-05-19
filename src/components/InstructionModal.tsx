import { useState } from "react";
import type { InstructionSet } from "../types";
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
    })
  }

  const handleSubmit = () => {}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>
              {initialData ? 'Edit': 'Create'} VAS Instruction Set
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructionModal;