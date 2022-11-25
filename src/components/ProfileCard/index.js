import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiConstants = {
  apiSuccess: 'SUCCESS',
  apiFailure: 'FAILURE',
  apiLoading: 'LOADING',
  apiStart: 'INITIAL',
}

class ProfileCard extends Component {
  state = {
    viewData: apiConstants.apiStart,
    profileList: [],
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({viewData: apiConstants.apiLoading})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        viewData: apiConstants.apiSuccess,
        profileList: updatedData,
      })
    } else {
      this.setState({viewData: apiConstants.apiFailure})
    }
  }

  renderProfileSuccess = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  handleRetry = () => {
    this.getProfile()
  }

  renderProfileFailure = () => (
    <div>
      <button type="button" className="retry-button" onClick={this.handleRetry}>
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  switchProfileData = () => {
    const {viewData} = this.state
    switch (viewData) {
      case apiConstants.apiSuccess:
        return this.renderProfileSuccess()
      case apiConstants.apiFailure:
        return this.renderProfileFailure()
      case apiConstants.apiLoading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return <>{this.switchProfileData()}</>
  }
}

export default ProfileCard
