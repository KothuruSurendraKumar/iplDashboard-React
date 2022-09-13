// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatchData} = props
  const {
    competingTeamLogo,
    competingTeam,
    result,
    matchStatus,
  } = recentMatchData
  const getMatchStatusClassName = status =>
    status === 'Won' ? 'match-won' : 'match-lost'
  const matchClassName = `${getMatchStatusClassName(matchStatus)}`
  return (
    <li className="match-items">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-logo"
      />
      <p className="team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchClassName}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
