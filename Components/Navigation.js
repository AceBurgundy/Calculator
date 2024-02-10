import Geometry, {Area, Volume, Perimeter} from './Geometry/Geometry.js';
import Calculator from './Calculator.js';

import Component from '../Component.js';
import { icons } from '../icons.js';

export default class Navigation extends Component {
  constructor() {
    super();

    const page = {
      Calculator,
      Geometry,
      Area
    }

    this.scripts = () => {
      const navigation = document.getElementById('navigation');
      const display = document.getElementById('display');

      navigation.children[0].firstElementChild.setAttribute('fill', '#05976b');
      navigation.children[0].classList.add('active');

      navigation.onclick = ({target}) => {
        if (!target.dataset.page) {
          return;
        }

        // Process Icon SVG Color Change
        [...navigation.children].map((child, index) => {
          child.classList.remove('active');

          if (child.dataset.page === target.dataset.page) {
            if (index === 1) {
              [...child.firstElementChild.children].map(child =>
                child.setAttribute('fill', '#05976b')
              );
              return;
            }

            if (index === 3) {
              [...child.firstElementChild.children].map(child => {
                if (child.tagName === 'rect') {
                  return;
                }

                child.setAttribute('stroke', '#05976b')
              });
              return;
            }

            child.firstElementChild.setAttribute('fill', '#05976b');
          } else {
            if (index === 1) {
              [...child.firstElementChild.children].map(child =>
                child.setAttribute('fill', 'black')
              );
              return;
            }

            if (index === 3) {
              [...child.firstElementChild.children].map(child => {
                if (child.tagName === 'rect') {
                  return;
                }

                child.setAttribute('stroke', 'black')
              });
              return;
            }

            child.firstElementChild.setAttribute('fill', 'black');
          }
        });

        switch (target.dataset.page) {
          case 'Calculator':
            target.classList.add('active');
            display.innerHTML = new page.Calculator()
            break;

            case Perimeter:
            target.classList.add('active');
            display.innerHTML = new page.Geometry(Perimeter);
            break;

            case Area:
            target.classList.add('active');
            display.innerHTML = new page.Geometry(Area);
            break;

            case Volume:
            target.classList.add('active');
            display.innerHTML = new page.Geometry(Volume);
            break;
        }
      }
    }

    this.template = /* html */`
      <div id="toast-list"></div>
      <div id="content">
        <nav id="navigation">
          <div class="navigation__item" data-page="Calculator">
            ${ icons.default }
            <div>Calculator</div>
          </div>
          ${
            [Perimeter, Area, Volume].map(field => /* html */`
              <div class="navigation__item" data-page="${field}">
                ${ icons[field.toLowerCase()] }
                <div>${field}</div>
              </div>
            `).join('')
          }
        </nav>
        <section id="display">
          ${ new page.Calculator() }
        </section>
      </div>
    `
  }
}