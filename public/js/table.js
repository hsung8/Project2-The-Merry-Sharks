$(document).ready(() => {
  //Due to how HTML5 defines its semantics, the autofocus HTML attribute has no effect in Bootstrap modals. To achieve the same effect, use some custom JavaScript:
  $("#myModal").on("shown.bs.modal", () => {
    $("#myInput").trigger("focus");
  });
  // parent function to generate the page dynamically
  function GenerateThisPage() {
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
      generateTable(table, myData);
      $("#myTable").DataTable();
      createDeleteOption(result);
    });
  }
  function generateTable(table, data) {
    for (const element of data) {
      const row = table.insertRow();
      for (key in element) {
        const cell = row.insertCell();
        cell.append(element[key]);
      }
    }
  }
  //Function to create a list of delete options for user to choose
  function createDeleteOption(data) {
    console.log(data);
    data.forEach(item => {
      const option = $(`<option value="${item.id}">${item.foodName}</option>`);
      option.appendTo($("#deleteList"));
    });
  }
  //Event listener for delete item button
  $("#deleteOneItem").on("submit", event => {
    event.preventDefault();
    const id = $("#deleteList").val();
    $(".alert")
      .fadeTo(2000, 500)
      .slideUp(500, () => {
        $(".alert").slideUp(500);
      });
    $.ajax({
      url: `/api/deleteOne/${id}`,
      method: "DELETE"
    }).then(() => {
      //after successfully delete item, empty the table and delete options and re-generate new table
      $("tbody").empty();
      $("option").remove();
      GenerateThisPage();
    });
  });
  //Event listener to for the DELETE EVERYTHING button
  $("#deleteAll").click(() => {
    $.ajax({
      url: "/api/delete/all",
      method: "DELETE"
    }).then(() => {
      location.reload();
    });
  });
  GenerateThisPage();
});
