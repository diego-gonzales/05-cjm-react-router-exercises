import { useState } from 'react';

const initialForm = {
  artist: '',
  song: '',
};

const SongForm = ({ handleSearch, handleSaveSong }) => {
  const [myForm, setMyForm] = useState(initialForm);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!myForm.artist || !myForm.song) {
      alert('Form is invalid');
      setIsDisabled(true);
      return;
    }

    handleSearch(myForm);
    setMyForm(initialForm);
    setIsDisabled(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="artist"
          placeholder="Artist name"
          onChange={handleChange}
          value={myForm.artist}
        />
        <input
          type="text"
          name="song"
          placeholder="Song name"
          onChange={handleChange}
          value={myForm.song}
        />
        <input type="submit" value="Start search" />
        <input
          type="button"
          onClick={handleSaveSong}
          value="Add to favorites"
          disabled={isDisabled}
        />
      </form>
    </div>
  );
};

export default SongForm;
