const dots = document.querySelectorAll('.dot');
const events = document.querySelectorAll('.event');

let activeDotIndex = 0;
let activeDot = dots[activeDotIndex];
let interval = setInterval(switchDots, 10000);

function switchDots() {
  activeDot.classList.remove('active-dot');
  activeDotIndex++;
  if (activeDotIndex >= dots.length) {
    activeDotIndex = 0;
  }
  activeDot = dots[activeDotIndex];
  activeDot.classList.add('active-dot');
  activeDot.dispatchEvent(new MouseEvent('click'));
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
	clearInterval(interval);
    dots.forEach((dot) => dot.classList.remove('active-dot'));
    activeDot = dot;
    activeDotIndex = Array.from(dots).indexOf(activeDot);
    activeDot.classList.add('active-dot');
    const modal = activeDot.getAttribute('id');
    events.forEach((event) => {
      event.classList.remove('active');
      if (event.getAttribute('id') === modal) {
        event.classList.add('active');
      }
    });
	interval = setInterval(switchDots, 10000);
  });
});

activeDot.dispatchEvent(new MouseEvent('click'));

events.forEach(function(event) {
  const btn = event.querySelector(".button");
  const overlay = event.querySelector(".overlay");

  btn.addEventListener('click', function() {
    overlay.style.display = 'block';
    clearInterval(interval);
  });

  overlay.addEventListener('click', function() {
    overlay.style.display = 'none';
    interval = setInterval(switchDots, 10000);
  });
});
