/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
class Auth {

  static async userSignUp(data) {
    localStorage.clear();
    try {
      const response = await fetch('https://sendit-biola.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.message === 'User with that EMAIL already exist') {
        swal({ icon: 'warning', title: 'User with that EMAIL already exist' });
        return;
      }
      if (result.status === 201) {
        window.location = './signIn.html';
      } else {

        swal({ icon: 'warning', title: 'Sign Up Failed Try Again' });
        document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
      }
    } catch (e) {

      swal({ icon: 'warning', title: 'Sign Up Failed Try Again' });
      document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
    }

  }

  static async Login(data) {
    localStorage.clear();
    try {
      const response = await fetch('https://sendit-biola.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === 401) {
        document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
        swal({ icon: 'warning', title: result.message });
      }

      if (result.status === 200) {

        if (result.data[0].user.isadmin === false) {

          localStorage.setItem('authToken', result.data[0].token);
          localStorage.setItem('userId', result.data[0].user.id);
          window.location = 'AllOrders.html';
        } else if (result.data[0].user.isadmin === true) {
          window.location = 'AdminLogin.html';
        }
        return;
      }
      throw 'Error';
    } catch (e) {
      document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
      swal({ icon: 'warning', title: 'OOps ! Try Again' });
    }


  }

  static async AdminLogin(data) {
    try {
      const response = await fetch('https://sendit-biola.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === 401) {
        document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
        swal({ icon: 'warning', title: result.message });
      }

      if (result.status === 200) {
        if (result.data[0].user.isadmin === false) {
          window.location = 'Signin.html';
        } else if (result.data[0].user.isadmin === true) {
          localStorage.clear();
          localStorage.setItem('AdminauthToken', result.data[0].token);
          localStorage.setItem('AdminId', result.data[0].user.id);
          window.location = 'AdminChange.html';

        }
        return;
      }
      throw 'Error';
    } catch (e) {
      document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
      swal({ icon: 'warning', title: 'OOps ! Try Again' });
    }

  }

}
