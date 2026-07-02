/* Custom fix: hamburger menu for small screens. Not part of the original IONOS export. */
(function () {
    var MOBILE_BREAKPOINT = 1024;

    function init() {
        var header = document.querySelector('#dm .dmHeaderContent.freeHeaderRow1') ||
            document.querySelector('#dm .dmHeaderContent');
        var nav = document.querySelector('#dm nav.main-navigation.unifiednav');
        if (!header || !nav) return;

        nav.classList.add('mnf-nav');

        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'mnf-toggle';
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        header.insertBefore(toggle, header.firstChild);

        function closeAllSubmenus() {
            nav.querySelectorAll('.mnf-submenu-open').forEach(function (li) {
                li.classList.remove('mnf-submenu-open');
            });
        }

        function closeMenu() {
            document.body.classList.remove('mnf-open');
            toggle.setAttribute('aria-expanded', 'false');
            closeAllSubmenus();
        }

        toggle.addEventListener('click', function () {
            var open = document.body.classList.toggle('mnf-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (!open) closeAllSubmenus();
        });

        nav.querySelectorAll('.unifiednav__item_has-sub-nav .icon').forEach(function (icon) {
            icon.addEventListener('click', function (e) {
                if (window.innerWidth > MOBILE_BREAKPOINT) return;
                e.preventDefault();
                e.stopPropagation();
                var li = icon.closest('.unifiednav__item-wrap');
                if (!li || !li.parentElement) return;
                var wasOpen = li.classList.contains('mnf-submenu-open');
                li.parentElement.querySelectorAll(':scope > .unifiednav__item-wrap.mnf-submenu-open').forEach(function (sib) {
                    if (sib !== li) sib.classList.remove('mnf-submenu-open');
                });
                li.classList.toggle('mnf-submenu-open', !wasOpen);
            });
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth > MOBILE_BREAKPOINT) return;
            if (!document.body.classList.contains('mnf-open')) return;
            if (nav.contains(e.target) || toggle.contains(e.target)) return;
            closeMenu();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > MOBILE_BREAKPOINT) closeMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
