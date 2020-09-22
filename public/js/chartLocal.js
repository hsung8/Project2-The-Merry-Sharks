$(document).ready(() => {
  const table = $("tbody")[0];
  $.ajax({
    url: "/api/nutrients",
    method: "GET"
  }).then(result => {
    const myData = result.map(item => {
      const newItem = {
        name: item.foodName,
        consumedWhen: item.meal,
        calorie: item.calories,
        carb: item.carb,
        protein: item.protein,
        fat: item.fat,
        fiber: item.fiber
      };
      return newItem;
    });
    //   console.log(myData)
    generateTable(table, myData);
    $("#myTable").DataTable();
  });

  function generateTable(table, data) {
    for (const element of data) {
      const row = table.insertRow();
      for (key in element) {
        const cell = row.insertCell();
        cell.append(element[key]);
      }
    }
  }
});
