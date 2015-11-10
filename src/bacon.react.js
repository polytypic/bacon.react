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
        {dispose: (tDOM instanceof Bacon.Observable ? tDOM :
                   Bacon.combineTemplate(tDOM instanceof Array
                                         ? <div>{tDOM}</div>
                                         : tDOM))
         .onValue(DOM => this.setState({DOM}))})
  },
  componentWillReceiveProps(nextProps) {
    this.trySubscribe(nextProps.children)
  },
  componentWillMount() {
    this.trySubscribe(this.props.children)
    const {willMount} = this.props
    !willMount || willMount(this)
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
    const {willUnmount} = this.props
    !willUnmount || willUnmount(this)
  },
  render() {
    const {DOM} = this.state
    return DOM ? DOM : invisibleDiv
  }
})
