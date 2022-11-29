import SongTableRow from './SongTableRow';

const SongTable = ({ mySongs, handleDeleteSong }) => {
  return (
    <>
      <h2>My favorite songs</h2>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th colSpan="2">Artist</th>
            <th>Song</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mySongs.length > 0 ? (
            mySongs.map((element, index) => (
              <SongTableRow
                key={index}
                songID={index}
                element={element}
                handleDeleteSong={handleDeleteSong}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5">There is no data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SongTable;
