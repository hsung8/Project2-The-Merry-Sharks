$(document).ready(() => {
  // Upon landing on page, get the user data and display on a table
  $.ajax({
    url: "/api/user_data",
    method: "GET",
    error: function(xhr, status, error) {
      console.log(error);
    }
  }).then(result => {
    console.log(result);
    $("#name").text(result.name);
    $("#email").text(result.email);
    $("#goal").text(result.goal);
    const updateBtn = $(
      `<button type="button" class="btn btn-outline-primary btn hidden" >Update</button>`
    );
    $(".update-button").append(updateBtn);
  });

  // When user edit something inside the value column, show the "Update" button
  $("td").keypress(() => {
    $("button").removeClass("hidden");
  });

  //When user click on the update button, update the data, show the alert, and hide the update button
  $(document).on("click", "button", () => {
    //create an object to send to the backend
    const data = {
      name: $("#name")
        .text()
        .trim(),
      email: $("#email")
        .text()
        .trim(),
      goal: parseInt(
        $("#goal")
          .text()
          .trim()
      )
    };
    // validate to make sure that user input goal, email, and name
    if (!isNaN(data.goal) && data.email.includes("@") && data.name !== "") {
      $(".alert-success")
        .fadeTo(2000, 500)
        .slideUp(500, () => {
          $(".alert-success").slideUp(500);
        });
      //if validation pass, call ajax PUT method to update data
      $.ajax({
        url: "/api/update-info",
        method: "PUT",
        error: function(xhr, status, error) {
          console.log(error);
        },
        data: data
      }).then(() => {
        console.log("I made here");
        //Show the success alert and hide it after a few secs
      });
    } else {
      // if they dont pass the validation, alert them the error, and hide it after a few secs
      $(".alert-danger")
        .fadeTo(2000, 500)
        .slideUp(500, () => {
          $(".alert-danger").slideUp(500);
        });
    }
  });
});
