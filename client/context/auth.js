import React, { useEffect, createContext, useReducer } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from "../config";
import plantReducer from "../Reducer";
import { loadState } from "../Action";
import { useNavigation } from "@react-navigation/native";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const initialState = {
        user: null,
        token: "",
        plantProfiles: [],
        myPlants: [],
    };

    const navigation= useNavigation();

    const [state, dispatch] = useReducer(plantReducer, initialState);
const token =state && state.token ? state.token :'';
    axios.defaults.baseURL = API;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// handle expired token  or 401 error
axios.interceptors.response.use(
    async function  (response) {
        return response;
    },
    async function (error) {
        let res = error.response;
        if(res.status === 401 && res.config && res.config._isRetryRequest){
            await AsyncStorage.removeItem("@auth");
            setState({ user: null, token:""});
            navigation.navigate('Signin');
        }
}
)



    const loadFromAsyncStorage = async () => {
        try {
            let auth = await AsyncStorage.getItem("@auth");
            const as = auth ? JSON.parse(auth) : null;

            const savedPlantProfiles = await AsyncStorage.getItem("@plantProfiles");
            const plantProfiles = savedPlantProfiles ? JSON.parse(savedPlantProfiles) : [];
            console.log("loading plant profiles" + savedPlantProfiles)
            
            const newstate =  {
                user: as ? as.user : null,
                token: as ? as.token : "",
                plantProfiles: plantProfiles,
            };
            console.log("saving new state: "+JSON.stringify(newstate))
            return newstate;
        } catch (err) {
            alert("Initial load of state failed. Please reopen the app");
            throw err;
        }
    };

    useEffect(() => {
        console.log("Loading state from async storage");
        loadFromAsyncStorage().then(
            newState => {
                dispatch(loadState(newState));
            }
        );
    }, []);

   return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
   );

};

export {AuthContext, AuthProvider};