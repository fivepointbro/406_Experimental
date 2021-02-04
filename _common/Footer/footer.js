export default class Footer extends HTMLElement {

    slug = 'footer';
    location = './_common/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures

    constructor() {
        super();
    };

    static get observedAttributes() {
        return [''];
    };

    connectedCallback() {
        const menu = this;
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                menu.appendChild(clone);
            })
    };

    getTemplate() {
        const html = $.HTML(this.location + this.slug + '.html') // <-- folder name, template name, and this ".js" file name must all match the "slug" name
        return html
    };

};

customElements.define('foot-bar', Footer);