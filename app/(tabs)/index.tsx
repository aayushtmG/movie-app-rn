import { Text, View ,Image,ScrollView} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";


export default function Index() {
  const router = useRouter();
  return (
    <View
    className="flex-1 bg-primary" 
    >
      <Image source={images.bg} className="absolute z-0 w-full"/>
    <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
    minHeight:'100%',paddingBottom:10
    }}>
    <Image source={icons.logo} className="mx-auto w-12 h-10 mt-20 mb-5  "/>
    <View className="flex-1 mt-5">
      <SearchBar
      placeholder='Search for a movie'
      onPress={()=> router.push('/search')}
      />
    </View>
    </ScrollView>
    </View>
  );
}
