import { useEffect, useState } from "react";
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
    topBannerMovies,
    setTopBannerMovies,
    genres,
    setGenres,
    currentGenre,
    setCurrentGenre,
    isLoading,
    setIsLoading,
  } = StateContextCustom();

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  return (
    <>
      <div className="flex">
        {topBannerMovies?.slice(3, 7).map((movie) => {
          return (
            <div key={movie.id} className="w-[25%]">
              {movie.poster_path ? (
                <Link to={`/detail/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    className="opacity-70"
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
            <h3 className="text-3xl font-meidum mb-5">Genres:</h3>
            {/* {currentGenre}
            <br />
            {page} */}
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-10">
              <li
                className={`bg-emerald-400 ${
                  !currentGenre ? "bg-emerald-700" : "bg-emerald-400"
                }  hover:bg-emerald-700 text-white text-xl rounded text-center py-2 px2 box-border cursor-pointer font-medium`}
                //
                onClick={() => {
                  setCurrentGenre();
                  setPage(1);
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
                    }  hover:bg-emerald-700 text-white text-xl rounded text-center py-2 px2 box-border cursor-pointer font-medium`}
                    onClick={() => {
                      setCurrentGenre(genre.id);
                      setPage(1);
                    }}
                  >
                    {genre.name}
                  </li>
                );
              })}
            </ul>
          </>
        )}

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
      </Section>
    </>
  );
};

export default Home;
