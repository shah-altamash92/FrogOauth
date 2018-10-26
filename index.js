/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Linking, TextInput, Image } from 'react-native';
import AuthWebView from './code/AuthWebView';
import { oauth, oauth1 } from './code/auth';
import * as SharedStorage from './code/SharedStorage';
import { connect } from "react-redux";

const token = {
    key: 'a16e6a6de547886d29c809521946423e56b70a2d',
    secret: '8de9fcd76fc0818a1485245a1c6b1b6fefe06f90'
};


export default class Oauth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // schoolUrl: this.props.authUrl,
            redirectUrl: '',
            doHaveToken: false,
            loadWebView: false,
            loading: false,
            isBottomVisible: true,
        }
        this.generateTokenSignature = this.generateTokenSignature.bind(this);
        this._onAuthSuccess = this._onAuthSuccess.bind(this);

    }
    _closeAuthWebView = () => {
        this.props.closeAuthWebView();
    }
    showBottomLayout = () => {
        this.setState({
            isBottomVisible: true
        })
    }

    hideBottomLayout = () => {
        this.setState({
            isBottomVisible: false
        })
    }
    showLoading = () => {
        this.setState({
            loading: true
        })
    }

    hideLoading = () => {
        this.setState({
            loading: false
        })
    }


    componentDidMount() {

            // this.validateUrl();

        Linking.addEventListener('url', this.handleURL.bind(this));

        Linking.getInitialURL().then((url) => {
            console.log(url);
            if (url) {
                console.log('Initial url is: ' + url);
            }
            else {
                this.checkIfUserAlreadyLogin();
            }
        }).catch(err => console.log('An error occurred', err));
    }

    componentWillReceiveProps(props){
        if(this.props.showAuthView !== props.showAuthView && props.showAuthView){
            this.validateUrl();
        }
    }


    checkIfUserAlreadyLogin = () => {

        this.showLoading();
        this.hideBottomLayout();

        SharedStorage.retrieveSchoolUrl().then((res) => {

            if (res && res.length > 0) {
                SharedStorage.retrieveFrogAuth().then((oauth_model) => {
                    if (oauth_model && oauth_model.oauth_token && oauth_model.oauth_token_secret) {
                        // console.log(token);
                        this.props.getUserInfo();
                    }
                    else {
                        this.showBottomLayout();
                        this.hideLoading();
                    }
                });
            }
            else {
                this.showBottomLayout();
                this.hideLoading();
            }
        });
    }

    handleURL(event) {
        if (event.url) {
            console.log('Initial url is: ' + event.url);
            // this._handleOpenURL(event.url);
            SharedStorage.retrieveFrogAuth().then((res) => {
                if (!res) {
                    // Toast.show('Authenticating user', Toast.SHORT);
                    this._handleOpenURL(event.url);
                }
                else {
                    this.checkIfUserAlreadyLogin();
                }
            })
        }
        else {
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

        console.log('secret :' + this.state.oauth_token_secret);
        console.log('schoolUrl :' + this.props.schoolUrl);
        SharedStorage.retrieveSchoolUrl().then((res) => {
            if (res && res.length > 0) {
                // console.log(res);
                SharedStorage.retrieveOAuthSecret().then((secret) => {
                    if (secret && secret.length > 0) {
                        this.callAccessApi(res, secret, authParams)
                    }
                });
            }
        });
        // do something with the url, in our case navigate(route)
        this._closeAuthWebView();
    }

    callAccessApi = (schoolUrl, secret, authParams) => {
        var _this = this;

        _this.props.showHideLoader(true);
        const token = {
            key: authParams.oauth_token,
            secret: secret
        };
        const request_data = {
            url: schoolUrl + '/api/2/oauth1.php/access-token',
            method: 'POST',
            data: { oauth_token: authParams.oauth_token, oauth_verifier: authParams.oauth_verifier, oauth_secret: secret }
        };

        console.log('Secret:' + secret);
        console.log('schoolUrl:' + schoolUrl);
        var params = oauth1.authorize(request_data, token);
        // params.oauth_token = authParams.oauth_token;
        // params.oauth_verifier = authParams.oauth_verifier;
        console.log(params);

        var query = "OAuth oauth_consumer_key=\"" + params.oauth_consumer_key + "\", oauth_nonce=\"" + params.oauth_nonce + "\", oauth_signature=\"" + params.oauth_signature + "\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"" + params.oauth_timestamp + "\", oauth_token=\"" + params.oauth_token + "\", oauth_verifier=\"" + params.oauth_verifier + "\", oauth_version=\"1.0\"";

        console.log("query while hitting access-api: " + query);
        //query = query.replace(/"/g, '\\"');
        var header = {
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
            console.log('API Response :' + JSON.stringify(response));
            console.log('API status :' + response.status);


            _this.props.showHideLoader(false);
            if (response.status !== 200) {
                // Toast.show('Looks like there was a problem. Status Code: '+ response.status+' / '+ response, Toast.LONG);
                console.log('Looks like there was a problem. Status Code: ', response.status, response);
                // _this.hideLoading();
                // _this.showBottomLayout();
                return;
            }
            else {

                response.text().then(function (res) {
                    // this.props.getOauthData(res);
                    console.log('API status -- 200 :' + res);
                    _this.props.getOauthData(res);
                    console.log('ACCESS TOKEN RESPONSE WITH OAUTH TOKEN')
                    console.log(res);
                    console.log('============');
                    // this.setState({ callbackURl: authParams })
                    console.log(authParams);
                    //SharedStorage.storeFrogAuth(res);
                    //   SharedStorage.storeFrogSecret(authParams.oauth_token_secret);
                    // _this.props.getUserInfo();
                    // _this.hideLoading();
                });
            }
        });
    }

    moveToHome() {
        // console.log('moving to home');
        // this.props.navigation.navigate('Home');
        this.hideLoading();
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            routeName: 'Home',
            key: 'MoveToHome'
        });
    }
    generateTokenSignature = (schoolUrl) => {
        console.log('schoolUrl' + schoolUrl);
        let _this = this;
        const request_data = {
            url: schoolUrl + '/api/2/oauth1.php/request-token',
            method: 'GET',
        };


        let params = oauth.authorize(request_data);
        console.log('schoolUrl' + schoolUrl);
        params.oauth_callback = 'x-com-frogtrade-frogprogress-oauth://success'
        var query = Object.keys(params)
            .map(k => k + '=' + params[k])
            .join('&');
        //  console.log (params)
        //  console.log(query);

        var oauthPath = request_data.url + '?' + query

        fetch(oauthPath).then(function (response) {

            _this.props.showHideLoader(false);
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ', response.status, response);
                _this.props.closeAuthWebView();
                return;
            }
            else {
                response.text().then(function (text) {

                    var route = decodeURIComponent(text.substring(text.indexOf('?') + 1))
                    // console.log('handleOpenURL url is: ' + route);
                    var authParams = JSON.parse('{"' + (route).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
                    console.log('token:--> ' + authParams['oauth_token_secret'])

                    _this.setState({
                        redirectUrl: schoolUrl + '/app/oauthconsent' + '?' + text,
                        loadWebView: true,
                        // requestToken: text,
                        oauth_token_secret: authParams['oauth_token_secret']
                    });
                    SharedStorage.storeOAuthSecret(authParams['oauth_token_secret'])
                });
            }

            return response;
        }).catch(err => {
            console.log(err);
            _this.props.closeAuthWebView();
        })
    }
    checkUrlStatus(url) {
        const VALIDATE_URL = '/frogos';
        return fetch(url + VALIDATE_URL);
    }
    validateUrl() {
        console.log('url :'+this.props.schoolUrl +' / '+this.props.showAuthView);
        
        if (this.props.schoolUrl) {

            var str = this.props.schoolUrl
            str = str.replace("https://", "");
            str = str.replace("http://", "");

            console.log('checking url');
            this.props.showHideLoader(true);


            this.setState({
                redirectUrl: '',
                loadWebView: false,
                // requestToken: text,
                oauth_token_secret: ''
            });

            fetch('https://' + str).then((res) => {
                console.log(res);
                if (res.status == 404) {
                    this.props.showHideLoader(false);
                    console.log('Error!! Page not found ' + 'https://' + str);
                    this.props.errorMessage('invalidUrl');
                }
                else {
                    this.checkUrlStatus('https://' + str).then((res) => {
                        if (res.status == 200) {
                            SharedStorage.storeSchoolUrl('https://' + str);
                            this.generateTokenSignature('https://' + str);
                            console.log('Its a valid url');
                        }
                        else {
                            this.props.showHideLoader(false);
                            this.props.errorMessage('noFrogUrl');
                        }
                    }).catch(err => {
                        this.props.showHideLoader(false);
                        console.log('Error!! checkUrlStatus ='+err);
                        this.props.errorMessage('invalidUrl');
                    })
                }
            }).catch(err => {
                this.props.showHideLoader(false);
                console.log('Error!! fetch ='+err);
                this.props.errorMessage('invalidUrl');
            })

        }
        else {
            // console.log('noUrl');
            this.props.errorMessage('noUrl');
        }
    }

    _onAuthSuccess = (url) => {
        this.showLoading();
        this.setState({
            loadWebView: false,
            redirectUrl: ""
        });
        // console.log(url);
        this._handleOpenURL(url);
    }

    render() {
        return (
            this.props.showAuthView ?
                <View style={styles.container}>
                    {
                        this.state.loadWebView ?
                            <AuthWebView
                                schoolUrl={this.state.redirectUrl}
                                closeAuthWebView={this._closeAuthWebView}
                                oauth_token_secret={this.state.oauth_token_secret}
                                style={{ flex: 1, backgroundColor: 'white' }}
                                onAuthSuccess={this._onAuthSuccess}
                            /> : null
                    }
                </View>
            : null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // height: 100,
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'transparent',
        // backgroundColor: 'red',
        position: 'absolute', 
        top: 0, 
        left: 0, 
        bottom: 0, 
        right: 0, 
        zIndex: 999999
    },
    container1: {
        flex: 1,
        backgroundColor: 'gray',
        paddingTop: (Platform.OS === "ios" ? 20 : 0)
    },
    blueBGStyle: {
        backgroundColor: 'blue',
        marginTop: 10,
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
    // container: {
    //     flex: 1,
    //     backgroundColor: 'transparent'
    // }
});
