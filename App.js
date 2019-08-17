'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {ToastAndroid} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import {PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import ShowClickedImageComponent from './components/ShowClickedImageComponent';

export default class App extends PureComponent {
constructor(props){
  super(props);
  this.state = {
    cameraPosition : 1,      // 0 for front , 1 for back
    flash : "OFF",
    flashCount : 0,          // 0:OFF,1:ON,2:AUTO,3:TORCH
    clickedImageUri :"",
    // showImage:false     
  }
  this.flipCamera = this.flipCamera.bind(this);
  this.takePicture = this.takePicture.bind(this);
  this.handleFlash = this.handleFlash.bind(this);
  this.showSettings = this.showSettings.bind(this);
  this.showClickedImages = this.showClickedImages.bind(this);

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Ocr App Camera Permission',
        message:
          'Ocr App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
// for storage read
async function requestStorageReadPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Ocr App Storage read Permission',
        message:
          'Ocr App needs access to your storage for read',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Ocr App for reading');
    } else {
      console.log('Read permission denied');
    } 
  } catch (err) {
    console.warn(err);
  }
}
// for Storage Write 
async function requestStorageWritePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Ocr App Storage Write Permission',
        message:
          'Ocr App needs access to your storage for Write ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Ocr App for writting.');
    } else {
      console.log('Write permission denied.');
    }
  } catch (err) {
    console.warn(err);
  }
}
// call for permision grant
if (Platform.OS === 'android') {
  requestCameraPermission();      // camera
  requestStorageReadPermission(); // for storage read
  requestStorageWritePermission(); // for storage write
}else{
  alert('Android  device NOT found');
}

}


flipCamera(){
  console.log("Flipping the camera mode");
  var bool1 = this.state.cameraPosition;
  this.setState({
    cameraPosition:!bool1
  }); 
}
handleFlash() {
  //alert("handle flash");
  var flashCount = this.state.flashCount+1;
  flashCount = flashCount%4;

  this.setState({flashCount:flashCount});

  if(flashCount==0){
    this.setState({flash:"OFF"});
  }
  else if(flashCount == 1){
    this.setState({flash:"ON"});
  }
  else if(flashCount==2){
    this.setState({flash:"AUTO"});
  }
  else if(flashCount==3){
    this.setState({flash:"TORCH"});
  }

}
showSettings() {
  alert("Image,Text Recognition, Bar code scanning,etc. Comming in Next version");

}
showClickedImages(){
  alert("showing Images , comming in  Next version");
  // alert("clicked Image Uri : " + this.state.clickedImageUri);
  // if(this.state.clickedImageUri!=""){
  //   this.setState({showImage:true});
  // }
  // else this.setState({showImage:false});
  
}

  render() {
    
    var typeCamera = this.state.cameraPosition?RNCamera.Constants.Type.back:RNCamera.Constants.Type.front;
    
    var flashMode = "";
    if(this.state.flashCount==0){
      flashMode = RNCamera.Constants.FlashMode.off;
      
    }
    else if(this.state.flashCount==1){
      flashMode = RNCamera.Constants.FlashMode.on;
    }
    else if(this.state.flashCount==2){
      flashMode = RNCamera.Constants.FlashMode.auto;
      // alert("auto : " + flashMode);
    }
    else if(this.state.flashCount==3){
      flashMode = RNCamera.Constants.FlashMode.torch;
    }
    
    return (
      
      <View style={styles.container}>
       <View style={{margin:10, flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
       
       <TouchableOpacity style={styles.refresh}>
            <Icon.Button
              name="flash"
              size = {30}
              backgroundColor="black"
              onPress={this.handleFlash}
            >
            {this.state.flash}
            </Icon.Button>

          </TouchableOpacity>
      <TouchableOpacity style={styles.refresh}>
            <Icon.Button
              name="gear"
              size = {30}
              backgroundColor="black"
              onPress={this.showSettings}
            >
            </Icon.Button>
          </TouchableOpacity>
        
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={typeCamera}
          flashMode = {flashMode}
         
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
     
      
      <View style={{margin:20, flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity style={styles.refresh}>
            <Icon.Button
              name="circle"
              size = {50}
              backgroundColor="black"
              onPress={this.showClickedImages}
            >
            </Icon.Button>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.capture}>
            <Icon.Button
            name="camera"
            size = {60}
            backgroundColor="black"
            onPress={this.takePicture}
            >
            </Icon.Button>
          </TouchableOpacity>
      
        <TouchableOpacity  style={styles.refresh}>
            <Icon.Button
              name="refresh"
              size = {40}
              backgroundColor="black"
              onPress={this.flipCamera}
            >
            </Icon.Button>
          </TouchableOpacity>
         
         
        </View>

        
       
      </View> 
    );
  }

  takePicture = async() => {
    
    if (this.camera) {
  
 /**TODO: save clicked image into Folder of phone  */
 const options = { quality: 0.5};
 const data = await this.camera.takePictureAsync(options).then(data => {
   ToastAndroid.show(data.uri, ToastAndroid.SHORT);
   CameraRoll.saveToCameraRoll(data.uri);
   
   this.setState({clickedImageUri:data.uri}); // save clicked image uri to preview

   console.log("clicked Image Data : " + data);
   console.log("clicked Image URI : " + data.uri); 

 });
} 
    
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  refresh: {
    flex: 0,
   // backgroundColor: '#fff',
    borderRadius: 60,
    padding: 20,
   // paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
  capture: {
    flex: 0,
    // backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
  },
});