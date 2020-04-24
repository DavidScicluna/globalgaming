// Actions Types
import * as actions from './actions/apiActions/Error';

const fetchApiData = (link, action) => {
    fetch(link)
    .then(response => response.json())
    .then(json => {
        if(json.status_message) {
            throw(json.status_message);
        } else {
            action(json);
        }
    })
    .catch(error => {
        actions.fetchApiError(error);
    })
}

export default fetchApiData;