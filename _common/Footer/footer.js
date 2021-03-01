export default class Footer extends HTMLElement {

    slug = 'footer';
    location = './_common/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures
	links = [];
    loaded = false

    constructor() {
        super();
        const self = this;
        $.TEXT('./footer.txt').then(text => {
            self.links = $.textToObject(text)
        });
    };

    static get observedAttributes() {
        return [''];
    };

    connectedCallback() {
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
                    const Emerg = $.grab('#Em-links', self)
                    const nonEm = $.grab('#non-Em-links', self)
                    const other = $.grab('#other-links', self)
                    self.links.forEach(link => {
                        const type = link.type
                        const li = $.make('li', 'nav-item')
                        const a = $.make('a', 'nav-link', link.label.trim())
                        a.setAttribute('href', `${link.url.trim()}`)
                        li.appendChild(a)
                        if (type == '12W-emergency') { Emerg.appendChild(li) }
                        else if (type == 'non-emergency') { nonEm.appendChild(li) }
                        else if (type == 'other') { other.appendChild(li) }
                    })
                    self.loaded = true
                })
        }
    };

    getTemplate() {
        const html = $.HTML(this.location + this.slug + '.html') // <-- folder name, template name, and this ".js" file name must all match the "slug" name
        return html
    };

};

customElements.define('foot-bar', Footer);