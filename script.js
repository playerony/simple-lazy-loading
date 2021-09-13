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

function switchSrcAttributesForElement(element) {
  if (!element) {
    return null
  }

  const dataSrc = element.getAttribute('data-src')
  if (dataSrc) {
    element.setAttribute('src', dataSrc);
    element.removeAttribute("data-src");
  }
}

function processLazyElements() {
  const lazyElements = document.querySelectorAll('[data-src]')

  if ("IntersectionObserver" in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(_entry => {
        if(_entry.isIntersecting) {
          const element = _entry.target;
    
          switchSrcAttributesForElement(element);
          lazyObserver.unobserve(element);
        }
      })
    })

    lazyElements.forEach(_element => {
      if (_element.tagName === 'SCRIPT') {
        switchSrcAttributesForElement(_element)
      } else {
        lazyObserver.observe(_element)
      }
    })
  } else {
    lazyElements.forEach(switchSrcAttributesForElement)
  }
}

function onReady() {
  scrollToTop()
  processLazyElements()
}

documentReady(onReady)
