import React, { useState, useContext, useEffect,setState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import { signIn, signOut } from "../Action";

const Account = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("false");
    //image
    const [uploadImage, setUploadImage] = useState("");
    const [image, setImage] = useState({ url: "", public_id: "" });
    //context
    const [state, dispatch] = useContext(AuthContext);

    useEffect(() => {
        if (state) {
            const { name, email, role, image } = state.user;
            setName(name);
            setEmail(email);
            setRole(role);
        }
    }, [state]);

    const handleSubmit = async () => {
        setLoading(true)
        if (!email || !password) {
            alert("All fields are required")
            setLoading(false)
            return;
        }
        //console.log("SIGNIN REQUEST => ", name, email, password);

        try {
            const { data } = await axios.post(`/signin`, {
                email,
                password,
            });
            if (data.error) {
                alert(data.error);
                setLoading(false);
            } else {
                dispatch(signIn(data.user, data.token));
                await AsyncStorage.setItem('@auth', JSON.stringify(data))
                setLoading(false);
                console.log("SIGN IN SUCCESS =>", data);
                alert("sign in successful")
                navigation.navigate("Home");
            }
        } catch (err) {
            alert("Sign in failed. Try again");
            console.log(err);
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(permissionResult);
        if (permissionResult.granted === false) {
            alert("camera access is required");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });
        //console.log("PICKER RESULT => ", pickerResult);
        if (pickerResult.cancelled === true) {
            return;
        }

        //save to state fpr preview
        let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
        setUploadImage(base64Image);
        //send to backend for uploading to cloudinary
        let token = state && state.token ? state.token : "";
        const { data } = await axios.post('/upload-image', {
            image: base64Image
        }, {
            headers: {
                "Authorization": `Bearer ${state.token}`
            }
        })
        console.log("UPLOADED RESPONSE => ", data);
        // update user info in the context and execute storage
    };

    const signout = async () => {
        dispatch(signOut())
        await AsyncStorage.removeItem("@auth");
        navigation.navigate("Signin");
    }
    

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',

            }}
        >

            <View style={{ marginVertical: 100 }}>
                <CircleLogo>
                    {image && image.url ? (
                        <Image
                            source={{ uri: image.url }}
                            style={{ width: 190, height: 190, borderRadius: 100, marginVertical: 20 }}
                        />
                    ) : uploadImage ? (
                        <Image
                            source={{ uri: uploadImage }}
                            style={{
                                width: 190,
                                height: 190,
                                borderRadius: 100,
                                marginVertical: 20
                            }}
                        />
                    ) : (
                        <TouchableOpacity onPress={() => handleUpload()}>
                            <FontAwesome5 name="camera" size={25} color="orange" />
                        </TouchableOpacity>
                    )}
                </CircleLogo>

                {image && image.url ? (
                    <TouchableOpacity onPress={() => handleUpload()}>
                        <FontAwesome5 name="camera" size={25} color="orange"
                            style={{ marginTop: -5, marginBottom: 10, alignSelf: "center" }} />
                    </TouchableOpacity>
                ) : <></>}

                <Text title center style={{ paddingBottom: 10 }}>
                    {name}
                </Text>
                <Text medium center style={{ paddingBottom: 10 }}>
                    {email}
                </Text>
                {/* <Text small center light style={{paddingBottom: 50 }}>
                    {role}
                </Text> */}
                <Text>
                    {'\n'}
                </Text>


                <UserInput
                    name="PASSWORD"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                    autoCompleteType="password"
                />

                <SubmitButton
                    title={"update password"}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />


                <SubmitButton
                    title={"Sign out"}
                    handleSubmit={signout}
                    loading={loading}
                />


            </View>
        </KeyboardAwareScrollView>
    );
};

export default Account;