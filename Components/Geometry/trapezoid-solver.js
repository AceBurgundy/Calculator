import convertMetric from './metric-converter.js';
import toast from '../../toast.js';

/**
 * Solves for trapezoid
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 */
export default function solveTrapezoid(formValues, resultElement) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let baseOne = formValues['base-one'];

  if (!baseOne) {
    return toast('Base one is required');
  }

  const baseOneMetric = formValues['base-one-metric'];

  if (!baseOneMetric) {
    return toast('Base one metric is required');
  }

  baseOne = convertMetric(baseOne, baseOneMetric, resultMetric);

  let baseTwo = formValues['base-two'];

  if (!baseTwo) {
    return toast('Base two is required');
  }

  const baseTwoMetric = formValues['base-two-metric'];

  if (!baseTwoMetric) {
    return toast('Base two metric is required');
  }

  baseTwo = convertMetric(baseTwo, baseTwoMetric, resultMetric);

  let sideA = formValues['side-a'];

  if (!sideA) {
    return toast('Side A is required');
  }

  const sideAMetric = formValues['side-a-metric'];

  if (!sideAMetric) {
    return toast('Side A metric is required');
  }

  sideA = convertMetric(sideA, sideAMetric, resultMetric);

  let sideB = formValues['side-b'];

  if (!sideB) {
    return toast('Side B is required');
  }

  const sideBMetric = formValues['side-b-metric'];

  if (!sideBMetric) {
    return toast('Side B metric is required');
  }

  sideB = convertMetric(sideB, sideBMetric, resultMetric);

  const result = `${parseFloat(baseOne + baseTwo + sideA + sideB).toFixed(2)} ${resultMetric}`;

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}