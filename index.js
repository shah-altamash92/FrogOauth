/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Linking,BackHandler,TextInput,Image} from 'react-native';
import AuthWebView from './code/AuthWebView'
import {oauth,oauth1,oauth2} from './code/auth';
import {EndpointValidate} from './code/endpointValidate';
import globalStyles from './code/styles';

type Props = {};
const token = {
  key: 'a16e6a6de547886d29c809521946423e56b70a2d',
  secret: '8de9fcd76fc0818a1485245a1c6b1b6fefe06f90'
};


export default class Oauth extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
        schoolUrl: 'rsystemsprogressrel1.frogtest.co.uk',
        redirectUrl: '',
        doHaveToken: false,
        loadWebView: false,
        loading: false,
        isBottomVisible: true,
    }

    this.generateTokenSignature = this.generateTokenSignature.bind(this);
    ///this.callAccessApi = this.callAccessApi.bind(this);
    // console.log(this.state.loadWebView);       
    
    // this.demoAuth();
}
  _closeAuthWebView =() => {
    this.setState({
        loadWebView: false,
    });
}
showBottomLayout=()=>{
    this.setState({
        isBottomVisible: true
    })
}

hideBottomLayout=()=>{
    this.setState({
        isBottomVisible: false
    })
}
 componentDidMount(){
  // getRequestToken1('https://rsystemsprogressrel1.frogtest.co.uk');
    // getCurrentTime1('https://rsystemsprogressrel1.frogtest.co.uk').then(currentTime => {
    //   console.log('The current time is12334: ' + currentTime);
    //   return true;
    // })
    // .catch(err => console.log('There was an error:' + err))
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        Linking.addEventListener('url', this.handleURL.bind(this));

    Linking.getInitialURL().then((url) => {
        console.log(url);
        if (url) {
            console.log('Initial url is: ' + url);

            // SharedStorage.retrieveFrogAuth().then((res) => {
            //     if(!res){
            //         this.showLoading();
            //         // Toast.show('Authenticating user', Toast.SHORT);
            //         this._handleOpenURL(url);
            //     }
            //     // else{
            //     //     this.checkIfUserAlreadyLogin();
            //     // }
            // })
        }
        else{
            this.checkIfUserAlreadyLogin();
        }
    }).catch(err => console.log('An error occurred', err));
}
handleURL(event) {
    console.log('****mount called');
    console.log(event.url);

    if (event.url) {
        console.log('Initial url is: ' + event.url);
        this._handleOpenURL(event.url);
        // SharedStorage.retrieveFrogAuth().then((res) => {
        //     if(!res){
        //         // Toast.show('Authenticating user', Toast.SHORT);
        //         this._handleOpenURL(event.url);
        //     }
        //     else{
        //         this.checkIfUserAlreadyLogin();
        //     }
        // })
    }
    else{
        this.checkIfUserAlreadyLogin();
    }
}
_handleOpenURL(url) {
    console.log(url);
    var urlParams = decodeURIComponent(url.substring(url.indexOf('?') + 1))
    console.log('handleOpenURL url is: ' + urlParams);
    var authParams = JSON.parse('{"' + (urlParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    // this.setState({ callbackURl: authParams })
    console.log(authParams);

    this.props.getOuthData(authParams);
    console.log('secret :'+this.state.oauth_token_secret );
    console.log('schoolUrl :'+this.state.schoolUrl );
    
    if (this.state.oauth_token_secret && this.state.oauth_token_secret.length > 0) {
         this.callAccessApi('http://'+this.state.schoolUrl, this.state.oauth_token_secret, authParams)
        }

    // SharedStorage.retrieveSchoolUrl().then((res) => {
    //     if (res && res.length > 0) {
    //         // console.log(res);
    //         SharedStorage.retrieveOAuthSecret().then((secret) => {
    //             if (secret && secret.length > 0) {
    //                 this.callAccessApi(res, secret, authParams)
    //             }
    //         });
    //     }
    //     else{
    //         this.showBottomLayout
    //     }
    // });
    // do something with the url, in our case navigate(route)
    this._closeAuthWebView();
}

callAccessApi = (schoolUrl, secret, authParams) => {
    _this = this;
    const token = {
        key: authParams.oauth_token,
        secret: secret
    };

    // console.log ('Initial url is: ' + this.state.callbackURl)
    // const callbackUrl = this.state.callbackURl
    const request_data = {
        url: schoolUrl + '/api/2/oauth1.php/access-token',
        method: 'POST',
        data: { oauth_token: authParams.oauth_token, oauth_verifier: authParams.oauth_verifier, oauth_secret: secret }
    };

    console.log('Secret:' + secret);
    console.log('schoolUrl:' + schoolUrl);
    params = oauth1.authorize(request_data, token);
    // params.oauth_token = authParams.oauth_token;
    // params.oauth_verifier = authParams.oauth_verifier;
    console.log(params);

    query = "OAuth oauth_consumer_key=\"" + params.oauth_consumer_key + "\", oauth_nonce=\"" + params.oauth_nonce + "\", oauth_signature=\"" + params.oauth_signature + "\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"" + params.oauth_timestamp + "\", oauth_token=\"" + params.oauth_token + "\", oauth_verifier=\"" + params.oauth_verifier + "\", oauth_version=\"1.0\"";

    console.log("query while hitting access-api: " + query);
    //query = query.replace(/"/g, '\\"');
    header = {
        // "Accept": "application/json",
        "Accept-Encoding": "*",
        // "Accept-Language" : "en;q=1",
        Authorization: query,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "X-AuthType": "oauth_1_0_a",

    };

    console.log(header);

    //var v = fetch(request_data.url+'?'+query, {

    var v = fetch(request_data.url, {
        method: 'POST',
        headers: header

    }).then((response) => {
        console.log('API Response :'+JSON.stringify(response));

        if (response.status !== 200) {
            Toast.show('Looks like there was a problem. Status Code: '+ response.status+' / '+ response, Toast.LONG);
            console.log('Looks like there was a problem. Status Code: ', response.status, response);
            _this.hideLoading();
            _this.showBottomLayout();
            return;
        }
        else {
            response.text().then(function (res) {
                console.log('ACCESS TOKEN RESPONSE WITH OAUTH TOKEN')
                console.log(res);
                console.log('============');
                // this.setState({ callbackURl: authParams })
                console.log(authParams);
                SharedStorage.storeFrogAuth(res);
                //   SharedStorage.storeFrogSecret(authParams.oauth_token_secret);
                _this.props.getUserInfo();
                _this.hideLoading();
            });
        }
    });
}

generateTokenSignature = (schoolUrl) => {
   console.log('schoolUrl'+schoolUrl);
  _this = this;
  const request_data = {
      url: schoolUrl + '/api/2/oauth1.php/request-token',
      method: 'GET',
  };
  //console.log('schoolUrl'+schoolUrl);
  

  params = oauth.authorize(request_data);
  params.oauth_callback = 'x-com-frogtrade-frogprogress-oauth://success'
  var query = Object.keys(params)
      .map(k => k + '=' + params[k])
      .join('&');
  //  console.log (params)
  //  console.log(query);

  var oauthPath = request_data.url + '?' + query

  fetch(oauthPath).then(function (response) {
  
      if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ', response.status, response);
          _this.setState({
              requestToken: null
          })
          return;
      }
      else {
          response.text().then(function (text) {

              var route = decodeURIComponent(text.substring(text.indexOf('?') + 1))
              // console.log('handleOpenURL url is: ' + route);
              var authParams = JSON.parse('{"' + (route).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
              console.log('token:--> ' + authParams['oauth_token_secret'])

             // _this.hideLoading();
              _this.setState({
                  redirectUrl: schoolUrl + '/app/oauthconsent' + '?' + text,
                  loadWebView: true,
                  // requestToken: text,
                  oauth_token_secret: authParams['oauth_token_secret']
              });

          });
      }
     
      return response;
  })
}
validateUrl() {
  //this.generateTokenSignature(this.state.schoolUrl);
  // // this.props.navigation.navigate('Home');
  if (this.state.schoolUrl) {
      
      console.log(this.state.schoolUrl);
      EndpointValidate.checkUrlStatus('https://' + this.state.schoolUrl).then((res) => {
          if (res.status == 404) {
              console.log('Error!! Page not found');
              this.hideLoading();
          }
          else {

             //SharedStorage.storeSchoolUrl('https://' + this.state.schoolUrl);
              this.generateTokenSignature('https://' + this.state.schoolUrl);
               console.log('Its a valid url');
              // this.setState({
              //     loadWebView: true
              // });
          }
      })
  }
  else {
      console.log('no school url');
  }
}
  render() {
    return (
        <View style={globalStyles.container}>
        {this.state.loadWebView && !this.state.doHaveToken ?
            <AuthWebView
                schoolUrl={this.state.redirectUrl}
                closeAuthWebView={this._closeAuthWebView.bind(this)}
                oauth_token_secret={this.state.oauth_token_secret}
                style={{ flex: 1 }}
            /> :
            <View style={globalStyles.container}>
                <View style={globalStyles.logoContainer}>
                    <Image source={require('./code/images/frog-progress-logo.png')} style={globalStyles.logo} resizeMode='contain' />
                    <Image source={require("./code/images/frog-progress-text.png")} style={globalStyles.logoTextContainer} resizeMode='contain' />
                </View>
                {
                     this.state.isBottomVisible ?
                    <View style={globalStyles.footer}>
                        <View style={globalStyles.bottomContainer}>
                            <TextInput style={globalStyles.inputStyle} placeholder="Please enter school url here"
                                value={this.state.schoolUrl}
                                underlineColorAndroid='transparent' placeholderTextColor={'gray'}
                                onChangeText={schoolUrl => this.setState({ schoolUrl })} />
                            <TouchableOpacity style={globalStyles.blueBGStyle} onPress={() => this.validateUrl()}>
                                <Text style={globalStyles.whiteTextStyle}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : null
                }
            </View>
        }
      
    </View>
//       <View style={styles.container1}>
//       {this.state.loadWebView && !this.state.doHaveToken ?
//           <AuthWebView
//               schoolUrl={this.state.redirectUrl}
//               closeAuthWebView={this._closeAuthWebView.bind(this)}
//               oauth_token_secret={this.state.oauth_token_secret}
//               style={{ flex: 1 }}
//           /> :
//           <View style={globalStyles.container}>
//                         <View style={globalStyles.logoContainer}>
//                             {/* <Image source={require("../assets/images/frog-progress-logo.png")} style={globalStyles.logo} resizeMode='contain' />
//                             <Image source={require("../assets/images/frog-progress-text.png")} style={globalStyles.logoTextContainer} resizeMode='contain' /> */}
//                         </View>
//           {/* <TouchableOpacity style={styles.blueBGStyle} onPress={() => this.validateUrl()}>
//                  <Text>Next</Text>
//              </TouchableOpacity> */}
//                {
//                              this.state.isBottomVisible ?
//                             <View style={globalStyles.footer}>
//                                 <View style={globalStyles.bottomContainer}>
//                                     <TextInput style={globalStyles.inputStyle} placeholder="Please enter school url here"
//                                         value={this.state.schoolUrl}
//                                         underlineColorAndroid='transparent' placeholderTextColor={'gray'}
//                                         onChangeText={schoolUrl => this.setState({ schoolUrl })} />
//                                     <TouchableOpacity style={globalStyles.blueBGStyle} onPress={() => this.validateUrl()}>
//                                         <Text style={globalStyles.whiteTextStyle}>Next</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View> : null
//                         }
        
//      </View> 
//       }
      
//   </View>
    );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container1: {
    flex: 1,
    backgroundColor: 'gray',
    paddingTop: (Platform.OS === "ios" ? 20 : 0)
},
  blueBGStyle: {
    backgroundColor: 'blue',
    marginTop:10,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
