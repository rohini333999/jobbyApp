import {AiOutlineStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    location,
    jobDescription,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="list">
      <div className="similar-job-card">
        <div className="icon-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
        <div className="location-container location-width ">
          <GoLocation className="location-icon" />
          <p className="para">{location}</p>
          <BsBriefcase className="location-icon" />
          <p className="para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
