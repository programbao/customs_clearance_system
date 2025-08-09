document.addEventListener('DOMContentLoaded', () => {

    const routes = {
        '/export/general': 'export-general',
        '/export/special': 'export-special',
        '/import/data-management': 'import-data-management',
        '/import/summary': 'import-summary',
        '/bonded/domestic': 'bonded-domestic',
        '/bonded/foreign': 'bonded-foreign',
        '/inspection/export': 'inspection-export',
        '/inspection/import': 'inspection-import',
        '/ops/export-declaration': 'ops-export-declaration',
        '/ops/import-declaration': 'ops-import-declaration',
        '/ops/domestic-declaration': 'ops-domestic-declaration',
        '/ops/foreign-declaration': 'ops-foreign-declaration',
        '/ops/export-settlement': 'ops-export-settlement',
        '/ops/import-settlement': 'ops-import-settlement',
        '/data/company': 'data-company',
        '/data/materials': 'data-materials',
        '/data/finished-goods': 'data-finished-goods',
        '/data/templates': 'data-templates',
    };

    const pages = document.querySelectorAll('.page');
    const submenuLinks = document.querySelectorAll('.submenu-link');

    function router() {
        const path = window.location.hash.substring(1) || '/export/general'; // Default route
        const pageId = routes[path];

        // Hide all pages
        pages.forEach(page => page.style.display = 'none');

        // Show the active page
        if (pageId) {
            const activePage = document.getElementById(pageId);
            if (activePage) {
                activePage.style.display = 'block';
            }
        }

        // Update active class on submenu links
        submenuLinks.forEach(link => {
            if (link.getAttribute('href') === `#${path}`) {
                link.classList.add('active');
                // Also ensure its parent menu is open
                const parentSubmenu = link.closest('.submenu');
                const parentMenuLink = parentSubmenu.previousElementSibling;
                if (parentSubmenu && !parentSubmenu.classList.contains('active')) {
                    parentSubmenu.classList.add('active');
                    parentMenuLink.classList.add('active');
                }
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
});
