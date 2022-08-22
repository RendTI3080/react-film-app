import React, {useCallback, useEffect, useState} from 'react';
import MovieList from "./Component/MovieList";
import './App.css'
import AddMovie from "./Component/AddMovie";

const App = () => {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataError, setDataError] = useState(null)

    const fetchMoviesHandler = useCallback(async () => {
        setDataError(null)
        setIsLoading(true);

        try {
            // you need send your link to your realtime database like firebase
            const reponse = await fetch('#');
            if (!reponse.ok) {
                throw new Error("Something went wrong");
            }
            const data = await reponse.json();

            const loadedMovies = [];

            for (const key in data) {
                loadedMovies.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                });
            }

            // get data from api stars wars
            // const transformedMovies = data.results.map((movieData) => {
            //     return {
            //         id: movieData.episode_id,
            //         title: movieData.title,
            //         openingText: movieData.opening_crawl,
            //         releaseDate: movieData.release_date,
            //     };
            // });

            setMovies(loadedMovies);
        } catch (e) {
            setDataError(e.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    let content = <p>Found no movies.</p>;

    if (movies.length > 0) {
        content = <MovieList movies={movies}/>;
    }

    if (dataError) {
        content = <p>{dataError}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    async function addMovieHandler(movie) {
        // you need send your link to your realtime database like firebase
        const response = await fetch('#', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <React.Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler}></AddMovie>
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movie</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    )
}

export default App;
