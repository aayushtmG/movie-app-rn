import { StyleSheet, Text, View,Image ,FlatList, ActivityIndicator} from 'react-native'
import SearchBar from '@/components/SearchBar'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import { updateSearchCount } from '@/services/appwrite'

const search = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('');
  const {data: movies,loading, error,refetch: loadMovies,reset} = useFetch(()=> fetchMovies({query: searchQuery}), false);
  useEffect(()=>{
    const timeoutId = setTimeout(async ()=>{
      if(searchQuery.trim()){
        await loadMovies();
      }else{
        reset();
      }
    },500)
    return ()=> clearTimeout(timeoutId);
  },[searchQuery])
  useFetch
  useEffect(()=>{
    if(movies?.length > 0 && movies?.[0]){
      updateSearchCount(searchQuery,movies[0])
    }
  },[movies])
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute z-0' resizeMode='cover'/>
      <FlatList
        data={movies}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=>(
          <MovieCard {...item}/>
        )}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:'flex-start',
          gap: 20,
          marginBottom: 20
          
        }}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        className='mt-2 px-5'
        ListHeaderComponent={
          <>
          <View className='w-full flex-row justify-center mt-20 items-center'>
            <Image source={icons.logo} className='w-12 h-10'/>
          </View>
          <View className='flex-1 my-5 mt-10'>
            <SearchBar
             placeholder='Search for movies...'
             value={searchQuery}
             onChangeText={(text)=>setSearchQuery(text)}
            /> 
          </View>
          {
            loading && (<ActivityIndicator size={'large'} color={'0000ff'} className='my-3'/>)
          }

          {
            error && ( <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text>)
          }

          {
            !loading && !error && searchQuery.trim() && movies?.length > 0 && ( <Text className='mb-3 text-xl font-bold text-white'>Search results for <Text className='text-accent ' >{searchQuery}</Text></Text>)
          }
          </>
        } 
        ListEmptyComponent={
          !loading && !error ?  (
            <View>
              <Text className='text-gray-500 text-center'>
              {searchQuery.trim() ? `No results for ${searchQuery}`: 'Search for a movie'}
                </Text>
            </View>
          ): null
        }
      />
    </View>
  )
}

export default search
