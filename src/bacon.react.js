import Bacon from "baconjs"
import React from "react"

const invisibleDiv = <div style={{display: "none"}}/>

export default React.createClass({
  getInitialState() {
    return {}
  },
  tryDispose() {
    const {dispose} = this.state
    if (dispose) {
      dispose()
      this.replaceState({})
    }
  },
  trySubscribe(tDOM) {
    this.tryDispose()
    if (tDOM)
      this.setState(
        {dispose: (tDOM instanceof Array ? Bacon.combineTemplate(<div>{tDOM}</div>) :
                   tDOM instanceof Bacon.Observable ? tDOM :
                   Bacon.combineTemplate(tDOM)).onValue(DOM => this.setState({DOM}))})
  },
  componentWillReceiveProps(nextProps) {
    this.trySubscribe(nextProps.children)
  },
  componentWillMount() {
    this.trySubscribe(this.props.children)
  },
  componentDidMount() {
    const {didMount} = this.props
    !didMount || didMount(this)
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.DOM !== this.state.DOM
  },
  componentWillUnmount() {
    this.tryDispose()
  },
  render() {
    const {DOM} = this.state
    return DOM ? DOM : invisibleDiv
  }
})
