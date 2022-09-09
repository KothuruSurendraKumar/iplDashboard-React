// Write your code here
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatches: []}

  componentDidMount() {
    this.getTeamData()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamData = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const dataAll = await response.json()
    console.log(dataAll)
    const updatedData = {
      teamBannerUrl: dataAll.team_banner_url,
      latestMatch: this.getFormattedData(dataAll.latest_match_details),
      recentMatches: dataAll.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    console.log(updatedData)
    this.setState({teamMatches: updatedData})
  }

  renderTeamMatches = () => {
    const {teamMatches} = this.state
    const {teamBannerUrl, latestMatch} = teamMatches
    return (
      <div className="team-match-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <p className="latest-text">Latest Matchs</p>
        <LatestMatch latestMatchData={latestMatch} />
      </div>
    )
  }

  render() {
    return <div>{this.renderTeamMatches()}</div>
  }
}
export default TeamMatches
