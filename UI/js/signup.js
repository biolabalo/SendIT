/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const fullname = document.getElementById('fullname');
const signupEmail = document.querySelector('.Email');
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const signUpForm = document.querySelector('.sign-up');


const validatefullname = () => {
  const name = document.getElementById('fullname');
  const re = /^[a-z ,.'-]+$/i;

  if (!re.test(name.value)) {
    name.classList.add('is-invalid');
    name.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback');
    name.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    name.classList.remove('is-invalid');
    name.nextElementSibling.nextElementSibling.classList.add('invalid-feedback');
    name.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');
  }
};

const validateusername = () => {
  const Username = document.getElementById('Username');
  const re = /^[a-zA-Z0-9]{1,20}$/;

  if (!re.test(Username.value)) {
    Username.classList.add('is-invalid');
    Username.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback');
    Username.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    Username.classList.remove('is-invalid');
    Username.nextElementSibling.nextElementSibling.classList.add('invalid-feedback');
    Username.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');
  }
};


const validatemail = () => {
  const email = document.querySelector('.Email');

  // eslint-disable-next-line no-useless-escape
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!re.test(email.value)) {
    email.classList.add('is-invalid');
    email.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback');
    email.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    email.classList.remove('is-invalid');
    email.nextElementSibling.nextElementSibling.classList.add('invalid-feedback');
    email.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');
  }
};

const validatepassword = () => {
  const signupassword = document.getElementById('signupPassword');
  const re = /^[a-zA-Z0-9]{5,10}$/;


  if (!re.test(signupassword.value)) {
    signupassword.classList.add('is-invalid');
    signupassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback');
    signupassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    signupassword.classList.remove('is-invalid');
    signupassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback');
    signupassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');
  }
};

const passwordmatch = () => {
  const signupassword = document.getElementById('signupPassword');
  const confirmpassword = document.getElementById('confirmPassword');

  if (signupassword.value !== confirmpassword.value) {
    confirmpassword.classList.add('is-invalid');
    confirmpassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback');
    confirmpassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    confirmpassword.classList.remove('is-invalid');
    confirmpassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback');
    confirmpassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');
  }
};


const signupuser = (e) => {
  e.preventDefault();


  if (
    Array.from(fullname.classList).includes('is-invalid')
     || Array.from(signupPassword.classList).includes('is-invalid')
     || Array.from(signupEmail.classList).includes('is-invalid')
     || Array.from(Username.classList).includes('is-invalid')
     || Array.from(confirmPassword.classList).includes('is-invalid')
  ) {
    swal({ icon: 'warning', title: 'Inputs Must be Valid Before Submission' });
  } else {
    // const data = {
    //   fullname: fullname.value,
    //   username: Username.value,
    //   password: signupPassword.value,
    //   email: signupEmail.value,
    // };
  }
};


fullname.addEventListener('blur', validatefullname);
Username.addEventListener('blur', validateusername);
signupEmail.addEventListener('blur', validatemail);
signupPassword.addEventListener('blur', validatepassword);
confirmPassword.addEventListener('blur', passwordmatch);
signUpForm.addEventListener('submit', signupuser);
