// Write your code here
import {Component} from 'react'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamCard: [],
  }

  componentDidMount() {
    this.getTeamCard()
  }

  getTeamCard = async () => {
    const response = await fetch(`https://apis.ccbp.in/ipl`)
    const data = await response.json()
    console.log(data)
    const updatedTeamcard = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    console.log(updatedTeamcard)
    this.setState({teamCard: updatedTeamcard})
  }

  renderDashboard = () => {
    const {teamCard} = this.state

    return (
      <div className="home-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="header">IPL Dashboard</h1>
        </div>
        <ul className="teams-list">
          {teamCard.map(eachItem => (
            <TeamCard key={eachItem.id} teamDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <div>{this.renderDashboard()}</div>
  }
}
export default Home
