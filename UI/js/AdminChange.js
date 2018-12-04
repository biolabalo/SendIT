// const adminchangestatus = document.querySelectorAll('.Admin-change-status-btn');
const intrestedDiv = document.querySelector('.intrestedDiv');
const Token = localStorage.getItem('AdminauthToken');
// const span = document.getElementsByClassName('close')[0];
// const adminDest = document.getElementById('AdminDestinationAdressEdit');
// const adminDestLongitude = document.getElementById('AdminEdit_destination_lng');
// const adminDestLatitude = document.getElementById('AdminEdit_destination_lat');
// const adminDestEditform = document.querySelector('.Admin-edit-destination-form');


const changeStatus = async (button) => {
  const id = button.id;
  const parcelStatus = button.parentNode.previousElementSibling.firstElementChild.textContent;


  if (parcelStatus.includes('cancelled') || parcelStatus.includes('Delivered')) {
    swal({ html: 'You cannot change status' });
    return;
  }

  const inputOptions = { Delivered: 'Delivered', InTransit: 'In Transit', Placed: 'Placed' };

  const { value: status } = await swal({
    title: 'Choose Status',
    input: 'radio',
    inputOptions,
    inputValidator(value) {
      return !value && 'You need to choose something!';
    },
  });

  if (status) {

    const data = status.includes('InTransit') ? 'In Transit' : status;

   
    const url = `https://sendit-biola.herokuapp.com/api/v1/parcels/${id}/status`;
    
    try {

      const response = await fetch(url, {
        method: 'PUT',
        body:JSON.stringify(data),
        headers: {
          Accept: 'application/json, text/plain, */*',
         'x-access-token': Token,
          'Content-type': 'application/json',
        }
      });
     
     // const result = a response.json();

      if (result) {
        // appendDataToDom(result.data);
        swal({ icon: 'warning', title: 'Sucess' });
      }

    } catch (e) {
      console.log(e)
      swal({ title: 'Error in Updating  Data' });
      // window.location = 'signIn.html';
    }

  }
};

const changeLocation = (button) => {
  const id = button.id;
};


// const closemodal = () =>  document.getElementById('adminDestionModal').style.display = "none";


// const displaymodal = () => {
//   document.querySelector('.Admin-edit-destination-form').reset();
//   document.getElementById('adminDestionModal').style.display = "block";
// }


// const changeDestinationEmailUser = (e) => {
//  e.preventDefault();
//  return closemodal();
//   //Make Ajax Call To send Email To the User  In the future
// };


//   const  autocomplete = ( input ,  latInput , lngInput ) => {
//   if(!input) return;
//   const dropdown = new google.maps.places.Autocomplete(input);

//     dropdown.addListener('place_changed', () => {
//     const place = dropdown.getPlace();
//     latInput.value = place.geometry.location.lat();
//     lngInput.value = place.geometry.location.lng();
//   });
// };


// adminDestEditform.addEventListener('submit', changeDestinationEmailUser);
// adminchangestatus.forEach(eachbtn => eachbtn.addEventListener('click', adminchangestatusfunc) );
// adminchangelocationBtn.forEach(eachbtn => eachbtn.addEventListener('click', displaymodal) );
// span.addEventListener('click', closemodal);
// autocomplete(  adminDest , adminDestLatitude ,  adminDestLongitude );



