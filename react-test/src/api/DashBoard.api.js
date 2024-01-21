import { requests } from './../config/request';
export class DashBoardApi {
    static getUser = () => {
        return requests({
            method: "GET",
            url: `api/user`,
        })
    }
    static Charge = (filter) => {
        return requests({
            method: "POST",
            url: `api/charge`,
            data: filter,
        })
    }
}