import React from 'react';
import {useState , useEffect} from 'react';
import MovieList from './components/MovieList';
import './App.css'
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites,setFavourites]=useState([]);

  const [searchMovie , setSearchMovie]=useState('');

  const getMovieRequest= async ()=>{
    const url=`http://www.omdbapi.com/?s=${searchMovie}&apikey=45e2789b`

    const response= await fetch(url);
    const responseJson=await response.json();
    // console.log(responseJson);
    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
    
  }
  useEffect(()=>{
    getMovieRequest();
  },[searchMovie])

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavouriteMovie=(movie)=>{
    const newFavouritelist=[...favourites,movie]
    setFavourites(newFavouritelist)
    saveToLocalStorage(newFavouritelist)
  }

  const removeFavouriteMovie=(movie)=>{
    const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  return ( 
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Movies'/>
      <SearchBox seachMovie={searchMovie} setSearchMovie={setSearchMovie}/>
    </div>
    <div className='row'>
      <MovieList movies={movies} 
      handleFavouritesClick={addFavouriteMovie}
      favouriteComponent={AddFavourites}></MovieList>
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favourites'/>
      
    </div>
    <div className='row'>
      <MovieList movies={favourites} 
      handleFavouritesClick={removeFavouriteMovie}
      favouriteComponent={RemoveFavourites}></MovieList>
    </div>
    
  </div>
  );
}



export default App;