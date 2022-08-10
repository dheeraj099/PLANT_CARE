
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
    Animated
} from 'react-native';


import MarqueeText from 'react-native-marquee';
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
            <View style={{ height: "20%", backgroundColor: COLORS.white, }}>
                <View style={{
                    flex: 1,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: COLORS.primary,
                }}>



                    <View style={{ alignItems: 'center', flex: 2, marginHorizontal: SIZES.padding, marginTop: 60 }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            
                                <Text style={{ color: COLORS.white, ...FONTS.h2, textAlign: "center" }}>"If you have a garden and a library, you have everything you need" </Text>
                               
                                </View>
                        <View>
                            <View>
                           
                           
                                <Text style={{ color: COLORS.white, ...FONTS.h3, textAlign: 'right', paddingLeft: 110 }}> – Marcus Tullius Cicero</Text>
                             

                                </View>
                        </View>
                    </View>

                </View>

            </View>



            <View style={{
                // marginBottom:-100,
                flex: 8,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: "white",
                maxWidth: "100%"
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
