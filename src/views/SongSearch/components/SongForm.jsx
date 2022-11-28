import { useState } from 'react';

const initialForm = {
  artist: '',
  song: '',
};

const SongForm = ({ handleSearch }) => {
  const [myForm, setMyForm] = useState(initialForm);

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
      return;
    }

    handleSearch(myForm);
    setMyForm(initialForm);
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
      </form>
    </div>
  );
};

export default SongForm;
