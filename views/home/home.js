export default class Homeview extends HTMLElement {

    // Every view will have these
    slug = 'home';  // page identifier
    data = 'staff.txt'; // name of data file, in same folder
    location = './views/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures completely

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
        const staffContainer = $.grab('#staffContainer');
        $.empty(staffContainer);
        if (all.length === 0) {
            const p = $.make('p', '', 'No staff to show. A Webmaster could add them for you!');
            staffContainer.append(p);
        } else {
            all.forEach(staffMbr => {
                const mbrCard = $.make('staff-card');
                staffContainer.append(mbrCard);
                mbrCard.setMember(staffMbr);
            });
        };
    };

};

customElements.define('home-view', Homeview);