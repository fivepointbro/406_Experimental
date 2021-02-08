//************************************************************************************************************** [IMPORTS] We need to make sure every component we use is imported
//********** [Helper] This contains a collection of 'helper' methods/functions that the app will use
import Helper from './_js/helpers.js';
//********** [Views] These are our special components that can be reused on multiple pages
import StaffCard from './webcomponents/card/card.js';
//********** [Views] These are our "pages"
import Homeview from './views/home/home.js';
import Linkview from './views/link/link.js';
import ASOview from './views/sections/aso/aso.js'


if (localStorage.viewMode) { document.querySelector('html').setAttribute('color-mode', localStorage.viewMode) };


//************************************************************************************************************** [ROUTER] This handles reading/changing the URLs and telling the controller which View to load

class Router {

    routes = [];
    loaded = false;

    appWindow = $.grab('#page-content');

    constructor() {
        this.navigateTo('./'); // defaults to home when it's first constructed
        const self = this;
        $.TEXT('./routes.txt').then(text => {
            self.routes = $.textToObject(text)
        });
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
                slug: route.slug.trim(),
                view: route.view.trim(),
                isMatch: relPath == route.path.trim()
            };
        });

        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
        if (!match) {
            router.displayView('home-view', 'home');
        } else { router.displayView(match.view, match.slug) }
    };

    displayView(view, slug) {

        const router = this;

        $.empty(this.appWindow);

        this.appWindow.append(document.createElement(view));

        document.getElementById('navbar').setAttribute('page', slug);
        const bar = document.getElementById('navbarCollapse');
        if (bar) {
            const hidebar = new bootstrap.Collapse(bar, { hide: true });
        }
        // the router has now loaded the page, set the navbar active link to white text, and closed the navbar 
        // if this is the first time we've loaded a page, we will run the function that adds special listeners
        // this changes link behavior on our site-specific links to NOT reload the page or query the server
        // this is the core function of our router, because all "views" (pages) are actually client-side
        // once the website is loaded, it can continue to display, even without an internet connection
        if (!router.loaded) {
            router.addListeners()
        };
    };

    addListeners() {
        this.loaded = true;
        listeners();
    };

}

function toggleDark() {
    const view = $.grab('html')
    const current = view.getAttribute('color-mode')
    if (current == 'light') {
        view.setAttribute('color-mode', 'dark')
        localStorage.viewMode = 'dark'
    } else {
        view.setAttribute('color-mode', 'light')
        localStorage.viewMode = 'light'
    }


}

function listeners() {
    // our special listeners, they prevent page reload for any link tags or buttons that have "data-link" as an attribute
    document.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            app.navigateTo(e.target.href);
        };
        if (e.target.matches('#modeswitch')) {
            toggleDark()
        }
    });
}

//************************************************************************************************************** [APP] This is the app-specific code
window.$ = new Helper();
//********** [Header & Footer] Since these are hard-coded on the HTML page, they need to be imported immediately after the Helper
import('./_common/navbar/navbar.js');
import('./_common/footer/footer.js');
//********** [App] Start the app.. no really, that's it
const app = new Router();