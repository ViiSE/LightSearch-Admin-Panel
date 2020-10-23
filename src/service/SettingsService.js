/*
 *    Copyright 2020 ViiSE
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

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
