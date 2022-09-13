

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector('#pages').children;
    thisApp.navLinks = document.querySelectorAll('.header__menu a');
    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;
    thisApp.activatePage(pageMatchingHash);


    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }

    }



    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');


        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },
  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle('active', link.getAttribute('href') == '#' + pageId);
    }
  },




  init: function () {
    const thisApp = this;
    thisApp.initPages();
  },
};


app.init();