import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constants";
import model from "../utils/geminiai";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // Make an API call  to GPT API and get Movie Results
    const aiQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ", only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Don, Gadar, Sholay, Golmal, Koi Mil Gaya";

    const geminiResults = await model.generateContent(aiQuery);
    console.log(geminiResults.response.text());

    if (!geminiResults.choices) {
      // Error Handling
    }

    // Don, Gadar, Sholay, Golmal, Koi Mil Gaya

    const geminiMovies = geminiResults?.response?.text().split(",");

    // ["Don", "Gadar", "Sholay", "Golmal", "Koi Mil Gaya"]

    // For each movie I will search TMDB API

    const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({
        gptSearchResults: geminiMovies,
        tmdbMovieResults: tmdbResults,
      })
    );
  };

  return (
    <div className="pt-[40%] md:pt-[5%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9"
        />
        <button
          className="py-2 px-4 bg-red-600 text-white rounded-lg col-span-3 m-4"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
