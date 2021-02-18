export default class ContactCard extends HTMLElement {

    slug = 'contactcard';  // easy identifier
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
                $.grab('[data-image]', clone).src = member.image || './images/blank.jpg';
                $.grab('[data-title]', clone).textContent = member.position || '';
                $.grab('[data-subtitle]', clone).textContent = `${member.rank} ${member.name}`;
                $.grab('[data-phone]', clone).textContent = member.phone || '';
                $.grab('[data-office]', clone).textContent = member.office || '';
                $.grab('button', clone).addEventListener('click', e => { window.location = 'mailto:' + member.email })
                card.appendChild(clone);
            })
    };
}

customElements.define('contact-card', ContactCard);