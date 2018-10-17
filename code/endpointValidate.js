import { VALIDATE_URL } from './endpoints'
function checkUrlStatus(url){
    // console.log(url);
    return fetch(url+VALIDATE_URL);
}

export const EndpointValidate = { checkUrlStatus };