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

export class ClientTimeoutService {

    async getClientTimeout() {
        return (await API.get('/clients/timeout')).data;
    }

    async changeClientTimeout(toutValue) {
        let toutBody = {
            client_timeout: toutValue
        };

        return (await API.put('/clients/timeout', toutBody)).data;
    }
}
