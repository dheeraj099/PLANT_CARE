import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Alert,
    ScrollView
} from 'react-native';

import { icons, COLORS, SIZES, FONTS } from '../constants';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/auth';
import * as NotificationManger from '../manager/NotificationManager'
import UserInput from "../components/auth/UserInput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Modal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { appendPlantProfile, updatePlantProfile } from '../Action';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import uuid from 'react-native-uuid';

{/* Banner Photo */ }

{/* <View style={{ position:'absolute' }}>
    <Image
        source={{}}
        resizeMode="cover"
        style={{
            width: '100%',
            height: '100%'
        }}
    />
</View> */}


const RequirementBar = ({ icon, barPercentage }) => {

    return (
        <View style={{ height: 60, alignItems: 'center' }}>
            <View
                style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: COLORS.gray
                }}
            >
                <Image
                    source={icon}
                    resizeMode="cover"
                    style={{
                        tintColor: COLORS.secondary,
                        width: 30,
                        height: 30
                    }}
                />
            </View>

            {/* Bar */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 3,
                    marginTop: SIZES.base,
                    backgroundColor: COLORS.gray
                }}
            ></View>


            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: barPercentage,
                    height: 3,
                    marginTop: SIZES.base,
                    backgroundColor: COLORS.primary
                }}
            ></View>
        </View>
    )
}


const RequirementDetail = ({ icon, label, detail }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={icon}
                    resizeMode="cover"
                    style={{
                        tintColor: COLORS.secondary,
                        width: 30,
                        height: 30
                    }}
                />

                <Text style={{ marginLeft: SIZES.base, color: COLORS.secondary, ...FONTS.h2 }}>{label}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.h2 }}>{detail}</Text>
            </View>
        </View>
    )
}

