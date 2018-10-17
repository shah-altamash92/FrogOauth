import { AsyncStorage } from "react-native";

const FROGOS_AUTH_KEY = "FROGOS_AUTH";
const FROGOS_TOKEN_KEY = "FROGOS_TOKEN";
const SCHOOL_URL_KEY = "SCHOOL_URL";
const USER_ID_KEY = "USER_ID";
const OAUTH_SECRET_KEY = "OAUTH_SECRET";

storeFrogAuth = async(value) => {
    try{
        // console.log('storing '+value);
        await AsyncStorage.setItem(FROGOS_AUTH_KEY, value);
    }
    catch(err){
        console.log("Cannot save auth key :"+err)
        return "Error "+err;
    }
}

retrieveFrogAuth = async() => {
    try{
        const value = await AsyncStorage.getItem(FROGOS_AUTH_KEY);
        // console.log('value: '+value);
        // if(value == null){
        //     value = "value not available";
        // }
        if(value && value.length > 0)
            value = JSON.parse('{"' + (value).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        return value;
    }
    catch(err){
        console.log(err);
        return "Error "+err;
    }
}

// storeFrogToken = async(value) => {
//     try{
//         // console.log('storing '+value);
//         await AsyncStorage.setItem(FROGOS_TOKEN_KEY, value);
//     }
//     catch(err){
//         console.log("Cannot save token key")
//         return "Error "+err;
//     }
// }

// retrieveFrogToken = async() => {
//     try{
//         const value = await AsyncStorage.getItem(FROGOS_TOKEN_KEY);
//         // console.log('value: '+value);
//         // if(value == null){
//         //     value = "value not available";
//         // }
//         return value;
//     }
//     catch(err){
//         console.log(err);
//         return "Error "+err;
//     }
// }

storeSchoolUrl = async(value) => {
    try{
        // console.log('storing '+value);
        await AsyncStorage.setItem(SCHOOL_URL_KEY, value);
    }
    catch(err){
        console.log("Cannot save school url")
        return "Error "+err;
    }
}

retrieveSchoolUrl = async() => {
    try{
        const value = await AsyncStorage.getItem(SCHOOL_URL_KEY);
        // console.log('value: '+value);
        // if(value == null){
        //     // value = "value not available";
        // }
        return value;
    }
    catch(err){
        console.log(err);
        return "Error "+err;
    }
}


storeUserID = async(value) => {
    try{
        // console.log('storing '+value);
        await AsyncStorage.setItem(USER_ID_KEY, value);
    }
    catch(err){
        console.log("Cannot save user id")
        return "Error "+err;
    }
}

retrieveUserID = async() => {
    try{
        const value = await AsyncStorage.getItem(USER_ID_KEY);
        return value;
    }
    catch(err){
        console.log(err);
        return "Error "+err;
    }
}

storeOAuthSecret = async(value) => {
    try{
        // console.log('storing '+value);
        await AsyncStorage.setItem(OAUTH_SECRET_KEY, value);
    }
    catch(err){
        console.log("Cannot save auth secret")
        return "Error "+err;
    }
}

retrieveOAuthSecret = async() => {
    try{
        const value = await AsyncStorage.getItem(OAUTH_SECRET_KEY);
        return value;
    }
    catch(err){
        console.log(err);
        return "Error "+err;
    }
}


deleteEverything = async() => {
    await AsyncStorage.clear();
}

export { storeFrogAuth, retrieveFrogAuth, storeSchoolUrl, retrieveSchoolUrl, 
    storeUserID, retrieveUserID, storeOAuthSecret, retrieveOAuthSecret, deleteEverything};

    // storeFrogSecret, retrieveFrogSecret, 