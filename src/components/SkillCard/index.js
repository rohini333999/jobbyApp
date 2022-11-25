import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-list">
      <div className="each-skill-container">
        <img src={imageUrl} alt={name} className="skill-logo" />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillCard
