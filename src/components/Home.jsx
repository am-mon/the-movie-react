import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import MovieCard from "./MovieCard";
import ReactPaginate from "react-paginate";
import { StateContextCustom } from "../context/StateContext";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Home = () => {
  const {
    movieList,
    setMovieList,
    page,
    setPage,
    totalPages,
    setTotalPages,
    count,
    setCount,
    topBannerMovies,
    setTopBannerMovies,
    genres,
    setGenres,
    currentGenre,
    setCurrentGenre,
    isLoading,
    setIsLoading,
  } = StateContextCustom();

  const ref = useRef(null);

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  const getGenre = genres.find((item) => {
    return item.id === currentGenre;
  });
  // console.log(getGenre ? getGenre.name : "All");

  return (
    <>
      <div className="flex flex-wrap">
        {topBannerMovies?.slice(3, 6).map((movie) => {
          return (
            <div key={movie.id} className="w-[33.333%]">
              {movie.poster_path ? (
                <Link to={`/detail/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    className="hover:opacity-70"
                  />
                </Link>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <Section>
        {isLoading ? (
          <Section>
            <Loader />
          </Section>
        ) : (
          <>
            <h3 className="text-3xl mb-5">Genres:</h3>
            {/* {currentGenre}
            <br />
            {page} */}
            <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-10 gap-2 md:gap-2 mb-5 text-base font-medium">
              <li
                className={`bg-emerald-400 ${
                  !currentGenre ? "bg-emerald-700" : "bg-emerald-400"
                }  hover:bg-emerald-700 text-white rounded text-center py-2 px2 box-border cursor-pointer`}
                //
                onClick={() => {
                  setCurrentGenre();
                  setPage(1);
                  ref.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                All
              </li>
              {genres.map((genre) => {
                return (
                  <li
                    key={genre.id}
                    id={`genre_${genre.id}`}
                    className={`bg-emerald-400 ${
                      currentGenre == genre.id
                        ? "bg-emerald-700"
                        : "bg-emerald-400"
                    }  hover:bg-emerald-700 text-white rounded text-center py-2 px2 box-border cursor-pointer`}
                    onClick={() => {
                      setCurrentGenre(genre.id);
                      setPage(1);
                      ref.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {genre.name}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <div ref={ref} className="pt-5">
          <h3 className="text-3xl mb-5">
            {getGenre ? getGenre.name : "All"}
            <span className="text-xl"> ( {count} )</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movieList?.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  className={`movie_${movie.id}`}
                />
              );
            })}
          </div>
          <div className="mt-10 flex justify-center text-sm">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              forcePage={page - 1}
              pageRangeDisplayed={3}
              pageCount={totalPages}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="myPagination"
            />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
