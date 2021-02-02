export default class StaffCard extends HTMLElement {

    constructor() {
        super();
    };

    set member(member) {
        const card = this;
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                const cardDiv = clone.children[0].children;
                cardDiv[0].src = member.imageURL;
                cardDiv[1].children[0].innerText = member.position;
                cardDiv[1].children[1].innerText = `${member.rank} ${member.name}`;
                cardDiv[1].children[2].innerText = member.bio;
                cardDiv[2].onclick = function () { card.openModal(member); }
                card.appendChild(clone);
            })
    };

    getTemplate() {
        return fetch('./webcomponents/Card/card.html') // <-- template filename in here
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