import { Text, View ,Image,ScrollView,ActivityIndicator, FlatList} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingMovieCard from "@/components/TrendingMovieCard";

export default function Index() {
  const router = useRouter();
  const {data:trendingMovies,loading:trendingMoviesLoading,error:trendingMoviesError}   = useFetch(getTrendingMovies);
  const {data:movies,loading:moviesLoading,error:moviesError}   = useFetch(()=> fetchMovies({query:''}))

  return (
    <View
    className="flex-1 bg-primary" 
    >
      <Image source={images.bg} className="absolute z-0 w-full"/>
<FlatList
  ListHeaderComponent={
    <>
      <Image source={icons.logo} className="mx-auto w-12 h-10 mt-20 mb-5  "/>
      {moviesLoading || trendingMoviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : moviesError || trendingMoviesError ? (
        <Text>Error: {moviesError?.message || trendingMoviesError?.message}</Text>
      ) : (
        <View className="flex-1 mt-5">
          <SearchBar placeholder="Search for a movie" onPress={() => router.push("/search")} />
          {trendingMovies && (
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3 ">Trending Movies</Text>
              <FlatList
                horizontal
                ItemSeparatorComponent={() => <View className="w-8" />}
                data={trendingMovies}
                renderItem={({ item, index }) => <TrendingMovieCard movie={item} index={index} />}
                keyExtractor={(item) => item.$id.toString()}
                className="mt-3"
              />
            </>
          )}
              <Text className="text-lg text-white font-bold mt-5 mb-3 ">Latest Movies</Text>
        </View>
      )}
    </>
  }
  data={movies}
  renderItem={({ item }) => <MovieCard {...item} />}
  keyExtractor={(item) => item.id.toString()}
  numColumns={3}
  columnWrapperStyle={{
    justifyContent: "flex-start",
    gap: 20,
    paddingRight: 5,
    marginBottom: 20,
  }}
  className="mb-32 pb-32 px-5"
/>

    </View>
  );
}
