import convertMetric from './metric-converter.js';
import toast from '../../toast.js';

/**
 * Solves for ellipse perimeter
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 */
export default function solveEllipsoid(formValues, resultElement) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let semiMajorAxis = formValues['semi-major-axis'];

  if (!semiMajorAxis) {
    return toast('semi-major Axis is required');
  }

  const semiMajorAxisMetric = formValues['semi-major-axis-metric'];

  if (!semiMajorAxisMetric) {
    return toast('semi-major Axis metric is required');
  }

  semiMajorAxis = convertMetric(semiMajorAxis, semiMajorAxisMetric, resultMetric);

  let semiMinorAxis = formValues['semi-minor-axis'];

  if (!semiMinorAxis) {
    return toast('semi-minor Axis is required');
  }

  const semiMinorAxisMetric = formValues['semi-minor-axis-metric'];

  if (!semiMinorAxisMetric) {
    return toast('semi-minor Axis metric is required');
  }

  semiMinorAxis = convertMetric(semiMinorAxis, semiMinorAxisMetric, resultMetric);
  const result = `${parseFloat(((4/3) * Math.PI) * semiMajorAxis * semiMinorAxis).toFixed(2)}`;

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}