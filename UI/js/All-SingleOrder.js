const cancelorder = document.getElementById('cancel_Order');
const changedirection = document.getElementById('change_Direction');
const btn = document.getElementById("change_Direction");
const span = document.getElementsByClassName("close")[0];
const Dest =  document.getElementById('DestinationAdressEdit');
const DestLongitude =  document.getElementById('Edit_destination_lng');
const DestLatitude = document.getElementById('Edit_destination_lat');
const editform = document.querySelector('.edit-destination-form');



const cancelorderfunc = () => {
   
    swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Cancel The Order!',
}).then((result) => {
        
  if (result.value) {
    swal(
      'Deleted!',
      'Your Order Has Been Cancelled / Deleted',
      'success',
    ).then( () => {
        window.location = 'AllOrders.html';
    });
  };
        
});
    
};



const closemodal = () =>  document.getElementById('myModal').style.display = 'none'; 
 
const displaymodal = () => {
   document.querySelector('.edit-destination-form').reset();
   document.getElementById('myModal').style.display = 'block'; 
  
};

   

const submitedited = (e) => {
e.preventDefault();
const Dest =  document.getElementById('DestinationAdressEdit');
if (!Dest.value.trim()) return;
closemodal();

};


cancelorder.addEventListener('click', cancelorderfunc  );
btn.addEventListener('click', displaymodal );
span.addEventListener('click', closemodal );
editform.addEventListener('submit', submitedited );





const  autocomplete = ( input ,  latInput , lngInput ) => {
   
  if(!input) return; 
  const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });    
};


autocomplete(  Dest , DestLatitude ,  DestLongitude );



