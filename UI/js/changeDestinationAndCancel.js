const clickedSingle_Parcel = localStorage.getItem('singleParcelId');
const Tokenz = localStorage.getItem('authToken');
const user_id = localStorage.getItem('userId');
if (!clickedSingle_Parcel || !user_id) window.location = 'AllOrders.html';
const endPointToCancel = `https://sendit-biola.herokuapp.com/api/v1/parcels/${clickedSingle_Parcel}/cancel`;


// const changedirection = document.getElementById('change_Direction');
// const btn = document.getElementById("change_Direction");
const span = document.getElementsByClassName('close')[0];
const Dest = document.getElementById('DestinationAdressEdit');
const DestLongitude = document.getElementById('Edit_destination_lng');
const DestLatitude = document.getElementById('Edit_destination_lat');
const editform = document.querySelector('.edit-destination-form');

const displayModal = (data) => {
  document.querySelector('.edit-destination-form').reset();
  document.getElementById('myModal').style.display = 'block';
};


const cancelOrder = async (id, e) => {
  const place_Of_Target = e.parentElement
    .parentElement
    .firstElementChild
    .nextElementSibling
    .firstElementChild
    .firstElementChild
    .nextElementSibling
    .nextElementSibling
    .firstElementChild
    .nextElementSibling;
  swal('Are you sure You want to cancel this  Parcel Order?', {
    icon: 'warning',
    dangerMode: true,
    buttons: true,
  }).then((result) => {

    if (result) {

      const res = fetch(endPointToCancel, {
        method: 'PUT',
        headers: {
          'x-access-token': Tokenz
        }

      }).then(responsePromise => responsePromise.json())
        .then((response) => {

          if (response && response.success) {
            const { orders } = response;
            const { status } = orders;
            place_Of_Target.innerHTML = '<span class="cancelled LocationForAppendingNewData">cancelled</span>';
          } else {
            swal({ icon: 'warning', title: 'Failed TO Cancel' });
            // window.location = 'AllOrders.html';
          }


        })
        .catch(err => swal({ icon: 'warning', title: 'Failed To Cancel' }));
    }

  });

};

const closemodal = () => document.getElementById('myModal').style.display = 'none';

const submitNewDestination = async (e) => {
  e.preventDefault();
  if (!Dest.value.trim()) return closemodal();

  document.querySelector('.sub-btn').innerHTML = '<span>Submit <i class="fas fa-spinner fa-spin"></i></span>';
  const newDestination = Dest.value;

  const url = `https://sendit-biola.herokuapp.com/api/v1/parcels/${clickedSingle_Parcel}/destination`;

  console.log(url, newDestination, Tokenz);

  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      destinationAddress: newDestination
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'x-access-token': Tokenz,
      'Content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(result => window.location = 'singleOrder.html')
    .catch((err) => {
      swal({ icon: 'warning', title: e });
      closemodal();
    });
};

span.addEventListener('click', closemodal);
editform.addEventListener('submit', submitNewDestination);

const autocomplete = (input, latInput, lngInput) => {

  if (!input) return;
  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });
};

autocomplete(Dest, DestLatitude, DestLongitude);
