import React from 'react';
import { Components } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import testimony from './testimony.json'

export default class App extends React.Component {
  render() {

    // return(
    //   <View style={styles.container}>   
    //     {testimony["testimonials"].map((item) => (
    //       <View>
    //         <Text>{item.lat}</Text>
    //         <Text>{item.long}</Text>
    //         <Text>{item.testimony}</Text>
    //         <Text>{"\n"}</Text>
    //       </View>
    //   ))}

    //   </View>

    // )


    return (
      //<View style={styles.container}>  
      <Expo.MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {testimony["testimonials"].map((item) => {
        console.log(item)
          return <Expo.MapView.Marker
              //key={marker.key}
              coordinate={{
                latitude: item.lat,
                longitude: item.long
              }}
              //pinColor={marker.color}
          />
      })}
      </Expo.MapView>
      //</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
