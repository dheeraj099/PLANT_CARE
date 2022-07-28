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

export const appendMyPlant = (plant) => {
    return {
        type: "APPEND_MY_PLANT",
        plant
    }
}

export const appendPlantProfile = (plant) => {
    return {
        type: "APPEND_PLANT_PROFILE",
        plant
    }
}
