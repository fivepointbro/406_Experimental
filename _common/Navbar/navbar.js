export default class NavBar extends HTMLElement {

    slug = 'navbar';
    location = './_common/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures

    constructor() {
        super();
    };

    static get observedAttributes() {
        return ["page"];
    }

    connectedCallback() {
        const menu = this;
        const page = this.getAttribute('page');
        this.getTemplate()
            .then(function (response) {
                const clone = response;
                clone.getElementById('link-' + page).classList.add('active');
                menu.appendChild(clone);
            })
    }

    getTemplate() {
        const html = $.HTML(this.location + this.slug + '.html') // <-- folder name, template name, and this ".js" file name must all match the "slug" name
        return html
    }

    attributeChangedCallback(name, oldValue, newValue) {
    	if (this.hasChildNodes()) {
    	    	document.getElementById('link-' + oldValue).classList.remove('active');
    	    	document.getElementById('link-' + newValue).classList.add('active');	
    	}else{
    			// no big deal, DOM just isn't fully loaded yet
    	}
    	
    }
};

customElements.define('nav-bar', NavBar);