import convertMetric from './metric-converter.js';
import toast from '../../toast.js';

/**
 * Solves for rectanglular prism
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 */
export default function solveRectanglularPrism(formValues, resultElement) {
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

  let height = formValues['height'];

  if (!height) {
    return toast('Height is required');
  }

  const heightMetric = formValues['height-metric'];

  if (!heightMetric) {
    return toast('Height metric is required');
  }

  height = convertMetric(height, heightMetric, resultMetric);
  const result = `${parseFloat(length * width * height).toFixed(2)} ${resultMetric}`;

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}