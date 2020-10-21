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
