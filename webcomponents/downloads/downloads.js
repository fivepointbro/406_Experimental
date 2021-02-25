export default class Downloads extends HTMLElement {

    slug = 'downloads';  // easy identifier
    location = './webcomponents/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures

    folder = {};

    constructor() {
        super();
    };

    setFolder(item, index) {
        const self = this
        const target = 'collapse' + index;
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                const button = $.grab('[accordion-button]', clone);
                button.innerHTML = item.title
                button.setAttribute('data-bs-target', '#' + target)
                button.setAttribute('aria-controls', target)
                const body = $.grab('[accordion-collapse]', clone);
                body.setAttribute('id', target);
                if (index == '0') {
                    button.setAttribute('aria-expanded', 'true')
                    button.classList.remove('collapsed')
                    body.classList.add('show');
                }
                const content = $.grab('[download-content]', clone);
                $.empty(content);
                $.FOLDR(item.folder)
                	.then(result => {
                		const files = result.files
                		files.forEach(file => {
                		if (file.attributes == 2 || 
                			file.attributes == 4 || 
                			file.attributes == 34 || 
                			file.attributes == 38) {
                				// hidden files, you can do something with these if you want
                			} else {
                			if (file.type != 'TMP File') {	// we don't want to show TMP files...
                				let type = ''
                				let type1 = ''
                				switch (file.type) {
                					case 'Office Open XML Document':
                						type = 'docx'
                						type1 = '.docx'
                						break
                					case 'DOC File':
                						type = 'doc'
                						type1 = '.doc'
                						break
                					case 'DOTX File':
                						type = 'wps'
                						type1 = '.dotx'
                						break
                					case 'XLSX File':
                						type = 'xlsx'
                						type1 = '.xlsx'
                						break
                					case 'XLS File':
                						type = 'xls'
                						type1 = '.xls'
                						break
                					case 'PPT File':
                						type = 'ppt'
                						type1 = '.ppt'
                						break
                					case 'PPTX File':
                						type = 'ppt'
                						type1 = '.pptx'
                						break
                					case 'PDF File':
                						type = 'pdf'
                						type1 = '.pdf'
                						break
                					case 'PUB File':
                						type = 'php'
                						type1 = '.pub'
                						break
                					case 'HTML Document':
                						type = 'html'
                						type1 = '.html'
                						break
                					default:
                						type = 'any'
                						type1 = '.xxx'
                				}
                				const container = $.make('div', 'file-link')
                				const icon = $.make('div', 'fi fi-size-md fi-'+type)
                    			icon.addEventListener("click", e => { $.DOWNL(file.path, file.name) })
                    			const iconText = $.make('div', 'fi-content', type1)
                    			icon.append(iconText)
                    			container.append(icon)
                    			const nameText = $.make('p','',file.shortname)
                    			container.append(nameText)
                    			content.append(container)
                    			content.append(document.createElement("BR"))
                    			}
                			}
                		})
                	})
                self.append(clone)
            })
    };
}

customElements.define('downloads-list', Downloads);