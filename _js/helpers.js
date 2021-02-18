export default class Helper {

    file = './file.txt';
    data = [];

    constructor() {
        // doesn't need to be constructed but we can put things in here for testing purposes
        this.TEXT(this.file, null).then(text => this.data = text);
    };

    textToObject(data, view, verbose) {
        // this function is insane but it turns our text files with very minimal formatting
        // into javascript objects we can use to iterate and display our data on our views
        const fil = el => el != null && el != '' && el.length > 2
        const reg1 = /{{.+?}}/
        const reg2 = /$[\n\s]{5,}^/m
        const reg3 = /^\s{3,}|\t/

        let obj = data.split(reg1).slice(1).join('\n')
            .split(reg2).filter(fil)
            .map(item => { return { contents: item.split('\n').filter(fil) } })
            .map(item => { return { contents: item.contents.map(str => str.split(': ')) } })
        if (verbose) { $.show(obj, 'After the core:') }
        // that's the core of it all, now we need to deal with unlabeled items
        let mark = 0;
        obj.forEach(item => item.contents.forEach((i, ind, me) => {
            if (i.length > 1) { mark = ind } else { me[mark].push(me[ind][0]) }
        }));
        if (verbose) { $.show(obj, 'After cleaning singles:') }
        //// check for nested lists
        obj.forEach(item => {
            mark = 0
            const tempArr = []
            let tempObj = {}
            item.contents.forEach((i, ind, me) => {
                let a, b, lastItem
                if (!i[0].match(reg3)) { mark = ind }
                if (i[0].match(reg3)) {
                    a = i[0].split(reg3)[1].trim()
                    b = i[1].trim()
                    a in tempObj ? lastItem = true : lastItem = false;
                    if (lastItem) {
                        tempArr.push(tempObj)
                        tempObj = {}
                    };
                    Object.defineProperty(tempObj, a, { value: b, writable: true, configurable: true })
                    if (ind == item.contents.length - 1) {
                        tempArr.push(tempObj)
                        me[mark][1] = tempArr
                    };
                };
            })
        });
        if (verbose) { $.show(obj, 'After figuring out nested items:') }
        // now to clean up the mess
        obj = obj.map(item => item.contents.filter(i => i.length > 1 && !i[0].match(reg3)))
            .map((item, ind) => {
                const itm = { id: ind }
                item.forEach(i => i.length == 2 && typeof i[1] == 'string'
                    ? itm[i[0].trim()] = i.slice(1).toString().trim()
                    : itm[i[0].trim()] = i.slice(1))
                return itm
            })
        if (verbose) { $.show(obj, 'After final cleanup:') }
        // what should we do with this data?
        // if it was called by a specific view, set their data values
        // otherwise just return it to the caller
        if (view) {
            view.pageContent = obj.filter(item => !('type' in item))
            view.repeatItems = obj.filter(item => ('type' in item))
            return 1
        } else return obj
    };

    show(out, str) {
        str ? str = str : str = 'Printed:';
        console.log(str, out);
    };

    grab(selector, parent) {
        const ele = {
            element: null,
            object: null,
        };
        parent ? ele.object = parent : ele.object = document;
        ele.element = ele.object.querySelector(selector);
        if (ele.element == null) try {
            ele.element = ele.object.querySelector('#' + selector);
        } catch (err) { console.log(err) }
        if (ele.element == null) try {
            ele.element = ele.object.querySelector('.' + selector);
        } catch (err) { console.log(err) }
        if (ele.element == null) try {
            ele.element = ele.object.querySelector('[' + selector + ']');
        } catch (err) { console.log(err) }
        return ele.element;
    };

    make(type, classes, content) {
        const elem = document.createElement(type);
        classes ? elem.className = classes : elem.className = null;
        content ? elem.innerHTML = content : elem.innerHTML = null;
        return elem;
    };

    contentItem(object, index, sender) {
        delete object['id']
        const self = this
        const type = Object.keys(object)[0]
        const content = object[type]
        let parent = null
        let child = null
        switch (type) {
            case 'title':
                parent = self.grab('#title', sender)
                parent.innerHTML = content
                break
            case 'subtitle':
                parent = self.grab('#content', sender)
                child = self.make('h4', '', content)
                parent.append(child)
                break
            case 'text':
                parent = self.grab('#content', sender)
                if (typeof content == 'object') {
                    content.forEach(txt => {
                        if (txt[0] == '<') { $.append($.make('div', '', txt), parent); }
                        else { $.append($.make('p', '', txt), parent); }
                    })
                } else {
                    $.append($.make('p', '', content), parent);
                }
                break
            case 'list':
                parent = self.grab('#content', sender)
                child = self.make('ul')
                content[0].forEach(item => {
                    child.append(self.make('li', '', item['item']))
                })
                parent.append(child)
                break
            case 'links':
                parent = self.grab('#content', sender)
                content[0].forEach(item => {
                    child = self.make('a', '', item['label'])
                    child.setAttribute('href', item['url'])
                    parent.append(child)
                    parent.append(document.createElement("BR"))
                })
                break
            case 'image':
                parent = self.grab('#content', sender)
                child = self.make('img')
                child.setAttribute('src', content[0][0]['url'])
                if (content[0][0]['classes']) { child.setAttribute('class', content[0][0]['classes']) }
                if (content[0][0]['width']) { child.setAttribute('width', content[0][0]['width']) }
                if (content[0][0]['height']) { child.setAttribute('height', content[0][0]['height']) }
                if (content[0][0]['description']) { child.setAttribute('alt', content[0][0]['description']) }
                parent.append(child)
                break
            case 'lines':
                parent = self.grab('#content', sender)
                let i = 0
                for (i = 0; i < parseInt(content); i++) {
                    parent.append(document.createElement("BR"))
                }
                break
            default:
                console.log('Object Type In Content Not Understood', content)
        }

    }

    repeatItem(object, index, sender) {
        const self = this
        let parent = null
        let child = null
        switch (object.type) {
            case 'contact card':
                parent = self.grab('#contactCards', sender)
                child = self.make('contact-card')
                child.setMember(object)
                parent.append(child)
                break
            case 'staff card':
                parent = self.grab('#staffCards', sender)
                child = self.make('staff-card')
                child.setMember(object)
                parent.append(child)
                break
            case 'accordion':
                parent = self.grab('#linksAccordion', sender)
                child = self.make('accordion-item')
                child.setItem(object, index)
                parent.append(child)
                break
            case 'links':
                parent = self.grab('#linksAccordion', sender)
                child = self.make('div', 'container p-5')
                let title = self.make('h4', '', object.category + ':')
                child.append(title)
                parent.append(child)
                object.links[0].forEach(item => {
                    let a = self.make('a', '', item['label'])
                    a.setAttribute('href', item['url'])
                    child.append(a)
                    child.append(document.createElement("BR"))
                })
                break
            default:
                console.log('Object Type In Repeats Not Understood')
        }
    }

    append(child, parent) {
        parent.appendChild(child);
    };

    empty(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        };
    };

    DOWNL(file, filename) {
        return fetch(file)
            .then(response => {
                return response.blob();
            })
            .then(file => {
                const url = URL.createObjectURL(file);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename || 'download';
                const clickHandler = () => {
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                        this.removeEventListener('click', clickHandler);
                    }, 150);
                };
                a.addEventListener('click', clickHandler, false);
                a.click();
            })
            .catch(err => {
                console.log('Failed to fetch file:', err);
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

    TEXT(file) {
        return fetch(file)
            .then(response => {
                return response.text();
            })
            .catch(err => {
                console.log('Failed to fetch TEXT:', err);
            });
    };
}	