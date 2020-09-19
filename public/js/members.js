$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    console.log(data);
    const currentTime = moment().format("MMMM Do YYYY");
    $(".greeting").text(`Hello ${data.name}`);
    $(".greeting2").text(
      `Your Calorie Goal on ${currentTime} is <b>${data.goal}</b> kCal`
    );
  });

  //Event listener for searching a food
  $("#searchFood").click(event => {
    event.preventDefault();
    const searchTerm = $("#food-name")
      .val()
      .trim();
    const link = `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${searchTerm}&app_id=b3680fc6&app_key=8f1414fd887696e063a286f3fea6cd89`;
    $.ajax({
      url: link,
      method: "GET"
    }).done(result => {
      // console.log("name", result.text);
      // console.log("kcal", result.parsed[0].food.nutrients.ENERC_KCAL);
      // console.log("img", result.parsed[0].food.image);
      const kCal = Math.round(result.hints[0].food.nutrients.ENERC_KCAL); // round up kCal
      const resultFood = $("<h3>").text(`${result.text} (${kCal} calories)`);
      const resultImg = result.hints[0].food.image;
      $("#searchResult").append(resultFood); //create the name of food you searched
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

// // Donought Chart config
// Chart.pluginService.register({
//   beforeDraw: function(chart) {
//     if (chart.config.options.elements.center) {
//       // Get ctx from string
//       const ctx = chart.chart.ctx;

//       // Get options from the center object in options
//       const centerConfig = chart.config.options.elements.center;
//       const fontStyle = centerConfig.fontStyle || "Arial";
//       const txt = centerConfig.text;
//       const color = centerConfig.color || "#000";
//       const maxFontSize = centerConfig.maxFontSize || 75;
//       const sidePadding = centerConfig.sidePadding || 20;
//       const sidePaddingCalculated = (sidePadding / 100) * chart.innerRadius * 2;
//       // Start with a base font of 30px
//       ctx.font = "30px " + fontStyle;

//       // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
//       const stringWidth = ctx.measureText(txt).width;
//       const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

//       // Find out how much the font can grow in width.
//       const widthRatio = elementWidth / stringWidth;
//       const newFontSize = Math.floor(30 * widthRatio);
//       const elementHeight = chart.innerRadius * 2;

//       // Pick a new font size so it will not be larger than the height of label.
//       const fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
//       const minFontSize = centerConfig.minFontSize;
//       const lineHeight = centerConfig.lineHeight || 25;
//       const wrapText = false;

//       if (minFontSize === undefined) {
//         minFontSize = 20;
//       }

//       if (minFontSize && fontSizeToUse < minFontSize) {
//         fontSizeToUse = minFontSize;
//         wrapText = true;
//       }

//       // Set font settings to draw it correctly.
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
//       const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
//       ctx.font = fontSizeToUse + "px " + fontStyle;
//       ctx.fillStyle = color;

//       if (!wrapText) {
//         ctx.fillText(txt, centerX, centerY);
//         return;
//       }

//       const words = txt.split(" ");
//       const line = "";
//       const lines = [];

//       // Break words up into multiple lines if necessary
//       for (let n = 0; n < words.length; n++) {
//         const testLine = line + words[n] + " ";
//         const metrics = ctx.measureText(testLine);
//         const testWidth = metrics.width;
//         if (testWidth > elementWidth && n > 0) {
//           lines.push(line);
//           line = words[n] + " ";
//         } else {
//           line = testLine;
//         }
//       }

//       // Move the center up depending on line height and number of lines
//       centerY -= (lines.length / 2) * lineHeight;

//       for (let n = 0; n < lines.length; n++) {
//         ctx.fillText(lines[n], centerX, centerY);
//         centerY += lineHeight;
//       }
//       //Draw text in center
//       ctx.fillText(line, centerX, centerY);
//     }
//   }
// });

const consumedCalories = 25;
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
    title: {
      text: "Daily calrories",
      display: true,
    },
    elements: {
      center: {
        text: leftCalories + " Calories are left",
      },
    },
  },
});
