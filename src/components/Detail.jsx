import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dummy_movie_pic_long from "/dummy_movie_pic_long.png";
import Section from "./Section";
import YouTube from "react-youtube";
import Loader from "./Loader";
import Share from "./Share";

import { StateContextCustom } from "../context/StateContext";

const Detail = () => {
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState([]);

  const { isLoading, setIsLoading } = StateContextCustom();

  const { id } = useParams();

  useEffect(() => {
    fetchMovieDetail();
    fetchCast();
    fetchVideo();
  }, [navigate]);

  const fetchMovieDetail = async () => {
    setIsLoading(true);
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US`
    );
    const data = await api.json();
    setMovie(data);
    console.log(data);
    setIsLoading(false);
  };

  const fetchCast = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d`
    );
    const { cast } = await api.json();
    setCast(cast);
    console.log("cast");
    console.log(cast);
  };

  const fetchVideo = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US`
    );
    const { results } = await api.json();
    setVideo(results[0]);
    // console.log(results[0]);
  };

  return (
    <>
      {isLoading ? (
        <Section>
          <Loader />
        </Section>
      ) : (
        <>
          <div>
            {video ? (
              <div className="">
                <div className="custom-youtube">
                  <YouTube
                    videoId={video.key}
                    className="react_youtube"
                    opts={{
                      playerVars: {
                        controls: 0,
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <Section>
            <div className="flex flex-wrap justify-between flex-col md:flex-row">
              <div className="mb-10 md:mb-0 md:w-[30%]">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    className="w-[100%] rounded "
                  />
                ) : (
                  <>
                    <img src={dummy_movie_pic_long} />
                  </>
                )}

                <div className="mt-5">
                  {movie.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                      className="w-[100%] rounded"
                    />
                  ) : (
                    <>{/* <img src={dummy_movie_pic} /> */}</>
                  )}
                </div>
              </div>
              <div className="md:w-[66%] md:text-xl">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-7">
                    {movie.title}
                  </h1>
                  <div>{movie.overview}</div>
                  <div className="mt-7 flex flex-wrap">
                    <div className="w-[100%] xl:w-[50%] box-border pr-5">
                      <h3 className="text-3xl font-medium mb-5">Overview</h3>
                      <ul className="text-xl list-disc ml-5 mb-7">
                        <li>Status: {movie.status}</li>
                        <li>Release Date: {movie.release_date}</li>
                        <li>Budget: {movie.budget}</li>
                        <li>
                          Original Language:{" "}
                          <span className="uppercase">
                            {movie.original_language}
                          </span>
                        </li>
                        <li>Popularity: {movie.popularity}</li>
                        <li>Revenue: {movie.revenue}</li>
                        <li>Runtime: {movie.runtime}</li>
                        <li>Vote Count: {movie.vote_count}</li>
                      </ul>

                      {movie?.production_companies?.length > 0 && (
                        <>
                          <h3 className="text-3xl md:text-3xl font-medium mb-5">
                            Companies
                          </h3>
                          <ul className="text-xl list-disc ml-5 mb-7">
                            {movie.production_companies?.map((item, index) => {
                              return (
                                <li key={index}>
                                  <p>
                                    {item.name} ({item.origin_country})
                                  </p>
                                  {/* <img
                            className="max-h-[70px] max-w-[150px] mb-3"
                            src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                          /> */}
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      )}
                    </div>
                    <div className="w-[100%]  xl:w-[50%]">
                      {movie?.genres?.length > 0 && (
                        <>
                          <h3 className="text-3xl md:text-3xl font-medium mb-5">
                            Genres
                          </h3>
                          <ul className="text-xl list-disc ml-5 mb-7">
                            {movie.genres?.map((item, index) => {
                              return (
                                <li key={index}>
                                  <p>{item.name}</p>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      )}
                      {movie?.spoken_languages?.length > 0 && (
                        <>
                          <h3 className="text-3xl md:text-3xl font-medium mb-5">
                            Spoken Languages
                          </h3>
                          <ul className="text-xl list-disc ml-5 mb-7">
                            {movie.spoken_languages?.map((item, index) => {
                              return (
                                <li key={index}>
                                  <p>{item.name}</p>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    {cast.length > 0 ? (
                      <>
                        <h3 className="text-3xl md:text-3xl font-medium mb-5">
                          Cast
                        </h3>
                        <ul className="mb-10 grid grid-cols-4 gap-1 md:grid-cols-6 lg:grid-cols-8">
                          {cast?.map((cast) => {
                            return (
                              <li key={cast.id} id={`cast_${cast.id}`}>
                                <Link to={`/cast/${cast.id}`}>
                                  {cast.profile_path ? (
                                    <img
                                      src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                      className="rounded w-full hover:opacity-75"
                                    />
                                  ) : (
                                    <img
                                      src={"/cast-dummy.png"}
                                      className="rounded w-full hover:opacity-75"
                                    />
                                  )}
                                  <p className="mt-1 text-sm text-center">
                                    {cast.name}
                                  </p>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <Share title={movie.title} />
                </div>
              </div>
            </div>
          </Section>
        </>
      )}
    </>
  );
};

export default Detail;
