import axios from "axios";

const KEY = 'AIzaSyCW6ZFX_A62I1AOda2dl_C795fovatRWbY';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults: 8,
        key: KEY
    }
});
