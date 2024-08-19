import axios from "axios";

const token: any = process.env.NEXT_PUBLIC_MOVIE_AUTH_TOKEN;

async function getMovies(category: string) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(options.url, { headers: options.headers });
    if (response.data) return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
}

async function getMovieDetails(movieId: string) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(options.url, { headers: options.headers });
    if (response.data) return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

export { getMovies, getMovieDetails };
