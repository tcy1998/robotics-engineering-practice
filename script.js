document.querySelectorAll('.rail-wrap').forEach((wrap) => {
  const rail = wrap.querySelector('.materials');
  const buttons = wrap.querySelectorAll('button');
  buttons[0].addEventListener('click', () => rail.scrollBy({ left: -290, behavior: 'smooth' }));
  buttons[1].addEventListener('click', () => rail.scrollBy({ left: 290, behavior: 'smooth' }));

  let active = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  rail.addEventListener('pointerdown', (event) => {
    active = true;
    moved = false;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    rail.setPointerCapture(event.pointerId);
    rail.classList.add('dragging');
  });
  rail.addEventListener('pointermove', (event) => {
    if (!active) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 6) moved = true;
    rail.scrollLeft = startScroll - distance;
  });
  rail.addEventListener('pointerup', (event) => {
    active = false;
    rail.releasePointerCapture(event.pointerId);
    rail.classList.remove('dragging');
  });
  rail.addEventListener('pointercancel', () => {
    active = false;
    rail.classList.remove('dragging');
  });
  rail.addEventListener('click', (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
  }, true);
});
