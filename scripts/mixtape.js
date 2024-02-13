document.addEventListener('DOMContentLoaded', function () {
  // Get the elements you want to rotate
  var turntable = document.getElementById('turntable');
  var label = document.getElementById('label');

  // Set initial state to paused with a slight delay
  setTimeout(function () {
    turntable.style.animationPlayState = 'paused';
    label.style.animationPlayState = 'paused';
  }, 100);

  // Flag to keep track of the rotation state
  var isRotating = true;

  // Function to toggle rotation
  function toggleRotation() {
    if (isRotating) {
      // If currently rotating, pause the rotation
      turntable.style.animationPlayState = 'paused';
      label.style.animationPlayState = 'paused';
    } else {
      // If not rotating, resume the rotation
      turntable.style.animationPlayState = 'running';
      label.style.animationPlayState = 'running';
    }

    // Toggle the rotation state
    isRotating = !isRotating;
  }

  // Add a click event listener to the toggle button
  var toggleButton = document.getElementById('toggleButton');
  toggleButton.addEventListener('click', toggleRotation);

  var nextButton = document.getElementById('nextButton');
  nextButton.addEventListener('click', playNext);

  var prevButton = document.getElementById('prevButton');
  prevButton.addEventListener('click', playPrevious);
});


// Function to change colors
function changeColors(selectedSong) {
  // Function to generate a random pastel color
  function getRandomPastelColor() {
    var hue = Math.floor(Math.random() * 360);
    var saturation = Math.floor(Math.random() * 30) + 60; // Adjusted saturation for pastel colors
    var lightness = Math.floor(Math.random() * 20) + 70; // Adjusted lightness for pastel colors

    return { hue, saturation, lightness };
  }

  // Generate the background color
  var bgColor = getRandomPastelColor();

  // Calculate a slightly darker version for the player container background
  var containerBgColor = `hsl(${bgColor.hue},${bgColor.saturation}%,${bgColor.lightness - 5}%)`;

  // Set the player container background color
  var playerContainer = document.getElementById('player');
  playerContainer.style.backgroundColor = containerBgColor;

  // Calculate the complementary hue for the label color
  var labelHue = (bgColor.hue + 180) % 360;

  // Set random pastel color for background
  document.body.style.transition = 'background-color 0.5s ease'; // Add transition for the body background color
  document.body.style.backgroundColor = `hsl(${bgColor.hue},${bgColor.saturation}%,${bgColor.lightness}%)`;

  // Set complementary pastel color for label and pseudo-element
  var label = document.getElementById('label');
  if (label) {
    label.style.transition = 'background-color 0.5s ease'; // Add transition for the label background color
    label.style.backgroundColor = `hsl(${labelHue},${bgColor.saturation}%,${bgColor.lightness}%)`;
    label.style.setProperty('--pseudo-element-color', `hsl(${labelHue},${bgColor.saturation}%,${bgColor.lightness}%)`);
    
    // Set the same color for audio-progress
    var audioProgress = document.getElementById('audio-progress');
    if (audioProgress) {
      audioProgress.style.transition = 'background-color 0.5s ease'; // Add transition for the audio-progress background color
      audioProgress.style.backgroundColor = `hsl(${labelHue},${bgColor.saturation}%,${bgColor.lightness}%)`;
    }

    var toggleButton = document.getElementById('toggleButton');
    if (toggleButton) {
      toggleButton.style.transition = 'background-color 0.5s ease'; // Add transition for the toggleButton background color
      toggleButton.style.backgroundColor = `hsl(${labelHue},${bgColor.saturation}%,${bgColor.lightness}%)`;
    }

  }

  // Set random pastel color for #turntable
  var turntable = document.getElementById('turntable');
  if (turntable) {
    turntable.style.transition = 'background-color 0.5s ease'; // Add transition for the turntable background color
    turntable.style.backgroundColor = `hsl(${bgColor.hue},${bgColor.saturation}%,${bgColor.lightness}%)`;
  }

  // You can use the selectedSong parameter here to customize the colors based on the selected song
}



// Event listener for the 'exampleSongs' dropdown change event
document.getElementById('exampleSongs').addEventListener('change', playExample);

// Function to play example songs
function playExample() {
  var audioElement = document.getElementById('audio-controls').getElementsByTagName('audio')[0];
  var albumArtElement = document.getElementById('album-art');
  var exampleSongsDropdown = document.getElementById('exampleSongs');

  // Get the selected option's value
  var selectedSong = exampleSongsDropdown.value;
  console.log(selectedSong);

  // Pause the audio before updating the source
  audioElement.pause();

  // Update the audio source
  audioElement.src = 'media/' + selectedSong;

  // Update the album art
  albumArtElement.src = 'media/' + selectedSong.replace('.mp3', '.png');

  // Set the current time of the audio element to 0 after metadata is loaded
  audioElement.addEventListener('loadedmetadata', function() {
    audioElement.currentTime = 0;
  });

  // Call the changeColors function after updating the song and album cover
  changeColors(selectedSong);

  // Reset the animation
  turntable.style.animation = 'none'; // Remove the animation
  label.style.animation = 'none'; // Remove the animation

  // Trigger reflow/repaint to apply the style changes immediately
  void turntable.offsetWidth;
  void label.offsetWidth;

  // Reset the animation
  turntable.style.animation = '';
  label.style.animation = '';

  // Pause the animation after resetting
  turntable.style.animationPlayState = 'paused';
  label.style.animationPlayState = 'paused';

  // Get the description element
  var descriptionElement = document.getElementById('description');

  // Update the description based on the selected song
  switch (selectedSong) {
    case 'bbe.mp3':
      descriptionElement.textContent = 'On my 21st birthday, dancing with you as we closed for the night.';
      break;
    case 'ms.mp3':
      descriptionElement.textContent = 'Going into london and the concert.';
      break;
    case 'wti.mp3':
      descriptionElement.textContent = 'Driving down a volcano in Indonesia.';
      break;
    case 'cw.mp3':
      descriptionElement.textContent = 'Slow Dancing to Hozier live.';
      break;
    case 'mon.mp3':
      descriptionElement.textContent = 'Staying up to revise and do coursework.';
      break;
    case 'dc.mp3':
        descriptionElement.textContent = 'You, your mum, and sister singing this in the car.';
        break;
    case 'snowman.mp3':
        descriptionElement.textContent = 'Christmas in Thailand.';
        break;
    case 'gh.mp3':
        descriptionElement.textContent = 'Waking up next to you every morning.';
        break;
    case 'ln.mp3':
        descriptionElement.textContent = 'Ireland, in the back on Niamhs car.';
        break;
    case 'skmu.mp3':
        descriptionElement.textContent = 'Singing in Frodo.';
        break;
    // Add more cases for additional songs
    default:
      descriptionElement.textContent = 'Default description.';
      break;
  }
}

// Invoke playExample() on page load
window.addEventListener('load', function() {
  playExample();
});

// Function to play the next song
function playNext() {
  var exampleSongsDropdown = document.getElementById('exampleSongs');

  // Get the selected index of the current song
  var selectedIndex = exampleSongsDropdown.selectedIndex;

  // Increment the index to play the next song
  selectedIndex = (selectedIndex + 1) % exampleSongsDropdown.options.length;

  // Update the dropdown selection
  exampleSongsDropdown.selectedIndex = selectedIndex;

  // Trigger the change event to play the selected song
  exampleSongsDropdown.dispatchEvent(new Event('change'));
}

// Function to play the previous song
function playPrevious() {
  var exampleSongsDropdown = document.getElementById('exampleSongs');

  // Get the selected index of the current song
  var selectedIndex = exampleSongsDropdown.selectedIndex;

  // Decrement the index to play the previous song
  selectedIndex = (selectedIndex - 1 + exampleSongsDropdown.options.length) % exampleSongsDropdown.options.length;

  // Update the dropdown selection
  exampleSongsDropdown.selectedIndex = selectedIndex;

  // Trigger the change event to play the selected song
  exampleSongsDropdown.dispatchEvent(new Event('change'));
}