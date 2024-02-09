import convertMetric from './metric-converter.js';
import { Area, Perimeter, Volume } from './Geometry.js';
import toast from '../../toast.js';

/**
 * Solves for parallelogram
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 * @param {string} field - the field of geometry where to determin its equation
 */
export default function solveParallelogram(formValues, resultElement, field) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let base = formValues['base'];
  let side = formValues['side'];
  let height = formValues['height'];
  let depth = formValues['depth'];

  let result = '';

  if (field === Perimeter) {
    if (!base) {
      return toast('Base is required');
    }

    if (!side) {
      return toast('Side is required');
    }

    const baseMetric = formValues['base-metric'];

    if (!baseMetric) {
      return toast('Base metric is required');
    }

    const sideMetric = formValues['side-metric'];

    if (!sideMetric) {
      return toast('Side metric is required');
    }

    base = convertMetric(base, baseMetric, resultMetric);
    side = convertMetric(side, sideMetric, resultMetric);

    result = `${(base + side) * 2} ${resultMetric}`;
  }

  if (field === Area) {
    if (!base) {
      return toast('Base is required');
    }

    if (!height) {
      return toast('Height is required');
    }

    const baseMetric = formValues['base-metric'];

    if (!baseMetric) {
      return toast('Base metric is required');
    }

    const heightMetric = formValues['height-metric'];

    if (!heightMetric) {
      return toast('Height metric is required');
    }

    base = convertMetric(base, baseMetric, resultMetric);
    height = convertMetric(side, heightMetric, resultMetric);

    result = `${base * height} ${resultMetric}`;
  }

  if (field === Volume) {
    if (!base) {
      return toast('Base is required');
    }

    if (!height) {
      return toast('Height is required');
    }

    if (!depth) {
      return toast('Depth is required');
    }

    const baseMetric = formValues['base-metric'];

    if (!baseMetric) {
      return toast('Base metric is required');
    }

    const heightMetric = formValues['height-metric'];

    if (!heightMetric) {
      return toast('Height metric is required');
    }

    const depthMetric = formValues['depth-metric'];

    if (!depthMetric) {
      return toast('Depth metric is required');
    }

    base = convertMetric(base, baseMetric, resultMetric);
    height = convertMetric(height, heightMetric, resultMetric);
    depth = convertMetric(depth, depthMetric, resultMetric);

    result = `${parseFloat(base * height * depth).toFixed(2)} ${resultMetric}`;
  }

  if (!result) {
    return;
  }

  if (!resultElement) {
    alert(result);
  }

  resultElement.textContent = result;
}