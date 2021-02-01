//************************************************************************************************************** [ROUTER] This handles changing the URLs and serving the correct view
history.pushState(null, null, './');
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { slug: 'home', path: './', view: () => console.log('viewing main page') },
        { slug: 'link', path: './link', view: () => console.log('viewing link page') },
    ];
    
    //this one looks ugly but it allows this app to be deployed on any server, rather than having to define the URL path it just figures it out on its own
    const relativePath = './' + location.pathname.split('/')[location.pathname.split('/').length - 1]; // Just grabs the last bit after the last slash

    const potentialMatches = routes.map(route => {
        return {
            slug: route.slug,
            route: route,
            isMatch: relativePath == route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
        match = {
        	slug: routes[0],
            route: routes[0],
            isMatch: true,
        };
    };

    match.route.view();
    document.getElementById('navbar').setAttribute('page', match.slug);
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        };
    })
    router();
});