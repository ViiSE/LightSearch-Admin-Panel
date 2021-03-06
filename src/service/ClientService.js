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

export class ClientService {

    async getClients() {
        return (await API.get("/clients")).data.clients;
    }

    async kickClients(imei) {
        if(typeof imei === "string")
            return (await API.delete("/clients?imei=" + imei)).data;
        else {
            let imeiArr = [];
            for(let i = 0; i < imei.length; i++) {
                imeiArr.push(imei[i].imei);
            }

            return (await API.delete("/clients?imeiList=" + imeiArr)).data;
        }
    }

    async searchImei(imei) {
        return (await API.get("/imei/hash?pure=" + imei)).data;
    }
}
