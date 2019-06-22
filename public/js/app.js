
const search = document.querySelector('input');
const weatherForm = document.getElementById('weather-form');
const pone = document.getElementById('one');
const ptwo = document.getElementById('two');

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    pone.textContent = 'Loading...'
    ptwo.textContent = '';
    const location = search.value;
    fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
        if(data.error){
            pone.textContent = data.error;
            ptwo.textContent = '';
            } else {
            pone.textContent = data.location;
            ptwo.textContent = data.forecast;
            }
    });
search.value = '';

    

})