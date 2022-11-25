import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import JobItemCard from '../JobItemCard'
import FilterOptions from '../FilterOptions'
import Header from '../Header'
import ProfileCard from '../ProfileCard'

import './index.css'

const apiConstants = {
  apiSuccess: 'SUCCESS',
  apiFailure: 'FAILURE',
  apiLoading: 'LOADING',
  apiStart: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.apiStart,
    jobDetailsList: [],
    employmentType: '',
    minPackage: 0,
    searchInputValue: '',
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiConstants.apiLoading})
    const {employmentType, minPackage, searchInputValue} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${searchInputValue}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({
        jobDetailsList: updatedData,
        apiStatus: apiConstants.apiSuccess,
      })
    } else {
      this.setState({apiStatus: apiConstants.apiFailure})
    }
  }

  renderJobItemSuccess = () => {
    const {jobDetailsList} = this.state
    return jobDetailsList.length > 0 ? (
      <ul className="all-job-details-container">
        {jobDetailsList.map(each => (
          <JobItemCard jobDetails={each} key={each.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="title">No Jobs Found</h1>
        <p className="title">We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  handleRetry = () => {
    this.getJobItemDetails()
  }

  renderJobItemFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-button" onClick={this.handleRetry}>
        Retry
      </button>
    </div>
  )

  renderJobItemLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.apiSuccess:
        return this.renderJobItemSuccess()
      case apiConstants.apiLoading:
        return this.renderJobItemLoader()
      case apiConstants.apiFailure:
        return this.renderJobItemFailure()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      console.log(event.key)
      this.getJobItemDetails()
    }
  }

  onClickSearch = () => {
    this.getJobItemDetails()
  }

  renderSearchJobsSmall = () => {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-container-small">
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              placeholder="Search"
              className="search"
              onChange={this.onChangeSearch}
              onKeyDown={this.onClickEnter}
            />
          </div>
          <div className="search-button-container">
            <button type="button" onClick={this.onClickSearch}>
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
      </>
    )
  }

  renderSearchJobsLarge = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container-large">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          className="search"
          onChange={this.onChangeSearch}
          onKeyDown={this.onClickEnter}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" onClick={this.onClickSearch} />
        </button>
      </div>
    )
  }

  changeEmployeeType = value => {
    this.setState({employmentType: value}, this.getJobItemDetails)
  }

  salaryRange = value => {
    this.setState({minPackage: value}, this.getJobItemDetails)
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="sidebar-container">
            {this.renderSearchJobsSmall()}
            <ProfileCard />
            <hr className="line" />
            <FilterOptions
              changeEmployeeType={this.changeEmployeeType}
              salaryRange={this.salaryRange}
            />
          </div>
          <div className="job-details-large-container">
            {this.renderSearchJobsLarge()}
            {this.renderSwitchJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(JobItemDetails)
