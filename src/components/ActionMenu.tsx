import { useState } from "react";
import type { InstructionSet } from "../types";

interface ActionMenuProps {
  instructionSet: InstructionSet;
  onEdit: (set: InstructionSet) => void;
  onDelete: (id: string) => void;
}

const ActionMenu = ({
  instructionSet,
  onEdit,
  onDelete
}: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>

    </div>
  );
};

export default ActionMenu;