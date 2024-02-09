import convertMetric from './metric-converter.js';
import toast from '../../toast.js';

/**
 * Solves for cone volume
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 */
export default function solveCone(formValues, resultElement) {
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

  let height = formValues['height'];

  if (!height) {
    return toast('Height is required');
  }

  const heightMetric = formValues['height-metric'];

  if (!heightMetric) {
    return toast('Height metric is required');
  }

  height = convertMetric(height, heightMetric, resultMetric);
  const result = `${parseFloat((1/3) * Math.PI * (radius ** 2) * height).toFixed(2)} ${resultMetric}`;

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}