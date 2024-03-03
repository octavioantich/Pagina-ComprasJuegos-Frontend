import axios from "axios";
import AuthCookieManager from "./AuthCookieManager";
import LocalRepository from "./LocalRepository";

export default class Log_Reg_Buy_Usuarios{
    constructor(){
        this.BASE_URL="https://code-connoisseurs-laravel.vercel.app";
        this.API_URL_BASE="/rest";

        this.localRepository = new LocalRepository();
    }

    getAuthHeader(){
        const token = this.localRepository.getBearerToken();
        return {
            headers:{
                'Authorization': 'Bearer '+token
            }
        }
    }    

    async registerClient(clientData){
        const END_POINT = "/register";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, clientData).then( response => {
            const token = response.data.token;
            this.localRepository.storeBearerToken(token);

            const client = response.data.client;
            const cookieClient = client.id +" "+ client.nombre;
            const cookieManager = new AuthCookieManager();
            cookieManager.setAuthCookie(cookieClient);

            return response;
        }).catch(error => {
            throw error;
        });
    }

    async loginClient(clientCredentials){
        const END_POINT="/login";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;
        
        return axios.post(url, clientCredentials).then( response => {
            const token = response.data.token;
            this.localRepository.storeBearerToken(token);

            const client = response.data.client;
            const cookieClient = client.id +" "+ client.nombre;
            const cookieManager = new AuthCookieManager();
            cookieManager.setAuthCookie(cookieClient);

            return response;
        }).catch(error => {
            throw error;
        })
    }

    async comprasCliente(){
        const END_POINT = '/usuarios/compras';
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.get(url, this.getAuthHeader()).then( response => {
            return response;
        }).catch( error => {
            throw error;
        })
    }

    async logoutClient(){
        const END_POINT="/logout";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, null, this.getAuthHeader()).then( response => {
            const cookieManager = new AuthCookieManager();
            cookieManager.deleteAuthCookie();

            const localRepository = new LocalRepository();
            localRepository.deleteBearerToken();
            return response;
        }).catch( error => {
            throw error;
        })
    }

    async comprar(datosCompra){
        const END_POINT="/compras";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, datosCompra, this.getAuthHeader()).then( response => {
            return response;
        }).catch( error => {
            throw error;
        });
    }

    async mercadoPago(formData){
        const END_POINT="/process-payment";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, formData, this.getAuthHeader()).then( response => {
            return response;
        }).catch( error => {
            throw error;
        });
    }
}