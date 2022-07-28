import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import  Text  from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "react-native-elements";

export const Tab = ({name, text, handlePress, ScreenName, routeName}) => {
const activeScreenColor = ScreenName === routeName && 'orange';
    return (
        
        <TouchableOpacity onPress={handlePress}>
            
            <FontAwesome5 
                name={name} 
                size={25} 
                style ={{
                    marginBottom: 3,
                    alignSelf: "center",
                }}                    
                color={activeScreenColor}
            />
            <Text>{text}</Text>            
        </TouchableOpacity>
        
    )
}

export default function FooterTabs() {
    const navigation = useNavigation();
    const route = useRoute();


    return (
      <>
        <Divider width={1}/>   
        <View 
            style= {{
                flexDirection:"row",
                margin: 10,
                marginHorizontal: 30,
                justifyContent:"space-between",
            }}
        >
            <Tab 
                text="Home" 
                name="home" 
                handlePress={() => navigation.navigate("Home")}
                ScreenName="Home"
                routeName={route.name}
            />
            
            <Tab 
                text="Posts" 
                name="plus-square" 
                handlePress={() => navigation.navigate("Post")}
                ScreenName="Post"
                routeName={route.name}
            />
            <Tab 
                text="Scan" 
                name="list-ol" 
                handlePress={() => navigation.navigate("Links")}
                ScreenName="Links"
                routeName={route.name}
            />
            <Tab 
                text="Account" 
                name="user" 
                handlePress={() => navigation.navigate("Account")}
                ScreenName="Account"
                routeName={route.name}
            />           
        </View>
        </>
    );
}