import { SHOW_PDF_VIEW, REFRESH_INITIATED, INITIATE_REFRESH } from '../constants';
const initialState = {
    willShowPDFView: false
};

const appReducer = (state = initialState, action) => {
switch(action.type) {
    case SHOW_PDF_VIEW :
    case REFRESH_INITIATED :
    case INITIATE_REFRESH :
        return {
            ...state,
            data:action.payload
        };
        default:
        return state;
    }
}
export default appReducer;