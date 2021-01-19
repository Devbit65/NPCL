import { SHOW_PDF_VIEW } from '../constants';
const initialState = {
    willShowPDFView: false
};

const appReducer = (state = initialState, action) => {
switch(action.type) {
    case SHOW_PDF_VIEW:
        return {
            ...state,
            data:action.payload
        };
        default:
        return state;
    }
}
export default appReducer;