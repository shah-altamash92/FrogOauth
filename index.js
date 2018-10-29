
import React, { Component } from 'react';
import { Platform, StyleSheet,View, Linking } from 'react-native';
import AuthWebView from './code/AuthWebView';
import { oauth, oauth1 } from './code/auth';


var _schoolUrl = '';

export default class Oauth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectUrl: '',
            loadWebView: false,
        }
        this.generateTokenSignature = this.generateTokenSignature.bind(this);
        this._onAuthSuccess = this._onAuthSuccess.bind(this);

    }
    _closeAuthWebView = () => {
        this.props.closeAuthWebView();
    }

    componentDidMount() {

        Linking.addEventListener('url', this.handleURL.bind(this));

        Linking.getInitialURL().then((url) => {
            console.log(url);
            if (url) {
                console.log('Initial url is: ' + url);
            }
        }).catch(err => console.log('An error occurred', err));
    }

    componentWillReceiveProps(props){
        if(this.props.showAuthView !== props.showAuthView && props.showAuthView){
            this.validateUrl();
        }
    }

    handleURL(event) {
        if (event.url) {
             this._handleOpenURL(event.url);
     
        }
    }
    _handleOpenURL(url) {
        var urlParams = decodeURIComponent(url.substring(url.indexOf('?') + 1))
        var authParams = JSON.parse('{"' + (urlParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
       
        if(_schoolUrl.length > 0 && this.state.oauth_token_secret){
            this.callAccessApi(_schoolUrl, this.state.oauth_token_secret, authParams);
        }
       
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
            data: { oauth_token: authParams.oauth_token, oauth_verifier: authParams.oauth_verifier, oauth_secret: secret,CONSUMER_SECRET:this.props.CONSUMER_SECRET }
        };

        console.log('Secret:' + secret);
        console.log('schoolUrl:' + schoolUrl);
        var params = oauth1({CONSUMER_SECRET:this.props.CONSUMER_SECRET,CONSUMER_KEY:this.props.CONSUMER_KEY}).authorize(request_data, token);
        var query = "OAuth oauth_consumer_key=\"" + params.oauth_consumer_key + "\", oauth_nonce=\"" + params.oauth_nonce + "\", oauth_signature=\"" + params.oauth_signature + "\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"" + params.oauth_timestamp + "\", oauth_token=\"" + params.oauth_token + "\", oauth_verifier=\"" + params.oauth_verifier + "\", oauth_version=\"1.0\"";

        var header = {
            "Accept-Encoding": "*",
            Authorization: query,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            "X-AuthType": "oauth_1_0_a",

        };

        console.log(header);

        var v = fetch(request_data.url, {
            method: 'POST',
            headers: header

        }).then((response) => {
            
            _this.props.showHideLoader(false);
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ', response.status, response);
                return;
            }
            else {

                response.text().then(function (res) {
                    _this.props.finalValidSchoolUrl(_schoolUrl);
                    _this.props.getOauthData(res);
                });
            }
        });
    }

  
    generateTokenSignature = (schoolUrl) => {
        let _this = this;
        const request_data = {
            url: schoolUrl + '/api/2/oauth1.php/request-token',
            method: 'GET',
            data:{CONSUMER_SECRET:this.props.CONSUMER_SECRET}
        };


        let params = oauth({CONSUMER_SECRET:this.props.CONSUMER_SECRET,CONSUMER_KEY:this.props.CONSUMER_KEY}).authorize(request_data);
        params.oauth_callback = 'x-com-frogtrade-frogprogress-oauth://success'
        var query = Object.keys(params)
            .map(k => k + '=' + params[k])
            .join('&');
       
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
                    var authParams = JSON.parse('{"' + (route).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
                    console.log('token:--> ' + authParams['oauth_token_secret'])

                    _this.setState({
                        redirectUrl: schoolUrl + '/app/oauthconsent' + '?' + text,
                        loadWebView: true,
                        oauth_token_secret: authParams['oauth_token_secret']
                    });
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
             
                oauth_token_secret: ''
            });
                    this.checkUrlStatus('https://' + str).then((res) => {
                        if (res.status == 200) {
                            _schoolUrl =  'https://' + str
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
      
        else {
            this.props.errorMessage('noUrl');
        }
    }

    _onAuthSuccess = (url) => {
        this.props.showHideLoader(true);
        this.setState({
            loadWebView: false,
            redirectUrl: ""
        });
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
        flex: 1,
        backgroundColor: 'transparent',
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
});
