// Product data
const products = [
    {
        id: 1,
        name: "Gazi Alexander",
       
        price: 89.99,
       
        image: "https://cdn.salla.sa/yoZjz/5e15eaa5-cc8a-4adb-9dce-8506a7f73e16-1000x1000-oWl63iknV5938EbwANAuJDDWNo3jzuRJHvq4frm5.jpg",
        description: " Gazi Alexander Perfume: A distinctive woody oriental fragrance for men and womenGhazi Alexander is a distinctive woody oriental fragrance, inspired by Horizo's original Alexandria 2 by Zergoff.",
        rating: 4,
        coupons: ["Gazi Alexander"]
    },
    {
        id: 2,
        name: "Ghazi Angels",
        price: 19.99,
        image: "https://cdn.salla.sa/yoZjz/37660f93-1fcb-4907-ae94-fe0e1d38aed2-500x500-IhTQuIh4UsJcb9NiDEldKrRz9oTbVS112U1koow2.jpg",
        description: "Ghazi Angels Perfume: A warm and sexy scent that lasts all dayGhazi Angels is a woody oriental women's fragrance that envelops you in a warm and sexy scent, inspired by the.",
        rating: 5,
        coupons: ["Ghazi Angels"]
    },
    {
        id: 3,
        name: "Dylan Bank",
        price: 70.99,
        image: "https://cdn.salla.sa/yoZjz/e9d52e98-ea06-4fc0-9a0a-57bfc2114e68-500x500-TISBWTd31m7cJwlQep1Otg8SlbMUCBVFJUFiFUsY.jpg",
        description: "Dylan Bank - Delaney PerfumeDylan Bank is a fragrance for glamorous women, simply put, a woman who is looking for a fragrance with a feminine appeal, inspired by what....",
        rating: 4,
        coupons: ["Dylan Bank" ]
    },
    {
        id: 4,
        name: "Robert Yellow",
        price: 99.99,
        image: "https://cdn.salla.sa/yoZjz/afe0a167-094a-451f-9ef9-d0f4e36e8f21-500x500-RJk7izk4UbSfJcRd8oDauoE460XnOT4Z29Yycgn7.jpg",
        description: "Robert Yellow - Roberto Cavalli Inspired by Roberto Cavalli 2012, Robert Yellow is a fragrance for women that consists of the contrasting elements of nature that...",
        rating: 5,
        coupons: ["Robert"]
    },
    {
        id: 5,
        name: "Amber Leather",
        price: 29.99,
        image: "https://cdn.salla.sa/yoZjz/de34693e-bb54-4559-91ba-1d81322baf86-500x500-hPAn7esQfUz1XtCOqwenxCFGTOr3PdaOhbGW6Ala.jpg",
        description: "Amber Leather A distinctive fragrance for women and men with the scent of leatherImagines the vast landscapes of the heart of the desert in the WestThe composition consists of cardamom and leather..",
        rating: 3,
        coupons: [""]
    },
    {
        id: 6,
        name: "Ghazi Valley",
        price: 49.99,
        image: "https://cdn.salla.sa/yoZjz/9a0d67b8-4250-4da4-91bf-76325067feae-500x500-ReOLVz0ZFa4A2b5zRCgIu7QNpUYIz2KudixQ1289.jpg",
        description: "Ghazi Valley, a woody oriental fragrance that exudes elegance and beautyGhazi Valley is a woody, floral and fruity oriental fragrance, uniquely designed for women....",
        rating: 4,
        coupons: ["Ghazi Valley"]
    }
];
const productSlider = document.getElementById('productSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalBrand = document.getElementById('modalBrand');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalDiscount = document.getElementById('modalDiscount');
const modalRating = document.getElementById('modalRating');
const ratingValue = document.getElementById('ratingValue');
const modalCoupons = document.getElementById('modalCoupons');


let currentSlide = 0;
let slideInterval;
const slideDuration = 3000; 
let currentProductId = null;


function initProductSlider() {
    productSlider.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'min-w-[300px] p-4 flex-shrink-0 cursor-pointer';
        productCard.dataset.productId = product.id;
        
        productCard.innerHTML = `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div class="h-48 overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                <div class="p-4 flex-grow flex flex-col">
                    <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                    <div class="flex items-center mb-2">
                        ${renderStars(product.rating, false, product.id)}
                    </div>
                    <div class="mt-auto">
                        <p class="text-xl font-bold text-gray-500">$${product.price.toFixed(2)}</p>
                        ${product.discount ? `<span class="text-green-600 text-sm">${product.discount}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        productCard.addEventListener('click', () => openProductModal(product.id));
        productSlider.appendChild(productCard);
    });
    

    startAutoSlide();
}

function renderStars(rating, interactive = false, productId = null) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= rating ? 'text-yellow-400' : 'text-gray-300';
        starsHTML += `
            <span class="star ${interactive ? 'cursor-pointer' : ''} ${starClass}" 
                  data-rating="${i}" 
                  ${productId ? `data-product-id="${productId}"` : ''}>
                <i class="fas fa-star"></i>
            </span>
        `;
    }
    return starsHTML;
}


function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProductId = productId;
    

    modalTitle.textContent = product.name;
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalBrand.textContent = product.brand;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    
    if (product.discount) {
        modalDiscount.textContent = product.discount;
        modalDiscount.classList.remove('hidden');
    } else {
        modalDiscount.classList.add('hidden');
    }
    

    modalRating.innerHTML = renderStars(product.rating, true);
    ratingValue.textContent = `(${product.rating})`;
    
 
    modalCoupons.innerHTML = '';
    product.coupons.forEach(coupon => {
        const couponElement = document.createElement('span');
        couponElement.className = 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm';
        couponElement.textContent = coupon;
        modalCoupons.appendChild(couponElement);
    });
    
  
    document.querySelectorAll('.modal .star').forEach(star => {
        star.addEventListener('click', (e) => {
            const newRating = parseInt(star.dataset.rating);
            updateProductRating(productId, newRating);
        });
    });
    
   
    
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}



function closeProductModal() {
    productModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}


function updateProductRating(productId, newRating) {
 
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    products[productIndex].rating = newRating;
    
   
    modalRating.innerHTML = renderStars(newRating, true);
    ratingValue.textContent = `(${newRating})`;

    const productCards = document.querySelectorAll(`[data-product-id="${productId}"] .flex.items-center`);
    productCards.forEach(card => {
        card.innerHTML = renderStars(newRating, false, productId);
    });
}


function goToSlide(index) {
    const slideCount = products.length;
    currentSlide = (index + slideCount) % slideCount;
    const offset = -currentSlide * 300; // 300px per card
    productSlider.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}


prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

closeModal.addEventListener('click', closeProductModal);
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeProductModal();
    }
});


document.addEventListener('keydown', (e) => {
    if (!productModal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    }
});


initProductSlider();