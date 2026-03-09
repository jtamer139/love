window.addEventListener('load', () => {
    const music = document.getElementById('music');

   

    // إنشاء البالونات (لو العنصر موجود بس)
    const numberOfBalloons = 200;
    const container = document.querySelector('.balloon-container');

    if (container) {
        for (let i = 0; i < numberOfBalloons; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.setProperty('--i', i);

            // حجم بيضاوي عشوائي
            const width = 30 + Math.random() * 20;
            const height = width + 10;
            balloon.style.width = `${width}px`;
            balloon.style.height = `${height}px`;

            // توزيع عشوائي
            balloon.style.left = `${Math.random() * 100}%`;

            container.appendChild(balloon);

            // مدة وتأخير عشوائي للحركة
            const delay = Math.random() * 5;
            const duration = 4 + Math.random() * 3;
            balloon.style.animationDelay = `${delay}s`;
            balloon.style.animationDuration = `${duration}s`;
        }
    }

 



});

// Gallery removed – book-only page





// Play/Pause Toggle Function (متوافق مع آيفون — التشغيل بس بعد ضغطة المستخدم)
function playSong() {
  const song = document.getElementById('song');
  const playBtn = document.querySelector('.play-btn');
  if (!song || !playBtn) return;
  if (song.paused) {
    song.load();
    var p = song.play();
    if (p && p.catch) p.catch(function() {});
    playBtn.textContent = '⏸';
  } else {
    song.pause();
    playBtn.textContent = '▶';
  }
}

// Messages from Dodo and Ouda
const dodoMessage = `
to the girl i met and loved in a very first day , i fell in love with ur eyes when i saw you worried about meeting me yapping about everything our memories since day one. I just appreciate ur existence ur love ur care the way you speak the way you love me i wish i would give u the world cuz you deserve it , happy birthday to my future my wife my everything i wish you all the success and happiness i love you so much darling`;


// Typing animation function
function typeMessage(element, text, speed = 50) {
  let charIndex = 0;
  element.textContent = '';
  
  function type() {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Handle message box clicks
document.addEventListener('DOMContentLoaded', function() {
  const dodoBox = document.querySelector('.dodo-box');
  const oudaBox = document.querySelector('.ouda-box');
  
  if (dodoBox) {
    dodoBox.addEventListener('click', function() {
      const overlay = this.querySelector('.message-overlay');
      const textElement = this.querySelector('#dodo-text');
      
      if (!overlay.classList.contains('hidden')) {
        overlay.classList.add('hidden');
        typeMessage(textElement, dodoMessage);
      }
    });
  }
  
  if (oudaBox) {
    oudaBox.addEventListener('click', function() {
      const overlay = this.querySelector('.message-overlay');
      const textElement = this.querySelector('#ouda-text');
      
      if (!overlay.classList.contains('hidden')) {
        overlay.classList.add('hidden');
        typeMessage(textElement, oudaMessage);
      }
    });
  }
});

// ===== الكتاب: فتح، تقليب بأنيميشن، إغلاق عند آخر صفحة =====
(function () {
  const bookClosed = document.getElementById('bookClosed');
  const bookOpen = document.getElementById('bookOpen');
  const pageLeft = document.getElementById('pageLeft');
  const pageRight = document.getElementById('pageRight');
  const pageRightBack = document.getElementById('pageRightBack');
  const pageFlipLeftWrap = document.getElementById('pageFlipLeftWrap');
  const pageFlipWrap = document.getElementById('pageFlipWrap');
  const imgLeft = document.getElementById('imgLeft');
  const imgRight = document.getElementById('imgRight');
  const imgRightBack = document.getElementById('imgRightBack');
  const imgLeftBack = document.getElementById('imgLeftBack');
  const bookNext = document.getElementById('bookNext');
  const bookPrev = document.getElementById('bookPrev');
  const bookProgress = document.getElementById('bookProgress');

  if (!bookClosed || !bookOpen || !pageFlipWrap) return;

  var basePath = './static/images/';
  var bookPageImages = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return basePath + '(' + n + ').jpeg';
  });
  var totalSpreads = 4;
  var currentSpread = 0;
  var isFlipping = false;

  function leftPageIndex() { return currentSpread * 2; }
  function rightPageIndex() { return currentSpread * 2 + 1; }

  function showSpread() {
    imgLeft.src = bookPageImages[leftPageIndex()];
    imgRight.src = bookPageImages[rightPageIndex()];
    if (bookProgress) {
      bookProgress.textContent = (currentSpread + 1) + ' / ' + totalSpreads;
    }
    if (bookPrev) bookPrev.disabled = false;
    if (bookNext) bookNext.disabled = false;
  }

  function openBook() {
    currentSpread = 0;
    showSpread();
    bookClosed.style.display = 'none';
    bookOpen.classList.add('visible');
  }

  function closeBook() {
    bookOpen.classList.remove('visible');
    bookClosed.style.display = 'block';
    currentSpread = 0;
  }

  function onFlipEnd() {
    isFlipping = false;
    pageFlipWrap.classList.remove('flipping');
    currentSpread++;
    showSpread();
  }

  function nextPage() {
    if (isFlipping) return;
    if (currentSpread >= totalSpreads - 1) {
      closeBook();
      return;
    }
    var nextLeftIndex = (currentSpread + 1) * 2;
    if (nextLeftIndex >= bookPageImages.length) {
      closeBook();
      return;
    }
    isFlipping = true;
    imgRightBack.src = imgRight.src;
    pageFlipWrap.classList.add('flipping');
    setTimeout(onFlipEnd, 800);
  }

  function prevPage() {
    if (isFlipping) return;
    if (currentSpread === 0) {
      closeBook();
      return;
    }
    var prevRightIndex = (currentSpread - 1) * 2 + 1;
    if (pageFlipLeftWrap && imgLeftBack) {
      isFlipping = true;
      imgLeftBack.src = bookPageImages[prevRightIndex];
      pageFlipLeftWrap.classList.add('flipping-prev');
      setTimeout(function () {
        pageFlipLeftWrap.classList.remove('flipping-prev');
        currentSpread--;
        showSpread();
        isFlipping = false;
      }, 800);
    } else {
      currentSpread--;
      showSpread();
    }
  }

  bookClosed.addEventListener('click', openBook);
  if (bookNext) bookNext.addEventListener('click', nextPage);
  if (bookPrev) bookPrev.addEventListener('click', prevPage);
})();

