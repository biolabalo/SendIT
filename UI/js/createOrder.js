const createParcelForm = document.getElementById('create-parcel');

const ItemName = document.getElementById('Item-name');

const pickUpAddress = document.getElementById('pickUpAddress');
const pickUpLongitude  = document.getElementById('Pickup_lng');
const pickUpLatitude = document.getElementById('Pickup_lat');

const DestinationAddress =  document.getElementById('DestinationAdress');
const DestinationLongitude =  document.getElementById('destination_lng');
const DestinationLatitude = document.getElementById('destination_lat');




const  autocomplete = (input, latInput, lngInput) => {
   
  if(!input) return; 
  const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });    
};


autocomplete( pickUpAddress , pickUpLatitude  , pickUpLongitude  );
autocomplete( DestinationAddress ,DestinationLongitude , DestinationLatitude );



const validateItemName = () => {
  const ItemName = document.getElementById('Item-name');
  const re = /^[a-zA-Z0-9]{3,20}$/;

  if(!re.test(ItemName.value)){
    ItemName.classList.add('is-invalid'),
    ItemName.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback'),
    ItemName.nextElementSibling.nextElementSibling.classList.add('invalid-feedback-show');
  } else {
    ItemName.classList.remove('is-invalid'),
    ItemName.nextElementSibling.nextElementSibling.classList.add('invalid-feedback'),
    ItemName.nextElementSibling.nextElementSibling.classList.remove('invalid-feedback-show');  
      
  };
    
};


ItemName.addEventListener('blur', validateItemName);



const validatePercelForm  = (e) => {
  e.preventDefault();
    
   
 if ( 
     Array.from(ItemName.classList).includes('is-invalid')
     || pickUpAddress.value.trim() === ''      
     ||DestinationAddress.value.trim() === ''
      
    ) {
   swal({ icon: 'warning'  , title: 'Inputs Must be Valid Before Submission' }); 
    
 }else{
   const data = {
   ItemName : ItemName.value,     
   pickUpAddress: pickUpAddress.value,
   DestinationAddress:  DestinationAddress.value,

  }; 
     
     
 };

};


createParcelForm.addEventListener('submit', validatePercelForm );