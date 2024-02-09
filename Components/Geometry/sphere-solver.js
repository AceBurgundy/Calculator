import convertMetric from './metric-converter.js';
import { Area, Perimeter } from './Geometry.js';
import toast from '../../toast.js';

/**
 * Solves for sphere perimeter
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 */
export default function solveSphere(formValues, resultElement) {
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
  const result = `${parseFloat((4/3) * Math.PI * (radius ** 3)).toFixed(2)} ${resultMetric}`;

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}