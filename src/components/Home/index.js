import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const handleFindJobsButton = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs,salary information,company
          reviews.
        </p>

        <button
          className="find-job-button"
          type="button"
          onClick={handleFindJobsButton}
        >
          <Link to="/jobs" className="link">
            Find Jobs
          </Link>
        </button>
      </div>
    </>
  )
}

export default Home
