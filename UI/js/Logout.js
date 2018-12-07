
const Logout = () =>{
localStorage.clear(); 
window.location = 'signIn.html';   
}

document.querySelector('.logoutbtn').addEventListener('click' , Logout)