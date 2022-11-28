import { useNavigate } from 'react-router-dom';

const CrudTableRow = ({ element, setDataToEdit, deleteData }) => {
  const { name, type, id } = element;
  const navigate = useNavigate();

  const handleClick = (e) => {
    setDataToEdit(element);
    navigate(`/crud-api/edit/${id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>
        <button type="button" onClick={handleClick}>
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
