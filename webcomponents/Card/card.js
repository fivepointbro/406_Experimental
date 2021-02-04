export default class StaffCard extends HTMLElement {

    slug = 'card';  // easy identifier
    location = './webcomponents/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures

    member = {};

    constructor() {
        super();
    };

    setMember(member) {
        const card = this;
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                $.grab('[data-image]', clone).src = member.imageURL;
                $.grab('[data-title]', clone).textContent = member.position;
                $.grab('[data-subtitle]', clone).textContent = `${member.rank} ${member.name}`;
                $.grab('[data-bio]', clone).textContent = member.bio;
                $.grab('button', clone).onclick = () => card.openModal(member);
                card.appendChild(clone);
            })
    };

    getTemplate() {
        return fetch('./webcomponents/Card/card.html') // <-- template filename in here
            .then(response => {
                return response.text();
            }).then(html=> {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const template = doc.querySelector('body').firstChild;
                return template.cloneNode(true);
            })
            .catch(function (err) {
                console.log(err)
            })
    };

    openModal(staffMbr) {
        const mainModal = $.grab('#mainModal');
        const modalTitle = $.grab('#modalTitle');
        const modalBody = $.grab('#modalBody');
        $.empty(modalBody);
        modalTitle.innerHTML = `${staffMbr.rank} ${staffMbr.name}`;
        const paragraphs = staffMbr.longbio
        paragraphs.forEach(txt => {
            $.append($.make('p', 'modal-text', txt), modalBody);
        })

        var newModal = new bootstrap.Modal(mainModal);
        newModal.show();
    };

};

customElements.define('staff-card', StaffCard);