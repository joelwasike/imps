const navBtn = document.querySelector('.navBtn');
const navHeader = document.querySelector('.navList');
const xStroke = document.querySelector('.xStroke');
const bar = document.querySelector('.bar');
const scrollableDiv = document.querySelector('.card-container');
const elements = document.querySelectorAll('.card');
const elementWidth = elements[0].offsetWidth;

const sectionTitles = document.querySelectorAll('.navLinks');
const allSections = document.querySelectorAll('.section');

const bot = document.querySelector('.moreBot');
const close = document.querySelector('.close');
const more = document.getElementById('seeBot');
const moreStellar = document.querySelector('.moreStellar');
const closeStellar = document.querySelector('.closeStellar');
const seeStellar = document.getElementById('seeStellar');
const moreImpala = document.querySelector('.moreImpala');
const closeImpala = document.querySelector('.closeImpala');
const seeImpala = document.getElementById('seeImpala');

more.addEventListener('click', (e)=> {
      e.preventDefault();
      if(moreImpala?.classList.contains('active') || moreStellar?.classList.contains('active')){
        moreImpala?.classList.remove('active')
        moreStellar?.classList.remove('active')
      }
      bot.classList.add('active');
  })
  close.addEventListener('click', (e)=> {
      e.preventDefault();
      bot.classList.remove('active');
  })

  //stellar

  seeStellar?.addEventListener('click', (e)=> {
    e.preventDefault();
    if(bot.classList.contains('active') || moreImpala?.classList.contains('active')){
      bot.classList.remove('active')
      moreImpala?.classList.remove('active')
    }
    moreStellar?.classList.add('active');
})
closeStellar?.addEventListener('click', (e)=> {
    e.preventDefault();    
    moreStellar?.classList.remove('active');
})

//Impala

  seeImpala?.addEventListener('click', (e)=> {
    e.preventDefault();
    if(bot.classList.contains('active') || moreStellar?.classList.contains('active')){
      bot.classList.remove('active')
      moreStellar?.classList.remove('active')
    }
    moreImpala.classList.add('active');
})
closeImpala?.addEventListener('click', (e)=> {
    e.preventDefault();
    moreImpala?.classList.remove('active');
})



window.addEventListener('scroll', ()=>{
  handleScroll()
})

const cookieObj = {
  device: getDeviceType(),
  browser_name: getBrowserName(),
  browser_version: getBrowserVersion(),
  latitude: 'null', 
  longitude: 'null', 
  region: 'null', 
  country: 'null',
  timezone: 'null', 
  OS: getOperatingSystem(),
  IP: 'null', 
  entryTime: 'null',
  exitTime: 'null',
  extra: "none" 
};

let scrollDirection = 1;
let currentScrollPosition = 0;
let isScrolling = false;
let animationInterval;



setPage()
function setPage(){
    handleHeaderNavigation();
    handleCookies();
    setYear();
    scrollListener();
    startAnimation();
}
function handleHeaderNavigation(){
    navBtn.addEventListener('click', ()=>{
        xStroke.classList.toggle('hide')
        bar.classList.toggle('hide')
        navHeader.classList.toggle('flex');
        navBtn.classList.toggle('focus:ring-2');
        navBtn.classList.toggle('focus:ring-gray-200');
    })
    const navList = document.querySelectorAll('.navLinks');
    
    navList.forEach((link, index)=>{
        link.addEventListener('click', ()=>{
           navList.forEach((element)=>{
                element.classList.remove('activeLink')
           })
           link.classList.add('activeLink')
           navBtn.click()
        })
    })
}
function handleCookies(){
    const acceptCookieBtn = document.querySelector('.acceptCookieBtn');
    const cookie = document.getElementById('cookie');
    let cookies;
    // cookie.style.display = 'none';

    window.addEventListener('load', function () {
      const storedCookie = JSON.parse(localStorage.getItem('cookieAccepted'));
      if(storedCookie){
        setTimeout(()=>{
          handleCookieData();
        }, 3000)
        return;
      }else{
        setTimeout(()=>{
          cookie.style.display = 'flex';
        }, 1000)  
        acceptCookieBtn.addEventListener('click', ()=>{
          acceptCookieBtn.textContent = "Accepting All Cookies...";          
          setTimeout(()=>{
            handleCookieData();
          }, 3000)
          cookies = true;
          localStorage.setItem('cookieAccepted', JSON.stringify(cookies));
          setTimeout(()=>{
              cookie.style.display = 'none';
         }, 250)
        })  
      }
    })
      
}

function setYear(){
  let date = new Date()
  let year = date.getFullYear();
  document.querySelector('.year').textContent = year;
}

//Animate scroll

function animateScroll() {
  scrollableDiv.scrollTo({
    left: currentScrollPosition,
    behavior: 'smooth'
  });

  currentScrollPosition += scrollDirection * (elementWidth + 24); // Including margin

  if (currentScrollPosition <= 0 || currentScrollPosition >= (elementWidth * (elements.length - 1))) {
    scrollDirection *= -1;
  }
}

function startAnimation() {
  isScrolling = false;
  animationInterval = setInterval(animateScroll, 1000);
}

function stopAnimation() {
  isScrolling = true;
  clearInterval(animationInterval);
}

function handleInteraction() {
  if (!isScrolling) {
    stopAnimation();
    setTimeout(startAnimation, 1000);
  }
}

