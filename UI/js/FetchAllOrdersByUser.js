const Token = localStorage.getItem('authToken');
const userId = localStorage.getItem('userId');
if (!Token || !userId) window.location = 'signIn.html';

const fetch_User_Details = async () => {

  const url = `https://sendit-biola.herokuapp.com/api/v1/users/${userId}/parcels`;

  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': Token,
        'Content-type': 'application/json',
      }
    });

    const result = await response.json();

    if(result) {
    appendDataToDom(result);
      }

  } catch (e) {
    swal({ icon: 'warning', title: e });
     window.location = 'signIn.html';
  }
};

window.onload = () => fetch_User_Details();


/////////////////////////////////////////////////////////////////////////////////

const appendDataToDom = (result) => {
   
  const IntrestedDiv = document.querySelector('.intrestedDiv');

  if (result.length > 0) {
    let neededData = '';
    
    result.forEach((res) => {
  neededData += `
  <tr>
  <td>${res.item_name}</td>
  <td>${res.pickup_address}</td>
  <td>${res.destination_address}</td>
  <td class = ${res.status}>${res.status}</td>
  <td>${res.receiver_name}</td>
  
  <td> <button class="view-btn" href ="singleOrder.html" onclick ="fetchSingleOrderDetails('${res.id}')">View </button></td>
  </tr>
  `;

    });

    const data_To_Be_Appended = `
   <table class="animated zoomInDown">
   <tr>
     <th>Item Name</th>
     <th>Pick Up Address</th>
     <th>Destination</th>
     <th>Status</th>
     <th>Recepient </th>
    
     <th></th>
   </tr>    ${neededData}   </table>`;

    IntrestedDiv.innerHTML = data_To_Be_Appended;
    return;
  }

  IntrestedDiv.innerHTML = `<p> You Have Not Ordered For Any Parcel delivery.To create a parcel Click <b>Create Parcel Order </b> <p>`;

};
