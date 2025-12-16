// ==================== DATA ASET SAMPLE ====================
        const assetsData = [
            {
                id: 1,
                title: "Abstract Gradient Background",
                author: "VisualArts",
                image: "https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Abstract gradient background dengan warna yang menarik dan modern. Cocok untuk berbagai keperluan desain.",
                categories: ["free", "images", "backgrounds"],
                format: "JPG",
                dimensions: "4000x3000px",
                contents: "RGB",
                tags: ["gradient", "abstract", "background", "modern"],
                likes: 125,
                downloads: 4520,
                saves: 320,
                price: "Gratis",
                isFree: true,
                badge: "popular"
            },
            {
                id: 2,
                title: "Business Icons Pack",
                author: "IconMasters",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Paket ikon bisnis dengan desain modern dan profesional. Tersedia dalam format SVG yang dapat diedit.",
                categories: ["premium", "icons"],
                format: "SVG",
                dimensions: "100+ Icons",
                contents: "Editable",
                tags: ["business", "icons", "vector", "modern"],
                likes: 89,
                downloads: 2150,
                saves: 150,
                price: "Rp 75.000",
                isFree: false,
                badge: "new"
            },
            {
                id: 3,
                title: "Nature Vector Elements",
                author: "NatureDesign",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Elemen vektor bertema alam dengan detail yang indah. Sempurna untuk desain dengan sentuhan natural.",
                categories: ["free", "vectors"],
                format: "AI/EPS",
                dimensions: "50+ Elements",
                contents: "Scalable",
                tags: ["nature", "vector", "plants", "leaves"],
                likes: 210,
                downloads: 6850,
                saves: 450,
                price: "Gratis",
                isFree: true,
                badge: "popular"
            },
            {
                id: 4,
                title: "Geometric Pattern Collection",
                author: "PatternLab",
                image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Koleksi pola geometris yang seamless dan modern. Cocok untuk background website, undangan, atau presentasi.",
                categories: ["free", "images", "backgrounds"],
                format: "PNG",
                dimensions: "30 Patterns",
                contents: "Seamless",
                tags: ["pattern", "geometric", "texture", "background"],
                likes: 180,
                downloads: 8750,
                saves: 520,
                price: "Gratis",
                isFree: true,
                badge: "trending"
            },
            {
                id: 5,
                title: "Madem UI Icons Set",
                author: "UILab",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Set ikon UI modern dengan desain minimalis. Tersedia dalam berbagai format termasuk SVG yang dapat diedit.",
                categories: ["free", "icons"],
                format: "SVG",
                dimensions: "80+ Icons",
                contents: "Editable",
                tags: ["UI", "icons", "interface", "modern"],
                likes: 95,
                downloads: 3100,
                saves: 210,
                price: "Gratis",
                isFree: true,
                badge: "trending"
            },
            {
                id: 6,
                title: "Watercolor Texture Pack",
                author: "WatercolorArt",
                image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Tekstur watercolor dengan transparansi. Sempurna untuk desain yang membutuhkan sentuhan artistik dan natural.",
                categories: ["free", "images", "backgrounds"],
                format: "PNG (Transparent)",
                dimensions: "5000x5000px",
                contents: "High-Res",
                tags: ["watercolor", "texture", "background", "artistic"],
                likes: 310,
                downloads: 7300,
                saves: 680,
                price: "Gratis",
                isFree: true,
                badge: "trending"
            },
            {
                id: 7,
                title: "Premium Abstract Textures",
                author: "TexturePro",
                image: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Koleksi tekstur abstrak premium dengan resolusi tinggi untuk proyek profesional.",
                categories: ["premium", "images"],
                format: "JPG/PNG",
                dimensions: "6000x4000px",
                contents: "20 Textures",
                tags: ["texture", "abstract", "premium", "high-res"],
                likes: 156,
                downloads: 1850,
                saves: 320,
                price: "Rp 120.000",
                isFree: false,
                badge: "new"
            },
            {
                id: 8,
                title: "Social Media Vector Pack",
                author: "SocialDesign",
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Elemen vektor untuk media sosial dengan desain yang menarik dan eye-catching.",
                categories: ["free", "vectors", "icons"],
                format: "SVG/AI",
                dimensions: "60+ Elements",
                contents: "Editable",
                tags: ["social", "media", "vector", "elements"],
                likes: 234,
                downloads: 8900,
                saves: 540,
                price: "Gratis",
                isFree: true,
                badge: "popular"
            },
            {
                id: 9,
                title: "Minimal UI Kit",
                author: "DesignSystem",
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Kit UI minimalis dengan komponen yang lengkap untuk website dan aplikasi.",
                categories: ["premium", "vectors", "icons"],
                format: "Figma/Sketch",
                dimensions: "Complete Kit",
                contents: "Components",
                tags: ["UI", "kit", "minimal", "components"],
                likes: 189,
                downloads: 3250,
                saves: 410,
                price: "Rp 150.000",
                isFree: false,
                badge: "trending"
            }
        ];

        // ==================== KATEGORI COUNT ====================
        const categoryCounts = {
            'all': assetsData.length,
            'free': assetsData.filter(asset => asset.isFree).length,
            'images': assetsData.filter(asset => asset.categories.includes('images')).length,
            'vectors': assetsData.filter(asset => asset.categories.includes('vectors')).length,
            'icons': assetsData.filter(asset => asset.categories.includes('icons')).length,
            'backgrounds': assetsData.filter(asset => asset.categories.includes('backgrounds')).length,
            'premium': assetsData.filter(asset => asset.categories.includes('premium')).length
        };

        document.addEventListener('DOMContentLoaded', function() {
            // ==================== VARIABLES ====================
            let likedAssets = JSON.parse(localStorage.getItem('likedAssets')) || [];
            let savedAssets = JSON.parse(localStorage.getItem('savedAssets')) || [];
            
            // ==================== NAVIGASI & MENU AKTIF ====================
            const currentPage = window.location.pathname.split('/').pop() || 'aset.html';
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
                
                // Handle navigation untuk mencegah error 404
                item.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Jika halaman tidak ada, tampilkan notifikasi
                    if (href && !href.startsWith('#') && !href.startsWith('http')) {
                        // Cek jika halaman ada (simulasi sederhana)
                        const pageExists = [
                            'dashboard.html', 'plugins.html', 'templates.html', 'aset.html',
                            'contributors.html', 'ezylearn.html', 'about_us.html', 
                            'rate.html', 'help.html'
                        ].includes(href);
                        
                        if (!pageExists) {
                            e.preventDefault();
                            showNotification('info', 'Halaman Sedang Dikembangkan', `Halaman ${href} sedang dalam pengembangan.`);
                        }
                    }
                });
            });
            
            // ==================== BUTTON NEW DESIGN ====================
            const btnNewDesign = document.getElementById('btn-new-design');
            if (btnNewDesign) {
                btnNewDesign.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('info', 'Membuka Editor', 'Membuka editor desain baru...');
                    setTimeout(() => {
                        // Simulasi membuka editor
                        window.location.href = '#';
                    }, 500);
                });
            }
            
            // ==================== RENDER ASET CARDS ====================
            const assetsContainer = document.getElementById('assets-container');
            
            function renderAssets(assets) {
                assetsContainer.innerHTML = '';
                
                assets.forEach(asset => {
                    const assetCard = document.createElement('div');
                    assetCard.className = 'asset-card visible';
                    assetCard.setAttribute('data-id', asset.id);
                    assetCard.setAttribute('data-category', asset.categories.join(' '));
                    assetCard.setAttribute('data-likes', asset.likes);
                    assetCard.setAttribute('data-downloads', asset.downloads);
                    assetCard.setAttribute('data-saves', asset.saves);
                    assetCard.setAttribute('data-description', asset.description);
                    
                    const isLiked = likedAssets.includes(asset.id.toString());
                    const isSaved = savedAssets.includes(asset.id.toString());
                    
                    assetCard.innerHTML = `
                        <div class="asset-preview">
                            <div class="asset-badge-corner">
                                <span class="badge ${asset.isFree ? 'badge-free' : 'badge-premium'}">
                                    ${asset.isFree ? 'Gratis' : 'Premium'}
                                </span>
                                ${asset.badge === 'trending' ? '<span class="badge badge-trending">Trending</span>' : ''}
                                ${asset.badge === 'new' ? '<span class="badge badge-new">Baru</span>' : ''}
                            </div>
                            <img src="${asset.image}" alt="${asset.title}" class="asset-preview-img">
                            <div class="asset-overlay">
                                <button class="btn-quick-preview" data-asset-id="${asset.id}">
                                    <i class="fas fa-eye"></i> Quick Preview
                                </button>
                            </div>
                        </div>
                        
                        <div class="asset-content">
                            <div class="asset-header">
                                <div class="asset-title-section">
                                    <h3 class="asset-title">${asset.title}</h3>
                                    <p class="asset-author">oleh <strong>${asset.author}</strong></p>
                                </div>
                                <div class="asset-badge">
                                    ${asset.badge === 'popular' ? '<span class="badge badge-popular">Populer</span>' : ''}
                                </div>
                            </div>
                            
                            <div class="asset-info">
                                <div class="asset-info-item">
                                    <i class="fas fa-file-image"></i> ${asset.format}
                                </div>
                                <div class="asset-info-item">
                                    <i class="fas fa-expand-alt"></i> ${asset.dimensions}
                                </div>
                                <div class="asset-info-item">
                                    <i class="fas fa-palette"></i> ${asset.contents}
                                </div>
                            </div>
                            
                            <div class="asset-tags">
                                ${asset.tags.map(tag => `<span class="asset-tag">${tag}</span>`).join('')}
                            </div>
                            
                            <div class="asset-footer">
                                <div class="asset-meta">
                                    <div class="asset-downloads">
                                        <i class="fas fa-download"></i> ${asset.downloads.toLocaleString()}+
                                    </div>
                                    <div class="asset-price ${asset.isFree ? 'price-free' : ''}">
                                        ${asset.price}
                                    </div>
                                </div>
                                
                                <div class="asset-actions">
                                    <button class="btn-action btn-preview" data-asset-id="${asset.id}">Preview</button>
                                    <button class="btn-action btn-primary ${asset.isFree ? 'download-btn' : 'buy-btn'}" data-asset-id="${asset.id}">
                                        ${asset.isFree ? 'Download' : 'Beli'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    assetsContainer.appendChild(assetCard);
                });
                
                // Re-initialize event listeners setelah render
                initializeEventListeners();
            }
            
            // Render semua aset pertama kali
            renderAssets(assetsData);
            
            // ==================== SISTEM FILTER YANG DIPERBAIKI ====================
            const categoryChips = document.querySelectorAll('.category-chip');
            let assetCards = document.querySelectorAll('.asset-card');
            
            // Update category counts dengan data aktual
            Object.keys(categoryCounts).forEach(filter => {
                const chip = document.querySelector(`.category-chip[data-filter="${filter}"]`);
                if (chip) {
                    const countElement = chip.querySelector('.category-count');
                    if (countElement) {
                        countElement.textContent = filter === 'all' ? 
                            `${categoryCounts[filter]}` : 
                            `${categoryCounts[filter].toLocaleString()}`;
                    }
                }
            });
            
            function filterAssets(filterType) {
                let visibleCount = 0;
                
                assetCards = document.querySelectorAll('.asset-card');
                
                assetCards.forEach((card, index) => {
                    // Tambahkan delay animasi berdasarkan index
                    card.style.transitionDelay = `${index * 0.05}s`;
                    
                    const categories = card.getAttribute('data-category');
                    
                    let shouldShow = false;
                    
                    if (filterType === 'all') {
                        shouldShow = true;
                    } else if (filterType === 'free') {
                        shouldShow = categories.includes('free');
                    } else if (filterType === 'premium') {
                        shouldShow = categories.includes('premium');
                    } else {
                        shouldShow = categories.includes(filterType);
                    }
                    
                    if (shouldShow) {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                        visibleCount++;
                        
                        // Animasi fade in
                        card.style.animation = 'fadeInUp 0.4s ease forwards';
                    } else {
                        card.classList.remove('visible');
                        card.classList.add('hidden');
                    }
                });
                
                // Update notifikasi dengan jumlah yang benar
                const filterNames = {
                    'all': 'Semua Aset',
                    'free': 'Aset Gratis',
                    'images': 'Gambar',
                    'vectors': 'Vektor',
                    'icons': 'Ikon',
                    'backgrounds': 'Background',
                    'premium': 'Premium'
                };
                
                showNotification('info', 'Filter Aktif', `Menampilkan ${visibleCount} aset: ${filterNames[filterType] || 'Semua Aset'}`);
            }
            
            // Event listener untuk kategori filter
            categoryChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    // Animasi untuk chip yang tidak aktif
                    categoryChips.forEach(c => {
                        if (c !== this && c.classList.contains('active')) {
                            c.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                c.style.transform = '';
                            }, 300);
                        }
                    });
                    
                    // Hapus active class dari semua chip
                    categoryChips.forEach(c => {
                        c.classList.remove('active');
                        c.style.transform = '';
                    });
                    
                    // Tambahkan active class dengan animasi
                    this.classList.add('active');
                    this.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 300);
                    
                    const filterType = this.getAttribute('data-filter');
                    filterAssets(filterType);
                });
            });
            
            // ==================== SISTEM PENCARIAN ====================
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                // Jika kosong, reset ke filter aktif
                if (searchTerm === '') {
                    const activeFilter = document.querySelector('.category-chip.active');
                    if (activeFilter) {
                        filterAssets(activeFilter.getAttribute('data-filter'));
                    } else {
                        filterAssets('all');
                    }
                    return;
                }
                
                // Filter berdasarkan pencarian
                let visibleCount = 0;
                assetCards = document.querySelectorAll('.asset-card');
                
                assetCards.forEach((card, index) => {
                    const title = card.querySelector('.asset-title').textContent.toLowerCase();
                    const tags = Array.from(card.querySelectorAll('.asset-tag')).map(tag => tag.textContent.toLowerCase());
                    const author = card.querySelector('.asset-author').textContent.toLowerCase();
                    const description = card.getAttribute('data-description').toLowerCase();
                    
                    const matchesSearch = title.includes(searchTerm) || 
                                        tags.some(tag => tag.includes(searchTerm)) || 
                                        author.includes(searchTerm) ||
                                        description.includes(searchTerm);
                    
                    if (matchesSearch) {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                        card.style.animation = 'fadeInUp 0.4s ease forwards';
                        card.style.animationDelay = `${index * 0.05}s`;
                        visibleCount++;
                    } else {
                        card.classList.remove('visible');
                        card.classList.add('hidden');
                    }
                });
                
                if (searchTerm) {
                    showNotification('info', 'Pencarian', `Menampilkan ${visibleCount} hasil untuk: "${searchTerm}"`);
                }
            });
            
            // ==================== SISTEM PRATINJAU ASET ====================
            const previewModal = document.getElementById('preview-modal');
            const closePreviewModalBtn = document.getElementById('close-preview-modal');
            const previewLikeBtn = document.getElementById('preview-like-btn');
            const previewDownloadBtn = document.getElementById('preview-download-btn');
            const previewShareBtn = document.getElementById('preview-share-btn');
            const previewSaveBtn = document.getElementById('preview-save-btn');
            
            let currentAssetId = null;
            
            // Function untuk membuka modal pratinjau
            function openPreviewModal(assetId) {
                const asset = assetsData.find(a => a.id == assetId);
                if (!asset) return;
                
                currentAssetId = assetId;
                
                // Isi data ke modal
                document.getElementById('preview-title').textContent = asset.title;
                document.getElementById('preview-author').innerHTML = `oleh <strong>${asset.author}</strong>`;
                document.getElementById('preview-large-image').src = asset.image;
                document.getElementById('preview-description').textContent = asset.description;
                document.getElementById('preview-likes').textContent = asset.likes.toLocaleString();
                document.getElementById('preview-downloads').textContent = asset.downloads.toLocaleString();
                document.getElementById('preview-saves').textContent = asset.saves.toLocaleString();
                document.getElementById('preview-format').textContent = `Format: ${asset.format}`;
                document.getElementById('preview-dimensions').textContent = `Dimensi: ${asset.dimensions}`;
                document.getElementById('preview-contents').textContent = `Konten: ${asset.contents}`;
                
                // Isi tags
                const tagsContainer = document.getElementById('preview-tags');
                tagsContainer.innerHTML = '';
                asset.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'preview-tag';
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
                
                // Atur harga
                const priceContainer = document.getElementById('preview-price');
                priceContainer.textContent = asset.price;
                priceContainer.className = asset.isFree ? 'preview-price free' : 'preview-price';
                
                // Atur status like dan save
                updateLikeButtonStatus();
                updateSaveButtonStatus();
                
                // Tampilkan modal
                previewModal.style.display = 'flex';
                setTimeout(() => {
                    previewModal.style.opacity = '1';
                }, 10);
            }
            
            function updateLikeButtonStatus() {
                if (likedAssets.includes(currentAssetId.toString())) {
                    previewLikeBtn.classList.add('active');
                    previewLikeBtn.innerHTML = '<i class="fas fa-heart"></i> Disukai';
                } else {
                    previewLikeBtn.classList.remove('active');
                    previewLikeBtn.innerHTML = '<i class="fas fa-heart"></i> Suka';
                }
            }
            
            function updateSaveButtonStatus() {
                if (savedAssets.includes(currentAssetId.toString())) {
                    previewSaveBtn.classList.add('active');
                    previewSaveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Disimpan';
                } else {
                    previewSaveBtn.classList.remove('active');
                    previewSaveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Simpan';
                }
            }
            
            // Event listener untuk tombol preview
            function initializeEventListeners() {
                // Untuk tombol preview di card
                document.querySelectorAll('.btn-preview').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        const assetId = this.getAttribute('data-asset-id');
                        openPreviewModal(assetId);
                    });
                });
                
                // Untuk tombol quick preview
                document.querySelectorAll('.btn-quick-preview').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const assetId = this.getAttribute('data-asset-id');
                        const asset = assetsData.find(a => a.id == assetId);
                        
                        if (asset) {
                            showNotification('info', 'Quick Preview', `Membuka preview cepat untuk: ${asset.title}`);
                        }
                    });
                });
                
                // Untuk tombol download/beli di card
                document.querySelectorAll('.download-btn, .buy-btn').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        const assetId = this.getAttribute('data-asset-id');
                        const asset = assetsData.find(a => a.id == assetId);
                        
                        if (asset) {
                            if (asset.isFree) {
                                // Update download count
                                asset.downloads++;
                                
                                // Update tampilan di card
                                const card = document.querySelector(`.asset-card[data-id="${assetId}"]`);
                                if (card) {
                                    const downloadsElement = card.querySelector('.asset-downloads');
                                    if (downloadsElement) {
                                        downloadsElement.innerHTML = `<i class="fas fa-download"></i> ${asset.downloads.toLocaleString()}+`;
                                    }
                                }
                                
                                showNotification('success', 'Download Berhasil', `"${asset.title}" berhasil didownload`);
                            } else {
                                if (confirm(`Anda akan membeli aset: ${asset.title}\nHarga: ${asset.price}\n\nApakah Anda ingin melanjutkan?`)) {
                                    // Update download count
                                    asset.downloads++;
                                    
                                    // Update tampilan di card
                                    const card = document.querySelector(`.asset-card[data-id="${assetId}"]`);
                                    if (card) {
                                        const downloadsElement = card.querySelector('.asset-downloads');
                                        if (downloadsElement) {
                                            downloadsElement.innerHTML = `<i class="fas fa-download"></i> ${asset.downloads.toLocaleString()}+`;
                                        }
                                    }
                                    
                                    showNotification('success', 'Pembelian Berhasil', `"${asset.title}" berhasil dibeli`);
                                }
                            }
                        }
                    });
                });
            }
            
            // Initialize event listeners pertama kali
            initializeEventListeners();
            
            // Tutup modal pratinjau
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
            
            // Like button di modal
            previewLikeBtn.addEventListener('click', function() {
                if (!currentAssetId) return;
                
                const asset = assetsData.find(a => a.id == currentAssetId);
                if (!asset) return;
                
                if (likedAssets.includes(currentAssetId.toString())) {
                    // Unlike
                    likedAssets = likedAssets.filter(id => id !== currentAssetId.toString());
                    asset.likes = Math.max(0, asset.likes - 1);
                    showNotification('info', 'Like Dihapus', 'Anda tidak lagi menyukai aset ini');
                } else {
                    // Like
                    likedAssets.push(currentAssetId.toString());
                    asset.likes++;
                    showNotification('success', 'Disukai', 'Anda menyukai aset ini');
                }
                
                // Update data di modal
                document.getElementById('preview-likes').textContent = asset.likes.toLocaleString();
                
                // Update data di card
                const card = document.querySelector(`.asset-card[data-id="${currentAssetId}"]`);
                if (card) {
                    card.setAttribute('data-likes', asset.likes);
                }
                
                // Update local storage
                localStorage.setItem('likedAssets', JSON.stringify(likedAssets));
                
                // Update button status
                updateLikeButtonStatus();
            });
            
            // Save button di modal
            previewSaveBtn.addEventListener('click', function() {
                if (!currentAssetId) return;
                
                const asset = assetsData.find(a => a.id == currentAssetId);
                if (!asset) return;
                
                if (savedAssets.includes(currentAssetId.toString())) {
                    // Unsave
                    savedAssets = savedAssets.filter(id => id !== currentAssetId.toString());
                    asset.saves = Math.max(0, asset.saves - 1);
                    showNotification('info', 'Tidak Disimpan', 'Aset dihapus dari daftar simpan');
                } else {
                    // Save
                    savedAssets.push(currentAssetId.toString());
                    asset.saves++;
                    showNotification('success', 'Disimpan', 'Aset berhasil disimpan ke koleksi Anda');
                }
                
                // Update data di modal
                document.getElementById('preview-saves').textContent = asset.saves.toLocaleString();
                
                // Update data di card
                const card = document.querySelector(`.asset-card[data-id="${currentAssetId}"]`);
                if (card) {
                    card.setAttribute('data-saves', asset.saves);
                }
                
                // Update local storage
                localStorage.setItem('savedAssets', JSON.stringify(savedAssets));
                
                // Update button status
                updateSaveButtonStatus();
            });
            
            // Download button di modal
            previewDownloadBtn.addEventListener('click', function() {
                if (!currentAssetId) return;
                
                const asset = assetsData.find(a => a.id == currentAssetId);
                if (!asset) return;
                
                if (asset.isFree) {
                    // Update download count
                    asset.downloads++;
                    
                    // Update data di modal
                    document.getElementById('preview-downloads').textContent = asset.downloads.toLocaleString();
                    
                    // Update data di card
                    const card = document.querySelector(`.asset-card[data-id="${currentAssetId}"]`);
                    if (card) {
                        card.setAttribute('data-downloads', asset.downloads);
                        const downloadsElement = card.querySelector('.asset-downloads');
                        if (downloadsElement) {
                            downloadsElement.innerHTML = `<i class="fas fa-download"></i> ${asset.downloads.toLocaleString()}+`;
                        }
                    }
                    
                    showNotification('success', 'Download Berhasil', `"${asset.title}" berhasil didownload`);
                } else {
                    if (confirm(`Anda akan membeli aset: ${asset.title}\nHarga: ${asset.price}\n\nApakah Anda ingin melanjutkan?`)) {
                        // Update download count
                        asset.downloads++;
                        
                        // Update data di modal
                        document.getElementById('preview-downloads').textContent = asset.downloads.toLocaleString();
                        
                        // Update data di card
                        const card = document.querySelector(`.asset-card[data-id="${currentAssetId}"]`);
                        if (card) {
                            card.setAttribute('data-downloads', asset.downloads);
                            const downloadsElement = card.querySelector('.asset-downloads');
                            if (downloadsElement) {
                                downloadsElement.innerHTML = `<i class="fas fa-download"></i> ${asset.downloads.toLocaleString()}+`;
                            }
                        }
                        
                        showNotification('success', 'Pembelian Berhasil', `"${asset.title}" berhasil dibeli`);
                    }
                }
            });
            
            // Share button di modal
            previewShareBtn.addEventListener('click', function() {
                // Buka modal share
                const shareModal = document.getElementById('share-modal');
                shareModal.style.display = 'flex';
                setTimeout(() => {
                    shareModal.style.opacity = '1';
                }, 10);
            });
            
            // ==================== MODAL UPLOAD ====================
            const uploadModal = document.getElementById('upload-modal');
            const openUploadModalBtn = document.getElementById('open-upload-modal');
            const closeUploadModalBtn = document.getElementById('close-upload-modal');
            
            if (openUploadModalBtn) {
                openUploadModalBtn.addEventListener('click', function() {
                    uploadModal.style.display = 'flex';
                    setTimeout(() => {
                        uploadModal.style.opacity = '1';
                    }, 10);
                });
            }
            
            if (closeUploadModalBtn) {
                closeUploadModalBtn.addEventListener('click', function() {
                    uploadModal.style.opacity = '0';
                    setTimeout(() => {
                        uploadModal.style.display = 'none';
                    }, 300);
                });
            }
            
            if (uploadModal) {
                uploadModal.addEventListener('click', function(e) {
                    if (e.target === uploadModal) {
                        uploadModal.style.opacity = '0';
                        setTimeout(() => {
                            uploadModal.style.display = 'none';
                        }, 300);
                    }
                });
            }
            
            // ==================== MODAL SHARE ====================
            const shareModal = document.getElementById('share-modal');
            const closeShareModalBtn = document.getElementById('close-share-modal');
            const copyLinkBtn = document.getElementById('copy-link-btn');
            const shareOptions = document.querySelectorAll('.share-option');
            
            if (closeShareModalBtn) {
                closeShareModalBtn.addEventListener('click', function() {
                    shareModal.style.opacity = '0';
                    setTimeout(() => {
                        shareModal.style.display = 'none';
                    }, 300);
                });
            }
            
            if (shareModal) {
                shareModal.addEventListener('click', function(e) {
                    if (e.target === shareModal) {
                        shareModal.style.opacity = '0';
                        setTimeout(() => {
                            shareModal.style.display = 'none';
                        }, 300);
                    }
                });
            }
            
            if (copyLinkBtn) {
                copyLinkBtn.addEventListener('click', function() {
                    const shareLinkInput = document.getElementById('share-link');
                    shareLinkInput.select();
                    shareLinkInput.setSelectionRange(0, 99999);
                    
                    navigator.clipboard.writeText(shareLinkInput.value)
                        .then(() => {
                            showNotification('success', 'Link Disalin', 'Link telah disalin ke clipboard');
                        })
                        .catch(() => {
                            document.execCommand('copy');
                            showNotification('success', 'Link Disalin', 'Link telah disalin ke clipboard');
                        });
                });
            }
            
            if (shareOptions) {
                shareOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        const platform = this.getAttribute('data-platform');
                        showNotification('success', 'Berhasil Dibagikan', `Aset dibagikan ke ${platform}`);
                    });
                });
            }
            
            // ==================== LOAD MORE BUTTON ====================
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', function() {
                    showNotification('info', 'Memuat Aset', 'Menampilkan lebih banyak aset...');
                    
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-arrow-down"></i> Tampilkan Lebih Banyak Aset';
                        this.disabled = false;
                        showNotification('success', 'Aset Dimuat', '3 aset tambahan berhasil dimuat!');
                    }, 1500);
                });
            }
            
            // ==================== SISTEM NOTIFIKASI (KANAN ATAS) ====================
            function showNotification(type, title, message) {
                const notificationContainer = document.getElementById('notification-container');
                
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                notification.innerHTML = `
                    <div class="notification-icon">
                        ${type === 'success' ? '<i class="fas fa-check"></i>' : 
                          type === 'info' ? '<i class="fas fa-info-circle"></i>' : 
                          '<i class="fas fa-exclamation-triangle"></i>'}
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
            
            // ==================== INISIALISASI FILTER ====================
            filterAssets('all');
        });