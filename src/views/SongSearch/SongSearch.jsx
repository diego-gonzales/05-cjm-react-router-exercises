import { useState, useEffect } from 'react';
import { helpHttp } from '../../helpers/helpHttp';
import Loader from '../../components/Loader';
import SongDetails from './components/SongDetails';
import SongForm from './components/SongForm';

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [biography, setBiography] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search === null) return;

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
  }, [search]);

  const handleSearch = (data) => {
    setSearch(data);
  };

  return (
    <div>
      <h2>Song Search</h2>
      <article className="grid-1-3">
        <SongForm handleSearch={handleSearch} />
        {isLoading && <Loader />}
        {search && !isLoading && (
          <SongDetails search={search} lyric={lyric} biography={biography} />
        )}
      </article>
    </div>
  );
};

export default SongSearch;
