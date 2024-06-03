const totalbooking = document.getElementById("total");
const uname = document.getElementById("uname");
const seatNum = document.getElementById("seatnum");

const bookingLists = document.getElementById("bookingList");

//Handle Moviebooking Submit
function handleMovieBooking(event) {
	event.preventDefault();

	let bookedSeats = {
		name: uname.value,
		mseatNum: seatNum.value,
	};

	axios
		.get(
			"https://crudcrud.com/api/454f2359db264066b152f28f81f5e961/movieBookingData"
		)
		.then((response) => {
			let flag = true;
			for (let i = 0; i < response.data.length; i++) {
				if (bookedSeats.mseatNum === response.data[i].mseatNum) {
					flag = false;
					const serror = document.getElementById("errorSeat");
					serror.classList.add("error");
					setTimeout(() => {
						serror.classList.remove("error");
					}, 3000);
					// return 0;
					return alert("Seat Already Booked");
				}
			}
			if (flag) {
				axios
					.post(
						"https://crudcrud.com/api/454f2359db264066b152f28f81f5e961/movieBookingData",
						bookedSeats
					)
					.then((response) => {
						displayMovieBookingList(response.data);
					})
					.catch((error) => console.log(error));
			}
		})
		.catch((error) => {
			console.log(error);
		});
	//
	uname.value = "";
	seatNum.value = "";
}

//Load Data when Page load/Refreshed
window.addEventListener("DOMContentLoaded", () => {
	axios
		.get(
			"https://crudcrud.com/api/454f2359db264066b152f28f81f5e961/movieBookingData"
		)
		.then((response) => {
			for (let i = 0; i < response.data.length; i++) {
				displayMovieBookingList(response.data[i]);
			}
		});
});

function displayMovieBookingList(movieBookedObj) {
	const movieList = document.createElement("li");
	movieList.className = "mblist";
	bookingLists.appendChild(movieList);

	const movieDiv = document.createElement("div");
	movieDiv.innerHTML = `${movieBookedObj.name} - ${movieBookedObj.mseatNum}`;
	movieList.appendChild(movieDiv);

	const btnDiv = document.createElement("div");
	btnDiv.classList.add("btn-group", "gap-1", "ms-2");
	movieList.appendChild(btnDiv);

	const deletebtn = document.createElement("button");
	deletebtn.type = "button";
	deletebtn.classList.add("btn", "btn-outline-danger", "btn-sm");
	deletebtn.innerText = "Delete";
	btnDiv.appendChild(deletebtn);

	deletebtn.addEventListener("click", () => {
		bookingLists.removeChild(movieList);
		totalbooking.innerHTML = `${
			document.getElementsByClassName("mblist").length
		}`;
		axios
			.delete(
				"https://crudcrud.com/api/454f2359db264066b152f28f81f5e961/movieBookingData/" +
					movieBookedObj._id
			)
			.then((response) => console.log(response.status))
			.catch((error) => console.log(error));
	});

	const editbtn = document.createElement("button");
	editbtn.type = "button";
	editbtn.classList.add("btn", "btn-outline-warning");
	editbtn.innerText = "Edit";
	btnDiv.appendChild(editbtn);

	editbtn.addEventListener("click", () => {
		uname.value = movieBookedObj.name;
		seatNum.value = movieBookedObj.mseatNum;
		bookingLists.removeChild(movieList);
		totalbooking.innerHTML = `${
			document.getElementsByClassName("mblist").length
		}`;

		axios
			.delete(
				"https://crudcrud.com/api/454f2359db264066b152f28f81f5e961/movieBookingData/" +
					movieBookedObj._id
			)
			.then((response) => console.log(response.status))
			.catch((error) => console.log(error));
	});

	totalbooking.innerHTML = `${
		document.getElementsByClassName("mblist").length
	}`;
}

///Search Functionality
const filter = document.getElementById("find");

filter.addEventListener("keyup", function (event) {
	const textEntered = event.target.value;

	const movieSeat = document.getElementsByClassName("mblist");
	// const fruitdesc = document.getElementsByClassName("fruit-desc");

	for (let i = 0; i < movieSeat.length; i++) {
		const currentFruitText = movieSeat[i].firstChild.textContent;

		if (currentFruitText.indexOf(textEntered) == -1) {
			movieSeat[i].style.display = "none";
		} else {
			movieSeat[i].style.display = "flex";
		}
	}
});
