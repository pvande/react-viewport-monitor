let viewport;

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  viewport = function() {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight);

    const left = window.pageXOffset || document.documentElement.scrollLeft;
    const top = window.pageYOffset || document.documentElement.scrollTop;

    const right = left + width;
    const bottom = top + height;

    return { top, right, bottom, left, width, height };
  };
} else {
  // TODO: Implement React Native support?
  viewport = function() {
    return {};
  };
}

export default viewport;
