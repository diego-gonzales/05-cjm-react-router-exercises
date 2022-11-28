import Message from '../../../components/Message';
import SongArtist from './SongArtist';
import SongLyric from './SongLyric';

const SongDetails = ({ search, lyric, biography }) => {
  if (!lyric || !biography) return;

  return (
    <>
      {lyric.error || lyric.name === 'AbortError' ? (
        <Message
          message={`Error: Song '<em>${search.song}</em>' not found`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyric titleSong={search.song} lyricSong={lyric.lyrics} />
      )}
      {biography.artists ? (
        <SongArtist artistInfo={biography.artists[0]} />
      ) : (
        <Message
          message={`Error: Artist '<em>${search.artist}</em>' not found`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};

export default SongDetails;
