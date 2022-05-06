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
const getCourseInfo = async () => {

    // //request user information from server
    // const course = await axios.get("/course/")

    //     .then((res) => {

    //         return res.data.course;

    //     }).catch((error) => {
    //         console.log(error);
    //         return error;
    //     })

    // //returns the user or an error.  depends on server response.
    // return course;
}

//sends updated user info to backend
const updateCourseInfo = async (data) => {
    console.log(data)

        axios.put(`/course/update`, data).then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        })
}

export { getCourseInfo, updateCourseInfo }