/* eslint-disable no-undef */
const createParcelForm = document.getElementById('create-parcel');

const pickUpLongitude = document.getElementById('Pickup_lng');
const pickUpLatitude = document.getElementById('Pickup_lat');
const DestinationLongitude = document.getElementById('destination_lng');
const DestinationLatitude = document.getElementById('destination_lat');

const Item_Name = document.getElementById('Item-name');
const destination_Address = document.getElementById('DestinationAdress');
const pickUp_Address = document.getElementById('pickUpAddress');
const item_Weight = document.getElementById('itemWeight');
const receiver_Name = document.getElementById('receiverName');
const receiver_Email = document.getElementById('receiverEmail');



const autocomplete = (input, latInput, lngInput) => {

  if (!input) return;
  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });
};

autocomplete(pickUp_Address, pickUpLatitude, pickUpLongitude);
autocomplete(destination_Address, DestinationLongitude, DestinationLatitude);


const validatePercelForm = async (e) => {
  e.preventDefault();

  if (Item_Name.value.trim() === ''
     || pickUp_Address.value.trim() === ''
     || destination_Address.value.trim() === ''

  ) {
    swal({ icon: 'warning', title: 'Inputs Must be Valid Before Submission' });

  } else {
    document.querySelector('.sub-btn').innerHTML = '<span>Submit <i class="fas fa-spinner fa-spin"></i></span>';
    const data = {
      itemName: Item_Name.value,
      pickUpAddress: pickUp_Address.value,
      destinationAddress: destination_Address.value,
      receiverName: receiver_Name.value,
      receiverEmail: receiver_Email.value,
      itemWeight: Number(item_Weight.value)
    };

    await SubmitDataAndRedirect(data);

  }

};

createParcelForm.addEventListener('submit', validatePercelForm);
