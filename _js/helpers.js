export default class Helper {

    file = './file.txt';
    data = [];

    constructor() {
        this.TEXT(this.file, null).then(text => this.data = text);
    };

    textToObject(data) {
        // this function is insane but it turns any text file with almost any formatting
        // into a javascript object we can use to iterate and display it
        // honestly, so dope

        let obj = data.split(/(\n\s){3,}\n/).filter(el => el != null && el != '' && el.length > 2)
        obj = obj.map((person, ind) => {
            return {
                contents: person.split('\n').filter(el => el != null && el != '' && el.length > 2)
            }
        })
        obj = obj.map(person => {
            return {
                contents: person.contents.map(str => str.split(': '))
            }
        })
        let ticker = 0;
        obj.forEach(person => person.contents.forEach((i, ind, me) => {
            if (i.length > 1) { ticker = ind }
            else { me[ticker].push(me[ind][0]) }
        }))
        obj = obj.map(person => person.contents.filter(i => i.length > 1))
        obj = obj.map((person, ind, me) => {
            const pers = { id: ind }
            person.forEach(i => i.length == 2 ? pers[i[0]] = i.slice(1).toString() : pers[i[0]] = i.slice(1))
            return pers
        })

        return obj

    };

    SPLIT(splitter, indx) {
        self = this;

        indx ? self.data = self.data[indx].split(splitter) : self.data = self.data.split(splitter);
        self.data = self.data.filter(el => el != null && el != '');

        return self.data;
    };

    show(out, str) {
        str ? str = str : str = 'Printed:';
        console.log(str, out);
    }

    grab(selector, parent) {
        const ele = {
            value: null,
            object: null,
        };

        parent ? ele.object = parent : ele.object = document;

        ele.value = ele.object.querySelector(selector);

        if (ele.value == null) {
            ele.value = ele.object.querySelector('#' + selector);
        }
        if (ele.value == null) {
            ele.value = ele.object.querySelector('.' + selector);
        }
        if (ele.value == null) {
            ele.value = ele.object.querySelector('[' + selector + ']');
        }
        return ele.value;
    };

    grabAll(selector) {
        const nodeList = [];

        nodeList.push(document.querySelectorAll(selector));
        nodeList.push(document.querySelectorAll('#' + selector));
        nodeList.push(document.querySelectorAll('.' + selector));
        nodeList.push(document.querySelectorAll('[' + selector + ']'));

        return nodeList.find(i => i.length > 0);
    };

    make(type, classes, content) {
        const elem = document.createElement(type);

        classes ? elem.className = classes : elem.className = null;
        content ? elem.innerHTML = content : elem.innerHTML = null;

        return elem;
    };

    append(child, parent) {
        parent.appendChild(child);
    };

    empty(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        };
    };

    JSON(file) {
        return fetch(file)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                console.log('Failed to fetch JSON:', err);
            });

    };

    HTML(file, templateID) {
        const self = this;
        let temp = null;
        templateID ? temp = templateID : temp = 'template';
        return fetch(file)
            .then(response => {
                return response.text();
            }).then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const template = self.grab(temp, doc);
                return template.content.cloneNode(true);
            })
            .catch(err => {
                console.log('Failed to fetch HTML:', err)
            });

    };

    TEXT(file, pattern) {
        return fetch(file)
            .then(response => {
                return response.text();
            })
            .then(text => {
                return text;
            })
            .catch(err => {
                console.log('Failed to fetch TEXT:', err);
            });
    };
}	