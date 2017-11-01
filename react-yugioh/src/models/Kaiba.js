import axios from 'axios'

class KaibasModel {

    static cards(){
        let request = axios.get("http://localhost:3000/api/kaiba.json")
        return request
    }

}

export default KaibasModel