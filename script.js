const form = document.getElementById("registration");
const college = document.getElementById("college");
const major = document.getElementById("major");
const submitBtn = document.getElementById("submitBtn");

const majors = {
  BCOE: ["Computer Science", "Computer Engineering"],
  CNAS: ["Biology", "Chemistry", "Mathematics"],
  CHASS: ["Psychology", "Sociology", "History"],
  SOB: ["Business Administration", "Accounting"],
  SPP: ["Public Policy"],
  SOE: ["Education"]
};


const fields = {
  fname: document.getElementById("fname"),
  lname: document.getElementById("lname"),
  bday: document.getElementById("bday"),
  college: college,
  major: major,
  phone: document.getElementById("phone"),
  email: document.getElementById("email"),
  guests: document.getElementById("guests")
};

college.addEventListener("change", function () {
  major.innerHTML = '<option value="">SELECT MAJOR</option>';

  if (majors[college.value]) {
    majors[college.value].forEach(function (m) {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = m;
      major.appendChild(option);
    });
  }

  validateForm();
});

Object.values(fields).forEach(function (field) {
  field.addEventListener("input", validateForm);
  field.addEventListener("change", validateForm);
});

function validateForm() {
  let valid = true;

  clearErrors();

  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(fields.fname.value.trim())) {
    showError(fields.fname, "First name must contain only letters.");
    valid = false;
  }

  if (!nameRegex.test(fields.lname.value.trim())) {
    showError(fields.lname, "Last name must contain only letters.");
    valid = false;
  }

  if (fields.bday.value === "" || getAge(fields.bday.value) < 2) {
    showError(fields.bday, "ERROR: Please enter a valid birthday.");
    valid = false;
  }

  if (fields.college.value === "") {
    showError(fields.college, "ERROR: Please select a college.");
    valid = false;
  }

  if (fields.major.value === "") {
    showError(fields.major, "ERROR: Please select a major.");
    valid = false;
  }

  if (!phoneRegex.test(fields.phone.value.trim())) {
    showError(fields.phone, "ERROR: Your number must be exactly 10 digits.");
    valid = false;
  }

  if (!emailRegex.test(fields.email.value.trim())) {
    showError(fields.email, "ERROR: You must enter a valid email address.");
    valid = false;
  }

  if (fields.guests.value === "" || Number(fields.guests.value) < 1) {
    showError(fields.guests, "ERROR: You need at least 1 (one) guest.");
    valid = false;
  }

  submitBtn.disabled = !valid;
  return valid;
}

function showError(input, message) {
  input.classList.add("invalid");

  const error = document.createElement("p");
  error.className = "error-message";
  error.textContent = message;

  input.insertAdjacentElement("afterend", error);
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach(function (error) {
    error.remove();
  });

  document.querySelectorAll("input, select").forEach(function (input) {
    input.classList.remove("invalid");
  });
}

function getAge(dob) {
  const today = new Date();
  const birth = new Date(dob);

  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    alert("Form submitted successfully!");
  }
});

form.addEventListener("reset", function () {
  setTimeout(function () {
    major.innerHTML = '<option value="">SELECT MAJOR</option>';
    clearErrors();
    submitBtn.disabled = true;
  }, 0);
});