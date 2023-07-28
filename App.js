import * as Location from 'expo-location';
import React, {useEffect, useState} from 'react';
import { StyleSheet , View , Text, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import { Fontisto } from '@expo/vector-icons';


const {height: SCREENT_HEIGHT , width: SCREENT_WIDTH} = Dimensions.get('window');
const API_KEY = "6f85cc7989e2ea3fc7eaeb8c7edb12e9";
const Icons =
{
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city , setCity] =  useState('...Loading');
  const [days, setDays] = useState([]);
  const [temp , setTemp] = useState('');
  const [description , setDescription] = useState('');
  const [ok , setOk] = useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude , longitude} } = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude} , {useGoogleMaps: false});
    setCity(location[0].city);
    const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    const json = await Response.json();
    setDays(json.weather[0].main);
    setTemp(parseFloat(json.main.temp).toFixed(1));
    setDescription(json.weather[0].description)
  }

  useEffect(()=> {
    getWeather();
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
          {
            days.length === 0 
            ?
            <View style={styles.day}>
              <ActivityIndicator color="white" size="large"/>
            </View>
            : (
              <>
                <View style={styles.day}>
                  <View 
                    style={{
                      flexDirection: 'row',
                      alignItems:"center",
                      width: '100%',
                      justifyContent: 'space-between'
                    }}>
                    <Text style={styles.temp}>{temp}</Text>
                    <Fontisto name={Icons[days]} size={68} color="white"/>
                  </View>
                  <Text style={styles.description}>{days}</Text>
                  <Text style={styles.tinyText}>{description}</Text>
                </View>
                <View style={styles.day}>
                  <View 
                    style={{
                      flexDirection: 'row',
                      alignItems:"center",
                      width: '100%',
                      justifyContent: 'space-between'
                    }}>
                    <Text style={styles.temp}>{temp}</Text>
                    <Fontisto name={Icons[days]} size={68} color="white"/>
                  </View>
                  <Text style={styles.description}>{days}</Text>
                  <Text style={styles.tinyText}>{description}</Text>
                </View>
              </>
            )
          }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName:{
    fontSize: 36,
    fontWeight: "500",
    color: 'white'
  },
  day: {
    width: SCREENT_WIDTH,
    alignItems: 'start',
    color: 'white',
    padding: 20
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    color: 'white'
  },
  description:{
    marginTop: -30,
    fontSize: 60,
    color: 'white'
  },
  tinyText:{
    fontSize: 20,
    color: 'white'
  }
})

