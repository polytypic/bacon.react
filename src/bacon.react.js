import Bacon from "baconjs"
import React from "react"

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
  trySubscribe(props) {
    this.tryDispose()
    const {children} = props
    if (children)
      this.setState(
        {dispose: (children instanceof Bacon.Observable ? children :
                   Bacon.combineTemplate(
                     children instanceof Array
                       ? React.DOM.div({...props, children})
                       : children)).onValue(DOM => this.setState({DOM}))})
  },
  componentWillReceiveProps(nextProps) {
    this.trySubscribe(nextProps)
  },
  componentWillMount() {
    this.trySubscribe(this.props)
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
    return (!DOM ? null :
            DOM instanceof Array ? React.DOM.div({...this.props, children: DOM}) :
            DOM)
  }
})
