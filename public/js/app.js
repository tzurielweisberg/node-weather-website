//getting the data of the jsin
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const lang = document.querySelector('#lang');
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// message1.textContent = 'xxxx'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  if (lang.value === 'he'){
    message1.align = "right"
  }
  else{
    message1.align = "left"
  }
  if (lang.value === 'he'){
    message1.textContent = "...טוען"
  }
  else{
    message1.textContent = 'loading.....';
  }
  
  message2.textContent = '';
  
  //  fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
  fetch('/weather?address=' + location + '&lang=' + lang.value).then((response) => {
    response.json().then((data) => {
      console.log('the lang is : ' + lang.innerHTML.value);
      console.log('the data : ' + data.address);
      if (data.error) {
        console.log(data.error);
        message2.textContent = data.error;
        message1.textContent = '';
      }
      else {
        console.log(data.location);
        console.log(data.forecast);
        message2.textContent = '';
        message1.innerHTML = 
          data.address 
          + "<br/>" + data.forecast 
          + "<br/>" + data.degrees
          + "<br/>" + data.degreesString
      }
    })
  })
})