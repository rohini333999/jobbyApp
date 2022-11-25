import {Component} from 'react'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterOptions extends Component {
  onChangeEmployeeType = event => {
    const {changeEmployeeType} = this.props
    changeEmployeeType(event.target.value)
  }

  renderTypeOfEmployee = () => (
    <ul className="filter-container">
      <h1 className="sidebar-heading">Type of Employment</h1>
      {employmentTypesList.map(each => (
        <li
          className="list-item"
          key={each.employmentTypeId}
          onChange={this.onChangeEmployeeType}
        >
          <input
            type="radio"
            name="employee"
            id={each.employmentTypeId}
            value={each.employmentTypeId}
          />
          <label htmlFor={each.employmentTypeId} className="label">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getActiveSalaryId = event => {
    const {salaryRange} = this.props
    salaryRange(event.target.value)
  }

  renderSalaryRange = () => (
    <ul className="filter-container">
      <h1 className="sidebar-heading">Salary Range</h1>
      {salaryRangesList.map(each => (
        <li className="list-item" key={each.salaryRangeId}>
          <input
            type="radio"
            id={each.salaryRangeId}
            name="salary"
            onChange={this.getActiveSalaryId}
            value={each.salaryRangeId}
          />
          <label htmlFor={each.salaryRangeId} className="label">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <div>
        {this.renderTypeOfEmployee()}
        <hr className="line" />
        {this.renderSalaryRange()}
      </div>
    )
  }
}

export default FilterOptions
