        document.addEventListener('DOMContentLoaded', function() {
            // ==================== VARIABLES ====================
            let likedTemplates = JSON.parse(localStorage.getItem('likedTemplates')) || [];
            let savedTemplates = JSON.parse(localStorage.getItem('savedTemplates')) || [];
            
            // ==================== NAVIGASI & MENU AKTIF ====================
            const currentPage = window.location.pathname.split('/').pop() || 'templates.html';
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // ==================== BUTTON NEW DESIGN ====================
            const btnNewDesign = document.querySelector('.btn-new-design');
            if (btnNewDesign) {
                btnNewDesign.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('info', 'Membuka Editor', 'Membuka editor desain baru...');
                    setTimeout(() => {
                        window.location.href = 'design.html';
                    }, 500);
                });
            }
            
            // ==================== SISTEM FILTER TEMPLATE ====================
            const categoryChips = document.querySelectorAll('.category-chip');
            const templatesGrid = document.getElementById('templates-container');
            let templateCards = document.querySelectorAll('.template-card');
            
            function filterTemplates(filterType) {
                let visibleCount = 0;
                
                templateCards.forEach((card, index) => {
                    card.style.setProperty('--index', index);
                    
                    const categories = card.getAttribute('data-category');
                    const isFree = categories.includes('free');
                    const isPremium = categories.includes('premium');
                    const isSocial = categories.includes('social');
                    const isBusiness = categories.includes('business');
                    const isPresentation = categories.includes('presentation');
                    const isMarketing = categories.includes('marketing');
                    
                    let shouldShow = false;
                    
                    switch(filterType) {
                        case 'all':
                            shouldShow = true;
                            break;
                        case 'free':
                            shouldShow = isFree;
                            break;
                        case 'premium':
                            shouldShow = isPremium || !isFree;
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
                        default:
                            shouldShow = true;
                    }
                    
                    if (shouldShow) {
                        card.classList.remove('filter-hidden');
                        card.classList.add('filter-visible');
                        visibleCount++;
                    } else {
                        card.classList.remove('filter-visible');
                        card.classList.add('filter-hidden');
                    }
                });
                
                // Update counter di kategori
                updateFilterCount(filterType, visibleCount);
                
                // Notifikasi
                const filterNames = {
                    'all': 'Semua Template',
                    'free': 'Template Gratis',
                    'premium': 'Template Premium',
                    'social': 'Media Sosial',
                    'business': 'Bisnis',
                    'presentation': 'Presentasi',
                    'marketing': 'Marketing'
                };
                
                showNotification('info', 'Filter Aktif', `Menampilkan ${visibleCount} template: ${filterNames[filterType] || 'Semua Template'}`);
            }
            
            function updateFilterCount(filterType, count) {
                categoryChips.forEach(chip => {
                    if (chip.getAttribute('data-filter') === filterType) {
                        const countElement = chip.querySelector('.category-count');
                        if (countElement) {
                            countElement.style.transform = 'scale(1.3)';
                            countElement.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
                            setTimeout(() => {
                                countElement.textContent = count;
                                countElement.style.transform = 'scale(1)';
                                countElement.style.backgroundColor = '';
                            }, 200);
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
                    this.style.transform = 'scale(1.08)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 300);
                    
                    const filterType = this.getAttribute('data-filter');
                    filterTemplates(filterType);
                });
            });
            
            // ==================== SISTEM PENCARIAN ====================
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase().trim();
                    
                    if (searchTerm === '') {
                        const activeFilter = document.querySelector('.category-chip.active');
                        if (activeFilter) {
                            filterTemplates(activeFilter.getAttribute('data-filter'));
                        } else {
                            filterTemplates('all');
                        }
                        return;
                    }
                    
                    let foundCount = 0;
                    templateCards = document.querySelectorAll('.template-card');
                    
                    templateCards.forEach((card, index) => {
                        card.style.setProperty('--index', index);
                        
                        const title = card.querySelector('.template-title').textContent.toLowerCase();
                        const author = card.querySelector('.template-author').textContent.toLowerCase();
                        const tags = Array.from(card.querySelectorAll('.template-tag')).map(tag => tag.textContent.toLowerCase());
                        
                        const matchesSearch = title.includes(searchTerm) || 
                                            author.includes(searchTerm) ||
                                            tags.some(tag => tag.includes(searchTerm));
                        
                        if (matchesSearch) {
                            card.classList.remove('filter-hidden');
                            card.classList.add('filter-visible');
                            foundCount++;
                        } else {
                            card.classList.remove('filter-visible');
                            card.classList.add('filter-hidden');
                        }
                    });
                    
                    if (searchTerm) {
                        showNotification('info', 'Pencarian', `Menampilkan ${foundCount} hasil untuk: "${searchTerm}"`);
                    }
                });
            }
            
            // ==================== SISTEM LIKE & SAVE ====================
            function toggleLike(templateId) {
                const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                const likeElement = templateCard.querySelector('.template-stat.like');
                const likeIcon = likeElement.querySelector('i');
                const likeCount = likeElement.querySelector('span');
                
                if (likedTemplates.includes(templateId)) {
                    // Unlike
                    likedTemplates = likedTemplates.filter(id => id !== templateId);
                    likeIcon.classList.remove('fas', 'fa-heart');
                    likeIcon.classList.add('far', 'fa-heart');
                    likeElement.classList.remove('active');
                    
                    let count = parseInt(likeCount.textContent);
                    likeCount.textContent = Math.max(0, count - 1);
                    
                    showNotification('info', 'Like Dihapus', 'Template dihapus dari favorit');
                } else {
                    // Like
                    likedTemplates.push(templateId);
                    likeIcon.classList.remove('far', 'fa-heart');
                    likeIcon.classList.add('fas', 'fa-heart');
                    likeElement.classList.add('active');
                    
                    let count = parseInt(likeCount.textContent);
                    likeCount.textContent = count + 1;
                    
                    // Animasi like
                    likeElement.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        likeElement.style.transform = 'scale(1)';
                    }, 200);
                    
                    showNotification('success', 'Disukai!', 'Template ditambahkan ke favorit');
                }
                
                // Simpan ke localStorage
                localStorage.setItem('likedTemplates', JSON.stringify(likedTemplates));
            }
            
            function toggleSave(templateId) {
                const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                const saveElement = templateCard.querySelector('.template-stat.save');
                const saveIcon = saveElement.querySelector('i');
                const saveCount = saveElement.querySelector('span');
                
                if (savedTemplates.includes(templateId)) {
                    // Unsave
                    savedTemplates = savedTemplates.filter(id => id !== templateId);
                    saveIcon.classList.remove('fas', 'fa-bookmark');
                    saveIcon.classList.add('far', 'fa-bookmark');
                    saveElement.classList.remove('active');
                    
                    let count = parseInt(saveCount.textContent);
                    saveCount.textContent = Math.max(0, count - 1);
                    
                    showNotification('info', 'Disimpan Dihapus', 'Template dihapus dari koleksi');
                } else {
                    // Save
                    savedTemplates.push(templateId);
                    saveIcon.classList.remove('far', 'fa-bookmark');
                    saveIcon.classList.add('fas', 'fa-bookmark');
                    saveElement.classList.add('active');
                    
                    let count = parseInt(saveCount.textContent);
                    saveCount.textContent = count + 1;
                    
                    // Animasi save
                    saveElement.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        saveElement.style.transform = 'scale(1)';
                    }, 200);
                    
                    showNotification('success', 'Disimpan!', 'Template ditambahkan ke koleksi Anda');
                }
                
                // Simpan ke localStorage
                localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
            }
            
            // Event listener untuk like & save
            document.addEventListener('click', function(e) {
                if (e.target.closest('.template-stat.like')) {
                    const likeElement = e.target.closest('.template-stat.like');
                    const templateId = likeElement.getAttribute('data-template-id');
                    toggleLike(templateId);
                }
                
                if (e.target.closest('.template-stat.save')) {
                    const saveElement = e.target.closest('.template-stat.save');
                    const templateId = saveElement.getAttribute('data-template-id');
                    toggleSave(templateId);
                }
            });
            
            // ==================== QUICK PREVIEW BUTTONS ====================
            document.querySelectorAll('.btn-quick-preview').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const templateId = this.getAttribute('data-template-id');
                    const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                    const templateTitle = templateCard.querySelector('.template-title').textContent;
                    
                    showNotification('info', 'Quick Preview', `Membuka preview cepat untuk: ${templateTitle}`);
                    
                    // Simulasi modal preview cepat
                    const previewModal = document.createElement('div');
                    previewModal.className = 'preview-modal-overlay';
                    previewModal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.9);
                        z-index: 9998;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    `;
                    
                    const previewImg = templateCard.querySelector('.template-preview-img').src;
                    
                    previewModal.innerHTML = `
                        <div style="position: relative; max-width: 90%; max-height: 90%;">
                            <img src="${previewImg}" alt="Preview" style="width: 100%; height: auto; border-radius: var(--border-radius);">
                            <button class="close-quick-preview" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); border: none; color: white; font-size: 24px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">×</button>
                        </div>
                    `;
                    
                    document.body.appendChild(previewModal);
                    
                    setTimeout(() => {
                        previewModal.style.opacity = '1';
                    }, 10);
                    
                    // Close quick preview
                    const closeBtn = previewModal.querySelector('.close-quick-preview');
                    closeBtn.addEventListener('click', function() {
                        previewModal.style.opacity = '0';
                        setTimeout(() => {
                            if (previewModal.parentNode) {
                                previewModal.parentNode.removeChild(previewModal);
                            }
                        }, 300);
                    });
                    
                    previewModal.addEventListener('click', function(e) {
                        if (e.target === previewModal) {
                            previewModal.style.opacity = '0';
                            setTimeout(() => {
                                if (previewModal.parentNode) {
                                    previewModal.parentNode.removeChild(previewModal);
                                }
                            }, 300);
                        }
                    });
                });
            });
            
            // ==================== PREVIEW MODAL (DETAILED) ====================
            const previewModal = document.getElementById('preview-modal');
            const closePreviewModalBtn = document.getElementById('close-preview-modal');
            
            function openPreviewModal(templateId) {
                const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                if (!templateCard) return;
                
                const title = templateCard.querySelector('.template-title').textContent;
                const author = templateCard.querySelector('.template-author').innerHTML;
                const previewImg = templateCard.querySelector('.template-preview-img').src;
                const priceElement = templateCard.querySelector('.template-price');
                const price = priceElement.textContent;
                const isFree = priceElement.classList.contains('price-free');
                const tags = Array.from(templateCard.querySelectorAll('.template-tag')).map(tag => tag.textContent);
                const badges = templateCard.querySelector('.template-badge-corner').innerHTML;
                
                const likeElement = templateCard.querySelector('.template-stat.like');
                const likeCount = likeElement.querySelector('span').textContent;
                const isLiked = likedTemplates.includes(templateId);
                
                const saveElement = templateCard.querySelector('.template-stat.save');
                const saveCount = saveElement.querySelector('span').textContent;
                const isSaved = savedTemplates.includes(templateId);
                
                const modalBody = document.getElementById('preview-modal-body');
                modalBody.innerHTML = `
                    <div class="preview-modal-header">
                        <h3>Detail Template</h3>
                    </div>
                    <div class="preview-modal-body">
                        <div class="preview-image-container">
                            <img src="${previewImg}" alt="${title}" class="preview-image">
                        </div>
                        <div class="preview-info-container">
                            <h2 class="preview-title">${title}</h2>
                            <p class="preview-author">${author}</p>
                            
                            <div class="preview-stats">
                                <div class="preview-stat">
                                    <i class="fas fa-heart"></i>
                                    <div class="preview-stat-value">${likeCount}</div>
                                    <div class="preview-stat-label">Likes</div>
                                </div>
                                <div class="preview-stat">
                                    <i class="fas fa-bookmark"></i>
                                    <div class="preview-stat-value">${saveCount}</div>
                                    <div class="preview-stat-label">Saved</div>
                                </div>
                                <div class="preview-stat">
                                    <i class="fas fa-download"></i>
                                    <div class="preview-stat-value">${Math.floor(Math.random() * 5000) + 1000}</div>
                                    <div class="preview-stat-label">Downloads</div>
                                </div>
                            </div>
                            
                            <div class="preview-actions">
                                <button class="preview-action-btn like ${isLiked ? 'active' : ''}" id="modal-like-btn" data-template-id="${templateId}">
                                    <i class="fas fa-heart"></i>
                                    ${isLiked ? 'Liked' : 'Like'}
                                </button>
                                <button class="preview-action-btn save ${isSaved ? 'active' : ''}" id="modal-save-btn" data-template-id="${templateId}">
                                    <i class="fas fa-bookmark"></i>
                                    ${isSaved ? 'Saved' : 'Save'}
                                </button>
                            </div>
                            
                            <div class="preview-tags">
                                ${tags.map(tag => `<span class="preview-tag">${tag}</span>`).join('')}
                            </div>
                            
                            <div class="preview-details">
                                <div class="preview-detail-item">
                                    <i class="fas fa-file-archive"></i>
                                    <span>Format: PSD, AI, PDF</span>
                                </div>
                                <div class="preview-detail-item">
                                    <i class="fas fa-ruler-combined"></i>
                                    <span>Resolusi: 300 DPI</span>
                                </div>
                                <div class="preview-detail-item">
                                    <i class="fas fa-paint-brush"></i>
                                    <span>Fully Editable</span>
                                </div>
                                <div class="preview-detail-item">
                                    <i class="fas fa-sync-alt"></i>
                                    <span>Update Terakhir: 2 hari lalu</span>
                                </div>
                            </div>
                            
                            <div class="preview-price ${isFree ? 'free' : ''}">
                                ${price}
                            </div>
                            
                            <div class="preview-actions">
                                <button class="preview-action-btn download" id="modal-download-btn" data-template-id="${templateId}">
                                    <i class="fas fa-download"></i>
                                    ${isFree ? 'Download Gratis' : 'Beli Sekarang'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Tambahkan event listener untuk tombol di modal
                const modalLikeBtn = modalBody.querySelector('#modal-like-btn');
                if (modalLikeBtn) {
                    modalLikeBtn.addEventListener('click', function() {
                        const templateId = this.getAttribute('data-template-id');
                        toggleLike(templateId);
                        
                        // Update tampilan modal
                        if (likedTemplates.includes(templateId)) {
                            this.classList.add('active');
                            this.innerHTML = '<i class="fas fa-heart"></i> Liked';
                        } else {
                            this.classList.remove('active');
                            this.innerHTML = '<i class="fas fa-heart"></i> Like';
                        }
                    });
                }
                
                const modalSaveBtn = modalBody.querySelector('#modal-save-btn');
                if (modalSaveBtn) {
                    modalSaveBtn.addEventListener('click', function() {
                        const templateId = this.getAttribute('data-template-id');
                        toggleSave(templateId);
                        
                        // Update tampilan modal
                        if (savedTemplates.includes(templateId)) {
                            this.classList.add('active');
                            this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                        } else {
                            this.classList.remove('active');
                            this.innerHTML = '<i class="fas fa-bookmark"></i> Save';
                        }
                    });
                }
                
                const modalDownloadBtn = modalBody.querySelector('#modal-download-btn');
                if (modalDownloadBtn) {
                    modalDownloadBtn.addEventListener('click', function() {
                        const templateId = this.getAttribute('data-template-id');
                        handleTemplateDownload(templateId, title, isFree, price);
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
                if (e.target.closest('.btn-preview') && !e.target.closest('.btn-quick-preview')) {
                    const btn = e.target.closest('.btn-preview');
                    const templateId = btn.getAttribute('data-template-id');
                    openPreviewModal(templateId);
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
            
            // ==================== DOWNLOAD/BUY TEMPLATE ====================
            function handleTemplateDownload(templateId, templateName, isFree, price) {
                if (isFree) {
                    // Download template gratis
                    showNotification('success', 'Template Diunduh', `"${templateName}" berhasil diunduh!`);
                    
                    // Tutup modal
                    previewModal.style.opacity = '0';
                    setTimeout(() => {
                        previewModal.style.display = 'none';
                    }, 300);
                } else {
                    // Template premium - tampilkan konfirmasi pembelian
                    if (confirm(`Anda akan membeli template: ${templateName}\nHarga: ${price}\n\nApakah Anda ingin melanjutkan?`)) {
                        showNotification('success', 'Pembelian Berhasil', `"${templateName}" berhasil dibeli dan diunduh!`);
                        
                        // Tutup modal
                        previewModal.style.opacity = '0';
                        setTimeout(() => {
                            previewModal.style.display = 'none';
                        }, 300);
                    }
                }
            }
            
            // Event listener untuk tombol gunakan/beli di card
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn-primary') && !e.target.closest('.btn-preview')) {
                    const btn = e.target.closest('.btn-primary');
                    const templateId = btn.getAttribute('data-template-id');
                    const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                    const templateName = templateCard.querySelector('.template-title').textContent;
                    const isFree = templateCard.querySelector('.badge-free');
                    const price = templateCard.querySelector('.template-price').textContent;
                    
                    handleTemplateDownload(templateId, templateName, isFree, price);
                }
            });
            
            // ==================== LOAD MORE BUTTON ====================
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', function() {
                    showNotification('info', 'Memuat Template', 'Menampilkan lebih banyak template...');
                    
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-arrow-down"></i> Tampilkan Lebih Banyak Template';
                        this.disabled = false;
                        showNotification('success', 'Template Dimuat', '6 template tambahan berhasil dimuat!');
                    }, 2000);
                });
            }
            
            // ==================== UPLOAD TEMPLATE BUTTON ====================
            const uploadBtn = document.getElementById('upload-template-btn');
            if (uploadBtn) {
                uploadBtn.addEventListener('click', function() {
                    showNotification('info', 'Upload Template', 'Mengarahkan ke halaman upload template...');
                    setTimeout(() => {
                        window.location.href = 'upload_template.html';
                    }, 800);
                });
            }
            
            // ==================== SISTEM NOTIFIKASI ====================
            function showNotification(type, title, message) {
                const notificationContainer = document.getElementById('notification-container');
                if (!notificationContainer) {
                    // Buat container notifikasi jika belum ada
                    const container = document.createElement('div');
                    container.id = 'notification-container';
                    document.body.appendChild(container);
                }
                
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                
                const icon = type === 'success' ? 'fa-check-circle' : 
                           type === 'info' ? 'fa-info-circle' : 
                           'fa-exclamation-triangle';
                
                notification.innerHTML = `
                    <div class="notification-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="notification-content">
                        <h4>${title}</h4>
                        <p>${message}</p>
                    </div>
                `;
                
                notificationContainer.appendChild(notification);
                
                // Tampilkan notifikasi
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                // Hapus notifikasi setelah 5 detik
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notificationContainer.removeChild(notification);
                        }
                    }, 400);
                }, 5000);
            }
            
            // ==================== INISIALISASI LIKE & SAVE STATE ====================
            function initializeLikeSaveState() {
                templateCards = document.querySelectorAll('.template-card');
                
                templateCards.forEach(card => {
                    const templateId = card.getAttribute('data-id');
                    const likeElement = card.querySelector('.template-stat.like');
                    const saveElement = card.querySelector('.template-stat.save');
                    
                    if (likedTemplates.includes(templateId)) {
                        likeElement.classList.add('active');
                        likeElement.querySelector('i').classList.remove('far');
                        likeElement.querySelector('i').classList.add('fas');
                    }
                    
                    if (savedTemplates.includes(templateId)) {
                        saveElement.classList.add('active');
                        saveElement.querySelector('i').classList.remove('far');
                        saveElement.querySelector('i').classList.add('fas');
                    }
                });
            }
            
            // ==================== INISIALISASI ====================
            filterTemplates('all');
            initializeLikeSaveState();
        });