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
        //use helper function to get template
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                view.appendChild(clone);
                view.getData();
            })
    };

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
    };

    displayElements(all) {
        $.grab('#title').textContent = this.title;
        const staffContainer = $.grab('#staffContainer');
        // clear out the list before showing the new one
        $.empty(staffContainer);
        // show a default message if there's no staff to show
        if (all.length === 0) {
            const p = $.make('p', '', 'No staff to show. A Webmaster could add them for you!');
            staffContainer.append(p);
        } else {
            // create a "card" for each staff member
            all.forEach(staffMbr => {
                const mbrCard = $.make('staff-card');
                staffContainer.append(mbrCard);
                mbrCard.setMember(staffMbr);
            });
        };
    };

};

customElements.define('home-view', Homeview);