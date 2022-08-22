import React from 'react';
import Movie from "./Movie";
import style from './MovieList.module.css';

const MovieList = (props) => {
    return(
       <ul className={style['movie-list']}>
           {props.movies.map(
               (movie) => (
                   <Movie
                       key={movie.id}
                       title={movie.title}
                       releaseDate={movie.releaseDate}
                       openingText={movie.openingText}
                   ></Movie>
               )
           )}
       </ul>
    )
}

export default MovieList;