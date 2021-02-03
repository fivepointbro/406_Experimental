export default class Helper {

	constructor() {
	}
	
	show(out) {
		console.log(out);
	}
	
	grab(selector) {
		const ele = { value: null };
		
		ele.value = document.querySelector(selector);
		
		if (ele.value == null) {
			ele.value = document.querySelector('#' + selector);
		}
		if (ele.value == null) {
			ele.value = document.querySelector('.' + selector);
		}
		if (ele.value == null) {
			ele.value = document.querySelector('[' + selector + ']');
		}
		return ele.value;
	};
	
	grabAll(selector) {
		const nodeList = [];
		
		nodeList.push(document.querySelectorAll(selector));
		nodeList.push(document.querySelectorAll('#' + selector));
		nodeList.push(document.querySelectorAll('.' + selector));
		nodeList.push(document.querySelectorAll('[' + selector + ']'));
				
		return nodeList.find( i => i.length > 0 );	
	};
	
	make(type, classes, content) {
		const elem = document.createElement(type);
		
		classes ? elem.className = classes : elem.className = null ;
		content ? elem.innerHTML = content : elem.innerHTML = null ;
		
		return elem;	
	};
	
	append(child, parent) {
		parent.appendChild(child);	
	};
	
	JSON(file) {};
	
	HTML(file) {
		return fetch(file)
			.then(function (response) {
                return response.text();
            }).then(function (html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const template = doc.getElementById('view');
                return template.content.cloneNode(true);
            })
            .catch(function (err) {
                console.log(err)
            })

	};
}	