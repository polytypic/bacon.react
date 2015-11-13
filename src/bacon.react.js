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
    if (children) {
      let stream = children
      if (stream instanceof Array) {
        const {className, id} = props
        stream = <div className={className} id={id}>{stream}</div>
      }
      if (!(stream instanceof Bacon.Observable))
        stream = Bacon.combineTemplate(stream)
      this.setState({dispose: stream.onValue(DOM => this.setState({DOM}))})
    }
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
    if (!DOM)
      return null
    if (!(DOM instanceof Array))
      return DOM
    const {className, id} = this.props
    return <div className={className} id={id}>{DOM}</div>
  }
})
