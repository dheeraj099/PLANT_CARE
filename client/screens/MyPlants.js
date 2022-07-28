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


// const initialMyPlants = [
        
//     {
//         id: 0,
//         name: "Plant 1",
//         img: images.plant1,         
    
    
        
//     },
//     {
//         id: 1,
//         name: "Plant 2",
//         img: images.plant2,
        
//     },
//     {
//         id: 2,
//         name: "Plant 3",
//         img: images.plant3,
    
//     },
//     {
//         id: 3,
//         name: "Plant 4",
//         img: images.plant4,
        
//     },
// ];

const MyPlants = () => {

    const [state, dispatch] = useContext(AuthContext);

    // Render

    function renderNewPlants(item, index) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: SIZES.base }}>
                <Image
                    source={{ uri: item.image }}
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

                    <View style={{ alignItems:'center', flex:2, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', alignSelf:'flex-start' }}>
                             <Text style ={{ color: COLORS.white, ...FONTS.h2, }}>"If you have a garden and a library, you have everything you need". </Text> 
                        </View>
                       <View>
                        <View>                         
                        <Text style ={{ color: COLORS.white, ...FONTS.h3,  textAlign:'right' }}> – Marcus Tullius Cicero</Text>
                    </View>
                    </View>

                        <View style={{ marginTop: SIZES.base }}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={state.myPlants}
                                keyExtractor={item => item.name}
                                renderItem={({ item, index }) => renderNewPlants(item, index)}
                            />                  
      
                       
                    </View>  
                    </View>
    )
}
export default MyPlants;