import Constants from 'expo-constants'
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY:Constants.expoConfig?.extra?.EXPO_PUBLIC_API_KEY ,
  headers:{
    accept: 'application/json',
    Authorization : `Bearer ${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_KEY}`
  }

}


export const fetchMovies = async({query}: {query:string})=>{
  const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${query}`: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
  const response = await fetch(endpoint,{
    method: 'GET',
    headers: TMDB_CONFIG.headers
  })

  if(!response.ok){
    // @ts-ignore
    throw new Error('Failed to fetch movies', response.statusText)
  }
  const data = await response.json();
  return data.results;

}

export const fetchMovieDetails = async (movie_id: string) : Promise<MovieDetails>=>{
try{
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}`
  const  response =  await fetch(endpoint,{
    method:'GET',headers: TMDB_CONFIG.headers
  })

  if(!response.ok) throw new Error(`Couldnt fetch the movie details for id: ${movie_id}`)

  const data = await response.json();

  return data
  
}catch(error){
  console.log(error)
  throw error
}
}

