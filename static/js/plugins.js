        document.addEventListener('DOMContentLoaded', function() {
            // ==================== NAVIGASI & MENU AKTIF ====================
            const currentPage = window.location.pathname.split('/').pop();
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'plugins.html')) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // ==================== SISTEM FILTER PLUGIN ====================
            const categoryChips = document.querySelectorAll('.category-chip');
            const pluginsGrid = document.getElementById('plugins-container');
            let pluginCards = document.querySelectorAll('.plugin-card');
            
            function filterPlugins(filterType) {
                let visibleCount = 0;
                
                pluginCards.forEach((card, index) => {
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
                    
                    card.classList.remove('hidden', 'visible');
                    card.style.cssText = '';
                    
                    if (shouldShow) {
                        card.classList.add('visible');
                        visibleCount++;
                        
                        // Animasi fade in
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50 + (index * 50));
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });
                
                // Update counter di kategori
                updateFilterCount(filterType, visibleCount);
                
                // Notifikasi
                const filterNames = {
                    'all': 'Semua Plugin',
                    'free': 'Plugin Gratis',
                    'premium': 'Plugin Premium',
                    'ai': 'AI Tools',
                    'design': 'Plugin Desain',
                    'productivity': 'Plugin Produktivitas'
                };
                
                showNotification('info', 'Filter Aktif', `Menampilkan ${visibleCount} plugin: ${filterNames[filterType] || 'Semua Plugin'}`);
            }
            
            function updateFilterCount(filterType, count) {
                categoryChips.forEach(chip => {
                    if (chip.getAttribute('data-filter') === filterType) {
                        const countElement = chip.querySelector('.category-count');
                        if (countElement) {
                            countElement.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                countElement.textContent = count;
                                countElement.style.transform = 'scale(1)';
                            }, 150);
                        }
                    }
                });
            }
            
            categoryChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    categoryChips.forEach(c => {
                        if (c !== this && c.classList.contains('active')) {
                            c.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                c.style.transform = '';
                            }, 300);
                        }
                    });
                    
                    categoryChips.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    this.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 300);
                    
                    const filterType = this.getAttribute('data-filter');
                    filterPlugins(filterType);
                });
            });
            
            // ==================== SISTEM PENCARIAN ====================
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                if (searchTerm === '') {
                    const activeFilter = document.querySelector('.category-chip.active');
                    if (activeFilter) {
                        filterPlugins(activeFilter.getAttribute('data-filter'));
                    } else {
                        filterPlugins('all');
                    }
                    return;
                }
                
                let foundCount = 0;
                pluginCards = document.querySelectorAll('.plugin-card');
                
                pluginCards.forEach((card, index) => {
                    const title = card.querySelector('.plugin-title').textContent.toLowerCase();
                    const author = card.querySelector('.plugin-author').textContent.toLowerCase();
                    const description = card.querySelector('.plugin-description').textContent.toLowerCase();
                    const tags = Array.from(card.querySelectorAll('.plugin-tag')).map(tag => tag.textContent.toLowerCase());
                    
                    const matchesSearch = title.includes(searchTerm) || 
                                        author.includes(searchTerm) || 
                                        description.includes(searchTerm) ||
                                        tags.some(tag => tag.includes(searchTerm));
                    
                    card.classList.remove('hidden', 'visible');
                    card.style.cssText = '';
                    
                    if (matchesSearch) {
                        card.classList.add('visible');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        card.style.order = foundCount;
                        foundCount++;
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50 + (index * 20));
                    } else {
                        card.classList.add('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                    }
                });
                
                if (searchTerm) {
                    showNotification('info', 'Pencarian', `Menampilkan ${foundCount} hasil untuk: "${searchTerm}"`);
                }
            });
            
            // ==================== TOGGLE RATING ====================
            const toggleRating = document.getElementById('toggle-rating');
            toggleRating.addEventListener('change', function() {
                const ratingContainers = document.querySelectorAll('.plugin-rating-container');
                
                if (this.checked) {
                    // Tampilkan rating
                    ratingContainers.forEach(container => {
                        container.style.display = 'flex';
                    });
                    showNotification('info', 'Rating Ditampilkan', 'Rating plugin sekarang ditampilkan');
                } else {
                    // Sembunyikan rating
                    ratingContainers.forEach(container => {
                        container.style.display = 'none';
                    });
                    showNotification('info', 'Rating Disembunyikan', 'Rating plugin sekarang disembunyikan');
                }
            });
            
            // ==================== TOGGLE DARK MODE ====================
            const toggleDarkMode = document.getElementById('toggle-dark-mode');
            toggleDarkMode.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.style.setProperty('--card-bg', '#1A0A33');
                    showNotification('info', 'Mode Gelap', 'Mode gelap plugin diaktifkan');
                } else {
                    document.documentElement.style.setProperty('--card-bg', '#241242');
                    showNotification('info', 'Mode Terang', 'Mode terang plugin diaktifkan');
                }
            });
            
            // ==================== TOGGLE NOTIFICATIONS ====================
            const toggleNotifications = document.getElementById('toggle-notifications');
            toggleNotifications.addEventListener('change', function() {
                if (this.checked) {
                    showNotification('info', 'Notifikasi', 'Notifikasi plugin diaktifkan');
                } else {
                    showNotification('warning', 'Notifikasi', 'Notifikasi plugin dinonaktifkan');
                }
            });
            
            // ==================== INSTALLED PLUGIN ACTIONS ====================
            document.querySelectorAll('.installed-action-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const action = this.querySelector('i').className;
                    const pluginName = this.closest('.installed-item').querySelector('h4').textContent;
                    
                    if (action.includes('fa-trash')) {
                        if (confirm(`Anda yakin ingin menghapus plugin "${pluginName}"?`)) {
                            showNotification('success', 'Plugin Dihapus', `"${pluginName}" berhasil dihapus`);
                            this.closest('.installed-item').style.opacity = '0';
                            this.closest('.installed-item').style.transform = 'translateX(100%)';
                            setTimeout(() => {
                                this.closest('.installed-item').remove();
                            }, 300);
                        }
                    } else if (action.includes('fa-sync-alt')) {
                        showNotification('info', 'Memperbarui Plugin', `Memperbarui "${pluginName}"...`);
                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                        this.disabled = true;
                        
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-sync-alt"></i>';
                            this.disabled = false;
                            showNotification('success', 'Berhasil Diupdate', `"${pluginName}" berhasil diperbarui ke versi terbaru`);
                        }, 1500);
                    }
                });
            });
            
            // ==================== PREVIEW MODAL ====================
            const previewModal = document.getElementById('preview-modal');
            const closePreviewModalBtn = document.getElementById('close-preview-modal');
            
            function openPreviewModal(pluginId) {
                const pluginCard = document.querySelector(`.plugin-card[data-id="${pluginId}"]`);
                if (!pluginCard) return;
                
                const title = pluginCard.querySelector('.plugin-title').textContent;
                const author = pluginCard.querySelector('.plugin-author').innerHTML;
                const description = pluginCard.querySelector('.plugin-description').textContent;
                const rating = pluginCard.querySelector('.rating-value').textContent;
                const downloads = pluginCard.querySelector('.plugin-downloads').textContent;
                const priceElement = pluginCard.querySelector('.plugin-price');
                const price = priceElement.textContent;
                const isFree = priceElement.classList.contains('price-free');
                const tags = Array.from(pluginCard.querySelectorAll('.plugin-tag')).map(tag => tag.textContent);
                
                const modalBody = document.getElementById('preview-modal-body');
                modalBody.innerHTML = `
                    <div style="padding: 30px;">
                        <div style="display: flex; align-items: flex-start; gap: 30px; margin-bottom: 30px;">
                            <div style="flex: 1;">
                                <h2 style="font-size: 2rem; margin-bottom: 10px; color: var(--text-primary);">${title}</h2>
                                <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 20px;">${author}</p>
                                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                                    ${pluginCard.querySelector('.plugin-badge').innerHTML}
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 2.5rem; font-weight: 700; color: ${isFree ? 'var(--accent-primary)' : 'var(--accent-secondary)'};">
                                    ${price}
                                </div>
                                <button class="btn-action btn-primary" style="margin-top: 10px; padding: 12px 30px; font-size: 1.1rem;" data-install-id="${pluginId}">
                                    <i class="fas ${isFree ? 'fa-download' : 'fa-shopping-cart'}"></i>
                                    ${isFree ? 'Install Sekarang' : 'Beli Sekarang'}
                                </button>
                            </div>
                        </div>
                        
                        <div style="background-color: rgba(255,255,255,0.03); border-radius: var(--border-radius); padding: 20px; margin-bottom: 30px;">
                            <h3 style="font-size: 1.3rem; margin-bottom: 15px; color: var(--text-primary);">Deskripsi Plugin</h3>
                            <p style="color: var(--text-secondary); line-height: 1.6; font-size: 1rem;">${description}</p>
                        </div>
                        
                        <div style="margin-bottom: 30px;">
                            <h3 style="font-size: 1.3rem; margin-bottom: 15px; color: var(--text-primary);">Fitur Utama</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                ${tags.map(tag => `<span class="plugin-tag" style="font-size: 0.9rem;">${tag}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
                            <div style="background-color: rgba(255,255,255,0.03); border-radius: var(--border-radius); padding: 20px; text-align: center;">
                                <div style="font-size: 1.8rem; color: var(--accent-secondary); margin-bottom: 5px;">
                                    <i class="fas fa-star"></i>
                                </div>
                                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 5px;">${rating}/5.0</div>
                                <div style="color: var(--text-secondary);">Rating</div>
                            </div>
                            <div style="background-color: rgba(255,255,255,0.03); border-radius: var(--border-radius); padding: 20px; text-align: center;">
                                <div style="font-size: 1.8rem; color: var(--accent-primary); margin-bottom: 5px;">
                                    <i class="fas fa-download"></i>
                                </div>
                                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 5px;">${downloads.replace('+', '')}</div>
                                <div style="color: var(--text-secondary);">Total Download</div>
                            </div>
                        </div>
                        
                        <div style="background-color: rgba(255,255,255,0.03); border-radius: var(--border-radius); padding: 20px;">
                            <h3 style="font-size: 1.3rem; margin-bottom: 15px; color: var(--text-primary);">Persyaratan Sistem</h3>
                            <div style="color: var(--text-secondary); line-height: 1.6;">
                                <p><i class="fas fa-check-circle" style="color: var(--accent-primary); margin-right: 10px;"></i> EzyDraw v2.0 atau lebih baru</p>
                                <p><i class="fas fa-check-circle" style="color: var(--accent-primary); margin-right: 10px;"></i> RAM minimal 4GB</p>
                                <p><i class="fas fa-check-circle" style="color: var(--accent-primary); margin-right: 10px;"></i> Koneksi internet untuk aktivasi</p>
                                <p><i class="fas fa-check-circle" style="color: var(--accent-primary); margin-right: 10px;"></i> Sistem operasi Windows 10+/macOS 10.14+/Linux</p>
                            </div>
                        </div>
                    </div>
                `;
                
                // Tambahkan event listener untuk tombol install di modal
                const installBtn = modalBody.querySelector(`[data-install-id="${pluginId}"]`);
                if (installBtn) {
                    installBtn.addEventListener('click', function() {
                        handlePluginInstall(pluginId, title, isFree, price);
                    });
                }
                
                // Tampilkan modal
                previewModal.style.display = 'flex';
                setTimeout(() => {
                    previewModal.style.opacity = '1';
                }, 10);
            }
            
            // Event listener untuk tombol preview
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn-preview')) {
                    const btn = e.target.closest('.btn-preview');
                    const pluginId = btn.getAttribute('data-plugin-id');
                    openPreviewModal(pluginId);
                }
            });
            
            // Tutup modal
            closePreviewModalBtn.addEventListener('click', function() {
                previewModal.style.opacity = '0';
                setTimeout(() => {
                    previewModal.style.display = 'none';
                }, 300);
            });
            
            previewModal.addEventListener('click', function(e) {
                if (e.target === previewModal) {
                    previewModal.style.opacity = '0';
                    setTimeout(() => {
                        previewModal.style.display = 'none';
                    }, 300);
                }
            });
            
            // ==================== INSTALL/BELI PLUGIN ====================
            function handlePluginInstall(pluginId, pluginName, isFree, price) {
                const pluginCard = document.querySelector(`.plugin-card[data-id="${pluginId}"]`);
                
                if (isFree) {
                    // Install plugin gratis
                    let currentDownloads = parseInt(pluginCard.querySelector('.plugin-downloads').textContent.replace(/,/g, '').replace('+', ''));
                    currentDownloads++;
                    
                    // Update tampilan di card
                    const downloadsElement = pluginCard.querySelector('.plugin-downloads');
                    downloadsElement.innerHTML = `<i class="fas fa-download"></i> ${currentDownloads.toLocaleString()}+`;
                    
                    showNotification('success', 'Install Berhasil', `"${pluginName}" berhasil diinstall!`);
                    
                    // Tutup modal setelah install
                    previewModal.style.opacity = '0';
                    setTimeout(() => {
                        previewModal.style.display = 'none';
                    }, 300);
                } else {
                    // Plugin premium - tampilkan konfirmasi pembelian
                    if (confirm(`Anda akan membeli plugin: ${pluginName}\nHarga: ${price}\n\nApakah Anda ingin melanjutkan?`)) {
                        let currentDownloads = parseInt(pluginCard.querySelector('.plugin-downloads').textContent.replace(/,/g, '').replace('+', ''));
                        currentDownloads++;
                        
                        // Update tampilan di card
                        const downloadsElement = pluginCard.querySelector('.plugin-downloads');
                        downloadsElement.innerHTML = `<i class="fas fa-download"></i> ${currentDownloads.toLocaleString()}+`;
                        
                        showNotification('success', 'Pembelian Berhasil', `"${pluginName}" berhasil dibeli dan diinstall!`);
                        
                        // Tutup modal
                        previewModal.style.opacity = '0';
                        setTimeout(() => {
                            previewModal.style.display = 'none';
                        }, 300);
                    }
                }
            }
            
            // Event listener untuk tombol install/beli di card
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn-primary') && !e.target.closest('.btn-preview')) {
                    const btn = e.target.closest('.btn-primary');
                    const pluginId = btn.getAttribute('data-plugin-id');
                    const pluginCard = document.querySelector(`.plugin-card[data-id="${pluginId}"]`);
                    const pluginName = pluginCard.querySelector('.plugin-title').textContent;
                    const isFree = pluginCard.querySelector('.badge-free');
                    const price = pluginCard.querySelector('.plugin-price').textContent;
                    
                    handlePluginInstall(pluginId, pluginName, isFree, price);
                }
            });
            
            // ==================== LOAD MORE BUTTON ====================
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', function() {
                    showNotification('info', 'Memuat Plugin', 'Menampilkan lebih banyak plugin...');
                    
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-arrow-down"></i> Tampilkan Lebih Banyak Plugin';
                        this.disabled = false;
                        showNotification('success', 'Plugin Dimuat', '4 plugin tambahan berhasil dimuat!');
                    }, 1500);
                });
            }
            
            // ==================== CONTRIBUTOR MODAL ====================
            const contributorBtn = document.getElementById('open-contributor-modal');
            if (contributorBtn) {
                contributorBtn.addEventListener('click', function() {
                    showNotification('info', 'Developer Portal', 'Mengarahkan ke portal developer...');
                    setTimeout(() => {
                        window.open('https://developers.ezydraw.com', '_blank');
                    }, 500);
                });
            }
            
            // ==================== SIDEBAR CLOSE BUTTON ====================
            const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
            const rightSidebar = document.querySelector('.right-sidebar');
            
            if (sidebarCloseBtn && window.innerWidth < 1200) {
                sidebarCloseBtn.style.display = 'block';
                sidebarCloseBtn.addEventListener('click', function() {
                    rightSidebar.style.transform = 'translateX(100%)';
                    rightSidebar.style.opacity = '0';
                    setTimeout(() => {
                        rightSidebar.style.display = 'none';
                        showNotification('info', 'Sidebar Ditutup', 'Sidebar kanan telah ditutup');
                    }, 300);
                });
            }
            
            // ==================== SISTEM NOTIFIKASI ====================
            function showNotification(type, title, message) {
                // Cek apakah notifikasi diaktifkan
                if (toggleNotifications && !toggleNotifications.checked && type !== 'warning') {
                    return;
                }
                
                const notificationContainer = document.getElementById('notification-container');
                
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                
                const icon = type === 'success' ? 'fa-check' : 
                           type === 'info' ? 'fa-info-circle' : 
                           'fa-exclamation-triangle';
                
                notification.innerHTML = `
                    <div class="notification-icon" style="color: ${type === 'success' ? 'var(--accent-primary)' : type === 'info' ? 'var(--accent-blue)' : 'var(--accent-secondary)'}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="notification-content">
                        <h4>${title}</h4>
                        <p>${message}</p>
                    </div>
                `;
                
                notificationContainer.appendChild(notification);
                
                // Hapus notifikasi setelah 5 detik
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.animation = 'fadeOut 0.5s forwards';
                        setTimeout(() => {
                            if (notification.parentNode) {
                                notificationContainer.removeChild(notification);
                            }
                        }, 500);
                    }
                }, 5000);
            }
            
            // ==================== HOVER EFFECTS ====================
            document.addEventListener('mouseover', function(e) {
                if (e.target.closest('.plugin-card')) {
                    const card = e.target.closest('.plugin-card');
                    if (!card.classList.contains('hidden')) {
                        card.style.transform = 'translateY(-5px) scale(1.02)';
                    }
                }
                
                if (e.target.closest('.stat-card')) {
                    const card = e.target.closest('.stat-card');
                    card.style.transform = 'translateY(-3px)';
                }
            });
            
            document.addEventListener('mouseout', function(e) {
                if (e.target.closest('.plugin-card')) {
                    const card = e.target.closest('.plugin-card');
                    if (!card.classList.contains('hidden')) {
                        card.style.transform = 'translateY(0) scale(1)';
                    }
                }
                
                if (e.target.closest('.stat-card')) {
                    const card = e.target.closest('.stat-card');
                    card.style.transform = 'translateY(0)';
                }
            });
            
            // ==================== INISIALISASI ====================
            filterPlugins('all');
            
            // Re-fetch plugin cards setelah filter diinisialisasi
            setTimeout(() => {
                pluginCards = document.querySelectorAll('.plugin-card');
            }, 100);
        });