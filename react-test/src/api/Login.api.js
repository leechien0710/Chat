import { requests } from './../config/request';
export class LoginApi {
    static login = (filter) => {
        return requests({
            method: "POST",
            url: `api/login`,
            data: filter,
        })
    }
    static signup = (filter) => {
        return requests({
            method: "POST",
            url: `api/signup`,
            data: filter,
        })
    }
}
