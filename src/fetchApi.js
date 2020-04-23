// Actions Types
import * as actions from './actions/Api';

const fetchApiData = (link, action) => {
    console.log(link);
    console.log(action);
    fetch(link)
    .then(response => response.json())
    .then(json => {
        if(json.error) {
            throw(json.error);
        } else {
            action(json);
        }
    })
    .catch(error => {
        actions.fetchApiError(error);
    })
}

export default fetchApiData;