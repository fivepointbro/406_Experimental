import NavBar from './_common/Navbar/navbar.js';
import Footer from './_common/Footer/footer.js';
import StaffCard from './webcomponents/Card/card.js';

import Homeview from './views/home/home.js';
import Linkview from './views/link/link.js';

//************************************************************************************************************** [ROUTER] This handles reading/changing the URLs and telling the controller which View to load

class Router {

    routes = [
        { slug: 'home', path: './', view: 'home-view' },
        { slug: 'link', path: './link', view: 'link-view' },
    ];
    loaded = false;

    appWindow = document.getElementById('page-content');

    constructor() {
        this.navigateTo(this.routes[0].path); // defaults to home when it's first constructed
    };

    getRelativePath() {
        const relative = './' + location.pathname.split('/')[location.pathname.split('/').length - 1];
        return relative;
    }

    navigateTo(url) {
        const router = this;
        history.pushState(null, null, url);
        const relPath = this.getRelativePath();
        const potentialMatches = this.routes.map(route => {
            return {
                slug: route.slug,
                view: route.view,
                isMatch: relPath == route.path
            };
        });

        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
        if (!match) {
            router.navigateTo(router.routes[0].path);
        };

        this.displayView(match.view, match.slug);
    };

    displayView(view, slug) {

        const router = this;

        while (this.appWindow.firstChild) {
            this.appWindow.removeChild(this.appWindow.firstChild);
        }

        this.appWindow.append(document.createElement(view));

        document.getElementById('navbar').setAttribute('page', slug);

        if (!router.loaded) {
            router.addListeners()
        };
    };

    addListeners() {
        this.loaded = true;
        listeners();
    };

}


//************************************************************************************************************** [APP] Believe it or not, this small handful of lines sets off the rest of the code

function listeners() {

    document.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            app.navigateTo(e.target.href);
        };
    });
}

const app = new Router();