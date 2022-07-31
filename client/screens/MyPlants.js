import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import { AuthContext } from '../context/auth';

const MyPlants = ({ navigation }) => {

    const [state, dispatch] = useContext(AuthContext);

    // Render

    function renderNewPlants(item, index) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: SIZES.base }}>
                <TouchableOpacity onPressIn={() => { navigation.navigate("SelectPlant", {plant:item}) }}> 
                    <Image
                        source={{ uri: item.image }}
                        resizeMode="cover"
                        style={{
                            width: SIZES.width * 0.25,
                            height: '80%',
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
                </TouchableOpacity>
                

                
            </View>
        )
    }
    return (

        <View style={{ marginTop: SIZES.font, marginHorizontal: SIZES.padding }}>


                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <Text style={{ color: COLORS.secondary, ...FONTS.h1, }}>{'\n'}MY PLANTS</Text>


                            </View>

                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={state.plantProfiles}
                                        keyExtractor={item => item.name}
                                        renderItem={({ item, index }) => renderNewPlants(item, index)}
                                    />


                                    {/* <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => { navigation.navigate("PlantDetail"); } }
                                    >
                                        <Image
                                            source={images.plant5}
                                            resizeMode="cover"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 20
                                            }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ flex: 1, marginTop: SIZES.font }}
                                        onPress={() => { navigation.navigate("PlantDetail"); } }
                                    >
                                        <Image
                                            source={images.plant6}
                                            resizeMode="cover"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 20
                                            }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1.3 }}>
                                    <TouchableOpacity
                                        style={{ flex: 1, marginLeft: SIZES.font }}
                                        onPress={() => { navigation.navigate("PlantDetail"); } }
                                    >
                                        <Image
                                            source={images.plant7}
                                            resizeMode="cover"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 20
                                            }} />
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>


                    // <View style={{ alignItems:'center', flex:2, marginHorizontal: SIZES.padding }}>
                    //     <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', alignSelf:'flex-start' }}>
                    //          <Text style ={{ color: COLORS.white, ...FONTS.h2, }}>"If you have a garden and a library, you have everything you need". </Text> 
                    //     </View>
                    //    <View>
                    //     <View>                         
                    //     <Text style ={{ color: COLORS.white, ...FONTS.h3,  textAlign:'right' }}> – Marcus Tullius Cicero</Text>
                    // </View>
                    // </View>

                    //     <View style={{ marginTop: SIZES.base }}>
                    //         <FlatList
                    //             horizontal
                    //             showsHorizontalScrollIndicator={false}
                    //             data={state.plantProfiles}
                    //             keyExtractor={item => item.name}
                    //             renderItem={({ item, index }) => renderNewPlants(item, index)}
                    //         />                  
      
                       
                    // </View>  
                    // </View>
    )
}
export default MyPlants;