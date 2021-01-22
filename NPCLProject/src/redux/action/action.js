import { SHOW_PDF_VIEW, REFRESH_INITIATED, INITIATE_REFRESH} from '../constants';
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