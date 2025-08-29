import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "6fbfec296dbf08a4c27265b27bdd3804",
        language: "ko-KR",
    }
})

export default instance;