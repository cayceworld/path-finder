/* eslint-disable */

class Finder {
  constructor(element) {
    const thisFinder = this;

    // save reference to finder page div
    thisFinder.element = document.getElementById('finder-place-template');

    // start at step 1
    thisFinder.step = 1;


    thisFinder.grid = {}
    for (let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {}
      for (let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false
      }
    }
    console.log(thisFinder)


    // render view for the first time
    thisFinder.render();


  };


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
    thisFinder.element.innerHTML = generatedHTML; 

    // generate 100 fields for grid and add it to HTML
    let box = '';
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        box += '<div class="finder__box" data-row="' + row + '" data-col="' + col + '"></div>';
      }
    }
    thisFinder.element.querySelector('.finder__container').innerHTML = box;

    thisFinder.initActions();

  };

  changeStep(newStep) {
    const thisFinder = this;

    thisFinder.step = newStep;
    thisFinder.render();
    console.log('change step')

  };

  toggleField(fieldElem) {
    const thisFinder = this;

    // get row and col info from field elem attrs
    const field = {
      row: fieldElem.getAttribute('data-row'),
      col: fieldElem.getAttribute('data-col')
    };

    // if field with this row and col is true -> unselect it
    if (thisFinder.grid[field.row][field.col]) {
      thisFinder.grid[field.row][field.col] = false;
      fieldElem.classList.remove('active');
    }

    else {
      // flatten object to array of values e.g. [false, false, false]
      const gridValues = Object.values(thisFinder.grid)
        .map(col => Object.values(col))
        .flat();

      // if grid isn't empty...
      if (gridValues.includes(true)) {

        // determine edge fields
        const edgeFields = [];
        if (field.col > 1) edgeFields.push(thisFinder.grid[field.row][field.col - 1]); //get field on the left value
        if (field.col < 10) edgeFields.push(thisFinder.grid[field.row][Number(field.col) + 1]); //get field on the right value
        if (field.row > 1) edgeFields.push(thisFinder.grid[field.row - 1][field.col]); //get field on the top value
        if (field.row < 10) edgeFields.push(thisFinder.grid[Number(field.row) + 1][field.col]); //get field on the bottom value
        console.log(edgeFields)
        
        // if clicked field doesn't touch at least one that is already selected -> show alert and finish function
        if (!edgeFields.includes(true)) {
          alert('A new field should touch at least one that is already selected!');
          return;
        }
      }

      // select clicked field
      thisFinder.grid[field.row][field.col] = true;
      fieldElem.classList.add('active');
    }
  };


  initActions() {
    const thisFinder = this;

    switch (thisFinder.step) {
      case 1:
        thisFinder.element.querySelector('.finder__button').addEventListener('click', function (e) {
          e.preventDefault();
          thisFinder.changeStep(2);
        });

        thisFinder.element.querySelector('.finder__container').addEventListener('click', function (e) {
          e.preventDefault();
          if (e.target.classList.contains('finder__box')) {
            thisFinder.toggleField(e.target)
          }
        });
        break;
      case 2:
        break;
    };
  };
}

export default Finder; 