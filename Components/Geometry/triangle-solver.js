import convertMetric from './metric-converter.js';
import toast from '../../toast.js';
import { Area, Perimeter, Volume } from './Geometry.js';

/**
 * Solves for triangle
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 * @param {string} field - the field of geometry where to determin its equation
 */
export default function solveTriangle(formValues, resultElement, field) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  if (field === Perimeter) {
    let sideA = formValues['side-a'];

    if (!sideA) {
      return toast('Side A is required');
    }

    const sideAMetric= formValues['side-a-metric'];

    if (!sideAMetric) {
      return toast('Side A metric is required');
    }

    sideA = convertMetric(sideA, sideAMetric, resultMetric);

    let sideB = formValues['side-b'];

    if (!sideB) {
      return toast('Side B is required');
    }

    const sideBMetric= formValues['side-b-metric'];

    if (!sideBMetric) {
      return toast('Side B metric is required');
    }

    sideB = convertMetric(sideB, sideBMetric, resultMetric);

    let sideC = formValues['side-c'];

    if (!sideC) {
      return toast('Side C is required');
    }

    const sideCMetric= formValues['side-c-metric'];

    if (!sideCMetric) {
      return toast('Side C metric is required');
    }

    sideC = convertMetric(sideC, sideCMetric, resultMetric);

    const result = `${sideA + sideB + sideC} ${resultMetric}`;

    if (!resultElement) {
      alert(result);
    }

    resultElement.textContent = result;
  }

  let base = formValues['base'];

  if (!base) {
    return toast('Base is required');
  }

  const baseMetric= formValues['base-metric'];

  if (!baseMetric) {
    return toast('Base metric is required');
  }

  height = convertMetric(height, heightMetric, resultMetric);

  let height = formValues['height'];

  if (!height) {
    return toast('Height is required');
  }

  const heightMetric= formValues['height-metric'];

  if (!heightMetric) {
    return toast('Height metric is required');
  }

  height = convertMetric(height, heightMetric, resultMetric);
  let result = '';

  switch (field) {
    case Area:
      result = `${parseFloat((1/2) * base * height).toFixed(2)} ${resultMetric}`;
      break;

    case Volume:
      result = `${parseFloat((1/3) * base * height).toFixed(2)} ${resultMetric}`;
      break;

    default:
      return;
  }

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}