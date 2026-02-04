// 💖 CONFIGURATION: Edit these messages to personalize them!
const messages = {
    bear: {
        icon: "🧸",
        text: "Remember when we went to the park? That was the best day. You make every moment feel like a warm hug."
    },
    letter: {
        icon: "💌",
        text: "I just wanted to say thank you for being you. Your kindness makes my world so much brighter."
    },
    flower: {
        icon: "🌸",
        text: "I can't wait to see our love grow even more. Here's to many more beautiful seasons together."
    },
    cat: {
        icon: "🐱",
        text: "You're purr-fect! (Sorry, I had to). But seriously, you're the cutest."
    },
    heart: {
        icon: "💖",
        text: "My heart beats a little faster whenever you're around. I love you so much."
    }
};

// --- DOM ELEMENTS ---
const landingPage = document.getElementById('landing-page');
const passwordPage = document.getElementById('password-page');
const selectionPage = document.getElementById('selection-page');
const messagePage = document.getElementById('message-page');
const finalPage = document.getElementById('final-page');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const passwordInput = document.getElementById('password-input');
const passwordSubmitBtn = document.getElementById('password-submit-btn');
const errorMessage = document.getElementById('error-message');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const stickers = document.querySelectorAll('.sticker');

const messageIcon = document.getElementById('message-icon');
const messageText = document.getElementById('message-text');

// --- NAVIGATION LOGIC ---
function showPage(page) {
    // Hide all pages
    [landingPage, passwordPage, selectionPage, messagePage, finalPage].forEach(p => {
        p.classList.remove('active');
        p.classList.add('hidden');
    });
    
    // Show requested page
    page.classList.remove('hidden');
    setTimeout(() => {
        page.classList.add('active');
    }, 50);
}

// --- EVENT LISTENERS ---

// 1. Landing Page Logic
yesBtn.addEventListener('click', () => {
    createConfetti();
    showPage(passwordPage);
});

// "No" Button Runs Away
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton); // For mobile touch

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// 2. Password Submit
passwordSubmitBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
    const password = passwordInput.value.trim();
    if (password === "2803") {
        createConfetti();
        showPage(selectionPage);
        errorMessage.classList.add('hidden');
    } else {
        errorMessage.classList.remove('hidden');
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// 3. Sticker Clicks
stickers.forEach(sticker => {
    sticker.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const content = messages[id];
        
        if (content) {
            messageIcon.textContent = content.icon;
            messageText.textContent = content.text;
            createConfetti();
            showPage(messagePage);
        }
    });
});

// 4. Navigation Buttons
backBtn.addEventListener('click', () => {
    showPage(selectionPage);
});

nextBtn.addEventListener('click', () => {
    createConfetti();
    showPage(finalPage);
});

// --- RANDOM IMAGES ON LANDING PAGE ---
const imageUrls = [
    "https://pixabay.com/get/g4f2c2dd9bbb85e655db1e970ef7c30fb7ca080dca11b269fbe38ca23e2d93f6683fd35d764484224b0faeef83592e3e2a03b412259cf03da791a371b009d0614_1280.png",
    "https://pixabay.com/get/g81628e9454192f7105055502ba3589a7483002484e073d31a29d1d15eca0ebf8dfa71fad2a62743a46d0a6cda8ecf65eee8736d45d8fe77829b84a1e09579482_1280.png",
    "https://pixabay.com/get/g6b3692524f0a6258b6eb3aca8df5ab47f00741caf73aaa828abf86c68b9b23a0e9d5777cd6337aca5b4091f7b76297d5cb5fcc9bf38b5703b79d25e1cad25295_1280.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIliqV6H6ZY8lnUZ8KcmsH_81u0hZI9l8-nL26hIg11BqAkOxvXu81MNE&s",
];

function addRandomImages() {
    const container = document.getElementById('random-images-container');
    
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('random-img');
        
        // Random Position
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 200);
        const rotation = (Math.random() * 40) - 20; // -20 to 20 deg
        
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.setProperty('--rotation', `${rotation}deg`);
        
        container.appendChild(img);
    });
}

// --- BACKGROUND ANIMATION (Floating Hearts) ---
function createFloatingHearts() {
    const container = document.querySelector('.background-hearts');
    const heartCount = 15; // Number of hearts

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '💖';
        
        // Randomize position and animation
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's'; // 10-20s
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px'; // 10-30px
        heart.style.opacity = Math.random() * 0.5;
        
        container.appendChild(heart);
    }
}

// --- CONFETTI EFFECT (Simple) ---
function createConfetti() {
    const colors = ['#ff69b4', '#ffb6c1', '#ffd700', '#ffffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const tx = Math.cos(angle) * 100 * Math.random();
        const ty = Math.sin(angle) * 100 * Math.random();
        
        confetti.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
        }).onfinish = () => confetti.remove();
        
        document.body.appendChild(confetti);
    }
}

// Initialize
createFloatingHearts();
addRandomImages();
