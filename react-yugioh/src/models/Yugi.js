import axios from 'axios'

class YugisModel {

    static cards(){
        let request = axios.get("http://localhost:3000/api/yugi.json")
        return request
    }

}

export default YugisModel