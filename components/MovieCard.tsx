import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({id,title,poster_path,vote_average,release_date}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className='w-[30%]'>
      <Image
      source={{uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placeholder.co/600x100/1a1a1a/ffffff.png'}} 
     className='w-full h-52 rounded-lg' resizeMode='cover'
      />
      <Text className='text-white text-sm font-bold mt-2' numberOfLines={1}>{title}</Text>
      <View className='flex-row  justify-start items-center gap-x-1'>
        <Image source={icons.star} className='size-4'/>
        <Text className='text-white text-xs font-bold ' >{Math.round(vote_average/2)}</Text>
      </View>
      <View className='flex-row justify-between items-center'>
        <Text className=' text-xs text-light-300 font-medium mt-1'>{release_date?.split('-')[0]}</Text>
        {/* <Text className='text-xs text-light-300 uppercase font-medium'>Movie</Text> */}
      </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard