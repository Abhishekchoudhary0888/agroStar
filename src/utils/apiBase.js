import { apiGetHelper } from "./apiHelper"

export const fetchListResultGetApi = () => {
  //const URL = "http://localhost:3000/list.json"
  const URL = "http://www.mocky.io/v2/5b3de5ed310000db1f6de257"
  const response = apiGetHelper(URL)
  return response
}
