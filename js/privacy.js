


const scrollContainer = document.querySelector('.srollingMain');
const sectionTitles = document.querySelectorAll('.linked');
const allSections = document.querySelectorAll('section');

handleActiveLinksPrivacySidebar();
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
function handleScroll() {
    const scrollPosition = scrollContainer.scrollTop;
    let activeTitleIndex = null;   
    sectionTitles.forEach((title, index) => {
      const sectionTop = allSections[index].offsetTop - 119;
      const sectionHeight = allSections[index].offsetHeight;  
      if (scrollPosition >= sectionTop - 20 && scrollPosition < sectionTop + sectionHeight) {
        activeTitleIndex = index; 
      }
    });
  
    sectionTitles.forEach((title, index) => {
      const arrows = document.querySelectorAll('.arrow');
      if (index === activeTitleIndex) { 
        title.classList.add('active');
          arrows[index].classList.add('fa-solid', 'fa-angle-right');
          
      } else {
        title.classList.remove('active');
        arrows[index].classList.remove('fa-solid', 'fa-angle-right');
      }
    });
  }
  