document.addEventListener('DOMContentLoaded', function() {
            // ==================== VARIABLES ====================
            let likedTemplates = JSON.parse(localStorage.getItem('likedTemplates')) || [];
            let savedTemplates = JSON.parse(localStorage.getItem('savedTemplates')) || [];
            let downloadedTemplates = JSON.parse(localStorage.getItem('downloadedTemplates')) || [];
            let currentFilter = 'all';
            let allTemplates = [];
            let visibleTemplates = [];
            let currentDownloadTemplate = null;
            let selectedDownloadFormat = null;
            
            // Template data dengan informasi lengkap
            const templateData = {
                1: {
                    id: 1,
                    title: "Instagram Carousel Pack",
                    author: "SocialDesign Co.",
                    description: "Template desain carousel Instagram yang modern dan menarik. Cocok untuk konten edukasi, promosi, atau portofolio. Terdapat 15 layout berbeda yang dapat disesuaikan.",
                    formats: ["PSD", "AI", "PNG"],
                    sizes: ["5.2 MB", "8.5 MB", "3.1 MB"],
                    downloads: 1245,
                    views: 5240,
                    resolution: "1080x1080px",
                    features: ["Fully Customizable", "Layer Styles", "Smart Objects"]
                },
                2: {
                    id: 2,
                    title: "Modern Business Presentation",
                    author: "SlideMasters",
                    description: "Template presentasi bisnis profesional dengan desain modern dan animasi halus. Ideal untuk pitch deck, laporan perusahaan, atau presentasi klien.",
                    formats: ["PPTX", "PDF", "Keynote"],
                    sizes: ["24.3 MB", "18.7 MB", "22.1 MB"],
                    downloads: 876,
                    views: 3120,
                    resolution: "1920x1080px",
                    features: ["Animations", "Charts", "Icons Pack"]
                },
                3: {
                    id: 3,
                    title: "Brand Identity Starter Kit",
                    author: "BrandCrafters",
                    description: "Paket lengkap untuk membangun identitas merek dari nol. Termasuk template logo, kartu nama, dan panduan gaya yang dapat disesuaikan.",
                    formats: ["AI", "EPS", "PDF"],
                    sizes: ["12.7 MB", "9.8 MB", "5.3 MB"],
                    downloads: 2341,
                    views: 8450,
                    resolution: "Vektor",
                    features: ["Vector Files", "Color Palette", "Typography Guide"]
                },
                4: {
                    id: 4,
                    title: "E-commerce Banner Pack",
                    author: "ShopDesign Pro",
                    description: "Koleksi banner e-commerce untuk berbagai jenis produk dan promosi. Desain responsif yang terlihat bagus di desktop dan mobile.",
                    formats: ["PSD", "JPG", "PNG"],
                    sizes: ["18.9 MB", "12.4 MB", "15.2 MB"],
                    downloads: 1876,
                    views: 6540,
                    resolution: "Varies",
                    features: ["Responsive", "CTA Buttons", "Product Placeholders"]
                },
                5: {
                    id: 5,
                    title: "Modern Resume & CV Pack",
                    author: "CareerDesign",
                    description: "Koleksi template resume dan CV yang modern dan ATS-friendly. Didesain untuk membuat kesan pertama yang profesional.",
                    formats: ["DOCX", "PDF", "Pages"],
                    sizes: ["5.2 MB", "3.8 MB", "4.5 MB"],
                    downloads: 3124,
                    views: 11240,
                    resolution: "A4",
                    features: ["ATS Friendly", "Customizable", "Multiple Layouts"]
                },
                6: {
                    id: 6,
                    title: "Social Media Content Calendar",
                    author: "ContentPlanner Pro",
                    description: "Template kalender konten untuk perencanaan strategi media sosial. Termasuk analitik dan tracking untuk 6 platform berbeda.",
                    formats: ["Excel", "Numbers", "Google Sheets"],
                    sizes: ["3.8 MB", "2.9 MB", "4.2 MB"],
                    downloads: 1543,
                    views: 4980,
                    resolution: "N/A",
                    features: ["Analytics", "Platform Integration", "Content Planning"]
                }
            };
            
            // ==================== NOTIFICATION SYSTEM ====================
            function showNotification(type, title, message) {
                const notificationContainer = document.getElementById('notification-container');
                if (!notificationContainer) {
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
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notificationContainer.removeChild(notification);
                        }
                    }, 400);
                }, 5000);
            }
            
            // ==================== DOWNLOAD SYSTEM ====================
            function showDownloadModal(templateId) {
                const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                if (!templateCard) return;
                
                const title = templateCard.querySelector('.template-title').textContent;
                const formats = templateCard.getAttribute('data-formats').split(',');
                const size = templateCard.getAttribute('data-size');
                const isFree = templateCard.getAttribute('data-price') === '0';
                
                currentDownloadTemplate = templateId;
                
                document.getElementById('download-template-title').textContent = `Download: ${title}`;
                
                const downloadOptionsContainer = document.getElementById('download-options');
                downloadOptionsContainer.innerHTML = '';
                
                formats.forEach((format, index) => {
                    const option = document.createElement('div');
                    option.className = 'download-option';
                    option.dataset.format = format;
                    
                    const formatName = format.toUpperCase();
                    const fileSize = size;
                    
                    option.innerHTML = `
                        <div class="download-option-info">
                            <h4>${formatName}</h4>
                            <p>Format ${formatName} ${index === 0 ? '(Recommended)' : ''}</p>
                        </div>
                        <div class="download-option-size">${fileSize}</div>
                    `;
                    
                    option.addEventListener('click', function() {
                        document.querySelectorAll('.download-option').forEach(opt => {
                            opt.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                        });
                        this.style.border = '2px solid var(--accent-primary)';
                        selectedDownloadFormat = format;
                    });
                    
                    downloadOptionsContainer.appendChild(option);
                });
                
                // Select first option by default
                if (downloadOptionsContainer.firstChild) {
                    downloadOptionsContainer.firstChild.click();
                }
                
                const modal = document.getElementById('download-modal');
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
            
            function processDownload() {
                if (!currentDownloadTemplate || !selectedDownloadFormat) return;
                
                const templateCard = document.querySelector(`.template-card[data-id="${currentDownloadTemplate}"]`);
                const title = templateCard.querySelector('.template-title').textContent;
                const isFree = templateCard.getAttribute('data-price') === '0';
                
                // Add to downloaded templates
                if (!downloadedTemplates.includes(currentDownloadTemplate)) {
                    downloadedTemplates.push(currentDownloadTemplate);
                    localStorage.setItem('downloadedTemplates', JSON.stringify(downloadedTemplates));
                }
                
                // Simulate download
                showNotification('success', 'Download Dimulai', 
                    `Template "${title}" sedang didownload dalam format ${selectedDownloadFormat.toUpperCase()}.`);
                
                // Update download count in stats
                const downloadCountElement = document.getElementById('total-downloads');
                if (downloadCountElement) {
                    let currentCount = parseInt(downloadCountElement.textContent.replace('K', '000').replace('.', ''));
                    currentCount += 1;
                    if (currentCount >= 1000) {
                        downloadCountElement.textContent = (currentCount / 1000).toFixed(1) + 'K';
                    } else {
                        downloadCountElement.textContent = currentCount;
                    }
                }
                
                // Close modal
                closeDownloadModal();
                
                // Simulate file download
                setTimeout(() => {
                    showNotification('success', 'Download Selesai', 
                        `Template "${title}" berhasil didownload!`);
                }, 1500);
            }
            
            function closeDownloadModal() {
                const modal = document.getElementById('download-modal');
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                currentDownloadTemplate = null;
                selectedDownloadFormat = null;
            }
            
            // ==================== PREVIEW MODAL SYSTEM ====================
            function showPreviewModal(templateId) {
                const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                const data = templateData[templateId];
                
                if (!templateCard || !data) return;
                
                const previewImg = templateCard.querySelector('.template-preview-img').src;
                const price = templateCard.getAttribute('data-price');
                const likes = templateCard.getAttribute('data-likes');
                const saves = templateCard.querySelector('.template-stat.save span').textContent;
                const tags = Array.from(templateCard.querySelectorAll('.template-tag')).map(tag => tag.textContent);
                
                const isLiked = likedTemplates.includes(templateId.toString());
                const isSaved = savedTemplates.includes(templateId.toString());
                const isFree = price === '0';
                
                const modalBody = document.getElementById('preview-modal-body');
                modalBody.innerHTML = `
                    <div class="preview-modal-header">
                        <h3>Preview Template</h3>
                    </div>
                    <div class="preview-modal-body">
                        <div class="preview-image-container">
                            <img src="${previewImg}" alt="${data.title}" class="preview-image">
                        </div>
                        <div class="preview-info-container">
                            <h3 class="preview-title">${data.title}</h3>
                            <p class="preview-author">oleh <strong>${data.author}</strong></p>
                            
                            <div class="preview-stats">
                                <div class="preview-stat">
                                    <i class="fas fa-heart"></i>
                                    <div class="preview-stat-value">${likes}</div>
                                    <div class="preview-stat-label">Likes</div>
                                </div>
                                <div class="preview-stat">
                                    <i class="fas fa-download"></i>
                                    <div class="preview-stat-value">${data.downloads}</div>
                                    <div class="preview-stat-label">Downloads</div>
                                </div>
                                <div class="preview-stat">
                                    <i class="fas fa-eye"></i>
                                    <div class="preview-stat-value">${data.views}</div>
                                    <div class="preview-stat-label">Views</div>
                                </div>
                            </div>
                            
                            <div class="preview-description">
                                ${data.description}
                            </div>
                            
                            <div class="preview-tags">
                                ${tags.map(tag => `<span class="preview-tag">${tag}</span>`).join('')}
                            </div>
                            
                            <div class="preview-details">
                                ${data.features.map(feature => `
                                    <div class="preview-detail-item">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                                <div class="preview-detail-item">
                                    <i class="fas fa-file-alt"></i>
                                    <span>Format: ${data.formats.join(', ')}</span>
                                </div>
                                <div class="preview-detail-item">
                                    <i class="fas fa-expand"></i>
                                    <span>Resolution: ${data.resolution}</span>
                                </div>
                            </div>
                            
                            <div class="preview-actions">
                                <button class="preview-action-btn like ${isLiked ? 'active' : ''}" data-template-id="${templateId}">
                                    <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i> ${isLiked ? 'Liked' : 'Like'}
                                </button>
                                ${isFree ? 
                                    `<button class="preview-action-btn download" data-template-id="${templateId}">
                                        <i class="fas fa-download"></i> Download
                                    </button>` : 
                                    `<button class="preview-action-btn use" data-template-id="${templateId}">
                                        <i class="fas fa-shopping-cart"></i> Beli Sekarang
                                    </button>`
                                }
                                <button class="preview-action-btn save ${isSaved ? 'active' : ''}" data-template-id="${templateId}">
                                    <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i> ${isSaved ? 'Saved' : 'Save'}
                                </button>
                            </div>
                            
                            <div class="preview-price ${isFree ? 'free' : ''}">
                                ${isFree ? 'GRATIS' : `Rp ${parseInt(price).toLocaleString()}`}
                            </div>
                        </div>
                    </div>
                `;
                
                const modal = document.getElementById('preview-modal');
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
                
                // Add event listeners to modal buttons
                setTimeout(() => {
                    const likeBtn = modal.querySelector('.preview-action-btn.like');
                    const downloadBtn = modal.querySelector('.preview-action-btn.download');
                    const saveBtn = modal.querySelector('.preview-action-btn.save');
                    const useBtn = modal.querySelector('.preview-action-btn.use');
                    
                    if (likeBtn) {
                        likeBtn.addEventListener('click', function() {
                            toggleLike(templateId);
                            const icon = this.querySelector('i');
                            if (likedTemplates.includes(templateId.toString())) {
                                icon.classList.remove('far');
                                icon.classList.add('fas');
                                this.classList.add('active');
                                this.innerHTML = '<i class="fas fa-heart"></i> Liked';
                            } else {
                                icon.classList.remove('fas');
                                icon.classList.add('far');
                                this.classList.remove('active');
                                this.innerHTML = '<i class="far fa-heart"></i> Like';
                            }
                        });
                    }
                    
                    if (downloadBtn) {
                        downloadBtn.addEventListener('click', function() {
                            closePreviewModal();
                            showDownloadModal(templateId);
                        });
                    }
                    
                    if (saveBtn) {
                        saveBtn.addEventListener('click', function() {
                            toggleSave(templateId);
                            const icon = this.querySelector('i');
                            if (savedTemplates.includes(templateId.toString())) {
                                icon.classList.remove('far');
                                icon.classList.add('fas');
                                this.classList.add('active');
                                this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                            } else {
                                icon.classList.remove('fas');
                                icon.classList.add('far');
                                this.classList.remove('active');
                                this.innerHTML = '<i class="far fa-bookmark"></i> Save';
                            }
                        });
                    }
                    
                    if (useBtn) {
                        useBtn.addEventListener('click', function() {
                            showNotification('info', 'Pembelian', 'Anda akan diarahkan ke halaman pembelian template premium.');
                            closePreviewModal();
                        });
                    }
                }, 100);
            }
            
            function closePreviewModal() {
                const modal = document.getElementById('preview-modal');
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
            
            // ==================== INITIALIZE TEMPLATES ====================
            function initializeTemplates() {
                const templateCards = document.querySelectorAll('.template-card');
                allTemplates = Array.from(templateCards).map(card => ({
                    element: card,
                    id: card.getAttribute('data-id'),
                    category: card.getAttribute('data-category'),
                    price: parseInt(card.getAttribute('data-price')),
                    likes: parseInt(card.getAttribute('data-likes')),
                    date: card.getAttribute('data-date'),
                    title: card.querySelector('.template-title').textContent,
                    author: card.querySelector('.template-author').textContent,
                    tags: Array.from(card.querySelectorAll('.template-tag')).map(tag => tag.textContent)
                }));
                
                visibleTemplates = [...allTemplates];
                
                // Update like/save status from localStorage
                updateLikeSaveStatus();
            }
            
            function updateLikeSaveStatus() {
                allTemplates.forEach(template => {
                    const card = template.element;
                    const likeElement = card.querySelector('.template-stat.like');
                    const saveElement = card.querySelector('.template-stat.save');
                    
                    if (likedTemplates.includes(template.id.toString())) {
                        const icon = likeElement.querySelector('i');
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        likeElement.classList.add('active');
                    }
                    
                    if (savedTemplates.includes(template.id.toString())) {
                        const icon = saveElement.querySelector('i');
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        saveElement.classList.add('active');
                    }
                });
            }
            
            // ==================== FILTER TEMPLATES ====================
            function filterTemplates(filterType) {
                currentFilter = filterType;
                
                allTemplates.forEach(template => {
                    const element = template.element;
                    
                    let shouldShow = false;
                    
                    if (filterType === 'all') {
                        shouldShow = true;
                    } else if (filterType === 'free') {
                        shouldShow = template.price === 0;
                    } else {
                        shouldShow = template.category.includes(filterType);
                    }
                    
                    if (shouldShow) {
                        element.classList.remove('hidden');
                        element.classList.add('visible');
                    } else {
                        element.classList.remove('visible');
                        element.classList.add('hidden');
                    }
                });
                
                visibleTemplates = allTemplates.filter(template => 
                    template.element.classList.contains('visible')
                );
                
                updateCategoryCount();
                
                const filterNames = {
                    'all': 'Semua Template',
                    'free': 'Template Gratis',
                    'social': 'Media Sosial',
                    'business': 'Bisnis',
                    'presentation': 'Presentasi',
                    'marketing': 'Marketing',
                    'design': 'Desain Grafis'
                };
                
                showNotification('info', 'Filter Aktif', `Menampilkan ${visibleTemplates.length} template: ${filterNames[filterType]}`);
            }
            
            // ==================== SEARCH FUNCTIONALITY ====================
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase().trim();
                    
                    allTemplates.forEach(template => {
                        const element = template.element;
                        const isCurrentlyVisible = element.classList.contains('visible');
                        
                        if (searchTerm === '') {
                            if (currentFilter === 'all' || template.category.includes(currentFilter)) {
                                element.classList.remove('hidden');
                                element.classList.add('visible');
                            } else {
                                element.classList.remove('visible');
                                element.classList.add('hidden');
                            }
                        } else {
                            const matchesSearch = template.title.toLowerCase().includes(searchTerm) ||
                                                template.author.toLowerCase().includes(searchTerm) ||
                                                template.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                            
                            if (matchesSearch && (currentFilter === 'all' || template.category.includes(currentFilter))) {
                                element.classList.remove('hidden');
                                element.classList.add('visible');
                            } else {
                                element.classList.remove('visible');
                                element.classList.add('hidden');
                            }
                        }
                    });
                    
                    visibleTemplates = allTemplates.filter(template => 
                        template.element.classList.contains('visible')
                    );
                    
                    updateCategoryCount();
                    
                    if (searchTerm) {
                        showNotification('info', 'Pencarian', `Menampilkan ${visibleTemplates.length} hasil untuk: "${searchTerm}"`);
                    }
                });
            }
            
            // ==================== UPDATE COUNTERS ====================
            function updateCategoryCount() {
                const categoryChips = document.querySelectorAll('.category-chip');
                categoryChips.forEach(chip => {
                    const filterType = chip.getAttribute('data-filter');
                    let count = 0;
                    
                    if (filterType === 'all') {
                        count = allTemplates.length;
                    } else if (filterType === 'free') {
                        count = allTemplates.filter(t => t.price === 0).length;
                    } else {
                        count = allTemplates.filter(t => t.category.includes(filterType)).length;
                    }
                    
                    const countElement = chip.querySelector('.category-count');
                    if (countElement) {
                        countElement.textContent = count;
                    }
                });
            }
            
            // ==================== LIKE/SAVE SYSTEM ====================
            function toggleLike(templateId) {
                const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                const likeElement = templateCard.querySelector('.template-stat.like');
                const likeIcon = likeElement.querySelector('i');
                const likeCount = likeElement.querySelector('span');
                
                if (likedTemplates.includes(templateId.toString())) {
                    likedTemplates = likedTemplates.filter(id => id !== templateId.toString());
                    likeIcon.classList.remove('fas', 'fa-heart');
                    likeIcon.classList.add('far', 'fa-heart');
                    likeElement.classList.remove('active');
                    
                    let count = parseInt(likeCount.textContent);
                    likeCount.textContent = Math.max(0, count - 1);
                    
                    showNotification('info', 'Like Dihapus', 'Template dihapus dari favorit');
                } else {
                    likedTemplates.push(templateId.toString());
                    likeIcon.classList.remove('far', 'fa-heart');
                    likeIcon.classList.add('fas', 'fa-heart');
                    likeElement.classList.add('active');
                    
                    let count = parseInt(likeCount.textContent);
                    likeCount.textContent = count + 1;
                    
                    showNotification('success', 'Disukai!', 'Template ditambahkan ke favorit');
                }
                
                localStorage.setItem('likedTemplates', JSON.stringify(likedTemplates));
            }
            
            function toggleSave(templateId) {
                const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
                const saveElement = templateCard.querySelector('.template-stat.save');
                const saveIcon = saveElement.querySelector('i');
                const saveCount = saveElement.querySelector('span');
                
                if (savedTemplates.includes(templateId.toString())) {
                    savedTemplates = savedTemplates.filter(id => id !== templateId.toString());
                    saveIcon.classList.remove('fas', 'fa-bookmark');
                    saveIcon.classList.add('far', 'fa-bookmark');
                    saveElement.classList.remove('active');
                    
                    let count = parseInt(saveCount.textContent);
                    saveCount.textContent = Math.max(0, count - 1);
                    
                    showNotification('info', 'Disimpan Dihapus', 'Template dihapus dari koleksi');
                } else {
                    savedTemplates.push(templateId.toString());
                    saveIcon.classList.remove('far', 'fa-bookmark');
                    saveIcon.classList.add('fas', 'fa-bookmark');
                    saveElement.classList.add('active');
                    
                    let count = parseInt(saveCount.textContent);
                    saveCount.textContent = count + 1;
                    
                    showNotification('success', 'Disimpan!', 'Template ditambahkan ke koleksi Anda');
                }
                
                localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
            }
            
            // ==================== EVENT LISTENERS ====================
            // Category filters
            const categoryChips = document.querySelectorAll('.category-chip');
            categoryChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    categoryChips.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filterType = this.getAttribute('data-filter');
                    filterTemplates(filterType);
                });
            });
            
            // Event delegation for like, save, preview, and download
            document.addEventListener('click', function(e) {
                // Like button
                if (e.target.closest('.template-stat.like')) {
                    const likeElement = e.target.closest('.template-stat.like');
                    const templateId = likeElement.getAttribute('data-template-id');
                    toggleLike(templateId);
                }
                
                // Save button
                if (e.target.closest('.template-stat.save')) {
                    const saveElement = e.target.closest('.template-stat.save');
                    const templateId = saveElement.getAttribute('data-template-id');
                    toggleSave(templateId);
                }
                
                // Preview button
                if (e.target.closest('.btn-preview') || e.target.closest('.btn-quick-preview')) {
                    const btn = e.target.closest('.btn-preview') || e.target.closest('.btn-quick-preview');
                    const templateId = btn.getAttribute('data-template-id');
                    showPreviewModal(templateId);
                }
                
                // Download button (on card)
                if (e.target.closest('.btn-download')) {
                    const btn = e.target.closest('.btn-download');
                    const templateId = btn.getAttribute('data-template-id');
                    showDownloadModal(templateId);
                }
                
                // Buy button (premium templates)
                if (e.target.closest('.btn-primary')) {
                    const btn = e.target.closest('.btn-primary');
                    const templateId = btn.getAttribute('data-template-id');
                    showNotification('info', 'Pembelian', 'Anda akan diarahkan ke halaman pembelian template premium.');
                }
            });
            
            // Close modals
            document.getElementById('close-preview-modal').addEventListener('click', closePreviewModal);
            document.getElementById('close-download-modal').addEventListener('click', closeDownloadModal);
            document.getElementById('cancel-download').addEventListener('click', closeDownloadModal);
            document.getElementById('confirm-download').addEventListener('click', processDownload);
            
            // Close modals when clicking outside
            document.getElementById('preview-modal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closePreviewModal();
                }
            });
            
            document.getElementById('download-modal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeDownloadModal();
                }
            });
            
            // Load more button
            document.getElementById('load-more-btn').addEventListener('click', function() {
                showNotification('info', 'Loading', 'Memuat template tambahan...');
                setTimeout(() => {
                    showNotification('success', 'Berhasil', 'Template tambahan berhasil dimuat!');
                }, 1500);
            });
            
            // New design button
            document.getElementById('btn-new-design').addEventListener('click', function() {
                showNotification('success', 'Editor Dibuka', 'Membuka editor desain baru...');
            });
            
            // Upload template button
            document.getElementById('upload-template-btn').addEventListener('click', function() {
                showNotification('info', 'Upload Template', 'Membuka halaman upload template...');
            });
            
            // ==================== INITIALIZATION ====================
            initializeTemplates();
            filterTemplates('all');
            
            // Show welcome notification
            setTimeout(() => {
                showNotification('success', 'Selamat Datang!', 'Template marketplace siap digunakan. Temukan dan download template yang Anda butuhkan!');
            }, 1000);
        });