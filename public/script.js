document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.media-slide');
    const slideCount = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        if (index >= slideCount) {
            currentIndex = 0; 
        } else if (index < 0) {
            currentIndex = slideCount - 1; 
        } else {
            currentIndex = index;
        }

        const slideWidth = slides[0].clientWidth; 
        document.querySelector('.media-slides').style.transform = `translateX(-${currentIndex * slideWidth}px)`; // Menggeser slider
    }

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex++;
        showSlide(currentIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex--;
        showSlide(currentIndex);
    });

    showSlide(currentIndex); 

    window.addEventListener('resize', () => {
        showSlide(currentIndex);
    });
});



const draggables = document.querySelectorAll('.draggable-box');
let activeElement = null;

draggables.forEach(draggable => {
    draggable.addEventListener('mousedown', (e) => {
        activeElement = draggable;
        const offsetX = e.clientX - activeElement.getBoundingClientRect().left;
        const offsetY = e.clientY - activeElement.getBoundingClientRect().top;

        activeElement.style.cursor = 'grabbing';

        function onMouseMove(e) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            activeElement.style.position = 'absolute';
            activeElement.style.left = `${newX}px`;
            activeElement.style.top = `${newY}px`;
        }

        function onMouseUp() {
            activeElement.style.cursor = 'grab';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    draggable.style.cursor = 'grab';
});
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/donations')
        .then(response => response.json())
        .then(data => {
            const donationList = document.getElementById('donation-list');
            
            data.forEach(donation => {
                const donationItem = document.createElement('div');
                donationItem.classList.add('donation-item');
                donationItem.id = donation.id; 
                
                donationItem.innerHTML = `
                    <h3>${donation.name}</h3>
                    <p>${donation.description}</p>
                    <a href="#${donation.id}">
                        <button>Donasi Sekarang</button>
                    </a>
                `;
                donationList.appendChild(donationItem);
            });
        })
        .catch(error => {
            console.error('Error fetching donation data:', error);
        });
});
