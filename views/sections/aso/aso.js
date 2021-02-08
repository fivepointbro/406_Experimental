export default class ASOview extends HTMLElement {

    // Every view will have these
    slug = 'aso';  // page identifier
    data = 'aso.txt'; // name of data file, in same folder
    location = './views/sections/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures completely

    // the blocks of the data you're working with, brilliantly derived from a .txt file
    pageContent = [];
    repeatItems = [];

    constructor() {
        super();
    };

    connectedCallback() {
        const self = this;
        // get the template, then the data, then display it all
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                self.appendChild(clone);
            }).then(reply => {
                $.TEXT(this.location + this.data)
                    .then(response => {
                        $.textToObject(response, self);
                    }).then(response => {
                        self.displayContent(self.pageContent);
                        self.displayRepeats(self.repeatItems);
                    })
            })
    };

    displayContent(all) {
        $.grab('#title').textContent = all.title;
        const contentDiv = $.grab('#content')
        const paragraphs = all.content
        if (typeof paragraphs == 'object') {
            paragraphs.forEach(txt => {
                $.append($.make('p', '', txt), contentDiv);
            })
        } else {
            $.append($.make('p', '', paragraphs), contentDiv);
        }
    };

    displayRepeats(all) {
        const accordion = $.grab('#linksAccordion');
        // clear out the list before showing the new one
        $.empty(accordion);
        // show a default message if there's no stuff to show
        if (all.length === 0) {
            const p = $.make('p', '', 'No links to show. A Webmaster could add them for you!');
            accordion.append(p);
        } else {
            // insert a version of our template for each link
            all.forEach((link, indx) => {
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
                        link.links[0].forEach(item => {
                            const a = $.make('button', 'btn btn-primary m-2', item.label);
                            a.setAttribute('href', item.url);
                            $.append(a, content);
                        })
                        $.append(clone, accordion);
                    })
            })
        };
    };
};

customElements.define('aso-view', ASOview);