import { createContext, useContext, useEffect, useState } from "react";

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [topBannerMovies, setTopBannerMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [currentGenre, page]);

  useEffect(() => {
    fetchTopBannerMovies();
    fetchGenres();
  }, []);

  //Home
  const fetchMovies = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US&page=${page}&with_genres=${currentGenre}`
    );
    // const api = await fetch(
    //   `https://api.themoviedb.org/3/discover/movie?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=16`
    // );
    const response = await api.json();
    console.log(response);
    setMovieList(response.results);
    setTotalPages(response.total_pages);
  };

  //Home Banner
  const fetchTopBannerMovies = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US&page=${page}`
    );
    const response = await api.json();
    console.log(response);
    setTopBannerMovies(response.results);
  };

  //genres
  const fetchGenres = async () => {
    setIsLoading(true);
    const api = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US&page=${page}`
    );
    const response = await api.json();
    console.log("genre");
    console.log(response);
    setGenres(response.genres);
    setIsLoading(false);
  };

  const data = {
    movieList,
    setMovieList,
    page,
    setPage,
    totalPages,
    setTotalPages,
    topBannerMovies,
    setTopBannerMovies,
    genres,
    setGenres,
    currentGenre,
    setCurrentGenre,
    isLoading,
    setIsLoading,
  };
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const StateContextCustom = () => useContext(StateContext);
