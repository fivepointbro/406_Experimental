export default class Linkview extends HTMLElement {

    // Every view will have these
    title = 'Could be Links?';
    slug = 'link';  // easy identifier
    data = ''; // name of data file, in same folder
    location = './views/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures
    url = './link'; // must match one of the "routes" in the "router.js" file

    // the nature of the data you're working with, give it an easy name to work with or just leave it
    stuff = [];
    // make sure to change the call inside the constructor and a few other spots!

    constructor() {
        super();
    };

    connectedCallback() {
        const view = this;
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                view.appendChild(clone);
                //view.getData(); <-- don't have any yet
                view.onDataChanged() // normally wouldn't call this manually
            })
    }

    getTemplate() {
        return fetch(this.location + this.slug + '.html') // <-- folder name, template name, and this ".js" file name must all match the "slug" name
            .then(function (response) {
                return response.text();
            }).then(function (html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const template = doc.getElementById('view');
                return template.content.cloneNode(true);
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    getData() {
        let view = this;
        fetch(this.location + this.data)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                view.stuff = json;
                view.onDataChanged();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onDataChanged() {
        this.displayElements(this.stuff); // <--
    }

    displayElements(all) {
        document.getElementById('title').textContent = this.title;    
    }

};

customElements.define('link-view', Linkview);