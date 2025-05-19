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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div>
        Hi there
        {/* <form action="">

        </form> */}
      </div>
    </div>
  );
};

export default InstructionModal;