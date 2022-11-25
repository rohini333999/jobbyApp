import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const handleCompanyLogo = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="navbar-container">
      <button
        type="button"
        className="company-logo-button"
        onClick={handleCompanyLogo}
      >
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </button>
      <ul className="small-device-home">
        <li>
          <Link to="/" className="link">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            <BsFillBriefcaseFill className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/login" className="link">
            <FiLogOut className="icon" onClick={handleLogout} />
          </Link>
        </li>
      </ul>
      <div className="large-device-home">
        <div className="navbar-home-container">
          <Link to="/" className="link">
            <h1>Home</h1>
          </Link>
          <Link to="/jobs" className="link">
            <h1>Jobs</h1>
          </Link>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
