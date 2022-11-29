import { useState, useEffect } from 'react';
import { helpHttp } from '../../helpers/helpHttp';
import Loader from '../../components/Loader';
import SongDetails from './components/SongDetails';
import SongForm from './components/SongForm';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import SongTable from './components/SongTable';
import SongPage from './components/SongPage';

const myInitialSongs = JSON.parse(localStorage.getItem('mySongs')) || [];

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [biography, setBiography] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mySongs, setMySongs] = useState(myInitialSongs);

  useEffect(() => {
    if (search !== null) {
      const fetchData = async () => {
        const { artist, song } = search;

        const artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
        const songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

        setIsLoading(true);

        const [artistResponse, songResponse] = await Promise.all([
          helpHttp().get(artistUrl),
          fetch(songUrl).then((resp) => resp.json()), // We use fetch here because this API takes time to return the response
        ]);

        console.log(artistResponse, songResponse);

        setBiography(artistResponse);
        setLyric(songResponse);

        setIsLoading(false);
      };

      fetchData();
    }

    localStorage.setItem('mySongs', JSON.stringify(mySongs));
  }, [search, mySongs]);

  const handleSearch = (data) => {
    setSearch(data);
  };

  const handleSaveSong = () => {
    alert('Saving song on localstorage');
    const currentSong = {
      search,
      lyric,
      biography,
    };

    setMySongs((mySongs) => [...mySongs, currentSong]);
    setSearch(null);
  };
  const handleDeleteSong = (id) => {
    const isDelete = confirm('Are you sure to delete this song?');
    if (isDelete) {
      const songs = mySongs.filter((element, index) => index !== id);
      setMySongs(songs);
    }
  };

  const activeStyle = {
    backgroundColor: '#c9db62',
    borderRadius: '10px',
    pointerEvents: 'none',
  };

  return (
    <>
      <h2>Song Search</h2>
      <header>
        <nav>
          <ul className="list">
            <li className="list__item">
              <NavLink
                to="table"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Favorite Songs
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink
                to="search"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Search
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {isLoading && <Loader />}

      <Routes>
        <Route
          path="table"
          element={
            <SongTable mySongs={mySongs} handleDeleteSong={handleDeleteSong} />
          }
        />
        <Route
          path="search"
          element={
            <>
              <SongForm
                handleSearch={handleSearch}
                handleSaveSong={handleSaveSong}
              />
              {search && !isLoading && (
                <SongDetails
                  search={search}
                  lyric={lyric}
                  biography={biography}
                />
              )}
            </>
          }
        ></Route>
        <Route
          path="song-detail/:id"
          element={<SongPage mySongs={mySongs} />}
        />
        <Route path="*" element={<Navigate to="table" />} />
      </Routes>
    </>
  );
};

export default SongSearch;
