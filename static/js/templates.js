       document.addEventListener('DOMContentLoaded', function() {
            // Menu navigation
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    menuItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Simulasi navigasi
                    const menuText = this.textContent.trim();
                    if (menuText.includes('Dashboard')) {
                        window.location.href = 'dashboard.html';
                    } else if (menuText.includes('Plugin')) {
                        window.location.href = 'plugin.html';
                    } else if (menuText.includes('Templates')) {
                        window.location.href = 'templates.html';
                    }
                });
            });
            
            // Category filter untuk templates
            const categoryChips = document.querySelectorAll('.category-chip');
            const templateCards = document.querySelectorAll('.template-card');
            const templatesContainer = document.getElementById('templates-container');
            
            // Function untuk filter template
            function filterTemplates(filterType) {
                let visibleCount = 0;
                
                templateCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    const isFree = categories.includes('free');
                    const isSocial = categories.includes('social');
                    const isBusiness = categories.includes('business');
                    const isPresentation = categories.includes('presentation');
                    const isMarketing = categories.includes('marketing');
                    const isPremium = categories.includes('premium');
                    
                    let shouldShow = false;
                    
                    switch(filterType) {
                        case 'all':
                            shouldShow = true;
                            break;
                        case 'free':
                            shouldShow = isFree;
                            break;
                        case 'social':
                            shouldShow = isSocial;
                            break;
                        case 'business':
                            shouldShow = isBusiness;
                            break;
                        case 'presentation':
                            shouldShow = isPresentation;
                            break;
                        case 'marketing':
                            shouldShow = isMarketing;
                            break;
                        case 'premium':
                            shouldShow = isPremium;
                            break;
                        default:
                            shouldShow = true;
                    }
                    
                    if (shouldShow) {
                        card.style.display = 'flex';
                        visibleCount++;
                        // Smooth transition
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Update counter di kategori aktif
                categoryChips.forEach(chip => {
                    if (chip.classList.contains('active')) {
                        const countElement = chip.querySelector('.category-count');
                        // Simulasi update count berdasarkan filter
                        const counts = {
                            'all': '842',
                            'free': '512',
                            'social': '186',
                            'business': '124',
                            'presentation': '89',
                            'marketing': '156'
                        };
                        if (counts[filterType]) {
                            countElement.textContent = counts[filterType];
                        }
                    }
                });
            }
            
            // Event listener untuk kategori filter
            categoryChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    categoryChips.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filterType = this.getAttribute('data-filter');
                    filterTemplates(filterType);
                });
            });
            
            // Use/Buy button functionality
            const useBtns = document.querySelectorAll('.btn-primary');
            useBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const card = this.closest('.template-card');
                    const templateName = card.querySelector('.template-title').textContent;
                    const isFree = card.querySelector('.badge-free');
                    
                    if (isFree) {
                        this.innerHTML = '<i class="fas fa-check"></i> Digunakan';
                        this.style.backgroundColor = '#666';
                        this.disabled = true;
                        
                        // Add notification
                        alert(`Template "${templateName}" berhasil digunakan!\nTemplate telah ditambahkan ke proyek Anda.`);
                    } else {
                        const price = card.querySelector('.template-price').textContent;
                        alert(`Anda akan membeli template: ${templateName}\nHarga: ${price}\n\nApakah Anda ingin melanjutkan?`);
                    }
                });
            });
            
            // Preview button functionality
            const previewBtns = document.querySelectorAll('.btn-preview');
            previewBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const templateName = this.closest('.template-card').querySelector('.template-title').textContent;
                    
                    // Create modal for preview
                    const modal = document.createElement('div');
                    modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.9);
                        z-index: 1000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                    `;
                    
                    modal.innerHTML = `
                        <div style="background: var(--card-bg); border-radius: var(--border-radius); max-width: 900px; width: 100%; max-height: 90vh; overflow: auto; position: relative;">
                            <div style="padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                                <h3 style="font-size: 1.5rem;">Preview: ${templateName}</h3>
                                <button id="close-modal" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
                            </div>
                            <div style="padding: 25px; text-align: center;">
                                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Template Preview" style="width: 100%; border-radius: 8px; max-height: 60vh; object-fit: contain;">
                                <p style="margin-top: 20px; color: var(--text-secondary);">Ini adalah preview dari template. Klik 'Gunakan' untuk mulai mengedit template ini.</p>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // Close modal functionality
                    document.getElementById('close-modal').addEventListener('click', function() {
                        document.body.removeChild(modal);
                    });
                    
                    // Close modal on background click
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal) {
                            document.body.removeChild(modal);
                        }
                    });
                });
            });
            
            // Quick preview button functionality
            const quickPreviewBtns = document.querySelectorAll('.btn-quick-preview');
            quickPreviewBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const templateName = this.closest('.template-card').querySelector('.template-title').textContent;
                    
                    // Show quick preview notification
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: var(--accent-primary);
                        color: white;
                        padding: 15px 25px;
                        border-radius: var(--border-radius);
                        z-index: 100;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                        animation: slideIn 0.3s ease;
                    `;
                    
                    notification.innerHTML = `
                        <i class="fas fa-eye"></i>
                        <span>Membuka preview: ${templateName}</span>
                    `;
                    
                    document.body.appendChild(notification);
                    
                    // Remove notification after 3 seconds
                    setTimeout(() => {
                        notification.style.animation = 'slideOut 0.3s ease';
                        setTimeout(() => {
                            if (notification.parentNode) {
                                document.body.removeChild(notification);
                            }
                        }, 300);
                    }, 3000);
                    
                    // Add CSS for animation
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes slideIn {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                        @keyframes slideOut {
                            from { transform: translateX(0); opacity: 1; }
                            to { transform: translateX(100%); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                });
            });
            
            // Search functionality
            const searchInput = document.querySelector('.search-box input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                templateCards.forEach(card => {
                    const title = card.querySelector('.template-title').textContent.toLowerCase();
                    const description = card.querySelector('.template-description').textContent.toLowerCase();
                    const author = card.querySelector('.template-author').textContent.toLowerCase();
                    
                    if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm) || author.includes(searchTerm)) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
            
            // Load more button functionality
            const loadMoreBtn = document.querySelector('.btn-load-more');
            loadMoreBtn.addEventListener('click', function() {
                alert('Menampilkan lebih banyak template...\n(Dalam implementasi nyata, ini akan memuat lebih banyak data dari server)');
                
                // Simulasi loading
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-arrow-down"></i> Tampilkan Lebih Banyak Template';
                    this.disabled = false;
                    alert('10 template tambahan berhasil dimuat!');
                }, 1500);
            });
            
            // Card hover effect
            templateCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // Recent items click functionality
            const recentItems = document.querySelectorAll('.recent-item');
            recentItems.forEach(item => {
                item.addEventListener('click', function() {
                    const templateName = this.querySelector('h4').textContent;
                    alert(`Membuka template: ${templateName}\n\nTemplate ini akan dibuka di editor EzyDraw.`);
                });
            });
            
            // Upload template button
            const uploadBtn = document.querySelector('.btn-contributor');
            uploadBtn.addEventListener('click', function() {
                alert('Membuka halaman upload template...\n\nDi sini Anda dapat mengupload template Anda untuk dibagikan ke komunitas EzyDraw.');
            });
            
            // Create new design button
            const newDesignBtn = document.querySelector('.btn-new-design');
            newDesignBtn.addEventListener('click', function() {
                alert('Membuka editor desain baru...\n\nAnda akan diarahkan ke editor EzyDraw untuk mulai membuat desain dari awal.');
            });
            
            // Initialize dengan filter "all"
            filterTemplates('all');
        });