import axios from '../axios'

//ensures requests to backend include the json web token
axios.interceptors.request.use(
    config => {
        // const { origin } = new URL(config.url);
        // const allowedOrigins = [apiUrl];
        const token = localStorage.getItem('token');
        // if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//gets user information from backend
const getUserInfo = async () => {

    //request user information from server
    const user = await axios.get("/profile")

        .then((res) => {

            return res.data.user;

        }).catch((error) => {
            console.log(error);
            return error;
        })

    //returns the user or an error.  depends on server response.
    return user;
}

export { getUserInfo }