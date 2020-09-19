$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    $(".member-goal").text(data.goal);
  });
});

const a = 25;
const b = 25;
let myDoughnutChart = document.getElementById("myChart").getContext('2d');
myDoughnutChart = new Chart(myDoughnutChart, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [a, b],
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
      display: true
    }
  }
});
