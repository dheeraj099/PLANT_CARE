import React, { useState, useContext } from "react";
import { View, ScrollView, ImageBackground, StyleSheet, Image, TextInput } from "react-native";
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
import { icons, COLORS, SIZES, FONTS } from '../constants';


const Signin = ({ navigation }) => {
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
        try {
            const { data } = await axios.post(API + "/Signin", {
                email,
                password,
            });
            console.log("SignIn response: " + JSON.stringify(data))
            if (data.error) {
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
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            flex: 1,
            justifyContent: "center"
        },
        text: {
            color: "white",
            fontSize: 42,
            lineHeight: 84,
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#000000c0"
        }
    });


    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnQlMjB3YWxscGFwZXJ8ZW58MHx8MHx8&w=1000&q=80' }} style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flex: 1,
                    // backgroundColor:'darkgreen',
                    justifyContent: 'center',
                }}
            >

                <View>
                <View style={{ marginBottom:60 }}>
                    <Text style={{ color: COLORS.white, ...FONTS.largeTitle, textAlign: "center", }}>PLANTED</Text></View>

                    <View style={{
                        alignContent: 'center',
                        alignSelf: 'center',
                        width: "80%",
                        backgroundColor: 'white',
                        borderRadius: 50,
                        //   height:50,
                        marginBottom: 20,                        
                        justifyContent: "center",
                        paddingLeft: 10
                    }}>
                        

                        <TextInput

                            name="EMAIL"
                            value={email}
                            setValue={setEmail}
                            autoCompleteType="email"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={{
                        alignContent: 'center',
                        alignSelf: 'center',
                        width: "80%",
                        backgroundColor: "white",
                        borderRadius: 50,
                        //   height:50,
                        marginBottom: 20,
                        justifyContent: "center",
                        paddingLeft: 10
                    }}>
                        <TextInput
                            name="PASSWORD"
                            value={password}
                            setValue={setPassword}
                            secureTextEntry={true}
                            autoCompleteType="password"
                        />
                    
                    </View>

                    <View style={{
                        marginBottom: 20,
                        
                    }}>
                    <Text small center color="white" >
                        Forgot Password
                    </Text>
                    </View>

                    <SubmitButton
                        title={"Sign In"}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />

                    <Text small center>
                        <Text onPress={() => navigation.navigate('Signup')} color="white">Sign Up</Text>
                    </Text>


                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    );
};
var styles = StyleSheet.create({
    container: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
    }
});

export default Signin;