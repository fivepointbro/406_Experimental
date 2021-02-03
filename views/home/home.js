export default class Homeview extends HTMLElement {

    // Every view will have these
    title = 'Showing Off Command Staff';
    slug = 'home';  // easy identifier
    data = 'staff.txt'; // name of data file, in same folder
    location = './views/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures
    url = './'; // must match one of the "routes" in the "router.js" file

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
                view.getData();
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
        document.getElementById('title').textContent = this.title
        const staffContainer = document.getElementById('staffContainer');
        // clear out the list before showing the new one
        while (staffContainer.firstChild) {
            staffContainer.removeChild(staffContainer.firstChild);
        }
        // show a default message if there's no staff to show
        if (all.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No staff to show. A Webmaster could add them for you!';
            staffContainer.append(p);
        } else {
            // create a "card" for each staff member
            all.forEach(staffMbr => {
                const mbrCard = document.createElement('staff-card');
                staffContainer.append(mbrCard);
                mbrCard.setMember(staffMbr);
            })
        }
    }

};

customElements.define('home-view', Homeview);