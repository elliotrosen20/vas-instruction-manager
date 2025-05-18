const Dashboard = () => {
  const [instructionSets, setInstructionSets] = useState<InstructionSet[]>(() => {
    const saved = localStorage.getItem('instructionSets');
    return saved ? JSON.parsed(saved) : [];
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSet, setEditingSet] = useState<InstructionSet | null>(null);
};

export default Dashboard;