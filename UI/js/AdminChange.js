/* eslint-disable camelcase */
// const adminchangestatus = document.querySelectorAll('.Admin-change-status-btn');
const intrestedDiv = document.querySelector('.intrestedDiv');
const Token = localStorage.getItem('AdminauthToken');
const span = document.getElementsByClassName('close')[0];
const adminDest = document.getElementById('AdminDestinationAdressEdit');
const adminDestLongitude = document.getElementById('AdminEdit_destination_lng');
const adminDestLatitude = document.getElementById('AdminEdit_destination_lat');
const adminDestEditform = document.querySelector('.Admin-edit-destination-form');

const change_Status = async (data, id, parcelStatus) => {


 const url = `https://sendit-biola.herokuapp.com/api/v1/parcels/${id}/status`;

 try {

  const response = await fetch(url, {
   method: 'PUT',
   body: JSON.stringify({
    status: data
   }),
   headers: {
    Accept: 'application/json, text/plain, */*',
    'x-access-token': Token,
    'Content-type': 'application/json',
   }
  });

  const result = await response.json();

  if (result && result.status === data) {
   if (result.status === 'Delivered') window.location = 'AdminChange.html';
   swal('Good job!', 'Succesfully Updated!', 'success');
   parcelStatus.innerHTML = `${result.status}`;
  }

 } catch (err) {
  swal('Error!', 'Failed To Update!', 'error');
  window.location = 'AdminChange.html';
 }

};

const changeStatus = async (button) => {
 const id = button.id;
 const parcelStatus = button.parentNode.previousElementSibling.firstElementChild;


 swal('Select the Status', {
   buttons: {
    Delivered: 'Delivered',
    InTransit: 'In Transit',
    Placed: 'Placed',
   },
  })
  .then((value) => {
   switch (value) {

    case 'Delivered':
     change_Status('Delivered', id, parcelStatus);
     break;

    case 'InTransit':
     change_Status('In Transit', id, parcelStatus);
     break;

    case 'Placed':
     change_Status('Placed', id, parcelStatus);
     break;

    default:
     swal("You Didn't Select Any Options");
   }
  });
};


const closemodal = () => document.getElementById('adminDestionModal').style.display = 'none';


const displaymodal = (changeLocationButtonClicked, id) => {
 const newLoacationTarget = changeLocationButtonClicked
  .parentElement
  .previousElementSibling
  .previousElementSibling
  .previousElementSibling
  .previousElementSibling;

 document.querySelector('.Admin-edit-destination-form').reset();
 document.getElementById('adminDestionModal').style.display = 'block';
 document.getElementById('adminDestionModal').locationToAppend = newLoacationTarget;
 document.getElementById('adminDestionModal').parcelIdForNewCurrentLocation = id;

};


const changeDestinationEmailUser = async (e) => {

 e.preventDefault();
 if (!adminDest.value.trim()) return closemodal();
 const locationToAppend = document.getElementById('adminDestionModal').locationToAppend
 const parcelIdForNewCurrentLocation = document.getElementById('adminDestionModal').parcelIdForNewCurrentLocation;


 document.querySelector('.sub-btn').innerHTML = '<span>Submit <i class="fas fa-spinner fa-spin"></i></span>';
 const currentLocation = adminDest.value;


 const url = `https://sendit-biola.herokuapp.com/api/v1/parcels/${parcelIdForNewCurrentLocation}/presentLocation`;

 fetch(url, {
   method: 'PUT',
   body: JSON.stringify({
    currentLocation // es6 shorthand notation
   }),
   headers: {
    Accept: 'application/json, text/plain, */*',
    'x-access-token': Token,
    'Content-type': 'application/json'
   }
  })
  .then(res => res.json())
  .then((result) => {
   if (result && result.status === 200 && result.success) {
    locationToAppend.innerHTML = result.orders.currentlocation;
    document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
    closemodal();
    swal("Good job!", "Successfully Updated The Current location", "success");
    return;
   }
   throw 'Error';
  })
  .catch((err) => {
   document.querySelector('.sub-btn').innerHTML = '<span>Submit &#8594;</span>';
   swal({
    icon: 'warning',
    title: err
   });
   closemodal();
  });
};


const autocomplete = (input, latInput, lngInput) => {
 if (!input) return;
 const dropdown = new google.maps.places.Autocomplete(input);

 dropdown.addListener('place_changed', () => {
  const place = dropdown.getPlace();
  latInput.value = place.geometry.location.lat();
  lngInput.value = place.geometry.location.lng();
 });
};


adminDestEditform.addEventListener('submit', changeDestinationEmailUser);
span.addEventListener('click', closemodal);
autocomplete(adminDest, adminDestLatitude, adminDestLongitude);