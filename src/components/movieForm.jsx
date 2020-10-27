import React, { useState } from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";

import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { useHistory } from "react-router-dom";

function MovieForm({ id }) {
  const movie = getMovie(id) || {};

  const [title, setTitle] = useState(movie.title || "");
  const [genre, setGenre] = useState((movie.genre && movie.genre._id) || "");
  const [numberInStock, setNumberInStock] = useState(movie.numberInStock || "");
  const [rate, setRate] = useState(movie.dailyRentalRate || "");
  const history = useHistory();

  const allGenres = getGenres();

  const onSubmit = (e) => {
    const genreObj = allGenres.find((e) => e._id === genre);
    const newMovie = {
      title,
      genre: genreObj,
      numberInStock,
      dailyRentalRate: rate,
    };
    saveMovie(newMovie);
    history.replace("/movies");
  };

  const structure = [
    {
      name: "title",
      type: "input",
      attributes: {
        type: "text",
        label: "Title",
      },
      value: title,
      setValue: setTitle,
    },
    {
      name: "genre",
      type: "select",
      attributes: {
        label: "Genre",
        values: allGenres,
        propretyName: "name",
        propretyId: "_id",
      },
      value: genre,
      setValue: setGenre,
    },
    {
      name: "numberInStock",
      type: "input",
      attributes: {
        type: "number",
        label: "Stock",
        min: 0,
        max: 10,
      },
      value: numberInStock,
      setValue: setNumberInStock,
    },
    {
      name: "rate",
      type: "input",
      attributes: {
        type: "number",
        label: "Rate",
        min: 0,
        max: 10,
        step: 0.1,
      },
      value: rate,
      setValue: setRate,
    },
  ];
  const schema = {
    title: Joi.string().min(5).max(20).required().label("Title"),
    genre: Joi.string().required().label("genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required()
      .label("Stock"),
    rate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  return (
    <div>
      <h1>New Movie</h1>
      <Form
        data={structure}
        schema={schema}
        submitButton="Add"
        onSubmit={onSubmit}
      />
    </div>
  );
}

MovieForm.propTypes = {
  id: PropTypes.string,
};

export default MovieForm;
