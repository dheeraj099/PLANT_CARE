
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    Pressable,
    ScrollView,
} from 'react-native';


import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import FooterTabs from "../components/nav/FooterTabs";
import MyPlants from './MyPlants';
import * as Font from 'expo-font';
import { useState } from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const Home = ({ navigation }) => {


    const [modalVisible, setModalVisible] = useState(false);

    return (


        <View style={styles.homeContainer}>
            {/* New Plants */}
            <View style={{ height: "20%", backgroundColor: COLORS.white }}>
                <View style={{
                    flex: 1,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: COLORS.primary,
                }}>

                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
                        <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}></Text>
                        <TouchableOpacity
                            style={{
                                marginLeft: SIZES.base,
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.gray,
                            }}
                            onPress={() => {
                                console.log("Clicked on add plant")
                                navigation.navigate("AddNewPlant")
                            }}>


                            <Image
                                source={icons.plus}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20
                                }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', flex: 2, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', alignSelf: 'flex-start' }}>
                            <Text style={{ color: COLORS.white, ...FONTS.h2, }}>"If you have a garden and a library, you have everything you need". </Text>
                        </View>
                        <View>
                            <View>
                                <Text style={{ color: COLORS.white, ...FONTS.h3, textAlign: 'right' }}> – Marcus Tullius Cicero</Text>
                            </View>
                        </View>
                    </View>

                </View>

            </View>


         
                <View style={{
                    // marginBottom:-100,
                    flex: 7.5,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: "white"
                }}>

                    <MyPlants navigation={navigation} />

                </View>
          


            {/* footer */}
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterTabs />
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
    },
});


export default Home;
