import solveRectanglularPrism from './rectangular-prism-solver.js';
import solveParallelogram from './parallelogram-solver.js';
import solveRectangle from './rectangle-solver.js';
import solveTrapezoid from './trapezoid-solver.js';
import solveEllipsoid from './ellipsoid-solver.js';
import solveTriangle from './triangle-solver.js';
import solveCylinder from './cylinder.solver.js';
import solveEllipse from './ellipse-solver.js';
import solvePolygon from './polygon-solver.js';
import solveCircle from './circle-solver.js';
import solveSquare from './square-solver.js';
import solveSphere from './sphere-solver.js';
import solveCube from './cube-solver.js';
import solveCone from './cone-solver.js';

import Component from '../../Component.js';
import toast from '../../toast.js';

export const Perimeter = 'Perimeter';
export const Volume = 'Volume';
export const Area = 'Area';

export default class Geometry extends Component {
  constructor(field) {
    super();

    this.field = field;
    let selectedShape = '';

    let shapes = {
      square: 'Square',
      rectangle: 'Rectangle',
      triangle: 'Triangle',
      circle: 'Circle',
      parallelogram: 'Parallelogram',
      trapezoid: 'Trapezoid',
      ellipse: 'Ellipse',
      cylinder: 'Cylinder',
      polygon: 'Polygon'
    }

    if (this.field === Volume) {
      shapes = {
        cube: 'Cube',
        rectangularPrism: 'Rectangular Prism',
        parallelogram: 'Parallelogram',
        cylinder: 'Cylinder',
        cone: 'Cone',
        sphere: 'Sphere',
        ellipsoid: 'Ellipsoid'
      }
    }

    const metrics = {
      mm: 'mm',
      cm: 'cm',
      dm: 'dm',
      m: 'm',
      km: 'km',
      in: 'in',
      ft: 'ft',
      yd: 'yd',
      mi: 'mi',
    }

    const showMetric = name => /* html */`
      <select class="dimension__metric input-wide" name="${name}">
        ${
          Object.keys(metrics).map(metric => {
            const cm = metrics[metric] === 'cm';
            return /* html */`
            <option ${cm ? "selected" : ''} value="${metric}">${metrics[metric]}</option>
          `}).join('')
        }
      </select>
    `

    const dimension = title => {
      const cleanTitle = title.toLowerCase().replace(' ', '-');

      return /* html */`
      <div class='dimension'>
        ${title}
        <div class='dimension__input'>
          <input class="dimension__input" type='number' required name="${cleanTitle}">
          ${showMetric(`${cleanTitle}-metric`)}
        </div>
      </div>
    `};

    const pageId = 'geometry';
    const selectId = 'geometry-shape';
    const shapeDesignId = 'geometry-design';
    const geometryResultId = 'geometry-result';
    const geometryCalculatorId = 'geometry-calculator';
    const geometryCalculatorFormId = 'geometry-calculator-form';

    this.scripts = () => {
      const select = document.getElementById(selectId);
      const geometryCalculatorForm = document.getElementById(geometryCalculatorFormId);
      const geometryCalculator = document.getElementById(geometryCalculatorId);
      const geometryResult = document.getElementById(geometryResultId);

      const setFormShape = shape => geometryCalculatorForm.dataset.shape = shape;

      geometryCalculatorForm.onsubmit = event => {
        event.preventDefault();
        const data = new FormData(geometryCalculatorForm);
        const formValues = {};

        for (let [key, value] of data.entries()) {
          formValues[key] = value;
        }

        const shapeSolverMap = {
          [shapes.circle]: solveCircle,
          [shapes.cylinder]: solveCylinder,
          [shapes.square]: solveSquare,
          [shapes.cube]: solveCube,
          [shapes.rectangle]: solveRectangle,
          [shapes.rectangularPrism]: solveRectanglularPrism,
          [shapes.ellipse]: solveEllipse,
          [shapes.ellipsoid]: solveEllipsoid,
          [shapes.polygon]: solvePolygon,
          [shapes.triangle]: solveTriangle,
          [shapes.parallelogram]: solveParallelogram,
          [shapes.trapezoid]: solveTrapezoid,
          [shapes.cone]: solveCone,
          [shapes.sphere]: solveSphere
        };

        const selectedShape = geometryCalculatorForm.dataset.shape;
        const solveFunction = shapeSolverMap[selectedShape];

        if (!solveFunction) {
          toast('Invalid shape selected.');
        }

        const requiresFieldArgument = [
          shapes.circle,
          shapes.cylinder,
          shapes.ellipse,
          shapes.parallelogram,
          shapes.rectangle,
          shapes.square,
          shapes.triangle
        ].includes(selectedShape)

        const functionArugments = [formValues, geometryResult];
        if (requiresFieldArgument) {
          functionArugments.push(this.field);
        }

        console.log(solveFunction);
        solveFunction(...functionArugments);
      }

      select.onclick = ({target}) => {
        console.log(target.value);

        switch (target.value) {

          case shapes.polygon:
            geometryCalculator.innerHTML = dimension('Side length');
            geometryCalculator.innerHTML = dimension('Side Count');
            setFormShape(shapes.polygon);
            break;

          case shapes.cylinder:
            setFormShape(shapes.cylinder);
            geometryCalculator.innerHTML = [
              dimension('radius'),
              this.field === Volume ? dimension('height') : '',
            ].join('');
            break;

          case shapes.rectangularPrism:
            setFormShape(shapes.rectangularPrism);
            geometryCalculator.innerHTML = [
              dimension('length'),
              dimension('height'),
              dimension('width'),
            ].join('');
            break;

          case shapes.cone:
            setFormShape(shapes.cone);
            geometryCalculator.innerHTML = [
              dimension('radius'),
              dimension('height')
            ].join();
            break;

          case shapes.sphere:
            geometryCalculator.innerHTML = dimension('radius');
            setFormShape(shapes.sphere);
            break;

          case shapes.circle:
            geometryCalculator.innerHTML = dimension('radius');
            setFormShape(shapes.circle);
            break;

          case shapes.square:
            geometryCalculator.innerHTML = dimension('Side Length');
            setFormShape(shapes.square);
            break;

          case shapes.cube:
            geometryCalculator.innerHTML = dimension('Side Length');
            setFormShape(shapes.cube);
            break;

            case shapes.rectangle:
            setFormShape(shapes.rectangle);
            geometryCalculator.innerHTML = [
              dimension('Width'),
              dimension('Length')
            ].join('');
            break;

          case shapes.triangle:
            setFormShape(shapes.triangle);
            if (this.field === Perimeter) {
              geometryCalculator.innerHTML = [
                dimension('Side A'),
                dimension('Side B'),
                dimension('Side C')
              ].join('');
            } else {
              geometryCalculator.innerHTML = [
                dimension('Base'),
                dimension('Height')
              ].join('');
            }
            break;

          case shapes.parallelogram:
            setFormShape(shapes.parallelogram);
            geometryCalculator.innerHTML = [
              this.field === Volume || this.field === Area ? dimension('Height') : '',
              this.field === Perimeter ? dimension('Side') : '',
              this.field === Volume ? dimension('Depth') : '',
              dimension('Base'),
            ].join('');
            break;

          case shapes.trapezoid:
            setFormShape(shapes.trapezoid);
            geometryCalculator.innerHTML = [
              dimension('Base one'),
              dimension('Base two'),
              dimension('Side A'),
              dimension('Side B')
            ].join('');
            break;

          case shapes.ellipsoid:
            setFormShape(shapes.ellipsoid);
            geometryCalculator.innerHTML = [
              dimension('Semi-Major Axis'),
              dimension('Semi-Minor Axis')
            ].join('');
            break;

          case shapes.ellipse:
            setFormShape(shapes.ellipse);
            geometryCalculator.innerHTML = [
              dimension('Major Axis'),
              dimension('Minor Axis')
            ].join('');
            break;

          default:
            break;
        }
      }
    }

    const perimeterOrArea = this.field === Perimeter || this.field === Area;
    let firstShape = perimeterOrArea ? shapes.square : shapes.cube;
    selectedShape = firstShape;

    this.template = /* html */`
      <div id="${pageId}">
        <div id="${geometryResultId}"></div>
        <select id="${selectId}" class="input-wide">
          ${
            Object.keys(shapes).map(shape => /* html */`
                <option ${firstShape === shape ? "selected" : ''} value="${shapes[shape]}">${shapes[shape]}</option>`
            ).join('')
          }
        </select>
        <!-- <div id="${shapeDesignId}"></div> -->
        <form id="${geometryCalculatorFormId}" data-shape="${firstShape}">
          ${ showMetric('result-metric') }
          <div id="${geometryCalculatorId}">
            ${ dimension('Side Length') }
          </div>
          <button type="submit" class="input-wide button-submit">
            Calculate ${this.field}
          </button>
        </form>
      </div>
    `
  }
}

