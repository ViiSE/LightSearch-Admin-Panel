import API from './API';

export class LogService {

    async getLogs() {
        return (await API.get("/logs")).data;
    }
}
