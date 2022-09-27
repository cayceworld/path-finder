/* eslint-disable */

class Finder {
  constructor(element) {
    const thisFinder = this;

    // save reference to finder page div
    thisFinder.element = document.getElementById('finder-place-template');

    // start at step 1
    thisFinder.step = 1;

    // render view for the first time
    thisFinder.render();
  }

  render() {
    const thisFinder = this;

    // decelerate object with data for template 
    let pageData = null
    switch (thisFinder.step) {
      case 1:
        pageData = { title: 'Draw routes', buttonText: 'Finish drawing' };
        break;
      case 2:
        pageData = { title: 'Pick start and finish', buttonText: 'Compute' };
        break;
      case 3:
        pageData = { title: 'The best route is', buttonText: 'Start again' };
        break;
    }


    // get template container
    const template = document.getElementById('finder-template').innerHTML;

    // create function "tplCompile" to use template 
    const tplCompile = Handlebars.compile(template);

    // generatedHTML include "template" with content from "pageData"
    let generatedHTML = tplCompile(pageData);

    // insert "generatedHTML" to thisFinder.element
    thisFinder.element.insertAdjacentHTML('afterbegin', generatedHTML)

    // generate 100 fields for grid and add it to HTML
    let box = '';
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        box += '<div class="finder__box" data-row="' + row + '" data-col="' + col + '"></div>';
      }
    }

    thisFinder.element.querySelector('.finder__container').innerHTML = box;



  }
}

export default Finder; 