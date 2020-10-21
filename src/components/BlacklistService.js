import API from "../service/API";

export class BlacklistService {

    async getBlacklist() {
        let blacklist = (await API.get("/blacklist")).data.blacklist;
        let blJson = [];
        for(let i = 0; i < blacklist.length; i++) {
            blJson.push({imei: blacklist[i]});
        }
        return blJson;
    }

    async addToBlacklist(imei) {
        let data = { imeilist: [] };
        if(typeof imei === "string")
            data.imeilist.push(imei);
        else {
            imei.forEach(_imei => {
                data.imeilist.push(_imei.imei);
            });
        }

        return (await API.post("/blacklist", data)).data;
    }

    async removeFromBlacklist(imei) {
        if(typeof imei === "string")
            return (await API.delete('/blacklist?imei=' + imei)).data;
        else {
            let imeiArr = [];
            for(let i = 0; i < imei.length; i++) {
                imeiArr.push(imei[i].imei);
            }
            return (await API.delete('/blacklist?imeiList=' + imeiArr)).data;
        }
    }
}
