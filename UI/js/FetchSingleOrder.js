/* eslint-disable no-undef */
const clickedSingleParcel = localStorage.getItem('singleParcelId');
const Token = localStorage.getItem('authToken');
const userid = localStorage.getItem('userId');
if (!clickedSingleParcel || !userid) window.location = 'AllOrders.html';
const url = `https://sendit-biola.herokuapp.com/api/v1/parcels/${clickedSingleParcel}`;


const fetchSingleData = async () => {

  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': Token
      }

    });

    const result = await response.json();

    if (result.success) {
      const { orders } = result;
      appendDataToDom(orders);
    } else {
      swal({ icon: 'warning', title: 'Failed TO Fetch' });
      window.location = 'AllOrders.html';
    }
  } catch (e) {
    swal({ icon: 'warning', title: 'Failed TO Fetch' });
    window.location = 'AllOrders.html';
  }
};

window.onload = fetchSingleData();


// ///////////////////////////////////////////////////////////////////////////

const fetchGoogleMaps = async (destination_address, currentlocation) => {
  const url_Destination_Add = `https://maps.googleapis.com/maps/api/geocode/json?address=${destination_address}&key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&amp`;
  const current_Location_Add = `https://maps.googleapis.com/maps/api/geocode/json?address=${currentlocation}&key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&amp`;
  const Array_Of_MapUrls = [url_Destination_Add, current_Location_Add];

  try {
    const data = await Promise.all(
      Array_Of_MapUrls.map(
        urls => fetch(urls).then(
          response => response.json()
        )
      )
    );

    const destinatonDetails = data[0].results[0].geometry.location;
    const currentLocationDetails = data[1].results[0].geometry.location;
    return `
  
          <h1 style = "color:red"> Destination Map </h1>
          <img  class="map hvr-grow-shadow"src ="https://maps.googleapis.com/maps/api/staticmap?center=${destination_address}&zoom=13&size=600x300&maptype=roadmap
           &markers=color:red%7Clabel:C%7C${destinatonDetails.lat},${destinatonDetails.lng}
          &key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&amp"/>
          
          <h1 style = "color:red"> Current Location  Map </h1>
          <img class="map hvr-grow-shadow" src ="https://maps.googleapis.com/maps/api/staticmap?center=${currentlocation}&zoom=13&size=600x300&maptype=roadmap
           &markers=color:red%7Clabel:C%7C${currentLocationDetails.lat},${currentLocationDetails.lng}
          &key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&amp"/>
           `;

  } catch (error) {

    return '<img scr = "https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&amp"/>';
  }


};


// //////////////////////////////////////////////////////////////////////

const appendDataToDom = async (data) => {

  const maps = await fetchGoogleMaps(data.destination_address, data.currentlocation);

  const buttonActions = (data.status === 'Placed' || data.status === 'In Transit') ? `<div class="cancel-change-destination">
 <button id= "cancel_Order" onclick='cancelOrder("${data.id}" , this)'>Cancel Order</button> 
 <button id="change_Direction" onclick='displayModal("${data.id}")'> Change Destination</button> 
</div>` : '';

  const DataToAppend = `
<table class ="single-order animated slideInLeft">

<tr>
 
</tr>
<tr>
  <td><b>Item Name</b></td>
  <td>${data.item_name}</td>

</tr>
<tr>
  <td><b>Status<b/></td>
  <td> <span class ="${data.status} LocationForAppendingNewData">${data.status}</span></td>

   
</tr>
<tr>
  <td> <b>Destination</b></td>
  <td>${data.destination_address}</td>

</tr>
  <tr>
  <td><b>Pickup Address</b></td>
  <td>${data.pickup_address} </td>

</tr>

  <tr>
  <td><b>Current location</b></td>
  <td> ${data.currentlocation} </td>
</tr>

<tr>
  <td><b>Receiver Name</b></td>
  <td>${data.receiver_name} </td>

</tr>
<tr>
  <td><b>Receiver Email</b></td>
  <td>${data.receiver_email} </td>

</tr>
<tr>
  <td><b>Item Weight</b></td>
  <td>${data.item_weight} </td>

</tr>

</table>
<br>

${buttonActions} `;

  document.querySelector('.all-orders-container').innerHTML = `
<blockquote>
<H1 style ="color:firebrick"> <i class="fas fa-truck class ="${data.status}"></i>   TO  ${data.receiver_name} </H1>
</blockquote>
${DataToAppend}
${maps}
`;

};

