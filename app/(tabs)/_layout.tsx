import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { ImageBackground,Text,Image,View, ImageSourcePropType} from 'react-native'


const TabIcon = ({focused,icon,title}:any)=>{
  if(focused){
  return <>
            <ImageBackground  source={images.highlight} tintColor={'#D6C6FF'}  className='flex flex-row flex-1 justify-center  items-center min-h-16 mt-4 w-full min-w-[112px] rounded-full overflow-hidden'>
              <Image source={icon}  tintColor={'#151312'} className='size-5'/>
              <Text className='text-secondary text-base font-semibold ml-2' >{title}</Text>
            </ImageBackground>
          </>
  }
    return <View className=' size-full mt-4 rounded-full justify-center items-center'>
      <Image source={icon}  tintColor={'#A8B5DB'} className='size-5'/>
    </View>
}

const _layout = () => {
    return (
    <Tabs  screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle:{
        backgroundColor: '#0f0d23',
        borderRadius:50,
        marginHorizontal: 20,
        marginBottom: 14,
        height:52,
        position:'absolute',
        overflow:'hidden',
        borderWidth: 1,
        borderColor:'0f0d23' 
      }
    }}>
      <Tabs.Screen
      name='index'
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({focused})=>(
          <TabIcon focused={focused} icon={icons.home} title='Home'/>
        )
      }}
      />
      <Tabs.Screen
      name='search'
      options={{
        title: 'Search',
        headerShown: false,
        tabBarIcon: ({focused})=>(
          <TabIcon focused={focused} icon={icons.search} title='Search'/>
        )
      }}
      />
      <Tabs.Screen
      name='saved'
      options={{
        title: 'Saved',
        headerShown: false,
        tabBarIcon: ({focused})=>(
          <TabIcon focused={focused} icon={icons.save} title='Saved'/>
        )
      }}
      />
      <Tabs.Screen
      name='profile'
      options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({focused})=>(
          <TabIcon focused={focused} icon={icons.person} title='Profile'/>
        )
      }}
      />
    </Tabs>

  )
}

export default _layout
