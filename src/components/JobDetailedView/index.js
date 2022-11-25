import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase, BsBoxArrowUpRight} from 'react-icons/bs'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobCard from '../SimilarJobCard'

const apiConstants = {
  apiSuccess: 'SUCCESS',
  apiFailure: 'FAILURE',
  apiLoading: 'LOADING',
  apiStart: 'INITIAL',
}

class JobDetailedView extends Component {
  state = {
    jobDetailedViewList: [],
    similarJobsList: [],
    apiStatus: apiConstants.apiStart,
  }

  componentDidMount() {
    this.getJobDetailsById()
  }

  getJobDetailsById = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiConstants.apiLoading})
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const updatedJobDetails = {
        companyLogoUrl: updatedData.jobDetails.company_logo_url,
        companyWebsiteUrl: updatedData.jobDetails.company_website_url,
        employmentType: updatedData.jobDetails.employment_type,
        id: updatedData.jobDetails.id,
        jobDescription: updatedData.jobDetails.job_description,
        lifeAtCompany: {
          description: updatedData.jobDetails.life_at_company.description,
          imageUrl: updatedData.jobDetails.life_at_company.image_url,
        },
        location: updatedData.jobDetails.location,
        packagePerAnnum: updatedData.jobDetails.package_per_annum,
        rating: updatedData.jobDetails.rating,
        skills: updatedData.jobDetails.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: updatedData.jobDetails.title,
      }
      const updatedSimilarDetails = updatedData.similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        jobDescription: each.job_description,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetailedViewList: updatedJobDetails,
        similarJobsList: updatedSimilarDetails,
        apiStatus: apiConstants.apiSuccess,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.apiFailure,
      })
    }
  }

  renderSkills = () => {
    const {jobDetailedViewList} = this.state
    const {skills} = jobDetailedViewList
    return (
      <ul className="skill-container">
        {skills.map(each => (
          <SkillCard skillDetails={each} key={each.name} />
        ))}
      </ul>
    )
  }

  renderDetailedView = () => {
    const {jobDetailedViewList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailedViewList
    const {imageUrl, description} = lifeAtCompany

    return (
      <div className="detailed-view-container">
        <div className="icon-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-icon"
          />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiOutlineStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="location-container location-width ">
            <GoLocation className="location-icon" />
            <p className="para">{location}</p>
            <BsBriefcase className="location-icon" />
            <p className="para">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line-style" />
        <div className="visit-container">
          <h1 className="description">Description</h1>
          <a href={companyWebsiteUrl} className="anchor">
            Visit <BsBoxArrowUpRight />
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>
        <h1 className="skills">Skills</h1>
        <div>{this.renderSkills()}</div>

        <h1 className="title">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="description ">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-at-company-image"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobView = () => {
    const {similarJobsList} = this.state

    return (
      <ul className="similar-jobs-container">
        {similarJobsList.map(each => (
          <SimilarJobCard similarJobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderSuccessSimilarJobView = () => (
    <div className="job-detailed-view-container">
      {this.renderDetailedView()}
      <h1 className="title">Similar Jobs</h1>

      {this.renderSimilarJobView()}
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  handleRetry = () => {
    this.getJobDetailsById()
  }

  renderFailureJobDetails = () => (
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

  renderSwitchSimilarJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.apiSuccess:
        return this.renderSuccessSimilarJobView()
      case apiConstants.apiLoading:
        return this.renderLoader()
      case apiConstants.apiFailure:
        return this.renderFailureJobDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderSwitchSimilarJobs()}
      </>
    )
  }
}

export default JobDetailedView
