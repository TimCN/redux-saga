import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { navigate, resetErrorMessage, updateRouterState } from '../actions'
import Explore from '../components/Explore'

class App extends React.Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    updateRouterState: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node,
    location: PropTypes.any,
    params: PropTypes.any,
  }

  componentDidMount() {
    this.props.updateRouterState({
      pathname: this.props.location.pathname,
      params: this.props.params,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname)
      this.props.updateRouterState({
        pathname: this.props.location.pathname,
        params: this.props.params,
      })
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = nextValue => {
    this.props.navigate(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b> (<a href="#" onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Explore key={inputValue} defaultInputValue={inputValue} onChange={this.handleChange} />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.pathname.substring(1),
  }
}

export default connect(
  mapStateToProps,
  {
    navigate,
    updateRouterState,
    resetErrorMessage,
  },
)(App)
