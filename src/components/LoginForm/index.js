import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isCorrectLogin: true, errorMsg: ''}

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isCorrectLogin: false, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  handlePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, isCorrectLogin} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-app-container">
        <div className="login-container">
          <div className="app-name">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <form className="input-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="username">
              USERNAME
            </label>
            <input
              type="text"
              className="text-input"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.handleUsername}
            />
            <label htmlFor="password" className="username">
              PASSWORD
            </label>
            <input
              type="password"
              className="text-input"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handlePassword}
            />
            <button type="submit" className="button">
              Login
            </button>
            {isCorrectLogin ? null : <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
