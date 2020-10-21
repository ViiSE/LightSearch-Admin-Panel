import API from './API';

export class RestartService {

    async restart() {
        return (await API.get("/restart")).data;
    }
}
