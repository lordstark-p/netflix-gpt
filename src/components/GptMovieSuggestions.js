import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptSearchResults, tmdbMovieResults } = gpt;
  if (!gptSearchResults) {
    return null;
  }
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <div>
        {gptSearchResults.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={tmdbMovieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
