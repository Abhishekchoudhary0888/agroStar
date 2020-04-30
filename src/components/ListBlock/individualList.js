import React, { useState, useEffect, useContext } from "react"

import { TotalPriceContext } from "../../context/index"

import "./index.scss"

const IndividualList = React.memo((props) => {
  const [priceContext, setPriceContext] = useContext(TotalPriceContext)

  const [listCount, setListCount] = useState(0)
  const [selectorDomFlag, setSelectorDomFlag] = useState(false)

  const {
    listDetails: {
      defaultOffer = "",
      sellingPrice = 0,
      productName = "",
      productImages = [],
    },
  } = props || {}

  useEffect(
    () => {
      updateState()
    },
    [props.listDetails]
  )
  useEffect(() => {
    updateState()
  }, [])

  const updateState = () => {
    const storedData = JSON.parse(window.localStorage.getItem("listData"))
    if (storedData && storedData[productName]) {
      setSelectorDomFlag(true)
      setListCount(storedData[productName])
    }
  }
  const imgPath = productImages[0] && productImages[0].name

  const updatePriceContext = (flag) => {
    const { totalCount = 0, totalPrice = 0 } = priceContext
    const updatedPriceContext = {
      ...priceContext,
      totalPrice: flag ? totalPrice + sellingPrice : totalPrice - sellingPrice,
      totalCount: flag
        ? totalCount + 1
        : totalCount - 1 > 0
          ? totalCount - 1
          : 0,
    }
    window.localStorage.setItem("bagData", JSON.stringify(updatedPriceContext))
    setPriceContext(updatedPriceContext)
  }

  const setToPersistData = (updateCount) => {
    const storedData = JSON.parse(window.localStorage.getItem("listData"))

    const updateData = {
      ...storedData,
      [productName]: updateCount,
    }

    window.localStorage.setItem("listData", JSON.stringify(updateData))
  }

  const listAddClickHandler = () => {
    const updateCount = listCount + 1
    setListCount(updateCount)
    setSelectorDomFlag(true)
    updatePriceContext(true)
    setToPersistData(updateCount)
  }

  const decrementClickHandler = () => {
    const updateCount = listCount - 1
    if (updateCount < 1) {
      setSelectorDomFlag(false)
    }
    setListCount(updateCount)
    updatePriceContext(false)
    setToPersistData(updateCount)
  }

  const incrementClickHandler = () => {
    const updateCount = listCount + 1
    setListCount(updateCount)
    updatePriceContext(true)
    setToPersistData(updateCount)
  }

  return (
    <>
      <div className="list-wrap">
        <div className="img-wrap">
          <img class="product-img" src={imgPath} alt="Imagetag" />
        </div>

        <div className="name">{productName}</div>
        <div className="price">{`Rs. ${sellingPrice}`}</div>
        {defaultOffer && <div className="offer"> {defaultOffer}</div>}
        {!selectorDomFlag && (
          <div class="add" onClick={listAddClickHandler}>
            Add
          </div>
        )}
        {selectorDomFlag && (
          <div class="add select">
            <span className="selector" onClick={decrementClickHandler}>
              {" "}
              -{" "}
            </span>
            <span className="count"> {listCount} </span>
            <span className="selector" onClick={incrementClickHandler}>
              {" "}
              +{" "}
            </span>
          </div>
        )}
      </div>
    </>
  )
})

export default IndividualList
