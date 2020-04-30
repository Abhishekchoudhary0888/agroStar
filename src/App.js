import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { ListDataContext, TotalPriceContext } from "./context/index"

import ListContainer from "./components/ListContainer"

function App() {
  const listHook = useState([])
  let PriceHook = ""
  const storedBagData = JSON.parse(window.localStorage.getItem("bagData"))

  if (storedBagData && storedBagData.totalPrice > 0) {
    PriceHook = useState(storedBagData)
  } else {
    PriceHook = useState([])
  }
  // if (storedBagData && storedBagData.totalPrice > 0) {
  //   setPriceContext(storedBagData)
  // }

  return (
    <>
      <ListDataContext.Provider value={listHook}>
        <TotalPriceContext.Provider value={PriceHook}>
          <Router>
            <div>
              <Switch>
                <Route path="/">
                  <ListContainer />
                </Route>
              </Switch>
            </div>
          </Router>
        </TotalPriceContext.Provider>
      </ListDataContext.Provider>
    </>
  )
}

export default App
