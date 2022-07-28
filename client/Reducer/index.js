import AsyncStorage from "@react-native-async-storage/async-storage";

const plantReducer = (state, action) => {
    console.log("REducer prev state:" + JSON.stringify(state));
    switch (action.type) {
        case "LOAD_STATE":      
            const newState= {...state, ...action.newState};
            console.log("loading state"+JSON.stringify(newState))
            return newState;           
        case "SIGN_OUT":
            return {...state, user: null, token: ''};
        case "SIGN_IN":
            return {...state, user: action.user, token: action.token};
        case "APPEND_PLANT_PROFILE":
            const newPlantProfiles = [...state.plantProfiles, action.plant]
            console.log("new plant profile" +JSON.stringify(newPlantProfiles))
            AsyncStorage.setItem('@plantProfiles', JSON.stringify(newPlantProfiles))
            return {...state, plantProfiles: newPlantProfiles};
        default:
            return state;
    }
}

export default plantReducer;