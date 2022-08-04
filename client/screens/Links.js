import React from "react";
import { SafeAreaView, View, Image } from "react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";

export default function Post() {
    return (
        <View style={{ flex: 1, }}>
            <Image source={{ uri: "https://www.seekpng.com/png/detail/23-231683_under-construction-png-file-under-construction-tape-png.png" }} style={{ width: 405, height: 200, alignSelf:'center', top:230 }} />
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterTabs />
            </View>
        </View>
    );
}