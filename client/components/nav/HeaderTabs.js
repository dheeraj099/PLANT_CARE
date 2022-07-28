import React, {useContext} from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import  Text  from "@kaloraat/react-native-text";
import { AuthContext } from "../../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from "../../Action";

const HeaderTabs =() => {
    const [state, dispatch] = useContext(AuthContext);

    const handleSignOut = async () => {
        dispatch(signOut);
        await AsyncStorage.removeItem('@auth');
    };

    return(
        <SafeAreaView>
            <TouchableOpacity onPress={handleSignOut}>
                <FontAwesome5 name="sign-out-alt" size={25} color="#ff9900"/>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default HeaderTabs;