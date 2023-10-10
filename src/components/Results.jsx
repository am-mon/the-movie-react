import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "./Section";
import MovieCard from "./MovieCard";
import ReactPaginate from "react-paginate";
import { StateContextCustom } from "../context/StateContext";
import Loader from "./Loader";

const Results = () => {
  const { searchKeyword } = useParams();
  const [searchResultMovies, setSearchResultMovies] = useState([]);
  const [searchPageNum, setSearchPageNum] = useState(1);
  const [totalSearchPages, setTotalSearchPages] = useState(0);
  const { isLoading, setIsLoading } = StateContextCustom();

  useEffect(() => {
    fetchSearchResultsMovies();
  }, [searchKeyword, searchPageNum]);

  const fetchSearchResultsMovies = async () => {
    setIsLoading(true);
    const api = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c05d1c927a4b60ec1fff7ff01f5c3d8d&language=en-US&query=${searchKeyword}&page=${searchPageNum}`
    );
    const response = await api.json();
    console.log("Results");
    console.log(response);
    setSearchResultMovies(response.results);
    setTotalSearchPages(response.total_pages);
    setIsLoading(false);
  };

  const searchFilter = searchResultMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchKeyword.toLocaleLowerCase())
  );

  const handlePageClick = (selectedPage) => {
    setSearchPageNum(selectedPage.selected + 1);
  };

  console.log(searchFilter);

  return (
    <>
      {isLoading ? (
        <>
          <Section>
            <Loader />
          </Section>
        </>
      ) : (
        <Section>
          {/* {totalSearchPages}
        <br />
        {searchPageNum} */}
          <h1 className="text-2xl md:text-4xl font-medium mb-10 text-center">
            Search Results for{" "}
            <span className="text-emerald-600">{searchKeyword}</span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchFilter?.map((movie) => {
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
              pageRangeDisplayed={3}
              pageCount={totalSearchPages - 1}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="myPagination"
            />
          </div>
        </Section>
      )}
    </>
  );
};

export default Results;
