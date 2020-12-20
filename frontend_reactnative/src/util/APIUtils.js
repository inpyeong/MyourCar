import {
    API_BASE_URL,
    X_Naver_Client_Id,
    X_Naver_Client_Secret,
    X_NCP_APIGW_API_KEY,
    X_NCP_APIGW_API_KEY_ID
} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

const fetchApi = (url, options) => {
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
}

const request = async (options) => {
    try {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const token = await AsyncStorage.getItem('token');
        console.log("token", token);
        if(token) {
            headers.append('Authorization', 'Bearer ' + token);
        }
        if(options.hasOwnProperty('X-Naver-Client-Id')) {
            headers.append('X-Naver-Client-Id', options['X-Naver-Client-Id']);
            headers.append('X-Naver-Client-Secret', options['X-Naver-Client-Secret']);
        }
        if(options.hasOwnProperty('X-NCP-APIGW-API-KEY-ID')) {
            headers.append('X-NCP-APIGW-API-KEY-ID', options['X-NCP-APIGW-API-KEY-ID']);
            headers.append('X-NCP-APIGW-API-KEY', options['X-NCP-APIGW-API-KEY']);
        }
        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);

        const responseJson = await fetchApi(options.url, options);
        return responseJson;
    } catch(err) {
        console.error(err);
    }
};

export const getCurrentUser = () => {
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export const oauth2Login = () => {
    return request({
        url: API_BASE_URL + "/oauth2/authorization/google",
        method: 'GET'
    });
}

export const signUp = (requestBody) => {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export const login = (requestBody) => {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export const getLocationList = (query) => {
    const encoded = encodeURI(`https://openapi.naver.com/v1/search/local.json?query=${query}&display=5&start=1&sort=random`);
    console.log(encoded);
    return request({
        'url': encoded,
        'method': 'GET',
        'X-Naver-Client-Id': X_Naver_Client_Id,
        'X-Naver-Client-Secret': X_Naver_Client_Secret,
    });
}

export const getLonLat = (address) => {
    const uri = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}&coordinate=127.1054328,37.3595963`;
    return request({
        'url': uri,
        'method': 'GET',
        'X-NCP-APIGW-API-KEY-ID': X_NCP_APIGW_API_KEY_ID,
        'X-NCP-APIGW-API-KEY': X_NCP_APIGW_API_KEY,
    });
}

export const reverseGeocoding = (coords) => {
    const uri = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${coords.longitude},${coords.latitude}&sourcecrs=epsg:4326&output=json&orders=addr`
    return request({
        'url': uri,
        'method': 'GET',
        'X-NCP-APIGW-API-KEY-ID': X_NCP_APIGW_API_KEY_ID,
        'X-NCP-APIGW-API-KEY': X_NCP_APIGW_API_KEY,
    })
}

export const getRecommendCars = (coords, serviceTime) => {
    const uri = API_BASE_URL + `/api/cars/recommend?coords=${coords}&serviceTime=${serviceTime}`;
    return request({
        'url': uri,
        'method': 'GET',
    })
}

export const getReviews = (carId, page, size) => {
    const uri = API_BASE_URL + `/api/reviews?carId=${carId}&page=${page}&size=${size}`;
    return request({
        'url': uri,
        'method': 'GET',
    })
}

export const postCar = (requestBody) => {
    console.log(requestBody);
    const uri = API_BASE_URL + `/api/cars`;
    return request({
        'url': uri,
        'method': 'POST',
        'body': JSON.stringify(requestBody)
    })
}

export const postService = (requestBody) => {
    console.log(requestBody);
    const uri = API_BASE_URL + `/api/services`;
    return request({
        'url': uri,
        'method': 'POST',
        'body': JSON.stringify(requestBody)
    })
}

export const getCars = (userId) => {
    const uri = API_BASE_URL + `/api/cars?userId=${userId}`
    return request({
        'url': uri,
        'method': 'GET',
    })
}

export const patchCars = (id, requestBody) => {
    console.log(requestBody);
    const uri = API_BASE_URL + `/api/cars/${id}`;
    return request({
        'url': uri,
        'method': 'PATCH',
        'body': JSON.stringify(requestBody)
    })
}

export const getServices = (related, id) => {
    const uri = API_BASE_URL + `/api/services?related=${related}&id=${id}`;
    return request({
        'url': uri,
        'method': 'GET',
    })
}

export const postReviews = (carId, requestBody) => {
    console.log(requestBody);
    const uri = API_BASE_URL + `/api/reviews/${carId}`;
    return request({
        'url': uri,
        'method': 'POST',
        'body': JSON.stringify(requestBody)
    })
}
