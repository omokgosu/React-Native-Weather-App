import * as Location from 'expo-location';
import React, {useEffect, useState} from 'react';
import { StyleSheet , View , Text, ScrollView, Dimensions} from 'react-native';


const {height: SCREENT_HEIGHT , width: SCREENT_WIDTH} = Dimensions.get('window');

export default function App() {
  const [city , setCity] =  useState('...Loading')
  const [loacation , setLocation] = useState();
  const [ok , setOk] = useState(true);
  const ask = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    console.log(granted)
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude , longitude} } = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude} , {useGoogleMaps: false});
    setCity(location[0].city)
  }

  useEffect(()=> {
    ask();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        horizontal 
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'tomato'
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName:{
    fontSize: 68,
    fontWeight: "500"
  },
  weather:{
  },
  day: {
    width: SCREENT_WIDTH,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description:{
    marginTop: -30,
    fontSize: 60
  }
})

