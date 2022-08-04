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
import { signIn } from "../Action";
import { API } from "../config";


const Signin = ({navigation}) => {
    const [email, setEmail] = useState("dheerajpgirish@gmail.com");
    const [password, setPassword] = useState("12345678"); 
    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useContext(AuthContext);

    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !password) {
            alert("All fields are required");
            setLoading(false);
            return;
        }
        console.log("SIGNIN REQUEST => ", email, password);
        try  {
            const {data} =await axios.post( API+ "/Signin", {
                email, 
                password,
            });
            console.log("SignIn response: " + JSON.stringify(data))
            if(data.error) {
                alert(data.error);
                setLoading(false);
        } else {
            dispatch(signIn(data.user, data.token));
            await AsyncStorage.setItem('@auth', JSON.stringify(data))
            setLoading(false);
            console.log("SIGN IN SUCCESS =>", data);
            alert("sign in successful");
            navigation.navigate("Home");
        }
    } catch (err) {
        alert("Sign in failed. Try again");
        console.log(err);
        setLoading(false);
    }
};
    const loadFromAsyncStorage = async () => {
        let data = await AsyncStorage.getItem("@auth");
        console.log("FROM ASYNC STORAGE => ", data);
    };
    // loadFromAsyncStorage;


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
                Sign In
            </Text>

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
                title={"Sign In"} 
                handleSubmit={handleSubmit} 
                loading={loading} 
            />
            
            <Text small center>
                Not yet Registered? <Text onPress={() => navigation.navigate('Signup')} color="#ff2222">Sign Up</Text>
            </Text>

            <Text small center color="orange" style={{marginTop: 10}}>
                Forgot Password 
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Signin;