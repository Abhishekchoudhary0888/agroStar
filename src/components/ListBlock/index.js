import React, { useState, useEffect, useContext } from "react"

import "./index.scss"
import IndividualList from "./individualList"
import ResultNotFound from "../ResultNotFound/index.js"
import { ListDataContext } from "../../context/index"

const ListBlock = (props) => {
  const [listData, setListData] = useContext(ListDataContext)

  let listResult = ""
  if (listData.length > 0) {
    listResult = listData.map((listDetails) => {
      return <IndividualList listDetails={listDetails} />
    })
  } else {
    listResult = <ResultNotFound />
  }

  return (
    <>
      <div className="lists-wrapper">{listResult}</div>
    </>
  )
}

export default ListBlock
