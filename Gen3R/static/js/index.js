window.HELP_IMPROVE_VIDEOJS = false;

const AUTO_INTERVAL = 3500;

/**
 * carouselState:
 * key   = carousel DOM element
 * value = { instance, timer, enabled }
 */
const carouselState = new Map();

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.carousel').forEach(carouselEl => {

    const [instance] = bulmaCarousel.attach(carouselEl, {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      autoplay: false
    });

    const state = {
      instance,
      enabled: true,
      timer: setInterval(() => {
        if (!state.enabled) return;
        instance.next();
      }, AUTO_INTERVAL)
    };

    carouselState.set(carouselEl, state);
  });

  bulmaSlider.attach();

  console.log('[Carousel] All auto carousels started');
});

document.addEventListener('click', e => {
  const navBtn = e.target.closest(
    '.slider-navigation-previous, .slider-navigation-next, .carousel-nav-left, .carousel-nav-right'
  );
  if (!navBtn) return;

  const carouselEl = navBtn.closest('.carousel');
  if (!carouselEl) return;

  const state = carouselState.get(carouselEl);
  if (!state || !state.enabled) return;

  state.enabled = false;
  clearInterval(state.timer);
  state.timer = null;

  console.log('[Carousel] Autoplay stopped for carousel:', carouselEl);
});

function switchIframe(element) {
    console.log('switchIframe called');
    
    // Get the iframe src from data attribute
    const newSrc = element.getAttribute('data-src');
    const mainIframe = document.getElementById('mainIframe');
    const iframeLoader = document.getElementById('iframeLoader');

    const orbit = element.getAttribute('data-camera-orbit');
    const target = element.getAttribute('data-camera-target');
    
    console.log('New src:', newSrc);
    console.log('Main iframe:', mainIframe);
    console.log('Loader:', iframeLoader);
    
    if (!mainIframe) {
        console.error('Main iframe not found!');
        return;
    }
    
    if (!newSrc) {
        console.error('No data-src attribute found!');
        return;
    }
    
    // Don't reload if it's the same src
    if (mainIframe.src === newSrc) {
        console.log('Same src, skipping reload');
        return;
    }
    
    console.log('Starting iframe switch...');
    
    // Show loader and hide iframe
    if (iframeLoader) {
        iframeLoader.classList.remove('hidden');
        iframeLoader.querySelector('.loader-text').textContent = 'Loading interactive demo...';
    }
    mainIframe.classList.remove('loaded');
    
    // Update active state on thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active', 'loading');
    });
    element.classList.add('active', 'loading');
    
    // Update iframe src
    console.log('Setting iframe src to:', newSrc);
    mainIframe.src = newSrc + (orbit ? `&orbit=${encodeURIComponent(orbit)}` : '') +
    (target ? `&target=${encodeURIComponent(target)}` : '');
}

// Initialize iframe loading handlers
document.addEventListener('DOMContentLoaded', function() {
    const mainIframe = document.getElementById('mainIframe');
    const iframeLoader = document.getElementById('iframeLoader');
    
    if (mainIframe && iframeLoader) {
        console.log('Setting up iframe event listeners');
        
        // Handle iframe load event
        mainIframe.addEventListener('load', function() {
            console.log('Iframe loaded successfully');
            setTimeout(() => {
                iframeLoader.classList.add('hidden');
                mainIframe.classList.add('loaded');
                
                // Remove loading state from all thumbnails
                const thumbnails = document.querySelectorAll('.thumbnail-item');
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('loading');
                });
            }, 500);
        });
        
        // Handle iframe error event
        mainIframe.addEventListener('error', function() {
            console.error('Iframe failed to load');
            if (iframeLoader) {
                iframeLoader.querySelector('.loader-text').textContent = 'Failed to load. Please try again.';
            }
            
            // Remove loading state from all thumbnails
            const thumbnails = document.querySelectorAll('.thumbnail-item');
            thumbnails.forEach(thumb => {
                thumb.classList.remove('loading');
            });
        });
        
        // Initial load - show iframe after it loads
        console.log('Waiting for initial iframe load...');
    } else {
        console.error('Iframe or loader not found!', { mainIframe, iframeLoader });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.overview-card, .demo-item, .model-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

function switchVideo(element) {
  const videoSrc = element.dataset.video;
  const mainVideo = document.getElementById('mainVideo');

  document.querySelectorAll('.thumbnail-item')
    .forEach(item => item.classList.remove('active'));

  element.classList.add('active');

  if (mainVideo.querySelector('source').src !== videoSrc) {
    mainVideo.pause();
    mainVideo.querySelector('source').src = videoSrc;
    mainVideo.load();
    mainVideo.play();
  }
}

function switchVideo_More(element) {
  const videoSrc = element.dataset.video;
  const mainVideo = document.getElementById('MoreVideo');

  document.querySelectorAll('.thumbnail-item')
    .forEach(item => item.classList.remove('active'));

  element.classList.add('active');

  if (mainVideo.querySelector('source').src !== videoSrc) {
    mainVideo.pause();
    mainVideo.querySelector('source').src = videoSrc;
    mainVideo.load();
    mainVideo.play();
  }
}
