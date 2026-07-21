let copyright = document.getElementById("pagefooter__copyright")
let instalink = document.getElementById("instagram-link")
copyright.dataset.clickCount = 0
copyright.dataset.lastClick = 0
let t; // idle timer

copyright.addEventListener("click", e => {
  e.preventDefault()
  if (Date.now() - copyright.dataset.lastClick > 1000) {
    copyright.dataset.clickCount = 1
    copyright.dataset.lastClick = Date.now()
    return
  }
  copyright.dataset.lastClick = Date.now()
  copyright.dataset.clickCount = Number(copyright.dataset.clickCount) + 1
  if (Number(copyright.dataset.clickCount) > 9) {
    copyright.dataset.clickCount = 0
    toggleKiosk()
  }
})

activateKiosk()

// functions

function toggleKiosk() {
  const kioskMode = sessionStorage.getItem("kioskModeEnabled")
  if (!kioskMode || kioskMode == "false") {
    alert("Kiosk mode enabled. Disable by tapping on the copytight 10 times.")
    sessionStorage.setItem("kioskModeEnabled", true)
  } else {
    alert("Kiosk mode disabled")
    sessionStorage.setItem("kioskModeEnabled", false)
  }

  activateKiosk()
}

function activateKiosk() {
  const kioskMode = sessionStorage.getItem("kioskModeEnabled")
  const links = ["instagram-link", "pinterest-link"]
  if (!kioskMode || kioskMode == "false") {
    // disable kiosk
    document.exitFullscreen()
    links.forEach(id => {
      const link = document.getElementById(id)
      link.removeEventListener('click', openLinkModal)
    });
    document.body.oncontextmenu = null
    clearTimeout(t)
  } else {
    // enable kiosk
    document.documentElement.requestFullscreen()
    links.forEach(id => {
      const link = document.getElementById(id)
      link.addEventListener('click', openLinkModal)
    });
    document.body.oncontextmenu = _ => false
    noIdlingHere();
  }
}

function openLinkModal(e) {
  e.preventDefault()
  const target = document.getElementById(this.dataset.kioskopen)
  target.showModal()
}


// Source - https://stackoverflow.com/a/24989958
// Posted by Frank Conijn - Support Ukraine, modified by community. See post 'Timeline' for change history
// Retrieved 2026-07-21, License - CC BY-SA 4.0

function noIdlingHere() {

  function yourFunction() {
    const kioskMode = sessionStorage.getItem("kioskModeEnabled")
    if (kioskMode && kioskMode == "true") {
      window.location.replace(document.body.dataset.kioskurl)
    }
  }

  function resetTimer() {
    clearTimeout(t); // global function
    t = setTimeout(yourFunction, 120000);  // time is in milliseconds (2 min)
  }

  window.addEventListener('load', resetTimer, true);
  window.addEventListener('mousemove', resetTimer, true);
  window.addEventListener('mousedown', resetTimer, true);
  window.addEventListener('touchstart', resetTimer, true);
  window.addEventListener('touchmove', resetTimer, true);
  window.addEventListener('click', resetTimer, true);
  window.addEventListener('keydown', resetTimer, true);
  window.addEventListener('scroll', resetTimer, true);
  window.addEventListener('wheel', resetTimer, true);
}

