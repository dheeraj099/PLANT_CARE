import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthProvider } from './context/auth';
import * as Notification from './manager/NotificationManager';
import Account from './screens/Account';
import AddNewPlant from './screens/AddNewPlant';
// import AddPlant from './screens/AddPlant';
import Home from './screens/Home';
import Links from './screens/Links';
import Post from './screens/Post';
import { default as PlantDetail, default as SelectPlant } from './screens/SelectPlant';
import Signin from './screens/Signin';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();

Notification.showPushNotification();

export default function App() {

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
            {/* <Stack.Screen name="AddPlant" component={AddPlant} /> */}
            <Stack.Screen name="Links" component={Links} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="SelectPlant" component={SelectPlant} />
            <Stack.Screen name="PlantDetail" component={PlantDetail} />
            <Stack.Screen name="AddNewPlant" component={AddNewPlant} />
        </Stack.Navigator>


      </AuthProvider>
    </NavigationContainer> 
  )
};
