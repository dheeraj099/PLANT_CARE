
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import FooterTabs from "../components/nav/FooterTabs";
const Home = ({ navigation }) => {

    // Dummy Data
    const [newPlants, setNewPlants] = React.useState([
        
        {
            id: 0,
            name: "Plant 1",
            img: images.plant1,         
         
           
            
        },
        {
            id: 1,
            name: "Plant 2",
            img: images.plant2,
            
        },
        {
            id: 2,
            name: "Plant 3",
            img: images.plant3,
           
        },
        {
            id: 3,
            name: "Plant 4",
            img: images.plant4,
            
        },
    ]);

    React.useEffect(() => {
    }, []);

    // Render

    function renderNewPlants(item, index) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: SIZES.base }}>
                <Image
                    source={item.img}
                    resizeMode="cover"
                    style={{
                        width: SIZES.width * 0.23,
                        height: '82%',
                        borderRadius: 15
                    }}
                />

                <View
                    style={{
                        position: 'absolute',
                        bottom: '17%',
                        right: 0,
                        backgroundColor: COLORS.primary,
                        paddingHorizontal: SIZES.base,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{item.name}</Text>
                </View>

                
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* New Plants */}
            <View style={{ height: "30%", backgroundColor: COLORS.white }}>
                <View style={{
                    flex:9,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    backgroundColor: COLORS.primary,
                    
                    
                }}>
                    
                    <View style={{ marginTop: SIZES.padding * 2, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: COLORS.white, ...FONTS.h2, }}>My Plants</Text> 
                                               
                    </View>
     

                        <View style={{ marginTop: SIZES.base }}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={newPlants}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item, index }) => renderNewPlants(item, index)}
                            />                  
      
                       
                    </View>  
                  
                    </View>
                                              
                </View>   
                <View style={{ flex:1}}>
                        <TouchableOpacity
                            style={{ flex: 9 }}
                            onPress={() => { navigation.navigate("Account") }}>
                        </TouchableOpacity>    
                </View>            
            </View>
            

            {/* feed */}
            <View style={{ height: "50%", backgroundColor: COLORS.lightGray }}>
                <View style={{
                    flex: 1,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    backgroundColor: COLORS.white
                }}>
                    <View style={{ marginTop: SIZES.font, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: COLORS.secondary, ...FONTS.h2, }}>Feed</Text>

                            
                        </View>

                        <View style={{ flexDirection: 'row', height: "88%", marginTop: SIZES.base }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => { navigation.navigate("PlantDetail") }}
                                >
                                    <Image
                                        source={images.plant5}
                                        resizeMode="cover"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flex: 1, marginTop: SIZES.font }}
                                    onPress={() => { navigation.navigate("PlantDetail") }}
                                >
                                    <Image
                                        source={images.plant6}
                                        resizeMode="cover"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1.3 }}>
                                <TouchableOpacity
                                    style={{ flex: 1, marginLeft: SIZES.font }}
                                    onPress={() => { navigation.navigate("PlantDetail") }}
                                >
                                    <Image
                                        source={images.plant7}
                                        resizeMode="cover"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

                       

                            {/* Add Friend */}
                            <View style={{ flexDirection:"row", flex:1, justifyContent: "flex-end" }}>
                                <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>Add New Plant</Text>
                                <TouchableOpacity
                                    style={{
                                        marginLeft: SIZES.base,
                                        width: 40,
                                        height: 40,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: COLORS.gray
                                    }}
                                    onPress={() => navigation.navigate("AddPlant")}
                                >
                                    <Image
                                        source={icons.plus}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    </TouchableOpacity>
                            </View>
                            <View style={{flex:1, justifyContent: "flex-end"}}>
                <FooterTabs />
            </View>
                        </View>
                  
           
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Home;
