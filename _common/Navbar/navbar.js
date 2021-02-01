class NavBar extends HTMLElement {

    constructor() {
        super();
    };

    static get observedAttributes() {
        return ["page"];
    }

    connectedCallback() {
        const menu = this;
        const page = this.getAttribute('page');
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                clone.getElementById(page).classList.add('active');
                menu.appendChild(clone);
            })
    }

    getTemplate() {
        return fetch('./_common/Navbar/navbar.html') // <-- template filename in here
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

    setActive(page) {

    }
};

customElements.define('nav-bar', NavBar);