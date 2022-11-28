const SongLyric = ({ titleSong, lyricSong }) => {
  return (
    <section>
      <h3>{titleSong}</h3>
      <blockquote style={{ whiteSpace: 'pre-wrap' }}>{lyricSong}</blockquote>
    </section>
  );
};

export default SongLyric;
