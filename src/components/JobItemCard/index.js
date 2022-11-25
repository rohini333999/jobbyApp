import {AiOutlineStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const JobItemCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    location,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <li>
      <Link to={`/jobs/${id}`} className="link">
        <div className="job-card-container">
          <div className="icon-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
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
          <h1 className="para">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default withRouter(JobItemCard)
