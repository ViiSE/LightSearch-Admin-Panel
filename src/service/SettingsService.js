import API from './API';
import {getCookie} from "../utils/CookiesUtils";
import axios from "axios";

export class SettingsService {

    async changePassword(pass) {
        let data = {password: pass};
        return (await API.put("/password", data)).data;
    }

    async logout() {
        let xsrfToken = getCookie("XSRF-TOKEN");
        let data = {"XSRF-TOKEN": xsrfToken};
        return (await axios.post("/logout", data)).data;
    }
}
