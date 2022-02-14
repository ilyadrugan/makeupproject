class Urls {
    constructor() {
        this.url = 'http://cv32950.tmweb.ru/';
    }

    categories_procedures() {
        return `${this.url}api/categories_procedures/`
    }

    category_procedure(id) {
        return `${this.url}api/categories_procedures/${id}/`
    }
    procedures() {
        return `${this.url}api/procedures/`
    }

    procedure(id) {
        return `${this.url}api/procedures/${id}/`
    }
    contacts(id) {
        return `${this.url}api/contacts/${id}/`
    }
    requests() {
        return `${this.url}api/requests/`
    }
    mainpage_photos() {
        return `${this.url}api/mainpage_photos/`
    }
}

export default urls = new Urls()