import ActionMenu from "./ActionMenu";

const InstructionTable = () => {
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