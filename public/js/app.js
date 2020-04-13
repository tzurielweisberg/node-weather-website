//getting the data of the jsin

const weatherForm =  document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// message1.textContent = 'xxxx'

weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const location = search.value;
  message1.textContent = 'loading.....';
  message2.textContent = '';

//  fetch('http://localhost:3000/weather?address=' + location).then((response)=>{


  fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data) =>{
        if (data.error){
          console.log(data.error); 
          message2.textContent = data.error;
          message1.textContent = '';
        }
        else{
          console.log(data.location); 
          console.log(data.forecast); 
          message2.textContent = '';
          message1.textContent = data.location + ". " + data.forecast;

        }
      }) 
    })
})