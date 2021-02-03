export default class StaffCard extends HTMLElement {

    member = {};

    constructor() {
        super();
    };

    setMember(member) {
        const card = this;
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                clone.querySelector('[data-image]').src = member.imageURL;
                clone.querySelector('[data-title]').textContent = member.position;
                clone.querySelector('[data-subtitle]').textContent = `${member.rank} ${member.name}`;
                clone.querySelector('[data-bio]').textContent = member.bio;
                clone.querySelector('button').onclick = function () { card.openModal(member); };
                card.appendChild(clone);
            })    };

    connectedCallback() {
        //const menu = this;        
        //this.getTemplate()
        //    .then(function (response) {
        //        const clone = response;
        //        console.log(clone.querySelectorAll('div'))
        //        menu.appendChild(clone);
        //    })
    };

    getTemplate() {
        return fetch('./webcomponents/Card/card.html') // <-- template filename in here
            .then(function (response) {
                return response.text();
            }).then(function (html) {
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
        const mainModal = document.getElementById('mainModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');

        modalTitle.innerHTML = `${staffMbr.rank} ${staffMbr.name}`;
        modalText.innerHTML = staffMbr.longbio;

        var newModal = new bootstrap.Modal(mainModal);
        newModal.show();
    };

};

customElements.define('staff-card', StaffCard);