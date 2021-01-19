import { SHOW_PDF_VIEW } from '../constants';
export function showPDFView(willShowPdfView, date) {
    return {
        type: SHOW_PDF_VIEW,
        payload: {willShowPdfView:willShowPdfView,date:date}
    }
}