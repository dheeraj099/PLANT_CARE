export const loadState = (newState) => {
    return {
        type: "LOAD_STATE",
        newState
    }
}

export const signOut = () => {
    return {
        type: "SIGN_OUT",
    }
}

export const signIn = (user, token) => {
    return {
        type: "SIGN_IN",
        token,
        user,
    }
}

export const appendPlantProfile = (plant) => {
    return {
        type: "APPEND_PLANT_PROFILE",
        plant
    }
}
export const removePlantProfile = (plant) => {
    return {
        type: "APPEND_PLANT_PROFILE",
        plant
    }
}