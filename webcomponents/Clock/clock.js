export default class Clock extends HTMLElement {

    timeNow = {};

    constructor() {
        super();
    };

    monitorTime() {
        this.timeNow = new Date();
        this.displayElements(this.timeNow);
        const t = setTimeout(this.monitorTime, 500);
    }

    getTemplate() {
        return fetch('./webcomponents/Clock/clock.html') // <-- template filename in here
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
    };

    connectedCallback() {
        const component = this;
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                component.appendChild(clone);
                component.monitorTime();
            });
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
                mbrCard.member = staffMbr;
                staffContainer.append(mbrCard);
            })
        }
    }


};

customElements.define('java-clock', Clock);