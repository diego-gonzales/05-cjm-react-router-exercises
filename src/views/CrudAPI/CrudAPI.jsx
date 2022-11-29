import { useEffect, useState, lazy } from 'react';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { helpHttp } from '../../helpers/helpHttp';
import CrudForm from './components/CrudForm';
import CrudTable from './components/CrudTable';

const CrudAPI = () => {
  const [data, setData] = useState(null);
  // Can use initial value as an array empty [], I think of it´s the best to avoid errors.
  // const [data, setData] = useState([]); ...❤
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const api = helpHttp();
  const url = 'http://localhost:5000/pokemons';

  useEffect(() => {
    setIsLoading(true);
    api.get(url).then((resp) => {
      console.log(resp);
      if (!resp.err) {
        setData(resp);
        setError(null);
      } else {
        setData(null);
        // setData([]); ...❤
        setError(resp);
      }
      setIsLoading(false);
    });
  }, []);

  const createData = (newElement) => {
    newElement.id = Date.now();

    const options = {
      body: newElement,
      // O Content-Type le indica al cliente que tipo de contenido será retornado, o no sé si el cliente le indica que tipo de contenido le estás enviando al servidor ???
      // Leer: https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Content-Type
      headers: { 'content-type': 'application/json' },
    };

    api.post(url, options).then((resp) => {
      if (!resp.err) {
        setData([...data, resp]);
        console.log(resp);
      } else {
        setError(resp);
      }
    });
  };

  const updateData = (newElement) => {
    const options = {
      body: newElement,
      headers: { 'content-type': 'application/json' },
    };

    api.put(`${url}/${newElement.id}`, options).then((resp) => {
      if (!resp.err) {
        const newData = data.map((element) =>
          element.id === resp.id ? resp : element
        );
        setData(newData);
      } else {
        setError(resp);
      }
    });
  };

  const deleteData = (id) => {
    const areYouSure = window.confirm('Are you sure to delete the record?');

    if (!areYouSure) return;

    const options = {
      headers: { 'content-type': 'application/json' },
    };

    api.del(`${url}/${id}`, options).then((resp) => {
      if (!resp.err) {
        const newData = data.filter((element) => element.id !== id);
        setData(newData);
      } else {
        setError(resp);
      }
    });
  };

  const activeStyle = {
    backgroundColor: '#c9db62',
    borderRadius: '10px',
    pointerEvents: 'none',
  };

  return (
    <>
      <h2>CRUD API</h2>
      <header>
        <nav>
          <ul className="list">
            <li className="list__item">
              <NavLink
                to="table"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Pokemons
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink
                to="add"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Add
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route
          path="table"
          element={
            <>
              {isLoading && <Loader />}
              {error && (
                <Message
                  message={`Error ${error.status}: ${error.statusText}`}
                  bgColor="#dc3545"
                />
              )}

              {data && (
                <CrudTable
                  myData={data}
                  setDataToEdit={setDataToEdit}
                  deleteData={deleteData}
                />
              )}
            </>
          }
        />
        <Route
          path="add"
          element={
            <CrudForm
              createData={createData}
              updateData={updateData}
              dataToEdit={null}
              setDataToEdit={setDataToEdit}
            />
          }
        />
        <Route
          path="edit/:id"
          element={
            <CrudForm
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
          }
        />
        <Route path="*" element={<Navigate to="table" />} />
      </Routes>
    </>
  );
};

export default CrudAPI;
