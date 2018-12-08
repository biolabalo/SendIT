
const Logout = () =>{
    localStorage.clear(); 
    window.location = 'AdminLogin.html';   
    }
    
    document.querySelector('.logoutbtn').addEventListener('click' , Logout)