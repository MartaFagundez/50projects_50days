{
  const loadText = document.querySelector('.loading-text');
  const bg = document.querySelector('.bg');
  const logo = document.querySelector('.logo');
  const reloadDiv = document.querySelector('.reload');
  const reloadBtn = document.querySelector('.reload button');

  let load = 0;

  let int = setInterval(blurring, 30);

  function blurring() {
    load++;

    if (load > 99) {
      reloadDiv.style.opacity = "1";
      clearInterval(int);
    }

    loadText.innerText = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    logo.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  }

  // https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  reloadBtn?.addEventListener("click", () => location.reload());
}
