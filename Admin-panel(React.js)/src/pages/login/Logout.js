export default function Login ({ setToken }){

    localStorage.removeItem("token"); 
    setToken('')
    return window.location.href="/"

}