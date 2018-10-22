
import React, { Component } from 'react';
import {
  View,
  WebView, 
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
//import units from './Viewport';

import CookieManager from 'react-native-cookies';
import Loader from 'react-native-frog-loader';

var {width, height} = Dimensions.get('window');

var units = {
  vw: Dimensions.get('window').width/100
, vh: height/100
};

units.vmin = Math.min(units.vw, units.vh);
units.vmax = Math.max(units.vw, units.vh);


class AuthWebView extends Component {
    state = {
      cookies    : {},
      webViewUrl : ''
    }

    constructor(props){
        super(props);
        // console.log(this.props.schoolUrl);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.state = {'loading':true};
        CookieManager.clearAll();
        //console.log(units.vw);
    }
    hideLoader = () => {
      console.log('loader');
      this.setState({'loading' : false});
    }
  
    onNavigationStateChange = (webViewState) => {
      const { url } = webViewState;
      console.log('url is :'+url);
  
      if(url.includes('http')) {
        this.setState({ webViewUrl: url })
      }

  
      const check = "//success"; //"app/os";
      console.log('index'+url.indexOf(check));
      if(url.indexOf(check) > 0){
        // this.props.navigation.pop();
        // CookieManager.get(url).then((res) => {
        //   // console.log('CookieManager.get =>', res.frogos_auth);
        //   SharedStorage.storeFrogAuth(res.frogos_auth);

        //   this.props.onTokenReceived();
        // });
      }
    }
  
    render() {
        // const url = this.props.schoolUrl + "/app/mobileapplogout";
      return (
        <View style={{flex: 1}}>
          <WebView
             onLoad={this.hideLoader}
            source={{ uri: this.props.schoolUrl }}
            onNavigationStateChange={this.onNavigationStateChange}
            onMessage={this._onMessage}
            javaScriptEnabled={true}
            // injectedJavaScript={`console.log('hello');`}
            mixedContentMode={'compatibility'}
            thirdPartyCookiesEnabled={true}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => this.props.closeAuthWebView() }>
            <Image source={require('./images/ic_close_white.png')} resizeMode='contain' style={styles.closeButtonIcon} />
          </TouchableOpacity>
          <Loader show={this.state.loading}></Loader>
        </View>
      );
    }
  }
  
  export default AuthWebView;

  const styles = StyleSheet.create({
    closeButton: {
      backgroundColor: '#D31246',
      // padding:10,
      width: 15*units.vw,
      height:15*units.vw,
      position: 'absolute',
      right:0,
      top:0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    closeButtonIcon: {
      width: 8*units.vw,
      height:8*units.vw,
    }
  });