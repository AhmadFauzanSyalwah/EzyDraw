        document.addEventListener('DOMContentLoaded', function() {
            // Menu navigation
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    menuItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Category filter dengan transisi yang smooth
            const categoryChips = document.querySelectorAll('.category-chip');
            const pluginCards = document.querySelectorAll('.plugin-card');
            const pluginsContainer = document.getElementById('plugins-container');
            
            // Function untuk filter plugin
            function filterPlugins(filterType) {
                let visibleCount = 0;
                
                pluginCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    const isFree = categories.includes('free');
                    const isPremium = categories.includes('premium');
                    const isAI = categories.includes('ai');
                    const isDesign = categories.includes('design');
                    const isProductivity = categories.includes('productivity');
                    
                    let shouldShow = false;
                    
                    switch(filterType) {
                        case 'all':
                            shouldShow = true;
                            break;
                        case 'free':
                            shouldShow = isFree;
                            break;
                        case 'premium':
                            shouldShow = isPremium;
                            break;
                        case 'ai':
                            shouldShow = isAI;
                            break;
                        case 'design':
                            shouldShow = isDesign;
                            break;
                        case 'productivity':
                            shouldShow = isProductivity;
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
                            'all': '156',
                            'free': '124',
                            'premium': '32',
                            'ai': '24',
                            'design': '58',
                            'productivity': '42'
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
                    filterPlugins(filterType);
                });
            });
            
            // Install/Buy button functionality
            const installBtns = document.querySelectorAll('.btn-primary');
            installBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const card = this.closest('.plugin-card');
                    const pluginName = card.querySelector('.plugin-title').textContent;
                    const isFree = card.querySelector('.badge-free');
                    
                    if (isFree) {
                        this.innerHTML = '<i class="fas fa-check"></i> Terinstall';
                        this.style.backgroundColor = '#666';
                        this.disabled = true;
                        
                        // Add to installed list
                        const installedList = document.querySelector('.installed-list');
                        const newItem = document.createElement('div');
                        newItem.className = 'installed-item';
                        newItem.innerHTML = `
                            <i class="fas fa-plug"></i>
                            <div class="installed-info">
                                <h4>${pluginName}</h4>
                                <p>Baru saja diinstall</p>
                            </div>
                        `;
                        installedList.prepend(newItem);
                        
                        alert(`Plugin "${pluginName}" berhasil diinstall!`);
                    } else {
                        alert(`Anda akan membeli plugin: ${pluginName}\nHarga: ${card.querySelector('.plugin-price').textContent}`);
                    }
                });
            });
            
            // Preview button functionality
            const previewBtns = document.querySelectorAll('.btn-preview');
            previewBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const pluginName = this.closest('.plugin-card').querySelector('.plugin-title').textContent;
                    alert(`Preview untuk plugin: ${pluginName}\n(Fitur preview akan ditampilkan di sini)`);
                });
            });
            
            // Search functionality
            const searchInput = document.querySelector('.search-box input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                pluginCards.forEach(card => {
                    const title = card.querySelector('.plugin-title').textContent.toLowerCase();
                    const description = card.querySelector('.plugin-description').textContent.toLowerCase();
                    const tags = Array.from(card.querySelectorAll('.plugin-tag')).map(tag => tag.textContent.toLowerCase());
                    
                    if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
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
                alert('Menampilkan lebih banyak plugin...\n(Dalam implementasi nyata, ini akan memuat lebih banyak data dari server)');
                
                // Simulasi loading
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-arrow-down"></i> Tampilkan Lebih Banyak Plugin';
                    this.disabled = false;
                    alert('10 plugin tambahan berhasil dimuat!');
                }, 1500);
            });
            
            // Card hover effect
            pluginCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // FITUR BARU: Toggle untuk menyembunyikan/menampilkan rating
            const toggleRating = document.getElementById('toggle-rating');
            const allRatings = document.querySelectorAll('.plugin-rating');
            
            // Fungsi untuk mengontrol tampilan rating
            function toggleRatingDisplay(showRating) {
                allRatings.forEach(rating => {
                    if (showRating) {
                        rating.classList.remove('rating-hidden');
                    } else {
                        rating.classList.add('rating-hidden');
                    }
                });
                
                // Simpan preferensi ke localStorage
                localStorage.setItem('showRating', showRating);
            }
            
            // Event listener untuk toggle rating
            if (toggleRating) {
                // Cek preferensi tersimpan
                const savedPreference = localStorage.getItem('showRating');
                const showRating = savedPreference === null ? true : savedPreference === 'true';
                
                // Set toggle sesuai preferensi
                toggleRating.checked = showRating;
                toggleRatingDisplay(showRating);
                
                toggleRating.addEventListener('change', function() {
                    toggleRatingDisplay(this.checked);
                });
            }
            
            // Initialize dengan filter "all"
            filterPlugins('all');
        });