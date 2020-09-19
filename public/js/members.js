$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    $(".member-goal").text(data.goal);
  });
});

// Donought Chart
const consumedCalories = 25;
const leftCalories = 25;
const ctx = document.getElementById("myChart").getContext("2d");
myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [consumedCalories, leftCalories],
        backgroundColor: ["#43B187", "#dedede"]
      }
    ],
    labels: ["Consumed calories", "Left Calories"]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    title: {
      text: "Daily calrories",
      display: false
    },
    legend: {
      display: false
    }
  }
});

// Center text in the doughnut chart
Chart.pluginService.register({
  beforeDraw: function(chart) {
    const width = chart.chart.width,
      height = chart.chart.height,
      ctx = chart.chart.ctx;

    ctx.restore();
    const fontSize = 1;
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    const text = "1000 Calories Left",
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});
