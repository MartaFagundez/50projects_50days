const insert = document.getElementById('insert')

// This checks if the current device is mobile
if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
          insert.innerHTML = `<div class="key">This website requires a keyboard to activate its functionality.</div>`;
}


window.addEventListener('keydown', (event) => {
  insert.innerHTML = `
    <div class="key">${event.key === ' ' ? 'Space' : event.key} <small>event.key</small></div>
    <div class="key">${event.code} <small>event.code</small></div>
  `;
})