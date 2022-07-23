import React, {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import Home from './screens/Home';
import Account from './screens/Account';
import AddPlant from './screens/AddPlant';
import Links from './screens/Links'
import Post from './screens/Post';
import SelectPlant from './screens/SelectPlant'
import PlantDetail from './screens/SelectPlant';
import { AuthProvider } from './context/auth';
import RootNavigation from './navigation';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() =>{
    registerForPushNotifications().then(token=>console.log(token)).catch(err => console.log(Err))
  },[])

  async function registerForPushNotifications(){
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status!='granted') {
      alert('fail to get the push token');
      return;

    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }







  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="Signin"
          ScreenOptions={{ headerShown: false}}
          >
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="AddPlant" component={AddPlant} />
            <Stack.Screen name="Links" component={Links} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="SelectPlant" component={SelectPlant} />
            <Stack.Screen name="PlantDetail" component={PlantDetail} />
        </Stack.Navigator>


      </AuthProvider>
    </NavigationContainer> 
  )
};
