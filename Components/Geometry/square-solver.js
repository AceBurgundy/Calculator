import convertMetric from './metric-converter.js';
import { Area, Perimeter } from './Geometry.js';
import toast from '../../toast.js';

/**
 * Solves for square
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 * @param {string} field - the field of geometry where to determin its equation
 */
export default function solveSquare(formValues, resultElement, field) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let sideLength = formValues['side-length'];

  if (!sideLength) {
    return toast('Side length required');
  }

  const lengthMetric = formValues['side-length-metric'];

  if (!lengthMetric) {
    return toast('Side Length Metric is required');
  }

  sideLength = convertMetric(sideLength, lengthMetric, resultMetric);
  let result = '';

  switch (field) {
    case Perimeter:
      result = `${parseFloat(sideLength * 4).toFixed(2)} ${resultMetric}`;
      break;

    case Area:
      result = `${parseFloat(sideLength ** 2).toFixed(2)} ${resultMetric}`
      break;

    default:
      toast('Invalid field');
      break;
  }

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}