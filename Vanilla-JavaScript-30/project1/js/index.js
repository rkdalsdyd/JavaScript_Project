window.addEventListener('keydown', function(e){
    const audio = document.querySelector(`audio[data-key="${e.which}"]`);
    const key = document.querySelector(`.key[data-key="${e.which}"]`);
    if(audio === null) return;
    audio.currentTime = 0;
    audio.play();

    key.classList.add('playing');
});

window.addEventListener('keyup', function(e){
    const key = document.querySelector(`.key[data-key="${e.which}"]`);
    key.classList.remove('playing');
});