import convertMetric from './metric-converter.js';
import { Area, Perimeter } from './Geometry.js';
import toast from '../../toast.js';

/**
 * Solves for circle perimeter
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 * @param {string} field - the field of geometry where to determin its equation
 */
export default function solveCircle(formValues, resultElement, field) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let radius = formValues['radius'];

  if (!radius) {
    return toast('Radius is required');
  }

  const radiusMetric = formValues['radius-metric'];

  if (!radiusMetric) {
    return toast('Radius metric is required');
  }

  radius = convertMetric(radius, radiusMetric, resultMetric);
  let result = '';

  switch (field) {
    case Perimeter:
      result = `${parseFloat(2 * Math.PI * radius).toFixed(2)} ${resultMetric}`;
      break;

    case Area:
      result = `${parseFloat(Math.PI * radius ** 2).toFixed(2)} ${resultMetric}`;
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