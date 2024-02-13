document.getElementById('bookTicketsBtn').addEventListener('click', function() {
  // Display the video container when the button is clicked
  document.getElementById('videoContainer').style.display = 'block';
  const seatingArea = document.querySelector('.cinema');

  // Optionally, you can also play the video (remove this line)
  // var video = document.querySelector('#videoContainer video');
  // video.play();

  seatingArea.style.display = 'none';
});



document.addEventListener('DOMContentLoaded', function () {
  const seats = document.querySelectorAll('.seat');

  seats.forEach((seat) => {
    seat.addEventListener('click', () => {
      seat.classList.toggle('selected');
    });
  });
});
