
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
import Swiper from 'react-native-swiper';


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
                            <View>

                                <Swiper style={styles.wrapper} showsButtons={false} autoplay = { true}>
                                    <View style={styles.slide1}>
                                        <Text style={styles.text}>Remember that children, marriages, and flower gardens reflect the kind of care they get.</Text>
                                    </View>
                                    <View style={styles.slide2}>
                                        <Text style={styles.text}>Gardens are not made by singing "Oh, how beautiful," and sitting in the shade.</Text>
                                    </View>
                                    <View style={styles.slide3}>
                                        <Text style={styles.text}>Trees and plants always look like the people they live with, somehow.</Text>
                                    </View>
                                </Swiper>


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
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor: 'red',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor: '#92BB',
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    }
});


export default Home;