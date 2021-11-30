let APIURL = '';

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:7000';
        break;
        case 'homeownerhelpclient.herokuapp.com' :
            APIURL = 'http://homeownerhelpserver.herokuapp.com'
}

export default APIURL;