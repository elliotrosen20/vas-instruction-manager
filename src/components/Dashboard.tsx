import { useEffect, useState } from "react";
import type { InstructionSet } from "../types";
import InstructionModal from "./InstructionModal";

const Dashboard = () => {
  const [instructionSets, setInstructionSets] = useState<InstructionSet[]>(() => {
    const saved = localStorage.getItem('instructionSets');
    return saved ? JSON.parse(saved) : [];
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSet, setEditingSet] = useState<InstructionSet | null>(null);

  useEffect(() => {
    localStorage.setItem('instructionSets', JSON.stringify(instructionSets));
  }, [instructionSets])

  const handleAddSet = (newSet: InstructionSet) => {
    setInstructionSets(prev => [...prev, newSet]);
    setIsModalOpen(false);
  };

  const handleEditSet = (updatedSet: InstructionSet) => {
    setInstructionSets(prev =>
      prev.map(set => set.id === updatedSet.id ? updatedSet : set)
    );
    setIsModalOpen(false);
  };

  const handleDeleteSet = (id: string) => {
    setInstructionSets(prev => prev.filter(set => set.id !=== id));
  };

  const openCreateModal = () => {
    setEditingSet(null);
    setIsModalOpen(true);
  };

  const openEditModal = (set: InstructionSet) => {
    setEditingSet(set);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div>
        <h1>Manage VAS Instruction Sets</h1>
        <button
          onClick={openCreateModal}
        >
          Add Instructions
        </button>
      </div>
      <InstructionModal
        instructionSets={instructionSets}
        onEdit={openEditModal}
        onDelete={handleDeleteSet}
      />
    </div>
  )
};

export default Dashboard;