import React from 'react';
import Emitter from './events.js';
import viewport from './viewport.js';

export default class ViewportMonitor extends React.PureComponent {
  constructor(props, selector, events) {
    super(props);

    this.selector = selector;
    this.events = events;
    this.state = selector(viewport(), props);
  }

  refresh = (viewport) => {
    if (this.lastViewport === viewport) return;

    this.lastViewport = viewport;
    this.setState(this.selector(viewport, this.props));
  }

  componentWillMount() {
    Emitter.emit('initialize');
  }

  componentDidMount() {
    for (let event of this.events) { Emitter.on(event, this.refresh) }
    this.refresh(viewport());
  }

  componentWillUnmount() {
    for (let event of this.events) { Emitter.off(event, this.refresh) }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) return;
    if (this.selector.length == 1) return;

    this.setState(this.selector(viewport, nextProps));
  }

  render() {
    const Component = this.constructor.DecoratedComponent;
    return React.createElement(Component, { ...this.props, ...this.state });
  }
}
