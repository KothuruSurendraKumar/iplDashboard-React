// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamCard: [],
    isLoading: true,
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
    this.setState({teamCard: updatedTeamcard, isLoading: false})
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

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.renderLoader() : this.renderDashboard()}</div>
  }
}
export default Home
