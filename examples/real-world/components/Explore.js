import * as React from 'react'
import PropTypes from 'prop-types'

const GITHUB_REPO = 'https://github.com/reduxjs/redux'

export default class Explore extends React.Component {
  static propTypes = {
    defaultInputValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    inputValue: this.props.defaultInputValue,
  }

  onChangeInputValue = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
  }

  handleGoClick = () => {
    this.props.onChange(this.state.inputValue)
  }

  render() {
    const { inputValue } = this.state
    return (
      <div>
        <p>{"Type a username or repo full name and hit 'Go':"}</p>
        <input size="45" value={inputValue} onChange={this.onChangeInputValue} onKeyUp={this.handleKeyUp} />
        <button onClick={this.handleGoClick}>Go!</button>
        <p>
          Code on{' '}
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            Github
          </a>.
        </p>
        <p>Move the DevTools with Ctrl+W or hide them with Ctrl+H.</p>
      </div>
    )
  }
}
