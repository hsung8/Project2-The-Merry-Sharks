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
      `<button type="button" class="hidden" >Update</button>`
    );
    $(".update-button").append(updateBtn);
  });

  $("td").keypress(() => {
    $("button").removeClass("hidden");
  });

  $(document).on("click", "button", event => {
    event.preventDefault();
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
    console.log(typeof data.goal)
    if (data.goal !== NaN && data.email.includes("@") && data.name !== NaN) {
      console.log("success", data);
      $.ajax({
        url: "/api/update-info",
        method: "PUT",
        error: function(xhr, status, error) {
          console.log(error);
        },
        data: data
      }).then(() => {
        console.log("successfully update")
      });
    } else {
      alert("fail")
    }
  });
});
