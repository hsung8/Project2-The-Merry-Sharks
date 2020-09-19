$(document).ready(() => {
  // Getting references to our form and input
  const manualForm = $("form#manualLog");
  const mealInput = $("input#meal-input");
  const foodInput = $("input#food-input");
  const calorieInput = $("input#calorie-input");
  let userId;

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    $(".member-goal").text(data.goal);
    userId = data.userId;
  });

  manualForm.on("submit", event => {
    event.preventDefault();
    console.log(userId);
    const foodData = {
      userId: userId,
      meal: mealInput.val(),
      foodName: $("input#food-input").val(),
      calories: $("input#calorie-input").val()
    };

    console.log(foodData.foodName);
    console.log(foodData.calories);

    if (!foodData.foodName || !foodData.calories) {
      return;
    }
    // eslint-disable-next-line prettier/prettier
    addFoodEntry(foodData.userId, foodData.meal, foodData.foodName, foodData.calories);
    mealInput.val("");
    foodInput.val("");
    calorieInput.val("");
  });

  function addFoodEntry(userId, meal, foodName, calories) {
    console.log("test addFoodEntry");
    $.post("api/foods", {
      userId: userId,
      meal: meal,
      foodName: foodName,
      calories: calories
    })
      .then(console.log("response"))
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
