$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    console.log(data);
    const currentTime = moment().format("MMMM Do YYYY");
    console.log(currentTime);
    //Create greetings to user with their total calories count
    $(".greeting").text(`Hello ${data.name}`);
    $(
      `<h3 class="greeting2">Your Calorie Goal on ${currentTime} is <b>${data.goal} kcal</b></h3>`
    ).appendTo($(".greeting"));
  });

  //Event listener for searching a food
  $("#searchFood").click((event) => {
    event.preventDefault();
    const searchTerm = $("#food-name")
      .val()
      .trim();
    const link = `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${searchTerm}&app_id=b3680fc6&app_key=8f1414fd887696e063a286f3fea6cd89`;
    $.ajax({
      url: link,
      method: "GET",
    }).done((result) => {
      // console.log("name", result.text);
      // console.log("kcal", result.parsed[0].food.nutrients.ENERC_KCAL);
      // console.log("img", result.parsed[0].food.image);
      $("#searchResult").empty(); // clear the previous result
      const kCal = Math.round(result.hints[0].food.nutrients.ENERC_KCAL); // round up kCal
      const carbContent = Math.round(result.hints[0].food.nutrients.CHOCDF); // round up carb
      const proteinContent = Math.round(result.hints[0].food.nutrients.PROCNT); // round up protein
      const fatContent = Math.round(result.hints[0].food.nutrients.FAT); // round up fat
      const fiberContent = Math.round(result.hints[0].food.nutrients.FIBTG); // round up fiber
      const resultFood = $("<h3>").text(
        `${result.text} has ( ${kCal} calories)`
      );
      const carbResult = $("<h4>").text(`${carbContent} grams of carbs`);
      const proteinResult = $("<h4>").text(
        `${proteinContent} grams of proteins`
      );
      const fatResult = $("<h4>").text(`${fatContent} grams of fat`);
      const fiberResult = $("<h4>").text(`${fiberContent} grams of fiber`);
      const resultImgUrl = result.hints[0].food.image; // link to the food image
      //set image of food you search for to be display
      const foodImage = $("<img>").attr({
        src:
          resultImgUrl ||
          "https://media.istockphoto.com/vectors/yum-text-yummy-concept-design-doodle-for-print-vector-id1178543653?b=1&k=6&m=1178543653&s=612x612&w=0&h=M8Pa4Qne8pDCse3Zdg-a1fpMblWwZd1WfeHLMwNM1Mk=",
        alt: result.text,
        width: 200,
        height: 180
      });
      //Append all result to the DOM
      $("#searchResult").append(
        resultFood,
        foodImage,
        carbResult,
        proteinResult,
        fatResult,
        fiberResult
      );
      //Create a dropdown list to select which meal of the day you want to add this food to
      const dropdownList = $(`<form action="/action_page.php"></form>`);
      dropdownList.append($(`<label for="meal">Choose a meal</label>`));
      const mealOfDay = $(`<select name="meal" id="meal"></select>`);
      const breakFast = $(`<option value="breakfast">breakfast</option>`);
      const lunch = $(`<option value="lunch">lunch</option>`);
      const dinner = $(`<option value="dinner">dinner</option>`);
      breakFast.appendTo(mealOfDay);
      lunch.appendTo(mealOfDay);
      dinner.appendTo(mealOfDay);
      mealOfDay.appendTo(dropdownList);
      const input = $(`<br><input type="submit" value="Submit">`);
      input.appendTo(dropdownList);
      dropdownList.appendTo($("#searchResult"));
    });
  });
});

// Donought Chart
const consumedCalories = 75;
const leftCalories = 25;
const ctx = document.getElementById("myChart").getContext("2d");
myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [consumedCalories, leftCalories],
        backgroundColor: ["#43B187", "#dedede"],
      },
    ],
    labels: ["Consumed calories", "Left Calories"],
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    title: {
      text: "Daily calories",
      display: false,
    },
    legend: {
      display: false,
    },
  },
});

// Center text in the doughnut chart
Chart.pluginService.register({
  beforeDraw: function(chart) {
    const width = chart.chart.width,
      height = chart.chart.height,
      ctx = chart.chart.ctx;

    ctx.restore();
    const fontSize = 1.5;
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    const text = "1000\n Calories left",
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
});

// Nutrient table
const myData = [
  { Nutrients: "Carbs", Intake: 100 },
  { Nutrients: "Protein", Intake: 200 },
  { Nutrients: "Fat", Intake: 80 },
  { Nutrients: "Fiber", Intake: 26 },
];

function generateTableHead(table) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  for (const key of data) {
    const th = document.createElement("th");
    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (const element of data) {
    const row = table.insertRow();
    for (key in element) {
      const cell = row.insertCell();
      const text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

const table = document.querySelector("table");
const data = Object.keys(myData[0]);
generateTableHead(table, data);
generateTable(table, myData);

table.className = "tbl";
