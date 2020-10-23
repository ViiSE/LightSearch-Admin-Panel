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

export class DatasourceService {

    async getDatasource() {
        return (await API.get("/datasource")).data;
    }
    
    async changeDatasource(state) {
        console.log(this.requestForm(state));

        return (await API.put("/datasource", this.requestForm(state))).data;
    }

    requestForm(state) {
        return {
            username: state.username,
            password: state.password,
            host: state.host,
            port: state.port,
            db_name: state.dbName,
            db_type: state.dbType,
            script_encoding: state.scriptEncoding,
            driver_class_name: state.driverClassName,
            additional: state.additional,
            pool: {
                auto_commit: state.autoCommit,
                connection_timeout: state.connectionTimeout,
                idle_timeout: state.idleTimeout,
                max_life_time: state.maxLifeTime,
                maximum_pool_size: state.maximumPoolSize
            }
        };
    }
}
