import { Link } from "react-router-dom";
import dummy_movie_pic_long from "/dummy_movie_pic_long.png";

const MovieCard = ({ movie, className }) => {
  return (
    <div className={className}>
      <div className="w-full">
        <Link to={`/detail/${movie.id}`}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className="rounded hover:opacity-75"
            />
          ) : (
            <img src={dummy_movie_pic_long} />
          )}
        </Link>
        <h4 className="my-2 text-center text-base md:text-lg">{movie.title}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
