class Session {

    constructor() {
    }

    setLocalStorage = (key, val) => {
        if(process.browser){
            localStorage.setItem(key, val);
        }
    }
    getLocalStorage = (key) => {
        if(process.browser){

            return localStorage.getItem(key);
        }
    }

    setSessionStorage = (key, val) => {
        if(process.browser){

            sessionStorage.setItem(key, val);
        }
    }
    getSessionStorage = (key) => {
        if(process.browser){

            return sessionStorage.getItem(key);
        }
    }
    clearSessionStorage = (key) => {
        if(process.browser){

            sessionStorage.removeItem(key);
        }
    }
}

const session = new Session()
export {session};
