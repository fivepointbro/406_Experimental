//************************************************************************************************************** [IMPORTS] We need to make sure every component we use is imported
//********** [Helper] This contains a collection of 'helper' methods/functions that the app will use
import Helper from './_js/helpers.js';
//********** [Views] These are our special components that can be reused on multiple pages
import StaffCard from './_webcomponents/card/card.js';
import ContactCard from './_webcomponents/contactcard/contactcard.js';
import Accordion from './_webcomponents/accordion/accordion.js';
import Downloads from './_webcomponents/downloads/downloads.js';
import Course from './_webcomponents/course/course.js';
//********** [Views] These are our page templates
import Mainview from './_views/main.js';

// Was the user in dark mode before?
if (localStorage.viewMode) { document.querySelector('html').setAttribute('color-mode', localStorage.viewMode) };


//************************************************************************************************************** [ROUTER] This handles reading/changing the URLs and telling the controller which View to load

class Router {

    routes = [];
    views = [];
    loaded = false;

    appWindow = $.grab('#page-content');

    constructor() {
        const self = this;
        $.TEXT('./routes.txt').then(text => {
            self.routes = $.textToObject(text)
            return self.routes
        }).then(reply => { // builds the page templates
            const b = []
            reply.forEach(item => {
                const a = {}
                const c = $.make('main-view')
                a.slug = item.slug
                c.slug = item.slug
                c.data = item.type + '/' + item.slug + '.txt'
                c.build()
                a.view = c
                b.push(a)
            })
            self.views = b
        }).finally(a => {
            self.navigateTo(self.getRelativePath()); // navigate to wherever we currently are
        })
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
                isMatch: relPath == route.path.trim()
            };
        });

        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
        if (!match) {
            router.navigateTo('./')
        } else {
            const a = router.views.filter(view => view.slug == match.slug)
            router.displayView(a[0].view, match.slug)
        }
    };

    displayView(view, slug) {

        const router = this;

        $.empty(this.appWindow);

        this.appWindow.append(view);

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

function toggleDark() { // we've got dark mode!
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
// our special listeners, they prevent page reload for any links that have "router-link" as an attribute
function listeners() {
    document.addEventListener('click', e => {
        if (e.target.matches('[router-link]')) {
            e.preventDefault();
            app.navigateTo(e.target.getAttribute('router-link'));
        };
        if (e.target.matches('#modeswitch')) {
            toggleDark()
        }
    });
}
//************************************************************************************************************** [APP] This is the app-specific code
window.$ = new Helper();
//********** [Header & Footer] Since these are hard-coded on the HTML page, they need to be imported before starting the app
import('./_common/navbar/navbar.js');
import('./_common/footer/footer.js');
//********** [Tooltips] Enable tooltips

//********** [App] Start the app.. no really, that's it
const app = new Router();