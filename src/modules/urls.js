class Urls {
    constructor() {
        this.url = 'http://192.168.0.16:80/';
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
}

export default urls = new Urls()