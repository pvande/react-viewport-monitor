import ViewportEvents from './events.js';
import ViewportMonitor from './monitor.js'

const IDENTITY = (x) => x;

export const recompute = ViewportEvents.recompute;
export default function Wrapper(selector, ...events) {
  events = events.length ? events : [ 'any' ];

  return (component) => {
    let componentName = component.displayName || component.name;

    return class extends ViewportMonitor {
      static displayName = `ViewportMonitor(${componentName})`;
      static DecoratedComponent = component;

      constructor(props) {
        super(props, selector || IDENTITY, events);
      }
    }
  }
};
