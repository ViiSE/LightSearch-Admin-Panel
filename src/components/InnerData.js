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

export function dbType() {
    return [
        {
            name: "firebirdsql",
            driver: "org.firebirdsql.jdbc.FBDriver"
        },
        {
            name: "mysql",
            driver: "com.mysql.jdbc.Driver"
        },
        {
            name: "postgresql",
            driver: "org.postgresql.Driver"
        },
        {
            name: "db2",
            driver: "COM.ibm.db2.jdbc.app.DB2Driver"
        }
    ]
}