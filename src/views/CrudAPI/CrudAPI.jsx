import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
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
    // console.log(newData);
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

  return (
    <>
      <h2>CRUD API</h2>
      <section className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />

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

        {/* It's a good option if you initialize the data with an empty array ([]) and not with 'null' ...❤ */}
        {/* {!isLoading ? (
          <CrudTable
            myData={data}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        ) : (
          <Loader />
        )} */}
      </section>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default CrudAPI;
