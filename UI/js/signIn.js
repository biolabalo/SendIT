const signupEmail  = document.querySelector('.Email');
const signupPassword = document.getElementById('signupPassword');
const signin = document.querySelector('.sign-In');

const validateEmail = () => {
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

const Validatepassword = () => {
  const signUpPassword = document.getElementById('signupPassword');
  const re =  /^[a-zA-Z0-9]{5,10}$/;
 

  if(!re.test(signUpPassword.value)){
    signUpPassword.classList.add('is-invalid'),
    signUpPassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback'),
    signUpPassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    signUpPassword.classList.remove('is-invalid'),
    signUpPassword.nextElementSibling.nextElementSibling.classList.add('invalid-feedback'),
    signUpPassword.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');   
      
  };
    
};





const signinuser = (e) => {
 e.preventDefault();
    
 if( 
    Array.from(signupPassword.classList).includes('is-invalid') 
    || Array.from(signupEmail.classList).includes('is-invalid') 
  ){
   swal({ icon: 'warning'  , title: 'Inputs Must be Valid Before Submission' }); 
   }else{
    const data = {
    password: signupPassword.value,
    email: signupEmail.value,
  }; 
       
 };

};


signin.addEventListener('submit', signinuser );
signupEmail.addEventListener('blur', validateEmail);
signupPassword.addEventListener('blur', Validatepassword);
