import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/Signup';
import Signin from '../../screens/Signin';
import Home from '../../screens/Home';
import { AuthContext } from '../../context/auth';
import HeaderTabs from '../../components/nav/HeaderTabs';
import Account from '../../screens/Account';
import Post from '../../screens/Post';
import Links from '../../screens/Links';
import PlantDetail from '../../screens/PlantDetail';
// import AddPlant from '../../screens/AddPlant';
import SelectPlant from '../../screens/SelectPlant';
import AddNewPlant from '../../screens/AddNewPlant'
import weather from '../../screens/weather'

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
    const [state, dispatch] = useContext(AuthContext);

    const authenticated = state && state.token !== "" && state.user !== null;
    
    return (  
        <Stack.Navigator 
          initialRouteName="Home" 
          //screenOptions={{headerShown: false}}
        >
          {authenticated ? (
          <>
              <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                  title: "Plant Care",
                  headerRight: () => <HeaderTabs />,
                }}  
              />
              <Stack.Screen 
                name="PlantDetail" 
                component={PlantDetail} 
                options={{ headerShown: false }} 
                />
                 <Stack.Screen 
                name="weather" 
                component={weather} 
                options={{header: () => null}}
                />
               
                {/* <Stack.Screen 
                name="AddPlant" 
                component={AddPlant} 
                options={{ headerShown: false }} 
                /> */}
                <Stack.Screen 
                name="SelectPlant" 
                component={SelectPlant} 
                options={{ headerShown: false }} 
                />
              <Stack.Screen 
                name="Account" 
                component={Account} 
                options={{
                  headerBackTitle: "Back",
                }} 
              />
              <Stack.Screen 
                name="AddNewPLant" 
                component={AddNewPlant} 
                options={{
                  headerBackTitle: "Back",
                }} 
              />
              <Stack.Screen name="Post" component={Post} />      
              <Stack.Screen name="Links" component={Links} />
          </>            
        ) : (
          <>
            <Stack.Screen 
              name="Signin" 
              component={Signin} 
              options={{header: () => null}}
            />       
            <Stack.Screen 
              name="SignUp" 
              component={Signup} 
              options={{headerShown: false}} 
            />  
            
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPassword} 
              options={{headerShown: false}}
            />
          </>
        )}
        </Stack.Navigator>


  );
};
