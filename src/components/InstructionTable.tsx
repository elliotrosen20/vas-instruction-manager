import ActionMenu from "./ActionMenu";

const InstructionTable = () => {
  return (
    <div>
      <table>
        <tbody>
          {instructionSets.map(set => (
            <tr key={set.id}>
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