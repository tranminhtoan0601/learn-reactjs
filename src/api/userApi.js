import axiosClient from "./axiosClient";



const userApi = {

register(data){
    console.log(data);
    const url = '/auth/local/register';
    return axiosClient.post(url, data);
},
login(data){
    console.log(data);
    const url = '/auth/local';
    return axiosClient.post(url, data);
},

};

export default userApi;