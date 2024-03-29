import React from "react";
import { View, TextInput } from "react-native";
import Text from "@kaloraat/react-native-text";

const UserInput = ({
    name, 
    value, 
    setValue, 
    autoCapitalize = "none",  
    keyboardType = "default", 
    secureTextEntry = false,
    placeholder="placeholder"
}) => {
    return (
            <View style={{marginHorizontal: 24 }}>
                <Text semi>{name}</Text>
                <TextInput
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry} 
                placeholder={placeholder}
                
                style={{
                    borderBottomWidth: 0.5,
                    height: 40,
                    fontSize:20,
                    // color:"gray",
                    borderBottomColor: '#8e93a1',
                    marginBottom: 30,
                    
                 
                    
                }}
                value={value}
                onChangeText={(Text) => setValue(Text)}
                />
            </View>
            
    );
};

export default UserInput;