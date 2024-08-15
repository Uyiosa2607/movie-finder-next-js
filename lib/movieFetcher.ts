import axios from "axios";

async function getMovies(category: string) {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWExNDM5MTliYTJjOGFkNjQzMDdmYTFhMzJiN2FhYiIsIm5iZiI6MTcyMzcyNTMxOS42NDY0MzEsInN1YiI6IjY1YjJlMzRkNGEwYjE5MDE2YmNhYjE2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RBFGlbTq5SuAb3zAF-vtLK68RnAxP0XgY_gSSU_SRYI",
    },
  };

  try {
    axios
      .request(options)
      .then(function (response: any) {
        console.log(response.data);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export default getMovies;
