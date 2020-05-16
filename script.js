const container = document.querySelector('.container'); //with queurySelector it will only select the first element if there are multiple of them eg the first .container class
const seats = document.querySelectorAll('.row .seat:not(.occupied');  //querySelectorAll puts all elements tht are selected eg. class .seat into a node selector which very similar to an array, we can run methods on it as if it were an array. In this querySelectorAll we grab all the seats in the rows which are not occupied
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();

let ticketPrice = +movieSelect.value;

//SAVE selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex); //setItem() creates a new key/value pair if none existed for key previously: syntax setItem(key, value)
    localStorage.setItem('selectedMoviePrice', moviePrice);
};


//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); //gap between the selected classes means we a looking for 2 elements no gap means we are looking for elements with both classes assigned to them


    // Copy selected seats into an arr, Map through array, Return a new array of indexes
    const seatsIndex = [...selectedSeats].map((seat) =>[...seats].indexOf(seat)); // the spread operator (...) copies an element of an array (in this case selectedSeats which is a nodeList) and puts them into another array. We then use high order array method .map which is simmilar to forEach but returns an array. indexOf gives you the location/ position in the array.

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //local storage lets you store strings to the browser. It is built into the browser, you don't have to import a library. JSON.stringify function converts the array into strings.

    const selectedSeatCount = selectedSeats.length; //here we grab the length of selected seats

    count.innerText = selectedSeatCount; //change the inner text of id count to number of selected seats
    total.innerText = selectedSeatCount * ticketPrice //get total price
};


// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) //JSON.parse does the opposite of JSON.stringify

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        });
    }

    const SelectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(SelectedMovieIndex !== null) {
        movieSelect.selectedIndex = SelectedMovieIndex;
    }


};






//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value //the + sign turns the value into a number similar to the parseInt keyword

    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount(); // we want this function to run after we update the movie
});


//seat click event
container.addEventListener('click', e => { 
    //we choose the container class for the event listener as this contains all of the elements we want to capture e.g all of the seats
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected'); 
        //you can remove add or toggle a class or id.

    }

    //.target property gives us the element / section the mouse clicked on e.g if you click on a seat image it will show as class .seat

    updateSelectedCount();
});


//Initial count and total set
updateSelectedCount();