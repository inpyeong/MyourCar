import { API_BASE_URL } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export const oauth2Login = () => {

    // 여기에 아마 쿠키나 토큰을 처리하는 로직이 필요할 수도 있다.

    return request({
        url: API_BASE_URL + "/oauth2/authorization/google",
        method: 'GET'
    });
}
