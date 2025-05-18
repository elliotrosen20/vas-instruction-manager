import type { InstructionSet } from "../types";

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
  return (
    <div>Hello</div>
  );
};

export default InstructionModal;