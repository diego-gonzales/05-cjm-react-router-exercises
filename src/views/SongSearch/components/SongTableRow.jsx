import { useNavigate } from 'react-router-dom';

const SongTableRow = ({ songID, element, handleDeleteSong }) => {
  const { biography, search } = element;
  const avatar = biography[0]?.strArtistThumb;
  const navigate = useNavigate();

  const avatarStyles = {
    with: 'auto',
    height: '40px',
  };

  return (
    <tr>
      <td>
        <img style={avatarStyles} src={avatar} alt={search.artist} />
      </td>
      <td colSpan="2">{search.artist}</td>
      <td>{search.song}</td>
      <td>
        <button
          type="button"
          onClick={() => navigate(`/song-search/song-detail/${songID}`)}
        >
          Show
        </button>
        <button type="button" onClick={() => handleDeleteSong(songID)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SongTableRow;
