import { SHOW_PDF_VIEW, REFRESH_INITIATED, INITIATE_REFRESH, SHOW_PAYMENT_VIEW} from '../constants';
export function showPDFView(willShowPdfView, pdfURL) {
    return {
        type: SHOW_PDF_VIEW,
        payload: {
            type: SHOW_PDF_VIEW,
            willShowPdfView:willShowPdfView,
            pdfURL:pdfURL
        }
    }
}

export function showPaymentView(willShowPaymentView, paymentMethod) {
    return {
        type: SHOW_PAYMENT_VIEW,
        payload: {
            type: SHOW_PAYMENT_VIEW,
            willShowPaymentView:willShowPaymentView,
            paymentMethod:paymentMethod
        }
    }
}

export function inInitiateRefresh() {
    return {
        type: INITIATE_REFRESH,
        payload: {
            type: INITIATE_REFRESH,
            willRefreshStart:true
        }
    }
}

export function onRefreshInitiated() {
    return {
        type: REFRESH_INITIATED,
        payload: {
            type: REFRESH_INITIATED
        }
    }
}