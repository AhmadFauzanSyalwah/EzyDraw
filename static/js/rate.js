// ===== DOM ELEMENTS =====
const menuItems = document.querySelectorAll('.menu-item');
const stars = document.querySelectorAll('.star');
const ratingForm = document.getElementById('ratingForm');
const ratingText = document.getElementById('ratingText');
const clearFormBtn = document.getElementById('clearForm');
const submitReviewBtn = document.getElementById('submitReview');
const filterTags = document.querySelectorAll('.filter-tag');
const sortSelect = document.getElementById('sortReviews');
const reviewsContainer = document.getElementById('reviewsContainer');
const loadMoreBtn = document.getElementById('loadMoreReviews');
const helpfulBtns = document.querySelectorAll('.helpful-btn');
const replyBtns = document.querySelectorAll('.reply-btn');

// ===== RATING STATE =====
let currentRating = 0;
const ratingTexts = {
    0: "Pilih rating",
    1: "Sangat Buruk",
    2: "Buruk",
    3: "Cukup",
    4: "Bagus",
    5: "Sangat Bagus"
};

// ===== MENU NAVIGATION =====
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get the page to navigate to
        const page = this.textContent.trim().toLowerCase();
        let url = '';
        
        switch(page) {
            case 'dashboard':
                url = '../dashboard/index.html';
                break;
            case 'plugin':
                url = '../plugin/index.html';
                break;
            case 'templates':
                url = '../templates/index.html';
                break;
            case 'aset':
                url = '../aset/index.html';
                break;
            case 'contributors':
                url = '../contributor/index.html';
                break;
            case 'ezylearn':
                url = '../ezylearn/index.html';
                break;
            case 'tentang kami':
                url = '../about/index.html';
                break;
            case 'rating ezydraw':
                // Already on this page
                return;
            case 'pusat bantuan':
                alert('Fitur bantuan akan datang!');
                return;
        }
        
        if (url && !this.classList.contains('active')) {
            window.location.href = url;
        }
    });
});

// ===== STAR RATING SYSTEM =====
stars.forEach(star => {
    star.addEventListener('click', function() {
        const value = parseInt(this.getAttribute('data-value'));
        currentRating = value;
        
        // Update stars display
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add('active');
                s.innerHTML = '<i class="fas fa-star"></i>';
            } else {
                s.classList.remove('active');
                s.innerHTML = '<i class="far fa-star"></i>';
            }
        });
        
        // Update rating text
        ratingText.textContent = ratingTexts[value];
        ratingText.style.color = getRatingColor(value);
    });
    
    star.addEventListener('mouseenter', function() {
        const value = parseInt(this.getAttribute('data-value'));
        
        stars.forEach((s, index) => {
            if (index < value) {
                s.style.color = getRatingColor(value);
            }
        });
    });
    
    star.addEventListener('mouseleave', function() {
        stars.forEach(s => {
            if (!s.classList.contains('active')) {
                s.style.color = '';
            }
        });
    });
});

// Helper function to get rating color
function getRatingColor(rating) {
    switch(rating) {
        case 1: return '#FF5252'; // Red
        case 2: return '#FF9800'; // Orange
        case 3: return '#FFEB3B'; // Yellow
        case 4: return '#4CAF50'; // Green
        case 5: return '#2196F3'; // Blue
        default: return '#FF9800';
    }
}

// ===== RATING FORM =====
ratingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const reviewTitle = document.getElementById('reviewTitle').value;
    const reviewText = document.getElementById('reviewText').value;
    
    // Validate rating
    if (currentRating === 0) {
        showNotification('Harap berikan rating terlebih dahulu!', 'error');
        return;
    }
    
    // Validate form
    if (!reviewTitle.trim() || !reviewText.trim()) {
        showNotification('Harap isi judul dan ulasan!', 'error');
        return;
    }
    
    // Disable button and show loading
    submitReviewBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitReviewBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create new review
        const newReview = createNewReview(userName, reviewTitle, reviewText, currentRating);
        
        // Add to reviews container (at the top)
        reviewsContainer.prepend(newReview);
        
        // Update stats
        updateRatingStats();
        
        // Reset form
        resetForm();
        
        // Show success message
        showNotification('Ulasan Anda berhasil dikirim!', 'success');
        
        // Re-enable button
        submitReviewBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Ulasan';
        submitReviewBtn.disabled = false;
        
        // Scroll to new review
        newReview.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

