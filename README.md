# react-viewport-monitor

This [Higher-Order React component][HOC] enables you to write components that
respond to changes in the visible content.

## Example

``` jsx
import React from 'react';
import ViewportMonitor from 'viewport-monitor';

const viewportSelector = ({ top }) => ({ viewportEdge: top });

@ViewportMonitor(viewportSelector, 'top')
export default class Fixed extends React.PureComponent {
  render() {
    return (
      <div style={{ position: absolute, top: this.props.viewportEdge }}>
        I appear to be `position: fixed`!
      </div>
    );
  }
}
```

## API

### `ViewportMonitor([selector], [...viewportProps]) => (Component) => WrappedComponent`

Subscribes the given `Component` to changes to the given `viewportProps`, which
it will receive as additional props.

#### Arguments

* `selector(viewport, [ownProps]) => mergeProps` – This function generates
  additional props (to be merged atop the inbound props) from the `viewport`
  definition, and will be invoked whenever the viewport is changed.
  Additionally, this function may also receive the inbound props as a second
  argument – in this case, `selector` will additionally be called whenever the
  incoming props are changed.  The return value of this function *must* be an
  object.  If the `selector` argument is omitted or falsey, a default
  implementation will be provided.

* `viewportProps` – Any number of additional arguments may be provided to
  explicitly name the viewport properties that the wrapped Component is
  interested in.  The following values have meaning:

  * `'top'`
  * `'right'`
  * `'bottom'`
  * `'left'`
  * `'height'`
  * `'width'`
  * `'any'`

  If no properties are named, `'any'` is implicitly assumed.

## Advantages

* Scroll and resize events are throttled to once per animation frame.
* Only one DOM event subscription per event.

## Disadvantages

* Currently only works with ReactDOM.
* Currently only works at the `window` level.

[HOC]: https://facebook.github.io/react/docs/higher-order-components.html
