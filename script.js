// ------------------------------------------------------Navigation Bar Display and Page Blur Code--------------------------------------------------
const b2 = document.getElementById('b2');
const navBar = document.getElementById('navBar');

let sections = document.getElementsByClassName('section');

let alinks = document.getElementById('links').getElementsByTagName('a');

let i=1;

for(let j=0; j<alinks.length; j++){
    alinks[j].addEventListener('click',()=>{
        for(let k=0; k<sections.length; k++){
            sections[k].classList.remove('blurrr');
        }
        navBar.style.display = 'none';
        b2.innerHTML = `<i class="fa-solid fa-bars"></i>`;
        i=1
    })
};


b2.addEventListener('click',()=>{
    if(i){
        navBar.style.display = 'flex';
        b2.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        i = 0;
        
        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.add('blurrr');
        }
    }
    else{
        navBar.style.display = 'none';
        b2.innerHTML = `<i class="fa-solid fa-bars"></i>`;
        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.remove('blurrr');
        }
        i=1
    }
})





//---------------------------------------------------Carousel Sliding------------------------------------------------------------------------------

let currentProject = 0;
let interval;

function showProject(index) {
    const projects = document.getElementById('projCarousel');
    const totalProjects = projects.children.length;

    
    if (index >= totalProjects) {
        currentProject = 0;
    } else if (index < 0) {
        currentProject = totalProjects - 1;
    } else {
        currentProject = index;
    }

    const offset = -currentProject * 100;
    projects.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showProject(currentProject + 1);
}

function prevSlide() {
    showProject(currentProject - 1);
}

function startAutoScroll() {
    interval = setInterval(() => {
        nextSlide();
    }, 3000); 
}

function stopAutoScroll() {
    clearInterval(interval);
}


window.onload = function() {
    startAutoScroll();
};


document.getElementById('projCarouselContainer').addEventListener('mouseenter', stopAutoScroll);

document.getElementById('projCarouselContainer').addEventListener('mouseleave', startAutoScroll);


//--------------------------------------Form Validation-----------------------------------------------------------


function validateusr(){
    var fname =  document.getElementById('fname');
    var er = fname.nextElementSibling;

    if(fname.value.trim() === "" || fname.value.trim().length < 2){
        er.innerHTML = `<i class='fa-solid fa-circle-exclamation failure-icon' style="color: red;"></i>`
    }
    else{
        er.innerHTML = `<i class="fa-solid fa-circle-check success-icon " style="color: green;"></i>`
    }
}

function validatemail(){
    var email =  document.getElementById('email');
    var er = email.nextElementSibling;
    var email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

    if(email.value.trim() === "" || !email_pattern.test(email.value.trim())){
        er.innerHTML = `<i class='fa-solid fa-circle-exclamation failure-icon' style="color: red;"></i>`
    }
    else{
        er.innerHTML = `<i class="fa-solid fa-circle-check success-icon " style="color: green;"></i>`
    }
}




//-------------------------------------------------- ViewPort Logic for animations-----------------------------------------------------------------


function isInViewport(item) {

    var bounding = item.getBoundingClientRect(),
        myElementHeight = item.offsetHeight,
        myElementWidth = item.offsetWidth;

    if(bounding.top >= -myElementHeight
        && bounding.left >= -myElementWidth
        && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth
        && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) {
        return true;
    } else {
        return false;
    }

}

    const about = document.getElementById('about');
    const edu = document.getElementById('edu');

    const profile = document.getElementById('profile');
    const aboutme = document.getElementById('aboutme');
    const abt_media = document.getElementById('abt_media');

    const left = document.getElementsByClassName('left');
    const right = document.getElementsByClassName('right');
    const circle = document.getElementsByClassName('circle');
    

    window.addEventListener("scroll", function(){

        if(isInViewport(about)) {
            document.getElementById('profile').style.animation = "slideInLeft 1.5s forwards";
            
            document.getElementById('aboutme').style.animation = "slideInRight 1.5s forwards";

            
            document.getElementById('abt_media').style.animation = "slideInUp 1.5s forwards";
        }

        if (isInViewport(edu)) {
            
            for (let i = 0; i < left.length; i++) {
                left[i].style.animation = "slideInLeft 3s forwards";
            }

            
            for (let i = 0; i < right.length; i++) {
                right[i].style.animation = "slideInRight 3s forwards";
            }

            
            for (let i = 0; i < circle.length; i++) {
                circle[i].style.animation = "slideDown 3s forwards";
            }
        }

        document.getElementById('educ').style.setProperty('--beforeAnimation', 'slideDownLine 3s forwards');

    

    

    });





