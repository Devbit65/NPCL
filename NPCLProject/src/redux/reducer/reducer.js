import { SHOW_PDF_VIEW, REFRESH_INITIATED, INITIATE_REFRESH, SHOW_PAYMENT_VIEW } from '../constants';
const initialState = {
    willShowPDFView: false,
    willShowPaymentView: false
};

const appReducer = (state = initialState, action) => {
switch(action.type) {
    case SHOW_PDF_VIEW :
    case SHOW_PAYMENT_VIEW :
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