// Function to create new review element
function createNewReview(userName, title, text, rating) {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.setAttribute('data-rating', rating);
    
    const timeAgo = 'Baru saja';
    const categories = ['Kemudahan Penggunaan'];
    
    reviewCard.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">
                    <span>${userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
                </div>
                <div class="reviewer-details">
                    <h4 class="reviewer-name">${userName || 'Pengguna Anonim'}</h4>
                    <div class="review-meta">
                        <span class="review-date">${timeAgo}</span>
                        <span class="review-category">• ${categories[0]}</span>
                    </div>
                </div>
            </div>
            
            <div class="review-rating">
                ${getStarsHTML(rating)}
            </div>
        </div>
        
        <h3 class="review-title">${title}</h3>
        
        <p class="review-text">
            ${text}
        </p>
        
        <div class="review-footer">
            <div class="review-helpful">
                <button class="helpful-btn">
                    <i class="fas fa-thumbs-up"></i>
                    <span>Membantu (0)</span>
                </button>
                <button class="helpful-btn">
                    <i class="fas fa-thumbs-down"></i>
                    <span>Tidak (0)</span>
                </button>
            </div>
            
            <button class="reply-btn">
                <i class="fas fa-reply"></i> Balas
            </button>
        </div>
    `;
    
    // Add event listeners to new buttons
    const helpfulBtns = reviewCard.querySelectorAll('.helpful-btn');
    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', handleHelpfulClick);
    });
    
    const replyBtn = reviewCard.querySelector('.reply-btn');
    replyBtn.addEventListener('click', handleReplyClick);
    
    return reviewCard;
}

// Helper function to get stars HTML
function getStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    return `<div class="stars">${starsHTML}</div>`;
}

// Function to update rating stats (simulated)
function updateRatingStats() {
    // In a real app, this would make an API call
    // For demo, we'll just update the count
    const reviewCount = document.querySelector('[data-filter="all"] .count');
    const currentCount = parseInt(reviewCount.textContent);
    reviewCount.textContent = currentCount + 1;
    
    // Update 5-star count if applicable
    if (currentRating === 5) {
        const fiveStarCount = document.querySelector('[data-filter="5"] .count');
        const currentFiveStar = parseInt(fiveStarCount.textContent);
        fiveStarCount.textContent = currentFiveStar + 1;
    }
}

// Function to reset form
function resetForm() {
    ratingForm.reset();
    currentRating = 0;
    stars.forEach(star => {
        star.classList.remove('active');
        star.innerHTML = '<i class="far fa-star"></i>';
        star.style.color = '';
    });
    ratingText.textContent = 'Pilih rating';
    ratingText.style.color = '';
}

// Clear form button
clearFormBtn.addEventListener('click', resetForm);

// ===== REVIEWS FILTERING =====
filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
        // Remove active class from all tags
        filterTags.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tag
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter reviews
        const reviewCards = document.querySelectorAll('.review-card');
        reviewCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-rating') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== REVIEWS SORTING =====
sortSelect.addEventListener('change', function() {
    const sortValue = this.value;
    const reviewCards = Array.from(document.querySelectorAll('.review-card'));
    
    reviewCards.sort((a, b) => {
        switch(sortValue) {
            case 'newest':
                // Simulate sorting by date (in real app, you'd have actual dates)
                return Math.random() - 0.5;
                
            case 'highest':
                return parseInt(b.getAttribute('data-rating')) - parseInt(a.getAttribute('data-rating'));
                
            case 'lowest':
                return parseInt(a.getAttribute('data-rating')) - parseInt(b.getAttribute('data-rating'));
                
            case 'helpful':
                // Simulate sorting by helpful count
                return Math.random() - 0.5;
                
            default:
                return 0;
        }
    });
    
    // Re-append sorted reviews
    reviewsContainer.innerHTML = '';
    reviewCards.forEach(card => {
        reviewsContainer.appendChild(card);
    });
});

// ===== HELPFUL BUTTONS =====
function handleHelpfulClick() {
    const countSpan = this.querySelector('span');
    const currentText = countSpan.textContent;
    const match = currentText.match(/\((\d+)\)/);
    
    if (match) {
        const currentCount = parseInt(match[1]);
        const isUpvote = this.querySelector('.fa-thumbs-up');
        const isDownvote = this.querySelector('.fa-thumbs-down');
        
        // Check if already voted
        if (this.classList.contains('active')) {
            // Remove vote
            this.classList.remove('active');
            countSpan.textContent = currentText.replace(/\(\d+\)/, `(${currentCount - 1})`);
        } else {
            // Add vote
            this.classList.add('active');
            countSpan.textContent = currentText.replace(/\(\d+\)/, `(${currentCount + 1})`);
            
            // Remove active class from opposite button in the same group
            const parentDiv = this.parentElement;
            const oppositeBtn = parentDiv.querySelector(
                isUpvote ? '.fa-thumbs-down' : '.fa-thumbs-up'
            )?.closest('.helpful-btn');
            
            if (oppositeBtn?.classList.contains('active')) {
                const oppositeText = oppositeBtn.querySelector('span').textContent;
                const oppositeMatch = oppositeText.match(/\((\d+)\)/);
                if (oppositeMatch) {
                    const oppositeCount = parseInt(oppositeMatch[1]);
                    oppositeBtn.classList.remove('active');
                    oppositeBtn.querySelector('span').textContent = 
                        oppositeText.replace(/\(\d+\)/, `(${oppositeCount - 1})`);
                }
            }
        }
        
        // Update review count if needed
        updateReviewCount();
    }
}

// Add event listeners to existing helpful buttons
helpfulBtns.forEach(btn => {
    btn.addEventListener('click', handleHelpfulClick);
});

// ===== REPLY BUTTONS =====
function handleReplyClick() {
    const reviewCard = this.closest('.review-card');
    const reviewText = reviewCard.querySelector('.review-text').textContent;
    const reviewerName = reviewCard.querySelector('.reviewer-name').textContent;
    
    // Create reply form
    const replyForm = document.createElement('div');
    replyForm.className = 'reply-form';
    replyForm.innerHTML = `
        <div class="reply-form-content">
            <div class="reply-header">
                <h4><i class="fas fa-reply"></i> Balas untuk ${reviewerName}</h4>
                <button class="close-reply">&times;</button>
            </div>
            <p class="original-review">"${reviewText.length > 100 ? reviewText.substring(0, 100) + '...' : reviewText}"</p>
            <textarea class="reply-textarea" placeholder="Tulis balasan Anda..." rows="3"></textarea>
            <div class="reply-actions">
                <button class="btn-secondary cancel-reply">Batal</button>
                <button class="btn-primary submit-reply">Kirim Balasan</button>
            </div>
        </div>
    `;
    
    // Insert after review card
    reviewCard.after(replyForm);
    
    // Add event listeners
    const closeBtn = replyForm.querySelector('.close-reply');
    const cancelBtn = replyForm.querySelector('.cancel-reply');
    const submitBtn = replyForm.querySelector('.submit-reply');
    
    const closeReplyForm = () => replyForm.remove();
    
    closeBtn.addEventListener('click', closeReplyForm);
    cancelBtn.addEventListener('click', closeReplyForm);
    
    submitBtn.addEventListener('click', () => {
        const replyText = replyForm.querySelector('.reply-textarea').value.trim();
        if (replyText) {
            // In real app, submit to server
            showNotification('Balasan berhasil dikirim!', 'success');
            closeReplyForm();
        } else {
            showNotification('Harap tulis balasan terlebih dahulu!', 'error');
        }
    });
}

// Add event listeners to existing reply buttons
replyBtns.forEach(btn => {
    btn.addEventListener('click', handleReplyClick);
});

// ===== LOAD MORE REVIEWS =====
loadMoreBtn.addEventListener('click', function() {
    // Show loading
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
    
    // Simulate loading more reviews
    setTimeout(() => {
        // Sample additional reviews
        const sampleReviews = [
            {
                name: 'Maya Sari',
                rating: 5,
                title: 'Template yang Sangat Berguna!',
                text: 'Template presentasinya membantu saya menyelesaikan tugas kuliah dengan cepat. Kualitas export untuk print juga sangat baik.',
                category: 'Fitur',
                timeAgo: '1 bulan lalu'
            },
            {
                name: 'Rizki Pratama',
                rating: 4,
                title: 'Cocok untuk Desainer Pemula',
                text: 'Interface-nya user friendly. Cocok untuk yang baru belajar desain. Hanya perlu sedikit improvement pada fitur layer management.',
                category: 'Kemudahan Penggunaan',
                timeAgo: '2 bulan lalu'
            },
            {
                name: 'Lisa Anggraini',
                rating: 5,
                title: 'Worth the Money!',
                text: 'Sistem sekali bayar sangat menguntungkan. Tidak perlu khawatir dengan biaya langganan bulanan seperti Canva.',
                category: 'Model Bisnis',
                timeAgo: '3 bulan lalu'
            }
        ];
        
        // Add new reviews
        sampleReviews.forEach(review => {
            const newReview = createNewReview(
                review.name,
                review.title,
                review.text,
                review.rating
            );
            
            // Update metadata
            newReview.querySelector('.review-date').textContent = review.timeAgo;
            newReview.querySelector('.review-category').textContent = `• ${review.category}`;
            
            reviewsContainer.appendChild(newReview);
        });
        
        // Reset button
        this.innerHTML = '<i class="fas fa-arrow-down"></i> Tampilkan Lebih Banyak Ulasan';
        
        // Update count
        updateReviewCount();
        
        // Show notification
        showNotification(`${sampleReviews.length} ulasan baru dimuat!`, 'success');
    }, 1000);
});

// Function to update review count
function updateReviewCount() {
    // In a real app, this would update from server
    console.log('Review count updated');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-primary)' : 
                        type === 'error' ? 'var(--accent-pink)' : 
                        'var(--accent-secondary)'};
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            animation-fill-mode: forwards;
            max-width: 400px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    
    document.head.appendChild(styles);
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            document.body.removeChild(notification);
        }
        document.head.removeChild(styles);
    }, 3000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl + R to focus rating form
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        document.getElementById('reviewTitle').focus();
    }
    
    // Escape to close any open modals
    if (e.key === 'Escape') {
        const replyForms = document.querySelectorAll('.reply-form');
        replyForms.forEach(form => form.remove());
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate stars
    setTimeout(() => {
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = '';
                }, 300);
            }, index * 100);
        });
    }, 500);
});

// ===== PRINT FUNCTIONALITY =====
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Cetak Rating';
    printBtn.title = 'Cetak rating dan ulasan';
    
    printBtn.style.position = 'fixed';
    printBtn.style.bottom = '20px';
    printBtn.style.right = '20px';
    printBtn.style.background = 'var(--accent-secondary)';
    printBtn.style.color = 'var(--primary-bg)';
    printBtn.style.border = 'none';
    printBtn.style.padding = '12px 20px';
    printBtn.style.borderRadius = 'var(--border-radius)';
    printBtn.style.fontWeight = '600';
    printBtn.style.cursor = 'pointer';
    printBtn.style.zIndex = '999';
    printBtn.style.display = 'flex';
    printBtn.style.alignItems = 'center';
    printBtn.style.gap = '8px';
    printBtn.style.boxShadow = '0 4px 15px rgba(255, 152, 0, 0.3)';
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printBtn);
}

// Initialize print button
addPrintButton();

// ===== PRINT STYLES =====
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .sidebar, .print-button, .btn-new-design {
            display: none !important;
        }
        
        .main-container {
            margin-left: 0 !important;
        }
        
        .main-content {
            padding: 0 !important;
            overflow: visible !important;
            height: auto !important;
        }
        
        .card {
            break-inside: avoid;
            box-shadow: none !important;
            border: 2px solid #ddd !important;
            margin-bottom: 20px !important;
            color: #000 !important;
            background: white !important;
        }
        
        .page-title {
            color: #000 !important;
            -webkit-text-fill-color: #000 !important;
        }
        
        .page-subtitle {
            color: #666 !important;
        }
        
        body {
            background: white !important;
            color: #000 !important;
        }
        
        .review-card, .feature-rating-item {
            break-inside: avoid;
            border: 1px solid #ddd !important;
            margin-bottom: 15px !important;
        }
        
        .stars {
            color: #FF9800 !important;
        }
        
        .review-text {
            color: #666 !important;
        }
        
        .btn-primary, .btn-secondary, .btn-load-more {
            display: none !important;
        }
        
        .rating-form {
            display: none !important;
        }
    }
`;
document.head.appendChild(printStyles);