import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  let activeStyle = {
    backgroundColor: '#c9db62',
    borderRadius: '10px',
    pointerEvents: 'none',
  };

  return (
    <>
      <header>
        <h1>Welcome to my app</h1>
        <nav>
          <ul className="list">
            <li className="list__item">
              <NavLink
                to="/crud-api"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Crud API
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink
                to="/song-search"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Song Search
              </NavLink>
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
