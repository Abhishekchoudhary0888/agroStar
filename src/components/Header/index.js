import React from "react"
import { useHistory } from "react-router-dom"
import "./header.scss"
import Logo from "../../assets/logo.png"
import RefreshImg from "../../assets/refresh.png"
import ProfileImg from "../../assets/profile.jpg"

const Header = React.memo((props) => {
  const history = useHistory()
  const clickHandler = () => {
    history.push("/")
  }
  return (
    <div className="header">
      <img
        className="profile-img"
        src={Logo}
        alt="Profile"
        width="120"
        onClick={clickHandler}
      />
      <div>
        <img src={RefreshImg} width="30" height="30" alt="RefreshIcon" />
        <img src={ProfileImg} width="30" height="30" alt="ProfileIcon" />
      </div>
    </div>
  )
})

export default Header
