import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <header>
        <h1>Welcome to my app</h1>
        <nav>
          <ul className="list">
            <li className="list__item">
              <Link to="/crud-api">Crud API</Link>
            </li>
            <li className="list__item">
              <Link to="/song-search">Song Search</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>This is the homepage!</h2>
      </main>
    </>
  );
};

export default Home;
