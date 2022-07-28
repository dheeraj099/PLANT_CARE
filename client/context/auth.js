import React, { useEffect, createContext, useReducer } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from "../config";
import plantReducer from "../Reducer";
import { loadState } from "../Action";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const initialState = {
        user: null,
        token: "",
        plantProfiles: [],
        myPlants: [],
    };

    const [state, dispatch] = useReducer(plantReducer, initialState);

    axios.defaults.baseURL = API;

    const loadFromAsyncStorage = async () => {
        try {
            let auth = await AsyncStorage.getItem("@auth");
            const as = auth ? JSON.parse(auth) : null;

            const savedPlantProfiles = await AsyncStorage.getItem("@plantProfiles");
            const plantProfiles = savedPlantProfiles ? JSON.parse(savedPlantProfiles) : [];
            console.log("loading plant profiles" + savedPlantProfiles)

            const savedMyPlants = await AsyncStorage.getItem("@myPlants");
            const myPlants = savedMyPlants ? JSON.parse(savedMyPlants) : [];
            console.log("loading my plants" + savedMyPlants)
            
            const newstate =  {
                user: as ? as.user : null,
                token: as ? as.token : "",
                plantProfiles: plantProfiles,
                myPlants: myPlants,
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