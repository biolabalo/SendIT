/* eslint-disable require-jsdoc */
class Auth {

  static async userSignUp(data) {
    console.log(data);
    const response = await fetch('https://sendit-biola.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  }

  static getToken() {
    return window.localStorage.getItem('token');
  }

  static saveToken(token) {
    window.localStorage.setItem('token', token);
  }

  static removeToken() {
    return window.localStorage.removeItem('token');
  }

}
