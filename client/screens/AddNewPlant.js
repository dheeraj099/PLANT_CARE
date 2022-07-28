import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Alert
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
import { appendPlantProfile } from '../Action';

{/* Banner Photo */ }
<View style={{ height: "35%" }}>
    <Image
        source={{}}
        resizeMode="cover"
        style={{
            width: '100%',
            height: '100%'
        }}
    />
</View>


const RequirementBar = ({ icon, barPercentage }) => {

    return (
        <View style={{ height: 60, alignItems: 'center' }}>
            <View
                style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
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

const PlantDetail = ({ navigation }) => {


    const [state, dispatch] = useContext(AuthContext);
    const [plantModalVisible, setPlantModalVisible] = useState(false);
    const [plantName, setPlantName] = useState()
    const [water, setWater] = useState();
    const [sunlight, setSunlight] = useState();
    const [fertilizer, setFertilizer] = useState();
    const [soil, setSoil] = useState();
    const [uploadImage, setUploadImage] = useState();

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
            const localImageLocation = FileSystem.documentDirectory + newPlant.name + ".jpg";
            await FileSystem.copyAsync({
                from: newPlant.image,
                to: localImageLocation,
            });
            newPlant.image = localImageLocation;

            const identifier = await NotificationManger.schedulePushNotification(
                {
                    title: "Its time to water your " + newPlant.name + " plant",
                    body: "Please water your plant"
                },
                {
                    day: newPlant.water,
                },
                true,
            );
            newPlant.notificationId = identifier;

            dispatch(appendPlantProfile(newPlant))

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
            <View
                style={{
                    position: 'absolute',
                    top: 50,
                    left: SIZES.padding,
                    right: SIZES.padding
                }}
            >
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
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
                                    <Text style={styles.textStyle}>Hide Modal</Text>
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
                <View style={{ alignItems: 'center' }}>
                    <View >
                        <TouchableOpacity onPress={() => setPlantModalVisible(true)}>
                            {uploadImage ?
                                <Image
                                    source={{ uri: uploadImage }}
                                    style={{
                                        width: 190,
                                        height: 190,
                                        // borderRadius: 100,
                                        marginVertical: 20
                                    }}
                                />
                                : <FontAwesome5 name="camera" size={55} color="orange" />
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
            </View>
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
            <View style={{ flex: 2.5, marginTop: SIZES.padding, paddingHorizontal: SIZES.padding, justifyContent: 'space-around' }}>
                <RequirementDetail
                    icon={icons.garden}
                    label="Name" />
                <UserInput
                    value={plantName}
                    setValue={setPlantName} />
                
                <RequirementDetail
                    icon={icons.sun}
                    label="Sunlight" />
                <UserInput
                    detail={"°C"}
                    value={sunlight}
                    setValue={setSunlight} />

                <RequirementDetail
                    icon={icons.drop}
                    label="Water" />
                <UserInput
                    detail={"Every " + " Days"}
                    value={water}
                    setValue={setWater} />

                <RequirementDetail
                    icon={icons.garden}
                    label="Soil" />
                <UserInput
                    detail={" Kg"}
                    value={soil}
                    setValue={setSoil} />

                <RequirementDetail
                    icon={icons.seed}
                    label="Fertilizer" />
                <UserInput
                    detail={" Mg"}
                    value={fertilizer}
                    setValue={setFertilizer} />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: SIZES.padding }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    onPress={handleUpload}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Upload</Text>


                </TouchableOpacity>


            </View>
        )
    }

    return (


        <View style={styles.container}>

            {/* Banner Photo */}
            <View style={{ height: "35%" }}>
                <Image
                    source={{}}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </View>

            {/* Requirements */}
            <View
                style={{
                    flex: 1,
                    marginTop: -40,
                    backgroundColor: COLORS.lightGray,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    paddingVertical: SIZES.padding
                }}
            >
                <Text style={{ paddingHorizontal: SIZES.padding, color: COLORS.secondary, ...FONTS.h1 }}>Requirements</Text>

                {renderRequirementsBar()}

                {renderRequirements()}

                {renderFooter()}
            </View>

            {renderHeader()}
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        zIndex: 5,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 50,
        padding: 10,
        elevation: 0,
        marginVertical:5
       
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
})

export default PlantDetail;
