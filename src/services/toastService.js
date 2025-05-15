import { toast } from 'vue3-toastify';

export class ToastService {
    constructor() {

    }

    success(message, title = "") {
        toast(message, {
            "title": title,
            "theme": "dark",
            "type": "success",
            "dangerouslyHTMLString": true
          });
    }

    error(message, title = "") {
        toast(message, {
            "title": title,
            "theme": "dark",
            "type": "error",
            "dangerouslyHTMLString": true
          });
    }
}
