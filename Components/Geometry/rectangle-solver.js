import convertMetric from './metric-converter.js';
import { Area, Perimeter } from './Geometry.js';
import toast from '../../toast.js';

/**
 * Solves for rectangle
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 * @param {string} field - the field of geometry where to determin its equation
 */
export default function solveRectangle(formValues, resultElement, field) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let length = formValues['length'];

  if (!length) {
    return toast('Length is required');
  }

  const lengthMetric = formValues['length-metric'];

  if (!lengthMetric) {
    return toast('Length metric is required');
  }

  length = convertMetric(length, lengthMetric, resultMetric);

  let width = formValues['width'];

  if (!width) {
    return toast('Width is required');
  }

  const widthMetric = formValues['width-metric'];

  if (!widthMetric) {
    return toast('Width metric is required');
  }

  width = convertMetric(width, widthMetric, resultMetric);
  let result = '';

  switch (field) {
    case Perimeter:
      result = `${parseFloat((length + width) * 2).toFixed(2)} ${resultMetric}`;
      break;

    case Area:
      result = `${parseFloat(length * width).toFixed(2)} ${resultMetric}`;
      break;

    default:
      return;
  }

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}