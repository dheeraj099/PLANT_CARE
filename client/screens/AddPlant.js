import React, { useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/auth';

const AddPlant = ({navigation}) => {

  const [state, dispatch] = useContext(AuthContext);

  React.useEffect(
    () => {
      console.log("Loading add plant for state: " + JSON.stringify(state));
    },
    []
  );

  function Item({ item }) {
    return (
      <View style={styles.listItem}>
        <Image source={{uri:item.image}}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.position}</Text>
        </View>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} 
          onPressIn={() => { navigation.navigate("SelectPlant", {plant:item}) }}> 
          <Text style={{color:"green"}}>select</Text>
        </TouchableOpacity>
      </View>
    );
  }

    return (
      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={state.plantProfiles}
          renderItem={({ item }) => <Item item={item}/>}
          
        />
      </View>
    );
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

export default AddPlant;