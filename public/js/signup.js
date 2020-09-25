$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const nameInput = $("input#name-input");
  const goalInput = $("input#goal-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.stopPropagation();
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      goal: goalInput.val().trim()
    };
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.name, userData.goal);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
    goalInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, name, goal) {
    $.post("/api/signup", {
      email: email,
      name: name,
      goal: goal,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

//Calculate calories based on user info
let cneed;
let fneed;
let crneed;
let pneed;
let fd;

// eslint-disable-next-line no-unused-vars
function cc() {
  const age = parseInt(document.getElementById("age").value);
  const wunit = document.getElementById("wunit").value;
  const cm = document.getElementById("cen").value;
  let weight = document.getElementById("weight").value;
  if (age !== "" && cm !== "" && weight !== "") {
    if (wunit === "pounds") {
      weight = parseInt(weight);
      weight = Math.round(weight / 2.2046);
    }
    const activity = document.getElementById("activity").value;
    if (document.getElementById("gender").checked) {
      fd = 10 * weight + 6.25 * cm - 5 * age + 5;
    } else {
      fd = 10 * weight + 6.25 * cm - 5 * age - 161;
    }

    switch (activity) {
      case "1":
        cneed = fd * 1.2;
        break;
      case "2":
        cneed = fd * 1.375;
        break;
      case "3":
        cneed = fd * 1.53;
        break;
      case "4":
        cneed = fd * 1.725;
        break;
      case "5":
        cneed = fd * 1.9;
        break;
    }
    cneed = Math.floor(cneed);
    fneed = Math.floor((cneed * 0.25) / 9);
    if (wunit === "pounds") {
      fneed = Math.floor(fneed * 0.0353);
    }
    pneed = Math.floor((cneed * 0.25) / 4);
    if (wunit === "pounds") {
      pneed = Math.floor(pneed * 0.0353);
    }
    crneed = Math.floor((cneed * 0.25) / 4);
    if (wunit === "pounds") {
      crneed = Math.floor(crneed * 0.0353);
    }
    document.getElementById("rc").value = " " + cneed;
    document.getElementById("rf").value = " " + fneed;
    document.getElementById("rp").value = " " + pneed;
    document.getElementById("rh").value = " " + crneed;
    document.getElementById("l1").innerHTML = "grams";
    document.getElementById("l2").innerHTML = "grams";
    document.getElementById("l3").innerHTML = "grams";
    const caltype = document.getElementById("caltype").value;
    if (caltype === "g") {
      document.getElementById("l1").innerHTML = "grams";
      document.getElementById("l2").innerHTML = "grams";
      document.getElementById("l3").innerHTML = "grams";
    }
    if (wunit === "pounds") {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      document.getElementById("rf").value = " " + fat1;
      document.getElementById("rp").value = " " + pro1;
      document.getElementById("rh").value = " " + car1;
      document.getElementById("l1").innerHTML = "lbs";
      document.getElementById("l2").innerHTML = "lbs";
      document.getElementById("l3").innerHTML = "lbs";
    }
    if (caltype === "pounds") {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      document.getElementById("rf").value = " " + fat1;
      document.getElementById("rp").value = " " + pro1;
      document.getElementById("rh").value = " " + car1;
      document.getElementById("l1").innerHTML = "lbs";
      document.getElementById("l2").innerHTML = "lbs";
      document.getElementById("l3").innerHTML = "lbs";
    }
    if (caltype === "kg") {
      fat2 = fneed / 1000;
      pro2 = pneed / 1000;
      car2 = crneed / 1000;
      fat2 = fat2.toFixed(3);
      pro2 = pro2.toFixed(3);
      car2 = car2.toFixed(3);
      document.getElementById("rf").value = " " + fat2;
      document.getElementById("rp").value = " " + pro2;
      document.getElementById("rh").value = " " + car2;
      document.getElementById("l1").innerHTML = "kilogram";
      document.getElementById("l2").innerHTML = "kilogram";
      document.getElementById("l3").innerHTML = "kilogram";
    }
  } else {
    alert("Please check your details");
  }
}

// eslint-disable-next-line no-unused-vars
function con(num) {
  const hc = parseInt(num.value);
  const hi = hc / 2.54;
  const hf = Math.floor(hi / 12);
  const ri = Math.round(hi % 12);
  if (hc > 40 && hc <= 210) {
    document.getElementById("foot").value = hf;
  }
  document.getElementById("inch").value = ri;
}

// eslint-disable-next-line no-unused-vars
function hcal() {
  const hf = parseInt(document.getElementById("foot").value);
  const hi = parseInt(document.getElementById("inch").value);
  const hc = Math.round(hf * 30.48 + hi * 2.54);
  document.getElementById("cen").value = hc;
}

// eslint-disable-next-line no-unused-vars
function agecal(event, num) {
  let kc;
  if (window.event) {
    kc = event.keyCode;
  } else {
    kc = event.which;
  }
  const a = num.value;
  if (kc === 48) {
    if (a === "") {
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      return true;
    }
  }
  if (kc !== 8 && kc !== 0) {
    if (kc < 49 || kc > 57) {
      return false;
    }
  }
}

// eslint-disable-next-line no-unused-vars
function isNumberKey(id) {
  // eslint-disable-next-line quotes
  const no = eval('"' + id + '"');
  let number = document.getElementById(no).value;
  if (!number.match(/^[0-9\.]+$/) && number !== "") {
    number = number.substring(0, number.length - 1);
    document.getElementById(id).value = number;
  }
}

// eslint-disable-next-line no-unused-vars
function convert() {
  const age = parseInt(document.getElementById("age").value);
  const cm = document.getElementById("cen").value;
  const weight = document.getElementById("weight").value;
  if (age !== "" && cm !== "" && weight !== "") {
    const caltype = document.getElementById("caltype").value;

    if (caltype === "g") {
      document.getElementById("rc").value = " " + cneed;
      document.getElementById("rf").value = " " + fneed;
      document.getElementById("rp").value = " " + pneed;
      document.getElementById("rh").value = " " + crneed;
      document.getElementById("l1").innerHTML = "grams";
      document.getElementById("l2").innerHTML = "grams";
      document.getElementById("l3").innerHTML = "grams";
    }
    if (caltype === "pounds") {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      document.getElementById("rf").value = " " + fat1;
      document.getElementById("rp").value = " " + pro1;
      document.getElementById("rh").value = " " + car1;
      document.getElementById("l1").innerHTML = "lbs";
      document.getElementById("l2").innerHTML = "lbs";
      document.getElementById("l3").innerHTML = "lbs";
    }
    if (caltype === "kg") {
      fat2 = fneed / 1000;
      pro2 = pneed / 1000;
      car2 = crneed / 1000;
      fat2 = fat2.toFixed(3);
      pro2 = pro2.toFixed(3);
      car2 = car2.toFixed(3);
      document.getElementById("rf").value = " " + fat2;
      document.getElementById("rp").value = " " + pro2;
      document.getElementById("rh").value = " " + car2;
      document.getElementById("l1").innerHTML = "kilogram";
      document.getElementById("l2").innerHTML = "kilogram";
      document.getElementById("l3").innerHTML = "kilogram";
    }
  } else {
    alert("Please check your details");
  }
}

// Get the modal
const modal = document.getElementById("calculateModal");

// Get the button that opens the modal
const btn = document.getElementById("calculateB");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