function scrollListener(){
  scrollableDiv.addEventListener('scroll', function() {
    if (!isScrolling) {
      stopAnimation();
      setTimeout(startAnimation, 1000);
    }
  });
  
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', handleInteraction);
    elements[i].addEventListener('mouseenter', handleInteraction);
  }
  
}

function handleScroll() {
  
  const scrollPosition = window.scrollY;
  let activeTitleIndex = null;   
  sectionTitles.forEach((title, index) => {
    const sectionTop = allSections[index].offsetTop - 72 ;
    const sectionHeight = allSections[index].offsetHeight;  
    if (scrollPosition >= sectionTop -20 && scrollPosition < sectionTop - 20 + sectionHeight) {
      activeTitleIndex = index; 
    }
  });

  sectionTitles.forEach((title, index) => {
    if (index === activeTitleIndex) { 
      title.classList.add('activeLink');
        
    } else {
      title.classList.remove('activeLink');
    }
  });
}

function getDeviceType() {
  var userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.match(/android/i)) {
    return "Android";
  } else if (userAgent.match(/iphone|ipad|ipod/i)) {
    return "iOS";
  } else if (userAgent.match(/windows phone/i)) {
    return "Windows Phone";
  } else if (userAgent.match(/windows nt/i) && userAgent.match(/touch/i)) {
    return "Windows Touchscreen Device";
  } else if (userAgent.match(/macintosh/i) && userAgent.match(/touch/i)) {
    return "Mac Touchscreen Device";
  } else if (userAgent.match(/windows nt/i)) {
    return "Windows PC";
  } else if (userAgent.match(/macintosh/i)) {
    return "Mac";
  } else if (userAgent.match(/linux/i)) {
    return "Linux";
  } else {
    return "Unknown";
  }
}
function getBrowserName() {
  var userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("firefox")) {
    return "Mozilla Firefox";
  } else if (userAgent.includes("chrome")) {
    return "Google Chrome";
  } else if (userAgent.includes("safari")) {
    return "Safari";
  } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
    return "Opera";
  } else if (userAgent.includes("edge")) {
    return "Microsoft Edge";
  } else if (userAgent.includes("ie")) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}

function getBrowserVersion() {
  var userAgent = navigator.userAgent.toLowerCase();
  var version = "Unknown";

  var match = userAgent.match(/(firefox|chrome|safari|opera|opr|edge|ie)[\s/](\d+(\.\d+)*)/);
  if (match && match.length >= 3) {
    version = match[2];
  }

  return version;
}

function getOperatingSystem() {
  var platform = navigator.platform.toLowerCase();
  if (platform.includes("win")) {
    return "Windows";
  } else if (platform.includes("mac")) {
    return "Mac";
  } else if (platform.includes("linux")) {
    return "Linux";
  } else if (platform.includes("iphone") || platform.includes("ipad") || platform.includes("ipod")) {
    return "iOS";
  } else if (platform.includes("android")) {
    return "Android";
  } else if (platform.includes("windows phone")) {
    return "Windows Phone";
  } else {
    return "Unknown";
  }
}  

window.addEventListener('load', () => {
  const currentTime = new Date().toISOString();
  cookieObj.entryTime = currentTime;
});


function handleCookieData(){   
   
  generateIp();
    async function generateIp() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        cookieObj.IP = data.ip; 
        if(data.ip){
          getUserLatLon();
        }
      } catch (error) {
        console.log("Error occurred while retrieving IP address:", error);
      }
    }
    function getUserLatLon(){    
      if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            cookieObj.longitude = longitude;
            cookieObj.latitude = latitude;
            const userIpAddress = cookieObj.IP;
            fetchRegion(latitude, longitude, userIpAddress);
          }

        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        console.log(cookieObj); 
      }
    }
  async function fetchRegion(latitude, longitude, userIpAddress){
   await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_F3Nj6Pt3UBuglXbeHTpzuUafWy7ec&ipAddress=${userIpAddress}&lat=${latitude}&lon=${longitude}`, {
          method: "GET"
    })
    .then(res => res.json())
    .then(res =>{
      cookieObj.country = res.location.country;
      cookieObj.region = res.location.region;
      cookieObj.timezone = res.location.timezone;
      sendCookies();
    })
  }
  
  return cookieObj;
}

function sendCookies(){
  const blob = new Blob([JSON.stringify(cookieObj)]);
  navigator.sendBeacon('https://sandbox.impalapay.com/data/index.php', blob);
        console.log('Cookie data sent using sendBeacon!');

  fetch('https://sandbox.impalapay.com/data/index.php', {
    method: 'POST',
    body: blob,
    keepalive: true
  })
    .then((response) => {
      if (response.ok) {
        console.log('Cookie data sent successfully using fetch!');
      } else {
        throw new Error(`Failed to send cookie data using fetch. Status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log('An error occurred while sending cookie data using fetch:', error);
      if (navigator.sendBeacon) {
        navigator.sendBeacon('https://sandbox.impalapay.com/data/index.php', blob);
        console.log('Cookie data sent using sendBeacon!');
      } else {
        console.log('sendBeacon is not supported. Unable to send cookie data.');
      }
    });
}

var isFirefox = navigator.userAgent.includes("Firefox");

if (isFirefox) {
  window.addEventListener("beforeunload", function() {
   
      sendCookies();

  });
} else {
  window.addEventListener('unload', () => {
    const currentDate = new Date();
    cookieObj.exitTime = currentDate.toISOString();
    sendCookies();
    localStorage.setItem('sentCookie', JSON.stringify(cookieObj));
  });
  
}
