import React, { useState } from "react";
import PropTypes from "prop-types";
import { getGenres } from "../services/fakeGenreService";

function Genres(props) {
  const [genres] = useState(getGenres());
  const { actGenre, onChange } = props;

  const selectedGenre = genres.find((e) => e === actGenre);

  const getCssClasses = (e) =>
    e === selectedGenre ? "list-group-item active" : "list-group-item";

  return (
    <ul className="list-group">
      <li
        className={getCssClasses()}
        onClick={() => {
          if (selectedGenre) onChange();
        }}
      >
        All Genres
      </li>
      {genres.map((e) => (
        <li
          key={e._id}
          className={getCssClasses(e)}
          onClick={() => {
            if (selectedGenre !== e) onChange(e);
          }}
        >
          {e.name}
        </li>
      ))}
    </ul>
  );
}

Genres.propTypes = {
  actGenre: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default Genres;