const steps = document.querySelectorAll('.step');

steps.forEach(step => {
  const msg = document.createElement('div');
  msg.classList.add('step-message');
  msg.textContent = step.getAttribute('data-text');
  step.appendChild(msg);

  step.addEventListener('click', () => {
    msg.style.opacity = 1; // الرسالة تظهر وتتراكم
  });
});

// الجزء الخاص بالـ sparkles يبقى زي ما هو
const canvas = document.querySelector('.sparkles');

if (canvas) {

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

class Sparkle {
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*3 + 1;
    this.speedY = Math.random()*0.7 + 0.2;
    this.speedX = Math.random()*0.5 - 0.25;
    this.alpha = Math.random()*0.5 + 0.5;
  }
  update(){
    this.y -= this.speedY;
    this.x += this.speedX;
    if(this.y < -5) this.y = canvas.height +5;
    if(this.x < 0) this.x = canvas.width;
    if(this.x > canvas.width) this.x = 0;
  }
  draw(){
    ctx.fillStyle = `rgba(255,122,217,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

const sparkles = [];
for(let i=0;i<200;i++) sparkles.push(new Sparkle());

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  sparkles.forEach(s=>{
    s.update();
    s.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize',()=>{
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
}

// Music Player Toggle Function (متوافق مع آيفون)
function toggleMusicPlayer() {
  const contentMusic = document.getElementById('music');
  const playMusicBtn = document.getElementById('playMusicBtn');
  const albumArt = document.querySelector('.album-art');
  if (!contentMusic || !playMusicBtn) return;
  if (contentMusic.paused) {
    contentMusic.load();
    var p = contentMusic.play();
    if (p && p.catch) p.catch(function() {});
    playMusicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    if (albumArt) albumArt.classList.remove('paused');
  } else {
    contentMusic.pause();
    playMusicBtn.innerHTML = '<i class="fas fa-play"></i>';
    if (albumArt) albumArt.classList.add('paused');
  }
}

// ===== Simple front-end "login" without Flask =====
document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;

  // Protect home/content pages
  const isHome = body.classList.contains('home');
  const isContentPage = body.classList.contains('gallery') || body.classList.contains('content');
  const loggedIn = localStorage.getItem('logged_in') === 'true';

  if ((isHome || isContentPage) && !loggedIn) {
    window.location.href = 'index.html';
    return;
  }

  // Handle login page
  if (body.classList.contains('login')) {
    const form = document.querySelector('form');
    const passwordInput = form ? form.querySelector('input[name="password"]') : null;
    const messageEl = document.getElementById('login-message');
    const box = document.querySelector('.container');
    const PASSWORD = '1611';

    if (!form || !passwordInput) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let tries = parseInt(localStorage.getItem('tries') || '0', 10);
      const value = passwordInput.value.trim();

      if (value === '') {
        if (messageEl) {
          messageEl.textContent = 'You must write the secret word';
        }
        passwordInput.value = '';
        passwordInput.focus();

        // إعادة تشغيل أنيميشن الكونتينر
        if (box) {
          box.style.animation = 'none';
          void box.offsetWidth; // reflow
          box.style.animation = '';
        }
        return;
      }

      if (value === PASSWORD) {
        localStorage.setItem('logged_in', 'true');
        localStorage.removeItem('tries');
        if (messageEl) messageEl.textContent = '';
        window.location.href = 'home.html';
      } else {
        tries += 1;
        localStorage.setItem('tries', String(tries));

        let msg = '';
        if (tries === 1) {
          msg = 'Wrong password ❌... try again';
        } else if (tries === 2) {
          msg = 'Still wrong! Focus this time 😡';
        } else if (tries === 3) {
          msg = "Okay, stop guessing. Hint: it's a special date for us 😉";
        } else {
          msg = "You didn't remember the date! It's 1611";
        }

        if (messageEl) messageEl.textContent = msg;
        passwordInput.value = '';
        passwordInput.focus();

        // إعادة تشغيل أنيميشن الكونتينر
        if (box) {
          box.style.animation = 'none';
          void box.offsetWidth; // reflow
          box.style.animation = '';
        }
      }
    });
  }
});
