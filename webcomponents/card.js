const template = document.createElement('template');
template.innerHTML = `
<div class="d-flex flex-column align-content-start shadow-lg p-2 staff-card" style="width: 16rem; height: 28rem; border-radius: 0.6rem;">
    <img class="card-img-top mx-auto" style="width: 15rem; height: 15rem; object-fit: cover; border-radius: 0.5rem;">
    <div class="card-body">
        <h5 class="card-title"></h5>
        <h6 class="card-subtitle mb-2 text-muted"></h6>
        <p class="card-text"></p>
    </div>
    <button href="" class="btn btn-primary mt-auto">Read Bio</button>
</div>
`;


class StaffCard extends HTMLElement {

    constructor() {
        super();           
    };

    set member(member) {
        const clone = template.content.cloneNode(true);
        const cardDiv = clone.children[0].children;
        cardDiv[0].src = member.imageURL;
        cardDiv[1].children[0].innerText = member.position;
        cardDiv[1].children[1].innerText = `${member.rank} ${member.name}`;
        cardDiv[1].children[2].innerText = member.bio;
        cardDiv[2].onclick = function() { app.view.openModal(member); };
        this.appendChild(clone);
    }

    handleClick() {
        console.log('clicked');
    }
};

customElements.define('staff-card', StaffCard);