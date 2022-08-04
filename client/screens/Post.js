import React, { useState, useEffect,setState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TextInput,ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FooterTabs from '../components/nav/FooterTabs';
const Post = () => {
    const [searchInput, setSearchInput] = useState('');
    const [feed, setFeed] = useState([]);

    //getting our feed
    useEffect(() => {
        fetch('https://aurora-django-app.herokuapp.com/feed?feed_count=0')
        .then((re) =>re.json())
        .then((re) => {
            setFeed(re.response);
     

        })
        
        }, []);


    return (
        <View style={styles.mainView}>
            <Text style={styles.Heading}>Get To Know Your Plants</Text>
            <View style={styles.TextInputView}>
                <TextInput value={searchInput} onChangeText={(val) => setSearchInput(val)} placeholder={"Enter plant name"} placeholderTextColor={'#000'} style={styles.TextInput} />
            </View>
            

            <View style={styles.mainPostView}>
                {feed.length < 1?
                <ActivityIndicator size={"large"} color={"#2FBBF0"}/>
                :
                <FlatList                
                data={feed}                
                keyExtractor={(item,index) => {return item.post_id.toFixed()}}
                renderItem={({item,index}) =>(
                    <View style = {styles.postView}>
                        <View style={styles.postTitle}>
                            <View style={styles.imageView}>
                                <Image style={styles.artistPhoto} source={{uri:item.artist_photo}}/>
                                <View style={styles.titleView}>
                                    <Text style={styles.artist_name}>John</Text>
                                    <Text  style={styles.post_title}>Plant community</Text>

                                </View>
                                
                            </View>
                            <View>
                                <Icon name="options-vertical" color={"#989898"} />
                            </View>
                        </View>

                        <Image style={styles.cover_photo} source={{uri:item.cover_photo}} />
                    </View>
                )}
              />


                }



            </View>
            <View style = {styles.footer}></View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterTabs />
            </View>

        </View>
        

    )
}

export default Post;
const styles = StyleSheet.create({
    artist_name:{
        fontSize:16,
        fontWeight:'bold'
    },
    post_title: {
        fontSize:11,
        color:"#989898"

    },
    mainView: {
        flex: 1,
    },
    titleView: {
        marginLeft:15
        
    },
    Heading: {
        fontSize: 32,
        marginTop: 30,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    TextInput: {
        height: 39,
        width: '90%',
        backgroundColor: '#EBEBEB',
        borderRadius: 20,
        paddingLeft: 15,
        marginTop: 20
    },
    TextInputView: {
        display: 'flex',
        alignContent: 'center',
        paddingLeft: 20,
    },
    mainPostView: {
        width: '100%',
        height:"72%"
    },
    postTitle:{
        width:"90%",
        display:'flex',
        justifyContent:'space-between',
        alignItems:"center",
        flexDirection:'row',
        alignItems:'center'
    },
    postView: {
        width:'100%',
        alignItems:'center',
        marginTop:40
    },
    artistPhoto: {
        backgroundColor:'rgba(0,0,0,0.06)',
        width:50,
        height:50,
        borderRadius:50
    },
    imageView :{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    cover_photo :{
        width:'90%',
        height:200,
        backgroundColor:'rgba(0,0,0,0.06)'
    }   

})