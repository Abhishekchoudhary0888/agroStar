export function filterListData(word, data) {
  const result = data.filter((el) => {
    const key = el.productName.toLowerCase()
    return key.indexOf(word) > -1
  })

  return result
}
