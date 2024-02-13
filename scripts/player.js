document.addEventListener('DOMContentLoaded', function () {
  var audio = document.querySelector('#audio-controls audio');
  var progress = document.getElementById('audio-progress');
  var turntable = document.getElementById('turntable');
  var label = document.getElementById('label');

  function toggleRotation() {
      if (audio.paused) {
          turntable.style.animationPlayState = 'running';
          label.style.animationPlayState = 'running';
          audio.play();
      } else {
          turntable.style.animationPlayState = 'paused';
          label.style.animationPlayState = 'paused';
          audio.pause();
      }
  }

  document.getElementById('toggleButton').addEventListener('click', toggleRotation);

  audio.addEventListener('timeupdate', function () {
      var value = (audio.currentTime / audio.duration) * 100;
      progress.value = value;
  });

  progress.addEventListener('input', function () {
      var seekTime = (progress.value / 100) * audio.duration;
      audio.currentTime = seekTime;
  });

  function playExample() {
      var audioElement = document.getElementById('audio-controls').getElementsByTagName('audio')[0];
      var albumArtElement = document.getElementById('album-art');
      var exampleSongsDropdown = document.getElementById('exampleSongs');

      var selectedSong = exampleSongsDropdown.value;

      // Update the audio source
      audioElement.src = 'media/' + selectedSong;

      // Update the album art
      albumArtElement.src = 'media/' + selectedSong.replace('.mp3', '.png');

      // Toggle rotation and play/pause
      toggleRotation();
  }

  // Call playExample when the page loads to set the default values
  window.onload = function () {
      playExample();
  };

});

document.addEventListener('DOMContentLoaded', function () {
    // Set initial state to paused
    var turntable = document.getElementById('turntable');
    var label = document.getElementById('label');
    turntable.style.animationPlayState = 'paused';
    label.style.animationPlayState = 'paused';
  
    // Call playExample with a slight delay to set the default values
    setTimeout(function () {
      playExample();
    }, 100);
  });
  