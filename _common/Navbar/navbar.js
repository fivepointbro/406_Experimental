export default class NavBar extends HTMLElement {

    slug = 'navbar';
    location = './_common/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures
    routes = [];
    loaded = false

    constructor() {
        super();
        const self = this;
        $.TEXT('./routes.txt').then(text => {
            self.routes = $.textToObject(text)
        });
    };

    static get observedAttributes() {
        return ["page"];
    }

    connectedCallback() {
        const page = this.getAttribute('page');
        const self = this;
        if (!self.loaded) {
            // get the template, then the data, then display it all
            $.HTML(this.location + this.slug + '.html')
                .then(response => {
                    const clone = response;
                    self.appendChild(clone);
                    self.loaded = true;
                })
                .then(r => {
                    const links = $.grab('#nav-links', self)
                    const sections = $.grab('#section-links', self)
                    const safety = $.grab('#safety-links', self)
                    const training = $.grab('#training-links', self)
                    self.routes.forEach(route => {
                        const type = route.type
                        const li = $.make('li', 'nav-item')
                        const a = $.make('a', 'nav-link', route.name.trim())
                        a.setAttribute('id', `link-${route.slug.trim()}`)
                        a.setAttribute('router-link', `${route.path.trim()}`)
                        li.appendChild(a)
                        if (type == '406') { links.appendChild(li) }
                        else if (type == 'amo') { sections.appendChild(li) }
                        else if (type == 'safety') { safety.appendChild(li) }
                        else if (type == 'training') { training.appendChild(li) }
                        
                        $.grab(`#link-${page}`).classList.add('active')
                        self.loaded = true
                    })
                })
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
    	if (this.hasChildNodes()) {
    	    	$.grab('#link-' + oldValue).classList.remove('active');
    	    	$.grab('#link-' + newValue).classList.add('active');	
    	}else{
    			// no big deal, DOM just isn't fully loaded yet
    	}    	
    }

};

customElements.define('nav-bar', NavBar);