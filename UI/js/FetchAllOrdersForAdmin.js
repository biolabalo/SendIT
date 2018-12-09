const fetch_All_Parcels_For_Admin = async () => {

  const Token = localStorage.getItem('AdminauthToken');
  const AdminId = localStorage.getItem('AdminId');
  if (!Token && !AdminId) window.location = 'AdminLogin.html';
  const url = 'https://sendit-biola.herokuapp.com/api/v1/parcels';
 
  try {
 
   const response = await fetch(url, {
    method: 'GET',
    headers: {
     'x-access-token': Token,
     'Content-type': 'application/json',
    }
   });
 
   const result = await response.json();
 
   if (result && result.status === 200) {
    appendDataToDom(result.data);
 
   }
 
  } catch (e) {
   swal({
    icon: 'warning',
    title: 'Error in Fetching Data'
   });
   window.location = 'AdminLogin.html';
  }
 };
 
 window.onload = () => fetch_All_Parcels_For_Admin();
 
 
 // ///////////////////////////////////////////////////////////////////////////////
 
 const appendDataToDom = (result) => {
 
  const IntrestedDiv = document.querySelector('.intrestedDiv');
 
  if (result.length > 0) {
   let neededData = '';
 
   result.reverse().forEach((res) => {
    const changeStatusButton = (res.status === 'Placed' || res.status === 'In Transit') ? `<button class="Admin-change-status-btn" onclick="changeStatus(this)" id =${res.id} >Change Status</button>` : '';
    const change_location_btn = (res.status === 'Placed' || res.status === 'In Transit') ? `<button class ="Admin-change-location-btn" onclick="displaymodal(this , '${res.id}' )" id =${res.id}>Change Location</button>` : '';
    neededData += `
     <tr>
     <td>${res.item_name}</td>
     <td>${res.pickup_address}</td>
     <td>${res.destination_address}</td>
     <td>${res.currentlocation}</td>
     <td>${res.receiver_email}</td>
     <td><span class = ${res.status}> ${res.status} </span></td>
     <td>${changeStatusButton}</td>
     <td>${change_location_btn}</td>
     </tr>
     `;
 
   });
 
   const data_To_Be_Appended = `
      <table class="animated zoomInDown">
      <tr>
     <th>Item Name</th>
     <th>Pick Up Address</th>
     <th>Destination</th>
     <th>Current Location </th>
     <th>Receiver Email</th>
     <th>Status</th>
     <th></th>
     <th></th>
   </tr>    ${neededData}   </table>`;
 
   IntrestedDiv.innerHTML = data_To_Be_Appended;
   return;
  }
 
  IntrestedDiv.innerHTML = '<p> There Are no Available Parcel Delivery Order <p>';
 
 };