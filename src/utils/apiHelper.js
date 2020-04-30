import axios from "axios"

export const apiGetHelper = async (URL, contentType) => {
  try {
    // const responseData = fetch(URL)
    const responseData = await axios.get(URL, {
      headers: {
        Accept: "*",
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    return responseData
  } catch (e) {
    console.log(e)
  }
}
