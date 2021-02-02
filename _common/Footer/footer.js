export default class Footer extends HTMLElement {

    constructor() {
        super();
    };

    static get observedAttributes() {
        return [""];
    }

    connectedCallback() {
        const menu = this;
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                menu.appendChild(clone);
            })
    }

    getTemplate() {
        return fetch('./_common/Footer/footer.html') // <-- template filename in here
            .then(function (response) {
                return response.text();
            }).then(function (html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const template = doc.getElementById('component');
                return template.content.cloneNode(true);
            })
            .catch(function (err) {
                console.log(err)
            })
    }

};

customElements.define('foot-bar', Footer);