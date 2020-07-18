module.exports = {
  orderInAscendingOrderById: data => {
    let result = data.sort((a,b) => Number(a.id) - Number(b.id));
    return result;
  }
}