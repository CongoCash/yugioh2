import axios from 'axios'

class CardsModel {

    static cards(){
        let request = axios.get("http://localhost:3000/api/cards.json")
        return request
    }

}

export default CardsModel