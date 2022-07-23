import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Item({ item }) {
    const navigation = useNavigation();
  return (
    <View style={styles.listItem}>
      <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        <Text>{item.position}</Text>
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPressIn={() => { navigation.navigate("SelectPlant",) }}> 
        <Text style={{color:"green"}}>select</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class App extends React.Component {
  state = {
    data:[
        {
            "name": "Tomato",
            "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1024px-Tomato_je.jpg"
        },
        {
            "name": "cabbage",
            "photo": "https://media.istockphoto.com/photos/green-cabbage-isolated-on-white-picture-id673162168?k=20&m=673162168&s=612x612&w=0&h=3QKF6zzzCAUL3pKxW6kVbZ7lUt1JUY_SchOUMyOHwhs="
        },
        {
            "name": "Onion",
            "photo": "https://produits.bienmanger.com/36700-0w470h470_Organic_Red_Onion_From_Italy.jpg"
        },
        {
            "name": "carrot",
            "photo": "https://m.media-amazon.com/images/I/710EvtgG++L._SX466_.jpg"
        },
        {
            "name": "beetroot",
            "photo": "https://m.media-amazon.com/images/I/616PXhYj8iL._SL1000_.jpg"
        },
        {
            "name": "watermelon",
            "photo": "https://www.gardeningknowhow.com/wp-content/uploads/2021/05/whole-and-slices-watermelon.jpg"
        },
        {
            "name": "pappaya",
            "photo": "https://www.freshclick.in/wp-content/uploads/2021/08/Fresh-Click-Ripe-pappaya-fruit.png"
        },
        {
            "name": "spinach",
            "photo": "https://www.bigbasket.com/media/uploads/p/l/40138448_3-fresho-baby-spinach.jpg"
        },
        {
            "name": "chilly",
            "photo": "https://5.imimg.com/data5/MP/BJ/MY-43969551/green-chilly-500x500.png"
        },
        {
            "name": "cucumber",
            "photo": "https://m.media-amazon.com/images/I/41ahL7oF4QL.jpg"
        }
    ]
  }


  render(){
    return (
      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={({ item }) => <Item item={item}/>}
          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:60
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});