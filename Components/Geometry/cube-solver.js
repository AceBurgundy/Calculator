import convertMetric from './metric-converter.js';
import toast from '../../toast.js';

/**
 * Solves for cube
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 * @param {string} field - the field of geometry where to determin its equation
 */
export default function solveCube(formValues, resultElement) {
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
  const result = `${parseFloat(sideLength ** 3).toFixed(2)} ${resultMetric}`;

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}