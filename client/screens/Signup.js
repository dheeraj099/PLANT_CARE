import React, {useState, useContext} from "react";
import { View, ScrollView } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/auth";
import { API } from "../config";


const Signup = ({ navigation }) => {
    const [name, setName] = useState("Dheeraj");
    const [email, setEmail] = useState("dheerajpgirish@gmail.com");
    const [password, setPassword] = useState("12345678"); 
    const [loading, setLoading] = useState("false");

    const [state, dispatch] = useContext(AuthContext);

    // console.log("NAVIGATION ->", navigation);

    const handleSubmit = async () => {
        setLoading(true);
        if (!name || !email || !password) {
            alert("All fields are required");
            setLoading(false);
            return;
        }
        //console.log("SIGNUP REQUEST => ", name, email, password);

        try {
            const {data} = await axios.post( API + "/Signup", {
                name, 
                email, 
                password,
            });

            
            setLoading(false);
            console.log("SIGN IN SUCCESS =>", data);
            alert("sign up successful");
            
            

        } catch (err) {
            alert("Sign up failed. Try again");
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{
            flex: 1, 
            justifyContent: 'center',
            
            }}        
        >

            <View style={{marginVertical: 100}}>
                <CircleLogo/>


            <Text title center>
                Sign Up
            </Text>

            <UserInput 
            name="NAME" 
            value={name} 
            setValue={setName} 
            autoCapitalize="words"
            autoCorrect={false}
            />
            <UserInput 
            name="EMAIL" 
            value={email} 
            setValue={setEmail} 
            autoCompleteType="email" 
            keyboardType="email-address"
            />
            <UserInput 
            name="PASSWORD" 
            value={password} 
            setValue={setPassword} 
            secureTextEntry={true}
            autoCompleteType="password"
            />

            <SubmitButton 
                title={"Sign Up"} 
                handleSubmit={handleSubmit} 
                loading={loading} 
            />
            
            <Text small center>
                Already Registered? {""} 
                <Text onPress={() => navigation.navigate('Signin')} color="#ff2222">
                    Sign In
                </Text>
            </Text>
        </View>
    </KeyboardAwareScrollView>
    );
};

export default Signup;