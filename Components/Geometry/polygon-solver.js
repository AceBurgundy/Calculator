import convertMetric from './metric-converter.js';
import toast from '../../toast.js';

/**
 * Solves for polygon
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 */
export default function solvePolygon(formValues, resultElement) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let sideLength = formValues['side-length'];

  if (!sideLength) {
    return toast('Side length is required');
  }

  let sideCount = formValues['side-count'];

  if (!sideCount) {
    return toast('Side count is required');
  }

  const lengthMetric = formValues['side-length-metric'];

  if (!lengthMetric) {
    return toast('Side length metric is required');
  }

  const countMetric = formValues['side-count-metric'];

  if (!countMetric) {
    return toast('Side count metric is required');
  }

  sideLength = convertMetric(sideLength, lengthMetric, resultMetric);
  sideCount = convertMetric(sideCount, countMetric, resultMetric);

  const result = `${parseFloat(sideLength * sideCount).toFixed(2)} ${resultMetric}`;

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}