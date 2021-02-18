export default class Accordion extends HTMLElement {

    slug = 'accordion';  // easy identifier
    location = './webcomponents/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures

    item = {};

    constructor() {
        super();
    };

    setItem(item, index) {
        const self = this
        const target = 'collapse' + index;
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                const button = $.grab('[accordion-button]', clone);
                button.innerHTML = item.category
                button.setAttribute('data-bs-target', '#' + target)
                button.setAttribute('aria-controls', target)
                const body = $.grab('[accordion-collapse]', clone);
                body.setAttribute('id', target);
                if (index == '0') {
                    button.setAttribute('aria-expanded', 'true')
                    button.classList.remove('collapsed')
                    body.classList.add('show');
                }
                const content = $.grab('[accordion-content]', clone);
                $.empty(content);
                $.append($.make('p', 'text-center accordion-description', item.description), content);
                if (item.text) {
                    item.text[0].forEach(item => {
                        $.append($.make('p', 'accordion-description', item.row), content)
                    })
                }
                if (item.links) {
                    item.links[0].forEach(item => {
                        if (!item.url.includes('http') && !item.url.includes('https')) { item.url = 'http://' + item.url }
                        const a = $.make('button', 'btn btn-primary m-2', item.label);
                        a.type = 'button'
                        a.addEventListener('click', e => { window.location.href = item.url })
                        $.append(a, content);
                    })
                }
                self.append(clone)
            })
    };
}

customElements.define('accordion-item', Accordion);