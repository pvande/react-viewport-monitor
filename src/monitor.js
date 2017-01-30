import React from 'react';
import Emitter from './events.js';
import viewport from './viewport.js';

export default class ViewportMonitor extends React.PureComponent {
  constructor(props, collector, events) {
    super(props);

    this.collector = collector;
    this.events = events;
    this.state = viewport();
  }

  refresh = (viewport) => {
    if (this.lastViewport === viewport) return;

    this.lastViewport = viewport;
    this.setState(viewport);
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

  render() {
    const props = { ...this.props, ...this.collector(this.state, this.props) };
    return React.createElement(this.constructor.DecoratedComponent, props);
  }
}
