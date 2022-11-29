import { useParams } from 'react-router-dom';
import SongDetails from './SongDetails';

const SongDetail = ({ mySongs }) => {
  const { id } = useParams();
  const { search, lyric, biography } = mySongs[id];

  return (
    <>
      <h2>Song Detail</h2>
      <SongDetails search={search} lyric={lyric} biography={biography} />
    </>
  );
};

export default SongDetail;
