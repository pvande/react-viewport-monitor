import Emitter from 'eventemitter3';
import throttle from 'raf-throttle';
import viewport from './viewport';

const ViewportEvents = new Emitter();
export default ViewportEvents;

let currentViewport = viewport();

if (typeof window !== 'undefined') {
  ViewportEvents.once('initialize', () => {
    ViewportEvents.initializeEventListeners = () => {};

    const events = [ 'resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load' ];
    for (const event of events) {
      window.addEventListener(event, ViewportEvents.recompute);
    }
  });
} else {
  // TODO: Implement React Native support?
}

ViewportEvents.recompute = throttle(() => {
  const nextViewport = viewport();

  for (const prop of Object.keys(nextViewport)) {
    if (currentViewport[prop] != nextViewport[prop]) {
      ViewportEvents.emit(prop, nextViewport);
      ViewportEvents.emit('any', nextViewport);
    }
  }

  currentViewport = nextViewport;
});
