import React from 'react';
import { Components } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import { Button } from 'react-native-elements';
import testimony from './testimony.json'

export default class App extends React.Component {
  
  state = {
  markers: []
  }

  _handlePress = (event)=>{
    console.log("got clicked1");
    this.setState({
      markers: [... this.state.markers,
            {
            coordinate:{latitude: 37.78825,
            longitude: -122.4324},
            title:"title",
            description:"description"
          }
         ]
    });
  }
  
  render() {

    return (
      <View style={styles.container}>  

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

      {testimony["testimonials"].map((item) => {
          return <MapView.Marker
              coordinate={{
                latitude: item.lat,
                longitude: item.long
                }}
                title={item.title}
                description= {item.description}
          />
      })}

      {this.state.markers.map(function(element){
      return <MapView.Marker
        {...element}
        onPress={function(){
          console.log("tapp marker")
        }}
      />
      })}

      </MapView>

       <Button
          raised
          icon={{name: 'home', size: 32}}
          buttonStyle={styles.button}
          textStyle={{textAlign: 'center'}}
          title={`Add checkpoint`}
          onPress={this._handlePress}
        />
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 10,
    top:10,
    position: 'relative',
    zIndex:1
  }
});
