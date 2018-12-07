const Token = localStorage.getItem('authToken');
const userId = localStorage.getItem('userId');
if (!Token || !userId) window.location = 'signIn.html';

const SubmitDataAndRedirect = async (data) => {

  try {
    const response = await fetch('https://sendit-biola.herokuapp.com/api/v1/parcels', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {

        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': Token
      }

    });

    const result = await response.json();
   
    if (result.status === 201) {
      
      window.location = 'AllOrders.html';
      swal({ icon: 'success', title: result.data[0].message });
    } else {
     
      window.location = 'createOrder.html';
      swal({ icon: 'warning', title: 'Sign Up Failed Try Again' });
    }
  } catch (e) {
   
    window.location = 'createOrder.html';
    swal({ icon: 'warning', title: 'Sign Up Failed Try Again' });
  }
};
