import convertMetric from './metric-converter.js';
import { Area, Perimeter } from './Geometry.js';
import toast from '../../toast.js';

/**
 * Solves for ellipse perimeter
 *
 * @param {HTMLFormElement} formValues - the key value pairs of all object
 * @param {HTMLElement} resultElement - the element to render the result at
 * @param {string} field - the field of geometry where to determin its equation
 */
export default function solveEllipse(formValues, resultElement, field) {
  const resultMetric = formValues['result-metric'];

  if (!resultMetric) {
    return toast('Result metric is required');
  }

  let majorAxis = formValues['major-axis'];

  if (!majorAxis) {
    return toast('Major Axis is required');
  }

  const majorAxisMetric = formValues['major-axis-metric'];

  if (!majorAxisMetric) {
    return toast('Major Axis metric is required');
  }

  majorAxis = convertMetric(majorAxis, majorAxisMetric, resultMetric);

  let minorAxis = formValues['minor-axis'];

  if (!minorAxis) {
    return toast('Minor Axis is required');
  }

  const minorAxisMetric = formValues['minor-axis-metric'];

  if (!minorAxisMetric) {
    return toast('Minor Axis metric is required');
  }

  minorAxis = convertMetric(minorAxis, minorAxisMetric, resultMetric);
  let result = '';

  switch (field) {
    case Perimeter:
      result = `${parseFloat(2 * Math.PI * Math.sqrt((majorAxis ** 2 + minorAxis ** 2) / 2)).toFixed(2)} ${resultMetric}`;
      break;

    case Area:
      result = `${parseFloat(majorAxis * minorAxis).toFixed(2)} ${resultMetric}`;
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