const PlantDetail = ({ route, navigation }) => {
    const plant = route.params;

    React.useEffect(() => {
        console.log("Route params " + JSON.stringify(route.params))
        if (route.params && isEditing === false) {
            setEditing(true);
            setPlantName(plant.name);
            setWater(plant.water)
            setSunlight(plant.sunlight)
            setFertilizer(plant.fertilizer)
            setSoil(plant.soil)
            setUploadImage(plant.image)
            console.log("Setting all params with " + JSON.stringify(plant))
        }
    });


    const [state, dispatch] = useContext(AuthContext);
    const [plantModalVisible, setPlantModalVisible] = useState(false);
    const [plantName, setPlantName] = useState()
    const [water, setWater] = useState();
    const [sunlight, setSunlight] = useState();
    const [fertilizer, setFertilizer] = useState();
    const [soil, setSoil] = useState();
    const [uploadImage, setUploadImage] = useState();
    const [isEditing, setEditing] = useState(false);

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setUploadImage(result.uri);
            console.log("Camera image location:" + result.uri);
            setPlantModalVisible(false);
        }
    }

    const openGallery = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(permissionResult);
        if (permissionResult.granted === false) {
            alert("camera access is required");
            return;
        }
        ImagePicker.sh
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });
        //console.log("PICKER RESULT => ", pickerResult);
        if (pickerResult.cancelled === true) {
            return;
        }
        setUploadImage(pickerResult.uri);
        console.log("Upload image location:" + pickerResult.uri);
        setPlantModalVisible(false);
    };

    const validateNewPlant = (plant) => {
        if (!plant.soil || !plant.water || !plant.fertilizer || !plant.name || !plant.sunlight || !plant.image) {
            return false;
        }
        return true;
    }

    const handleUpload = async () => {

        // // TODO remove for prod
        // dispatch(loadState({plantProfiles: [], myPlants:[]}));

        let newPlant = {
            name: plantName,
            soil: soil,
            fertilizer: fertilizer,
            water: water,
            sunlight: sunlight,
            image: uploadImage
        };
        console.log("adding new plant profile " + JSON.stringify(newPlant))

        if (!validateNewPlant(newPlant)) {
            alert("All fields are required")
            // setLoading(false)
            return;
        }

        try {
            console.log("New image location " + newPlant.image)
            const localImageLocation = FileSystem.documentDirectory + newPlant.name + "-" + uuid.v4() + ".jpg";
            // if (plant) {
            //     console.log("Deleting old image : " + plant.image)
            //     await FileSystem.deleteAsync(plant.image)
            // }
            await FileSystem.copyAsync({
                from: newPlant.image,
                to: localImageLocation,
            });

            if (plant) {
                console.log("Deleting old image : " + plant.image)
                await FileSystem.deleteAsync(plant.image)
            }

            newPlant.image = localImageLocation;



            const identifier = await NotificationManger.schedulePushNotification(
                {
                    title: "Its time to water your " + newPlant.name + " plant",
                    body: "Please water your plant. Did you Water..?"
                },
                {
                    day: newPlant.water,
                },
                true,
            );

            if (plant) {
                await NotificationManger.cancelScheduledPushNotification(plant.notificationId)
            }
            newPlant.notificationId = identifier;

            if (plant) {
                dispatch(updatePlantProfile(newPlant))
            }
            else {
                dispatch(appendPlantProfile(newPlant))
            }

            // setLoading(false);
            navigation.navigate("Home")
        } catch (err) {
            alert("Plant upload failed. Try again");
            console.log(err);
            // setLoading(false);
        }
    };

    // Render
    function renderHeader() {
        return (
            <ScrollView
                style={{
                    position: 'absolute',
                    top: -24,
                    left: -24,
                    right: -17,

                }}
            >
                <View style={styles.centeredView}>
                    <Modal
                        animated
                        animationType='fade'
                        transparent={true}
                        visible={plantModalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setPlantModalVisible(!plantModalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={openCamera}>
                                    <Text style={styles.textStyle}>Open Camera</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={openGallery}>
                                    <Text style={styles.textStyle}>Open Gallery</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setPlantModalVisible(!plantModalVisible)}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                </View>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.5)' }}
                            onPress={() => { navigation.navigate("Home") }}
                        >
                            <Image
                                source={icons.back}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ alignItems: 'center', resizeMode: 'cover', }}>
                    <View >
                        <TouchableOpacity onPress={() => setPlantModalVisible(true)}>
                            {uploadImage ?
                                <Image
                                    source={{ uri: uploadImage }}
                                    resizeMode="cover"
                                    style={{
                                        width: 400,
                                        height: 200,
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                        // borderRadius: 50,
                                        marginVertical: 0,
                                        marginTop: -60,
                                    }}
                                />
                                : <FontAwesome5 name="camera" size={55} color="grey" />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{ }</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </ScrollView>
        )
    }

    function renderRequirementsBar() {
        return (
            <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.padding, justifyContent: 'space-between' }}>
                <RequirementBar
                    icon={icons.sun}
                    barPercentage="50%"
                />
                <RequirementBar
                    icon={icons.drop}
                    barPercentage="25%"
                />
                <RequirementBar
                    icon={icons.temperature}
                    barPercentage="80%"
                />
                <RequirementBar
                    icon={icons.garden}
                    barPercentage="30%"
                />
                <RequirementBar
                    icon={icons.seed}
                    barPercentage="50%"
                />
            </View>
        )
    }

    function renderRequirements() {
        return (
            <KeyboardAwareScrollView style={{ flex: 1, marginTop: SIZES.padding, paddingHorizontal: SIZES.padding, }}>
                <RequirementDetail
                    icon={icons.garden}
                    label="Name" />
                <UserInput
                    value={plantName}
                    setValue={setPlantName}
                    placeholder={""} />

                <RequirementDetail
                    icon={icons.sun}
                    label="Sunlight"
                    placeholder={""} />
                <UserInput
                    detail={"°C"}
                    value={sunlight}
                    setValue={setSunlight}
                    placeholder={""} />

                <RequirementDetail
                    icon={icons.drop}
                    label="Water"
                    placeholder={""} />
                <UserInput
                    detail={"Every " + " Days"}
                    value={water}
                    setValue={setWater}
                    placeholder={""} />

                <RequirementDetail
                    icon={icons.garden}
                    label="Soil"
                    placeholder={""} />
                <UserInput
                    detail={" Kg"}
                    value={soil}
                    setValue={setSoil}
                    placeholder={""} />

                <RequirementDetail
                    icon={icons.seed}
                    label="Fertilizer" />
                <UserInput
                    detail={" Mg"}
                    value={fertilizer}
                    setValue={setFertilizer}
                    placeholder={""} />

                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        borderBottomLeftRadius: 30,
                        backgroundColor: COLORS.primary,

                    }}
                    onPress={handleUpload}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Upload</Text>


                </TouchableOpacity>





            </KeyboardAwareScrollView>
        )
    }


    return (

        <View style={styles.container}>

            {/* Banner Photo */}
            <View style={{ height: "35%", }}>
                <Image
                    source={{}}
                    resizeMode="cover"
                    style={{
                        width: '200%',
                        height: '200%'
                    }}
                />
            </View>

            {/* Requirements */}
            <View
                style={{
                    flex: 1,
                    marginTop: -50,
                    backgroundColor: COLORS.lightGray,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    paddingVertical: SIZES.padding
                }}
            >
                <Text style={{ paddingHorizontal: SIZES.padding, color: COLORS.secondary, ...FONTS.h1 }}>Requirements</Text>

                {renderRequirementsBar()}

                {renderRequirements()}

                {/* {renderFooter()} */}
            </View>

            {renderHeader()}
        </View>
    )


}

const styles = StyleSheet.create({

    centeredView: {
        // position:'absolute',
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45,
        zIndex: 5,
    },
    modalView: {
        position: 'absolute',
        animationType: 'fade',
        transparent: 'true',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
    },
    button: {
        borderRadius: 50,
        padding: 10,
        elevation: 0,
        marginVertical: 5

    },
    buttonOpen: {
        backgroundColor: 'transparent',
    },

    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },

})

export default PlantDetail;