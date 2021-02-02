import NavBar from './_common/Navbar/navbar.js';
import Footer from './_common/Footer/footer.js';
import StaffCard from './webcomponents/Card/card.js';

import Homeview from './views/home/home.js';
import Linkview from './views/link/link.js';

//************************************************************************************************************** [ROUTER] This handles reading/changing the URLs and telling the controller which View to load

class Router {

    url = '';
    routes = [];
    root = './';
    loaded = false;

    appWindow = {};

    constructor() {
        this.appWindow = document.getElementById('page-content');
        this.routes = this.getRoutes();
        this.url = this.getRelativePath();
        this.navigateTo(this.url);
    };

    getRoutes() {
        const routes = [
            { slug: 'home', path: './', view: 'home-view' },
            { slug: 'link', path: './link', view: 'link-view' },
        ];
        return routes;
    };

    getRelativePath() {
        const relative = './' + location.pathname.split('/')[location.pathname.split('/').length - 1];
        return relative;
    }

    navigateTo(url) {
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
            match = {
                slug: routes[0],
                view: routes[0],
                isMatch: true,
            };
        };

        while (this.appWindow.firstChild) {
            this.appWindow.removeChild(this.appWindow.firstChild);
        }

        let requestedView = match.view;
        this.appWindow.append(document.createElement(requestedView));

        document.getElementById('navbar').setAttribute('page', match.slug);

        if (!this.loaded) {
            //************** [FIRST PAGE LOAD] Things that MUST wait until the very end!
            document.addEventListener('DOMContentLoaded', () => {
                document.addEventListener('click', e => {
                    if (e.target.matches('[data-link]')) {
                        e.preventDefault();
                        app.navigateTo(e.target.href);
                    };
                });
                // other stuff can go here if need be
            });
            this.loaded;
        }
    }

}


//************************************************************************************************************** [APP] Believe it or not, this one line is what 'starts' the whole website
const app = new Router;