// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatches: [], isLoading: true}

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
    this.setState({teamMatches: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {teamMatches} = this.state
    const {teamBannerUrl, latestMatch, recentMatches} = teamMatches
    return (
      <div className="team-match-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />

        <LatestMatch latestMatchData={latestMatch} />
        <ul className="recent-list">
          {recentMatches.map(recentMatch => (
            <MatchCard key={recentMatch.id} recentMatchData={recentMatch} />
          ))}
        </ul>
      </div>
    )
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}
export default TeamMatches
