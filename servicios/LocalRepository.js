
export default class LocalRepository{
    constructor(){
        this.BEARER_TOKEN_KEY = "auth_token";
    }

    storeBearerToken(token){
        localStorage.setItem(this.BEARER_TOKEN_KEY, token);
    }

    getBearerToken(){
        return localStorage.getItem(this.BEARER_TOKEN_KEY);
    }

    deleteBearerToken(){
        localStorage.removeItem(this.BEARER_TOKEN_KEY);
    }
}