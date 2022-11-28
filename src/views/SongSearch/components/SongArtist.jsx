const SongArtist = ({ artistInfo }) => {
  return (
    <section>
      <h3>{artistInfo.strArtist}</h3>
      <img src={artistInfo.strArtistThumb} alt={artistInfo.strArtist} />
      <p>
        {artistInfo.intBornYear} - {artistInfo.intDiedYear || 'Present'}
      </p>
      <p>{artistInfo.strCountry}</p>
      <p>
        {artistInfo.strGenre} - {artistInfo.strStyle}
      </p>
      <a
        href={`https://${artistInfo.strWebsite}`}
        target="_blank"
        rel="noreferrer"
      >
        Web site
      </a>

      <p>{artistInfo.strBiographyEN}</p>
    </section>
  );
};

export default SongArtist;
