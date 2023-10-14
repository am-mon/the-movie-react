import React, { useEffect, useState } from "react";
import Section from "./Section";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { StateContextCustom } from "../context/StateContext";
import Loader from "./Loader";

const Cast = () => {
  const { castId } = useParams();
  const [moviesByCast, setMoviesByCast] = useState([]);
  const [castInfo, setCastInfo] = useState();

  const { isLoading, setIsLoading } = StateContextCustom();

  useEffect(() => {
    setIsLoading(true);
    fetchMoviesByCast();
    fetchCastInfo();
    setIsLoading(false);
  }, []);

  let promises = [];
  let i = 1;
  const fetchMoviesByCast = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_cast=${castId}`
    );
    const response = await api.json();
    console.log(response);
    // setMoviesByCast(response.results);
    console.log(response.total_pages);

    for (i; i <= response.total_pages; i++) {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&include_adult=false&include_video=false&language=en-US&page=${i}&sort_by=popularity.desc&with_cast=${castId}`
      );
      const new_response = await data.json();
      console.log(new_response);
      setMoviesByCast((old) => [...old, ...new_response.results]);
    }
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
      {isLoading ? (
        <Section>
          <Loader />
        </Section>
      ) : (
        <Section>
          <div className="mb-20 flex flex-wrap justify-between">
            <div className="md:w-[39%]">
              {castInfo?.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${castInfo.profile_path}`}
                  className="w-full rounded"
                />
              ) : (
                <img src={"/cast-dummy.png"} className="rounded w-full" />
              )}
            </div>
            <div className="md:w-[57%] mt-10 md:mt-0">
              <h1 className="text-3xl md:text-5xl mb-5">{castInfo?.name}</h1>
              <ul className="text-xl list-disc ml-5 mb-7">
                {castInfo?.birthday && <li>Birthday : {castInfo?.birthday}</li>}
                {castInfo?.deathday && <li>Deathday : {castInfo?.deathday}</li>}
                {castInfo?.place_of_birth && (
                  <li>Place of birth : {castInfo?.place_of_birth}</li>
                )}
                {castInfo?.popularity && (
                  <li>Popularity : {castInfo?.popularity}</li>
                )}
              </ul>
              <p>{castInfo?.biography}</p>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-medium mb-5 md:mb-10">
              {castInfo?.name}'s Movies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-4">
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
      )}
    </>
  );
};

export default Cast;
