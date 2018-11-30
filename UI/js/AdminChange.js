const adminchangestatus = document.querySelectorAll('.Admin-change-status-btn');
const adminchangelocationBtn = document.querySelectorAll('.Admin-change-location-btn');
const span = document.getElementsByClassName("close")[0];
const adminDest =  document.getElementById('AdminDestinationAdressEdit');
const adminDestLongitude =  document.getElementById('AdminEdit_destination_lng');
const adminDestLatitude = document.getElementById('AdminEdit_destination_lat');
const adminDestEditform = document.querySelector('.Admin-edit-destination-form');


const adminchangestatusfunc = async () => {
    
const inputOptions =  { Arrived: 'Arrived', Pending: 'Pending' }; 
    
const { value: status} = await swal({
  title: 'Choose Status',
  input: 'radio',
  inputOptions: inputOptions,
  inputValidator(value){
    return !value && 'You need to choose something!';
  },
});

if (status) {
  swal({html: 'You selected: ' + status});
  //Make Ajax Call To send Email To the User In the fure
};
    
};



  const closemodal = () =>  document.getElementById('adminDestionModal').style.display = "none";  


  const displaymodal = () => {
    document.querySelector('.Admin-edit-destination-form').reset();
    document.getElementById('adminDestionModal').style.display = "block";     
  } 
     


    const changeDestinationEmailUser = (e) => {
     e.preventDefault();
     return closemodal();
      //Make Ajax Call To send Email To the User  In the future
    };
  



  const  autocomplete = ( input ,  latInput , lngInput ) => {
  if(!input) return; 
  const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });    
};


adminDestEditform.addEventListener('submit', changeDestinationEmailUser );
adminchangestatus.forEach( eachbtn =>  eachbtn.addEventListener('click' , adminchangestatusfunc )  );
adminchangelocationBtn.forEach( eachbtn =>  eachbtn.addEventListener('click' ,  displaymodal )  );
span.addEventListener('click', closemodal );
autocomplete(  adminDest , adminDestLatitude ,  adminDestLongitude );



