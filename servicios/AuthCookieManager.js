import Cookies from "js-cookie";

export default class AuthCookieManager{
    constructor(){
        this.AUTH_COOKIE_KEY = "client_auth";
    }

    setAuthCookie(clientData){
        Cookies.set(this.AUTH_COOKIE_KEY, clientData, {expires: 86400, sameSite: 'lax'});
    }

    deleteAuthCookie(){
        Cookies.remove(this.AUTH_COOKIE_KEY);
    }

    isAuthCookiesSet(){
        const authCookie = Cookies.get(this.AUTH_COOKIE_KEY);
        return authCookie != undefined;
    }

    getCookieUser(){
        const authCookie = Cookies.get(this.AUTH_COOKIE_KEY);
        if(authCookie != undefined){
            return authCookie;
        }else{
            return "";
        }
    }
}