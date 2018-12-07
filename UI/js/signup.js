const fullname = document.getElementById('fullname');
const signupEmail  = document.querySelector('.Email');
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const signUpForm = document.querySelector('.sign-up');



const validatefullname = () => {
  const name = document.getElementById('fullname');
  const re =  /^[a-z ,.'-]+$/i;

  if(!re.test(name.value)){
    name.classList.add('is-invalid'),
    name.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback'),
    name.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');

  } else {
    name.classList.remove('is-invalid'),
    name.nextElementSibling.nextElementSibling.classList.add('invalid-feedback'),
    name.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');  
       
  };
    
};


const validatemail = () => {
  const email = document.querySelector('.Email');
    
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if(!re.test(email.value)){
    email.classList.add('is-invalid'),
    email.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback'),
    email.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    email.classList.remove('is-invalid'),
    email.nextElementSibling.nextElementSibling.classList.add('invalid-feedback'),
    email.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');  
      
  };
    
};

const validatepassword = () => {
  const signupassword = document.getElementById('signupPassword');
  const re =  /^[a-zA-Z0-9]{5,10}$/;
 

  if(!re.test(signupassword.value)){
     signupassword.classList.add('is-invalid'),
     signupassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback'),
     signupassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
     signupassword.classList.remove('is-invalid'),
     signupassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback'),
     signupassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');   
      
  };
    
};

  const  passwordmatch = () => {
  const signupassword = document.getElementById('signupPassword');
  const confirmpassword = document.getElementById('confirmPassword');
    
  if( signupassword.value !== confirmpassword.value ){
    confirmpassword.classList.add('is-invalid'),
    confirmpassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback'),
    confirmpassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show')
  } else {
  confirmpassword.classList.remove('is-invalid'),
  confirmpassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback'),
  confirmpassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');
      
  };
    
};



const  signupuser = (e) => {
  e.preventDefault();
    
   
 if( 
     Array.from(fullname.classList).includes('is-invalid')      
     || Array.from(signupPassword.classList).includes('is-invalid') 
     || Array.from(signupEmail.classList).includes('is-invalid') 
     || Array.from(confirmPassword.classList).includes('is-invalid')
    ) {
    swal({ icon: 'warning'  , title: 'Inputs Must be Valid Before Submission' }); 
 }else{
 
document.querySelector('.sub-btn').innerHTML = `<span>Submit <i class="fas fa-spinner fa-spin"></i></span>`  
  e.preventDefault();
    const data = {
    fullname: fullname.value,
    password: signupPassword.value,
    email: signupEmail.value,
    confirmPassword: confirmPassword.value
  }; 
  Auth.userSignUp(data)   
   
 };



};


fullname.addEventListener('blur', validatefullname);
signupEmail.addEventListener('blur', validatemail);
signupPassword.addEventListener('blur', validatepassword );
confirmPassword.addEventListener('blur', passwordmatch);
signUpForm.addEventListener('submit', signupuser);


