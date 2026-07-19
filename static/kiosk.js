let copyright = document.getElementById("pagefooter__copyright")
let instalink = document.getElementById("instagram-link")
copyright.dataset.clickCount = 0
copyright.dataset.lastClick = 0

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
  } else {
    // enable kiosk
    document.documentElement.requestFullscreen()
    links.forEach(id => {
      const link = document.getElementById(id)
      link.addEventListener('click', openLinkModal)
    });
    document.body.oncontextmenu = _ => false
  }
}

function openLinkModal(e) {
  e.preventDefault()
  const target = document.getElementById(this.dataset.kioskopen)
  target.showModal()
}
