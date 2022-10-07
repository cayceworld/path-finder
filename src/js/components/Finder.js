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

    thisFinder.points = {
      start: null,
      end: null

    };



    // render view for the first time
    thisFinder.render();


  };


  getDataAttribute(field) {
    const thisFinder = this;

    // get row and col info from field elem attrs
    thisFinder.attribute = {
      row: field.getAttribute('data-row'),
      col: field.getAttribute('data-col')
    }


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

    thisFinder.boxes = document.querySelectorAll('.finder__box');


    if (thisFinder.grid != null) {
      for (let box of thisFinder.boxes) {

        thisFinder.getDataAttribute(box);

        if (thisFinder.grid[thisFinder.attribute.row][thisFinder.attribute.col]) {
          box.classList.add('active')
        }

      }
    }

    thisFinder.initActions();

  };

  changeStep(newStep) {
    const thisFinder = this;

    thisFinder.step = newStep;
    thisFinder.render();
    console.log('change step')
    console.log(thisFinder)

  };

  toggleField(fieldElem) {
    const thisFinder = this;

    thisFinder.getDataAttribute(fieldElem);

    const field = {
      row: thisFinder.attribute.row,
      col: thisFinder.attribute.col
    }

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
        //console.log(edgeFields);

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

  togglePoints(field) {
    const thisFinder = this;

    thisFinder.getDataAttribute(field)

    // toggle start or end points, add or remove coordinates to thisFinder.points 
    if (field.classList.contains('start-point')) {
      thisFinder.points.start = null;
      field.classList.remove('start-point');
    } else if (thisFinder.points.start == null) {
      thisFinder.points.start = thisFinder.attribute;
      field.classList.add('start-point');
    } else {
      if (field.classList.contains('end-point')) {
        thisFinder.points.end = null;
        field.classList.remove('end-point');
      } else if (thisFinder.points.end == null && thisFinder.points.start != null) {
        thisFinder.points.end = thisFinder.attribute;
        field.classList.add('end-point');
      }
    }

    console.log('points:', thisFinder.points)

  };

  initActions() {
    const thisFinder = this;


    const finderButton = thisFinder.element.querySelector('.finder__button');

    switch (thisFinder.step) {
      case 1:
        finderButton.addEventListener('click', function (e) {
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
        finderButton.addEventListener('click', function (e) {
          e.preventDefault();
          thisFinder.changeStep(3);
        });

        for (let box of thisFinder.boxes) {
          if (box.classList.contains('active')) {
            box.addEventListener('click', function () {
              thisFinder.togglePoints(box);
            })
          }
        }
        break;
      case 3:
        finderButton.addEventListener('click', function (e) {
          e.preventDefault();
          thisFinder.changeStep(1);
        });

        /* //reset all grid fields 
        for (let row = 1; row <= 10; row++) {
          thisFinder.grid[row] = {}
          for (let col = 1; col <= 10; col++) {
            thisFinder.grid[row][col] = false
          }
        }
        //reset points
        thisFinder.points.start = null;
        thisFinder.points.end = null; */


        break;
    };
  };
}

export default Finder; 