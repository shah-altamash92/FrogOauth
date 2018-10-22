const OAuth = require('oauth-1.0a');
var oauthSignature = require('oauth-signature');

 const CONSUMER_KEY = 'qj9dvvss3bogrryquze5c52alzxyjlnf'
 const CONSUMER_SECRET = 'j4uff38y4qg88j0edxyf7dep4dn095whsia9ms5e'
 

 const oauth = OAuth({

    consumer: { key: CONSUMER_KEY, secret:CONSUMER_SECRET}, // React native Progress keys
    
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {

        initialSeparator = base_string.indexOf('&');
        var basePath = decodeURIComponent( base_string.substring(initialSeparator+1, base_string.indexOf('&', 5)))
        var search = decodeURIComponent(base_string.substring(base_string.indexOf('&', 5)+1))

        // console.log(basePath);
        // console.log(search);

        var parameters = JSON.parse('{"' + (search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        var tokenSecret = parameters.oauth_secret;
        // console.log(tokenSecret);

        if(basePath.indexOf('request-token') > 0)
            parameters.oauth_callback = 'x-com-frogtrade-frogprogress-oauth://success'
        // console.log(parameters);

        if(tokenSecret){     
            delete parameters.oauth_secret
            basePath = encodeURIComponent (basePath);
            encodedSignature = oauthSignature.generate('POST', basePath, parameters,CONSUMER_SECRET, tokenSecret, { encodeSignature: false})
        }
        else
            encodedSignature = oauthSignature.generate('GET', basePath, parameters,CONSUMER_SECRET)
        encodedSignature = decodeURIComponent(encodedSignature)
        // console.log(encodedSignature);
        return encodedSignature;
    }
});
const oauth1 = OAuth({
  
    consumer: { key:CONSUMER_KEY, secret:CONSUMER_SECRET}, // React native Progress keys
     
    signature_method: 'HMAC-SHA1',
     hash_function(base_string, key) {
    //    console.log(decodeURIComponent(base_string));
   

       initialSeparator = base_string.indexOf('&');
       initialSeparator = base_string.indexOf('&');
       var methodType = base_string.substring(0, initialSeparator);
       var basePath = decodeURIComponent( base_string.substring(initialSeparator+1, base_string.indexOf('&', 5)))
    //    console.log(basePath);

    //    //React native keys
    //    consumerKey = 'qj9dvvss3bogrryquze5c52alzxyjlnf'
    //    consumerSecret = 'j4uff38y4qg88j0edxyf7dep4dn095whsia9ms5e'
   
       var search = decodeURIComponent(base_string.substring(base_string.indexOf('&', 5)+1))
    //    console.log(search);
  
       var parameters = JSON.parse('{"' + (search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

       if(parameters.sections)
        parameters.sections = decodeURIComponent(parameters.sections);
  
       var tokenSecret = parameters.oauth_secret;
  
       delete parameters.oauth_secret
       var encodedURI = encodeURIComponent (basePath);
       encodedSignature = oauthSignature.generate(methodType, basePath, parameters,CONSUMER_SECRET, tokenSecret,
      { encodeSignature: false})
        encodedSignature = decodeURIComponent(encodedSignature)
       
       return encodedSignature;
     }
   });
   
  
   

const oauth2 = OAuth({
  
    consumer: { key: 'qj9dvvss3bogrryquze5c52alzxyjlnf', secret: 'j4uff38y4qg88j0edxyf7dep4dn095whsia9ms5e'}, // React native Progress keys
     
    signature_method: 'HMAC-SHA1',
     hash_function(base_string, key) {

       initialSeparator = base_string.indexOf('&');
       var methodType = base_string.substring(0, initialSeparator);
       var basePath = decodeURIComponent( base_string.substring(initialSeparator+1, base_string.indexOf('&', 5)))

       consumerKey = 'qj9dvvss3bogrryquze5c52alzxyjlnf'
       consumerSecret = 'j4uff38y4qg88j0edxyf7dep4dn095whsia9ms5e'
   
       var search = decodeURIComponent(base_string.substring(base_string.indexOf('&', 5)+1))

       var parameters = JSON.parse('{"' + (search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
       var tokenSecret = parameters.oauth_secret;
        
       parameters.sections = decodeURIComponent(parameters.sections);
  
       delete parameters.oauth_secret
       var encodedURI = encodeURIComponent (basePath);
       encodedSignature = oauthSignature.generate(methodType, basePath, parameters, consumerSecret, tokenSecret,
       { encodeSignature: false})
        encodedSignature = decodeURIComponent(encodedSignature)

       return encodedSignature;
     }
   });
   
// const getRequestToken = (schoolUrl) => {
//     console.log('schoolUrl'+schoolUrl);
//    _this = this;
//    const request_data = {
//        url: schoolUrl + '/api/2/oauth1.php/request-token',
//        method: 'GET',
//    };
//    //console.log('schoolUrl'+schoolUrl);
   
 
//    params = oauth.authorize(request_data);
//    params.oauth_callback = 'x-com-frogtrade-frogprogress-oauth://success'
//    var query = Object.keys(params)
//        .map(k => k + '=' + params[k])
//        .join('&');
//    //  console.log (params)
//    //  console.log(query);
 
//    var oauthPath = request_data.url + '?' + query

   
 
//    fetch(oauthPath).then(function (response) {
   
//        if (response.status !== 200) {
//            console.log('Looks like there was a problem. Status Code: ', response.status, response);
//            _this.setState({
//                requestToken: null
//            })
//            return;
//        }
//        else {
//            response.text().then(function (text) {
 
//                var route = decodeURIComponent(text.substring(text.indexOf('?') + 1))
//                // console.log('handleOpenURL url is: ' + route);
//                var authParams = JSON.parse('{"' + (route).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
//                console.log('token:--> ' + authParams['oauth_token_secret'])
 
//               // _this.hideLoading();
//                _this.setState({
//                    redirectUrl: schoolUrl + '/app/oauthconsent' + '?' + text,
//                    loadWebView: true,
//                    // requestToken: text,
//                    oauth_token_secret: authParams['oauth_token_secret']
//                });
 
//            });
//        }
      
//        return response;
//    })
//  }


export {oauth,oauth1,oauth2};