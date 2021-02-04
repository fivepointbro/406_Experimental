export default class Linkview extends HTMLElement {

    // Every view will have these
    title = 'Links and References';
    slug = 'link';  // easy identifier
    data = 'links.txt'; // name of data file, in same folder
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
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                view.appendChild(clone);
                view.getData();
            })
    }

    makeLinks(link, indx) {
        const self = this;
        const target = 'collapse' + indx;
        const accordion = $.grab('#linksAccordion');
        $.HTML(this.location + this.slug + '.html', '#item')
            .then(response => {
                const clone = response;
                const button = $.grab('[accordion-button]', clone);
                button.innerHTML = link.type
                button.setAttribute('data-bs-target', '#' + target)
                button.setAttribute('aria-controls', target)
                const body = $.grab('[accordion-collapse]', clone);
                body.setAttribute('id', target);
                if (indx == '0') {
                    button.setAttribute('aria-expanded', 'true')
                    button.classList.remove('collapsed')
                    body.classList.add('show');
                }
                const content = $.grab('[accordion-content]', clone);
                $.empty(content);
                $.append($.make('p', 'text-center accordion-description', link.description), content);
                link.links.forEach(item => {
                    const a = $.make('button', 'btn btn-primary m-2', item.label);
                    a.setAttribute('href', item.url);
                    $.append(a, content);
                })                
                $.append(clone, accordion);
            })
    }

    getData() {
        let view = this;
        $.JSON(this.location + this.data)
            .then(response => {
                view.stuff = response;
                view.onDataChanged();
            });
    };

    onDataChanged() {
        this.displayElements(this.stuff); // <--
    }

    displayElements(all) {
        const self = this;
        $.grab('#title').textContent = this.title;
        const accordion = $.grab('#linksAccordion');
        // clear out the list before showing the new one
        $.empty(accordion);
        // show a default message if there's no staff to show
        if (all.length === 0) {
            const p = $.make('p', '', 'No links to show. A Webmaster could add them for you!');
            accordion.append(p);
        } else {
            // insert a version of our template for each link
            all.forEach((link, indx) => { self.makeLinks(link, indx) })
            };
        };
    };

customElements.define('link-view', Linkview);