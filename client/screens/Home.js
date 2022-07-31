
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    Pressable
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
        

        <View style={styles.container}>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    } }>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate("AddNewPlant")
                                    // dispatch(loadState({plantProfiles: [], myPlants:[]}));
                                }}>
                                <Text style={styles.textStyle}>Add New Plant</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate("AddPlant")
                                }}>
                                <Text style={styles.textStyle}>Add Existing Plant</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>
                {/* New Plants */}
                <View style={{ height: "30%", backgroundColor: COLORS.white }}>
                    <View style={{
                        flex: 1,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
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
                                    setModalVisible(true)
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

                        <View style={{ alignItems:'center', flex:2, marginHorizontal: SIZES.padding }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', alignSelf:'flex-start' }}>
                                <Text style ={{ color: COLORS.white, ...FONTS.h2, }}>"If you have a garden and a library, you have everything you need". </Text> 
                            </View>
                            <View>
                                <View>                         
                                    <Text style ={{ color: COLORS.white, ...FONTS.h3,  textAlign:'right' }}> – Marcus Tullius Cicero</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                </View>


                {/* feed */}
                <View style={{ height: "60%", backgroundColor: COLORS.lightGray }}>
                    <View style={{
                        flex: 1,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: COLORS.white
                    }}>

                        <MyPlants navigation={navigation} />

                    </View>
                </View>



                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <FooterTabs />
                </View>
            </View>
                  
           
    );
};

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
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

    container: {
        flex: 1,
    },
});


export default Home;
