/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import './App.css';



const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography class= "nameid" variant="h1">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img style={{ width: "300px", height: "300px" }} src={front_default} />
        </Typography>
        {/* <img style={{ width: "300px", height: "300px" }} src={ fullImageUrl } /> */}
        <Typography class="pokeinfo" variant="h3">Pokemon Info</Typography>
        <Typography class="details">
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography class="info">Height: {height} </Typography>
        <Typography class="info">Weight: {weight} </Typography>
        <Typography class="info" variant="h6"> Types:</Typography>
        <Typography class="info"> {types.map((typeInfo) => {
          const { type } = typeInfo;
        
          const { name } = type;
          return <Typography class="back" key={name}> {`${name}`}</Typography>;
        })} </Typography>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button class="btn" variant="contained" onClick={() => history.push("/")}>
          BACK
        </Button>
      )}
    </>
  );
};

export default Pokemon;