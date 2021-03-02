export default class StaffCard extends HTMLElement {

    slug = 'card';  // easy identifier
    location = './_webcomponents/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures

    member = {};

    constructor() {
        super();
    };

    setMember(member) {
        const card = this;
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                $.grab('[data-image]', clone).src = member.image;
                $.grab('[data-title]', clone).textContent = member.position;
                $.grab('[data-subtitle]', clone).textContent = `${member.rank} ${member.name}`;
                $.grab('[data-bio]', clone).textContent = member.bio;
                $.grab('button', clone).onclick = () => card.openModal(member);
                card.appendChild(clone);
            })
    };

    openModal(staffMbr) {
        const mainModal = $.grab('#mainModal');
        const modalTitle = $.grab('#modalTitle');
        const modalBody = $.grab('#modalBody');
        $.empty(modalBody);
        modalTitle.innerHTML = `${staffMbr.rank} ${staffMbr.name}`;
        const paragraphs = staffMbr.longbio
        if (typeof paragraphs == 'object') {
            paragraphs.forEach(txt => {
                $.append($.make('p', 'modal-text', txt), modalBody);
            })
        } else {
            $.append($.make('p', 'modal-text', paragraphs), modalBody);
        }
        var newModal = new bootstrap.Modal(mainModal);
        newModal.show();
    };

};

customElements.define('staff-card', StaffCard);