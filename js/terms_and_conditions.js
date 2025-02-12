handleActiveLinksPrivacySidebar();
const scrollContainer = document.querySelector('.scroll');
const sectionTitles = document.querySelectorAll('.srollActive');
const allSections = document.querySelectorAll('section');

scrollContainer.addEventListener('scroll', ()=>{
  handleScroll()
})


function handleActiveLinksPrivacySidebar(){
    const linkedElements = document.querySelectorAll('.linked');
    const arrows = document.querySelectorAll('.arrow');
    linkedElements.forEach((element,index) => {
    element.addEventListener('click', () => {
         arrows.forEach((arrow)=>{
            arrow.classList.remove('fa-solid', 'fa-angle-right');
         })
        linkedElements.forEach(linkedElement => {
        linkedElement.classList.remove('active');
        });
        arrows[index].classList.add('fa-solid', 'fa-angle-right');
        element.classList.add('active');
    });
    });

}

// Function to handle the scroll event
function handleScroll() {
  const scrollPosition = scrollContainer.scrollTop;
  let activeTitleIndex = null;

  sectionTitles.forEach((title, index) => {
    const sectionTop = allSections[index].offsetTop - 67 ;
    const sectionHeight = allSections[index].offsetHeight;

    if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight) {
      activeTitleIndex = index;
    }
  });

  sectionTitles.forEach((title, index) => {
    const arrows = document.querySelectorAll('.arrow');
    const left = document.querySelectorAll('.left');
    const dot = document.querySelectorAll('.dot');
    if (index === activeTitleIndex) {
      title.classList.add('active');
        arrows[index].classList.add('fa-solid', 'fa-angle-right');
        left[index].classList.add('active')
        dot[index].classList.add('active')
        dot[index].textContent = "✓";
    } else {
      title.classList.remove('active');
      arrows[index].classList.remove('fa-solid', 'fa-angle-right');
      left[index].classList.remove('active')
      dot[index].classList.remove('active')
      dot[index].textContent = "";

    }
  });
}
