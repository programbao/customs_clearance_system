document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
        const menuLinks = sidebar.querySelectorAll('.menu-link.has-submenu');

        menuLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const parentMenuItem = link.parentElement;

                // Toggle the active class on the main menu link for the arrow rotation
                link.classList.toggle('active');

                // Toggle the active class on the submenu to show/hide it
                const submenu = parentMenuItem.querySelector('.submenu');
                if (submenu) {
                    submenu.classList.toggle('active');
                }
            });
        });
    }
});
