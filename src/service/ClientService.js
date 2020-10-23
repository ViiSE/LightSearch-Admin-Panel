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
