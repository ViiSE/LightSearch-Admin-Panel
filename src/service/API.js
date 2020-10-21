import axios from 'axios';

export default axios.create({
    baseURL: "/admins/commands",
    responseType: "json"
});