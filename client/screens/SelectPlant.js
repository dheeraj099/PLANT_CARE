import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../constants';
import { TouchableOpacity } from 'react-native';
import Home from './Home';
import { AuthContext } from '../context/auth';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { removePlantProfile } from '../Action';

// import { appendMyPlant } from '../Action';
// import * as NotificationManger from '../manager/NotificationManager'


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

const PlantDetail = ({ route,navigation }) => {

    const [isEditing, setEditing] = useState()
    const [state, dispatch] = useContext(AuthContext);
    const {plant}=route.params;

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
                                    height: 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{plant.name}</Text>
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
            <View style={{ flex: 3, marginTop: SIZES.padding, paddingHorizontal: SIZES.padding, justifyContent: 'space-around' }}>
                {/* {
                    isEditing ?
                    <> 
                        <RequirementDetail
                            icon={icons.sun}
                            label="Sunlight"
                            detail={plant.sunlight+"°C"}
                        />
                        <UserInput />
                    </>
                    :
                    <RequirementDetail
                        icon={icons.sun}
                        label="Sunlight"
                        detail={plant.sunlight+"°C"}
                    />
                } */}
                
                
                
                <RequirementDetail
                    icon={icons.sun}
                    label="Sunlight"
                    detail={plant.sunlight+"°C"}
                />
                <RequirementDetail
                    icon={icons.drop}
                    label="Water"
                    detail={"Every " + plant.water + " Days"}
                />

                <RequirementDetail
                    icon={icons.garden}
                    label="Soil"
                    detail={ plant.soil + " Kg"}
                />
                <RequirementDetail
                    icon={icons.seed}
                    label="Fertilizer"
                    detail={plant.fertilizer + " Mg"}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View style={{ flex: 1, justifyContent:'flex-end'}}>
                {/* <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        // paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    onPress={async () => {
                        // dispatch(appendMyPlant(plant));
                        // const identifier = await NotificationManger.schedulePushNotification(
                        //     {
                        //         title: "Its time to water your " + plant.name + " plant",
                        //         body: "Please water your plant"
                        //     },
                        //     {
                        //         minute: 2,
                        //     },
                        //     true,
                        // );
                        navigation.navigate("Home" )
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Add plant</Text>

                    <Image
                        source={icons.chevron}
                        resizeMode="contain"
                        style={{
                            marginLeft: SIZES.padding,
                            width: 20,
                            height: 20
                        }}
                    />
                </TouchableOpacity> */}
                
                

                <View style={{ flex: 0.8, flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={{
                        flex:1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 80,
                        borderBottomRightRadius: 80,
                        borderTopLeftRadius:80,
                        borderBottomLeftRadius:80,
                        backgroundColor: 'red',
                        marginBottom:20
                    }}
                    onPress={async () => {
                        // dispatch(appendMyPlant(plant));
                        // const identifier = await NotificationManger.schedulePushNotification(
                        //     {
                        //         title: "Its time to water your " + plant.name + " plant",
                        //         body: "Please water your plant"
                        //     },
                        //     {
                        //         minute: 2,
                        //     },
                        //     true,
                        // );
                        dispatch(removePlantProfile(plant))
                        navigation.navigate("Home" )
                        console.log("remove plant");
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2, }}>Remove Plant</Text>

                    {/* <Image
                        source={icons.chevron}
                        resizeMode="contain"
                        style={{
                            marginLeft: SIZES.padding,
                            width: 20,
                            height: 20
                        }}
                    /> */}
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Banner Photo */}
            <View style={{ height: "35%" }}>
                <Image
                    source={{ uri: plant.image }}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </View>
            {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
<FontAwesome5 name="camera" size={25} color="orange" />
</TouchableOpacity> */}

            {/* Requirements */}
            <View
                style={{
                    flex: 1,
                    marginTop: -40,
                    marginBottom:-45,
                    backgroundColor: COLORS.lightGray,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    paddingVertical: SIZES.padding,
                    
                }}
            >
                <Text style={{ paddingHorizontal: SIZES.padding, color: COLORS.secondary, ...FONTS.h1,  }}>Requirements</Text>

                <TouchableOpacity
                            style={{ width: 40, height: 40, alignItems: 'center', justifyContent:'space-around', borderRadius: 20, alignSelf:'flex-end' }}
                            onPress={() =>{
                                navigation.navigate("AddNewPlant",) }
                            } 
                        >
                            <Image
                                source={icons.edit}
                                resizeMode="contain"
                                style={{
                                    alignSelf:'flex-end',
                                    right:0,                                    
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>
                    

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
    }
})

export default PlantDetail;
