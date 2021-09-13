function documentReady(onReady) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    onReady();
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }
}

function scrollToTop() {
  const position = {
    top: 0,
    left: 0,
    behavior: 'auto'
  }

  try {
    window.scroll(position)
  } catch (error) {
    window.scrollTo(position)
  }
}

function onReady() {
  scrollToTop()
}

documentReady(onReady)
