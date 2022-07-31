import AsyncStorage from "@react-native-async-storage/async-storage";

const plantReducer = (state, action) => {
    console.log("Reducer prev state:" + JSON.stringify(state));
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

        case "REMOVE_PLANT_PROFILE":
            const removePlantProfiles = state.plantProfiles.filter(function(value, index, arr){ 
            return value.name == action.plant.name;
            console.log("remove plant" +JSON.stringify(value.name))
            });
            console.log("new plant profile" +JSON.stringify(newPlantProfiles))
            AsyncStorage.setItem('@plantProfiles', JSON.stringify(newPlantProfiles))
            return {...state, plantProfiles: newPlantProfiles};    

        case "UPDATE_PLANT_PROFILE":
        const updatePlantProfiles = state.plantProfiles.map((element, index) => {
            if (element.name === action.plant.name)
            return action.plant;
            return element;
            });    
            console.log("new plant profile" +JSON.stringify(newPlantProfiles))
            AsyncStorage.setItem('@plantProfiles', JSON.stringify(newPlantProfiles))
            return {...state, plantProfiles: newPlantProfiles};
        default:
            return state;
    }
}

export default plantReducer;