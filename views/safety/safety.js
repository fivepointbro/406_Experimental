export default class Safetyview extends HTMLElement {

    // Every view will have these
    slug = 'safety';  // page identifier
    data = ''; // name of data file, in same folder
    location = './views/safety/'; // you shouldn't need to touch this unless you change folder structures completely

    // the blocks of the data you're working with, brilliantly derived from a .txt file
    pageContent = [];
    repeatItems = [];

    constructor() {
        super();
    };

    build() {
        const self = this;
        // get the template, then the data, then display it all
        $.HTML(this.location + 'safety.html')
            .then(response => {
                const clone = response;
                self.appendChild(clone);
            })
            .then(reply => {
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
        const self = this
        if (all.length === 0) {
            const p = $.make('p', 'd-none', 'No main content to show. Contact the unit webmaster!');
            self.appendChild(p);
        } else {
            all.forEach((item, ind) => {
                $.contentItem(item, ind, self);
            });
        };
    };

    displayRepeats(all) {
        const self = this
        if (all.length === 0) {
            const p = $.make('p', 'd-none', 'No repeat content to show. Contact the unit webmaster!');
            self.appendChild(p);
        } else {
            all.forEach((item, ind) => {
                $.repeatItem(item, ind, self);
            });
        };
    };
};

customElements.define('safety-view', Safetyview);