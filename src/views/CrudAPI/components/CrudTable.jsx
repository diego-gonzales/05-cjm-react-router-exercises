import CrudTableRow from './CrudTableRow';

const CrudTable = ({ myData, setDataToEdit, deleteData }) => {
  return (
    <div>
      <h3>Datatable</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myData.length > 0 ? (
            myData.map((element) => (
              <CrudTableRow
                key={element.id}
                element={element}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">There is no data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
