import React from 'react';
import { Components } from 'expo';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput} from 'react-native';
import { MapView } from 'expo';
import { Button } from 'react-native-elements';
import testimony from './testimony.json'
import Modal from 'react-native-modal'

import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyBkB_MKN6sshXV2H8PZRjyH2ABvcu4FBC4');

export default class App extends React.Component {
  
  state = {
    markers: [],
    modalVisible: false,
    placeName: '',
    testimony: '', 
    addr: ''
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={{height: 40}}>Add testimony</Text>

      <TextInput 
        style={styles.input}
        placeholder="Name of Place" 
        returnKeyLabel = {"placeName"}
        onChangeText={(text) => this.setState({placeName : text})}
        />
      <TextInput 
        style={styles.input}
        placeholder="Address" 
        returnKeyLabel = {"addr"}
        onChangeText={(text) => this.setState({addr: text})}
        />
      <TextInput 
        style={styles.input} 
        placeholder="Personal Testimony" 
        returnKeyLabel = {"testimony"}
        onChangeText={(text) => this.setState({testimony: text})}
        />

      {this._renderButton('Submit', this._submitTestimony)}
      {this._renderButton('Cancel', this._hideModal)}
    </View>
  );

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.modalButton}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _handlePress = (event)=>{
    console.log("got clicked1");
    this._showModal()
  }

  _submitTestimony = (event)=>{
    console.log("Testimony submitted");
    console.log(this.state.placeName)
    console.log(this.state.addr)
    console.log(this.state.testimony)
    
    this._hideModal()

    Geocoder.getFromLocation(this.state.addr).then(json => {
        var location = json.results[0].geometry.location;
        console.log(location)
        this.setState({
          markers: [... this.state.markers,
                {
                coordinate:{latitude: location.lat,
                longitude: location.lng},
                title: this.state.placeName,
                description: this.state.testimony
              }
             ]
        });
      },
      error => {
        alert(error);
      }
      )

    this.setState({
      markers: [... this.state.markers,
            {
            coordinate:{latitude: 37.78825,
            longitude: -122.4324},
            title: this.state.placeName,
            description: this.state.testimony
          }
         ]
    });
  } 
  
  render() {

    return (
      <View style={styles.container}>  

      <Modal isVisible={this.state.isModalVisible}>
          {this._renderModalContent()}
      </Modal>

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
  },
  modalButton: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    textAlign: 'center'
  }
});
