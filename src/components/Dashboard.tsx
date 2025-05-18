import { useEffect, useState } from "react";

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

  const handleAddSet = () => {};

  const handleEditSet = () => {};

  const handleDeleteSet = () => {};

  const openCreateModal = () => {};

  const openEditModal = () => {};

  return (
    <div></div>
  )
};

export default Dashboard;