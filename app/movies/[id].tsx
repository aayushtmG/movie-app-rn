
import { ScrollView,ActivityIndicator, StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps{
  label: string;
  value?: string | number | null;
}

const MovieInfo= ({label,value}: MovieInfoProps)=>(
  <View className=' items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{label}</Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>{value}</Text>
  </View>
)

const MovieDetails = () => {
  const router = useRouter();
  const {id} =useLocalSearchParams();
  const {data:movie,loading,error} = useFetch(()=>fetchMovieDetails(id as string))
  useEffect(()=>{
  },[])
  if(loading){
    return (
    <View className='bg-primary flex-1 justify-center'>
      <ActivityIndicator size='large' color={'#D6C6FF'}/>
    </View>
    )
  }
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom: 120}}>
        <View>
          <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
          className='w-full h-[550px]'
          resizeMode='stretch'
          />
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
        <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          <View className='flex-row items-center gap-x-1 mt-2'>
              <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
              <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
          </View>
          <View className='flex-row gap-x-1 items-center bg-dark-100 px-2 py-1 mt-2 rounded-md'>
            <Image source={icons.star} className='size-4'/>
            <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className='text-light-200 text-sm'>({movie?.vote_count}votes)</Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview}/>
          <MovieInfo label='Genres' value={movie?.genres?.map(g => g.name).join('-') || 'N/A'}/>
          <View className=' flex-row justify-between w-1/2'>
            <MovieInfo label='Budget' value={`$${movie?.budget as number / 1_000_000} million`}/>
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue as number / 1_000_000)} million`}/>
          </View>
          <MovieInfo label='Production Companies' value={movie?.production_companies?.map(c => c.name).join('-') || 'N/A'}/>
        </View>
      </ScrollView>
      <TouchableOpacity
      className='bg-accent absolute bottom-14 left-0 right-0 mx-5 rounded-lg py-3.5 items-center justify-center flex-row' onPress={()=>router.push('/')}>
          <Image source={icons.arrow} tintColor='#fff' className='mr-1 mt-0.5 size-5 rotate-180'/>
          <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails 
