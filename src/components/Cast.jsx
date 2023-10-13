import React, { useEffect, useState } from "react";
import Section from "./Section";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const Cast = () => {
  const { castId } = useParams();
  const [moviesByCast, setMoviesByCast] = useState([]);
  const [castInfo, setCastInfo] = useState();

  useEffect(() => {
    fetchMoviesByCast();
    fetchCastInfo();
  }, []);

  let promises = [];
  let i = 1;

  const fetchMoviesByCast = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US&page=1&with_cast=${castId}`
    );
    const response = await api.json();
    console.log(response);
    setMoviesByCast(response.results);
  };

  const fetchCastInfo = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/person/${castId}?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US`
    );
    const response = await api.json();
    console.log("castInfo");
    console.log(response);
    setCastInfo(response);
  };

  return (
    <>
      <Section>
        <div className="mb-20 flex flex-wrap justify-between">
          <div className="md:w-[40%]">
            {castInfo?.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${castInfo.profile_path}`}
                className="w-full rounded"
              />
            ) : (
              <img src={"/cast-dummy.png"} className="rounded w-full" />
            )}
          </div>
          <div className="md:w-[55%] mt-10 md:mt-0">
            <h1 className="text-3xl md:text-5xl">{castInfo?.name}</h1>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-medium mb-5 md:mb-10">
            Related Latest Movies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {moviesByCast?.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  className={`movie_${movie.id}`}
                />
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Cast;
