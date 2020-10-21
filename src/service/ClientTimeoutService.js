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
