// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <Link className="router-link" to={`/ipl/${id}`}>
      <li className="team-elements">
        <img src={teamImageUrl} alt={name} className="team-img" />
        <h1 className="team-name">{name}</h1>
      </li>
    </Link>
  )
}
export default TeamCard
