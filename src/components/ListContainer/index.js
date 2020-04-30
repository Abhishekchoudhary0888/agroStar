import React, { useState, useEffect, useContext } from "react"
import { fetchListResultGetApi } from "../../utils/apiBase"
import { filterListData } from "../../utils/resultHelper"

import ListBlock from "../ListBlock"
import Header from "../Header"
import Footer from "../Footer"
import Loading from "../Loading"

import "./list.scss"
import { ListDataContext, TotalPriceContext } from "../../context/index"

const ListContainer = (props) => {
  const [ListData, setListData] = useContext(ListDataContext)
  const [mainListData, setMainListData] = useState([])
  const [priceContext, setPriceContext] = useContext(TotalPriceContext)
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (ListData.length === 0) {
      getListData()
    }
  }, [])

  useEffect(
    () => {
      if (searchValue !== "") {
        const filterData = filterListData(searchValue, mainListData)
        setListData(filterData)
      } else {
        setListData(mainListData)
      }
    },
    [searchValue]
  )

  const getListData = async () => {
    const listResponse = await fetchListResultGetApi()
    const { status, data: { responseData: { productList = [] } = {} } = {} } =
      listResponse || {}

    if (status && productList.length > 0) {
      setListData(productList)
      setMainListData(productList)
      setLoading(false)
    }
  }

  const { totalCount = 0, totalPrice = 0 } = priceContext || {}
  let viewBagDom = ""
  if (totalCount > 0) {
    viewBagDom = (
      <div className="viewbag-wrap">
        <div className="item-details">{`${totalCount} items | Rs. ${totalPrice} `}</div>
        <div className="bag-arrow">VIEW BAG</div>
      </div>
    )
  }

  const searchHandler = (e) => {
    const value = e.target.value
    setSearchValue(value)
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="search-section">
          <input
            className="search-input"
            placeholder="Search by product name"
            type="text"
            onChange={searchHandler}
          />
        </div>

        <div className="content-section">
          {isLoading && <Loading />}
          {!isLoading && (
            <>
              <ListBlock />
              {viewBagDom}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ListContainer
