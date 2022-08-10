import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import { AuthContext } from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';


const MyPlants = ({ navigation }) => {

    const [state, dispatch] = useContext(AuthContext);

    // Render

    function renderNewPlants(item, index) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: SIZES.base }}>
                <TouchableOpacity delayPressIn={1000} onPressIn={() => { navigation.navigate("SelectPlant", { plant: item }) }}>
                    <Image
                        source={{ uri: item.image }}
                        resizeMode="cover"
                        style={{
                            width: SIZES.width * 0.85,
                            height: SIZES.height * 0.25,
                            borderRadius: 0
                        }}
                    />

                    <View
                        style={{
                            // position: 'absolute',
                            // bottom: '100%',
                            // right: 0,
                            backgroundColor: COLORS.primary,
                            paddingHorizontal: SIZES.base,
                            borderRadius: 0,
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>NAME : {item.name}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>WATER : {item.water}</Text>
                        {/* <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Fertilizer:{item.soil}</Text> */}
                    </View>
                </TouchableOpacity>



            </View>
        )
    }

    
    return (

        <View style={{ marginHorizontal: SIZES.padding }}>



            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop:-20, maxWidth:"100%"}}>
                <Text style={{ color: COLORS.secondary, ...FONTS.h1, }}>{'\n'}MY PLANTS</Text>
            </View>

            <View style={{ overflow: 'scroll', maxHeight: 520,}}>
                



                <FlatList
                 style={{
                    height:"100%",  
                    width:"100%"        
                  }}  
                    // style={{backgroundColor: COLORS.black}}
                    // horizontal
                    // showsHorizontalScrollIndicator={false}
                    
                    showsVerticalScrollIndicator={false}
                    data={state.plantProfiles}
                    renderItem={({ item, index }) => renderNewPlants(item, index)}
                    keyExtractor={item => item.name} />
            </View>

            <View style={{ flexDirection: "row", flex: 1, justifyContent:"flex-end",}}>
                        <TouchableOpacity
                            style={{
                                marginRight: -20,                                
                                marginTop:-40,
                                width: 55,
                                height: 55,
                                borderRadius: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "#FF8C00",
                                
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
                                    height: 20,                            
                                }} />
                        </TouchableOpacity>
                    </View>

                
        </View>
        


    )
}

const styles = StyleSheet.create({ 

    container: {
        flex: 1,
    },
});



export default MyPlants;