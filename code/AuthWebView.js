
import React, { Component } from 'react';
import {
  View,
  WebView, 
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform
} from 'react-native';
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
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        CookieManager.clearAll();
    }
  
    onNavigationStateChange = (webViewState) => {
      const { url } = webViewState;
      console.log('url is :'+url);
  
      if(url.includes('http')) {
        this.setState({ webViewUrl: url })
      }

      const check = "//success"; //"app/os";
      if(url.indexOf(check) > 0){
        if(Platform.OS === "android"){
          this.props.onAuthSuccess(url);
        }
 
      }
    }
 _onloadWebView = () =>{
   this.setState({loading:true});
 }
 _loadEndWebView = () =>{
  this.setState({loading:false});
}
  
    render() {
    
      return (
        <View style={{flex: 1}}>
          <WebView
            source={{ uri: this.props.schoolUrl }}
            onLoad={this._onloadWebView}
            onLoadEnd={this._loadEndWebView}
            onNavigationStateChange={this.onNavigationStateChange}
            onMessage={this._onMessage}
            javaScriptEnabled={true}
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
      width: 50,
      height:50,
      position: 'absolute',
      right:0,
      top:0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    closeButtonIcon: {
      width: 28,
      height:28,
    }
  });
