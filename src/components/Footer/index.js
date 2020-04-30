import React from "react"
import "./footer.scss"
import productIcon from "../../assets/product.png"
import myorderIcon from "../../assets/myorder.png"

const Footer = React.memo((props) => {
  return (
    <div className="footer">
      <img src={productIcon} width="50" alt="productIcon" />
      <img src={myorderIcon} width="50" alt="myorderIcon" />
    </div>
  )
})

export default Footer
