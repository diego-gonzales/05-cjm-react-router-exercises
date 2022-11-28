const CrudTableRow = ({ element, setDataToEdit, deleteData }) => {
  const { name, type, id } = element;

  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>
        <button type="button" onClick={() => setDataToEdit(element)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteData(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
