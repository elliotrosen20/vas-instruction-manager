import { useEffect, useRef, useState } from "react";
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

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen])

  const handleEdit = () => {
    onEdit(instructionSet);
    setIsOpen(false);
  }

  const handleDelete = () => {
    onDelete(instructionSet.id);
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        •••
      </button>
      {isOpen && (
        <div>
          <div>
            <button
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;