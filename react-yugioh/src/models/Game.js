import axios from 'axios'

class GamesModel {

    static all(){
        let request = axios.get("http://localhost:3000/api/games.json")
        return request
    }

    static specific(id){
        let request = axios.get("http://localhost:3000/api/games/" + id + ".json")
        return request
    }

    static create(new_id){
        let request = axios.post("http://localhost:3000/api/games/",
        {
            id: new_id
        })
        return request
    }

}

export default GamesModel