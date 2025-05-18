import { useState } from "react";
import type { InstructionSet } from "../types";
import ActionMenu from "./ActionMenu";

interface InstructionTableProps {
  instructionSets: InstructionSet[];
  onEdit: (set: InstructionSet) => void;
  onDelete: (id: string) => void;
}

const InstructionTable = ({
  instructionSets, onEdit, onDelete
}: InstructionTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSets = instructionSets.filter(set => 
    set.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=""
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Retailer</th>
            <th>Instructions</th>
            <th>SKU Prefix/Brand</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredSets.map(set => (
            <tr key={set.id}>
              <td>{set.title}</td>
              <td>{set.retailer}</td>
              <td>
                {set.instructions.length} {set.instructions.length === 1 ? 'Instruction' : 'Instructions'}
              </td>
              <td>
                {set.skuPrefixes.slice(0, 2).map((prefix: string, index: number) => (
                  <span key={index} className="mr-2">
                    {prefix}/Apparel Merchant
                  </span>
                ))}
                {set.skuPrefixes.length > 2 && (
                  <span>
                    {set.skuPrefixes.length - 2} more
                  </span>
                )}
              </td>
              <td>
                <ActionMenu
                  instructionSet={set}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructionTable;