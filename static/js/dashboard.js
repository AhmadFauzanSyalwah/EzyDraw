        // Interaksi untuk dashboard - Dengan filter nyata
        document.addEventListener('DOMContentLoaded', function() {
            // Highlight menu aktif berdasarkan halaman saat ini
            const currentPage = window.location.pathname.split('/').pop();
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                // Cek apakah href dari menu item sesuai dengan halaman saat ini
                const href = item.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // Efek klik untuk tombol utama
            const mainButtons = document.querySelectorAll('.btn-new-design, .btn-main-action');
            mainButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Tambahkan efek visual
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    // Log untuk debugging
                    console.log('Navigasi ke halaman design');
                });
            });
            
            // Efek hover untuk kartu proyek
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('click', function() {
                    const projectTitle = this.querySelector('h3').textContent;
                    const projectStatus = this.querySelector('.project-status').textContent;
                    console.log(`Membuka proyek: ${projectTitle} (Status: ${projectStatus})`);
                });
            });
            
            // Efek hover untuk item akses cepat
            const accessItems = document.querySelectorAll('.access-item');
            accessItems.forEach(item => {
                item.addEventListener('click', function() {
                    const itemText = this.querySelector('span').textContent;
                    console.log(`Membuka: ${itemText}`);
                });
            });
            
            // Filter proyek - Tanpa alert, benar-benar filter
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCardsAll = document.querySelectorAll('.project-card');
            const filteredCountEl = document.getElementById('filtered-count');
            
            // Hitung jumlah proyek per kategori
            function countProjects() {
                const counts = {
                    'all': projectCardsAll.length,
                    'terbaru': 0,
                    'dalam-proses': 0,
                    'draft': 0,
                    'selesai': 0,
                    'favorit': 0
                };
                
                projectCardsAll.forEach(card => {
                    const status = card.getAttribute('data-status');
                    const favorit = card.getAttribute('data-favorit') === 'true';
                    const date = new Date(card.getAttribute('data-date'));
                    const now = new Date();
                    const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                    
                    // Hitung terbaru (7 hari terakhir)
                    if (daysAgo <= 7) counts['terbaru']++;
                    
                    // Hitung berdasarkan status
                    if (status === 'dalam-proses') counts['dalam-proses']++;
                    if (status === 'draft') counts['draft']++;
                    if (status === 'selesai') counts['selesai']++;
                    if (favorit) counts['favorit']++;
                });
                
                return counts;
            }
            
            // Update counter di tombol filter
            function updateFilterCounters() {
                const counts = countProjects();
                
                filterBtns.forEach(btn => {
                    const filterType = btn.getAttribute('data-filter');
                    const counter = btn.querySelector('.project-counter');
                    if (counter && counts[filterType] !== undefined) {
                        counter.textContent = counts[filterType];
                    }
                });
            }
            
            // Fungsi filter proyek
            function filterProjects(filterType) {
                let visibleCount = 0;
                
                projectCardsAll.forEach(card => {
                    const status = card.getAttribute('data-status');
                    const favorit = card.getAttribute('data-favorit') === 'true';
                    const date = new Date(card.getAttribute('data-date'));
                    const now = new Date();
                    const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                    
                    let shouldShow = false;
                    
                    switch(filterType) {
                        case 'all':
                            shouldShow = true;
                            break;
                        case 'terbaru':
                            shouldShow = daysAgo <= 7; // 7 hari terakhir
                            break;
                        case 'dalam-proses':
                            shouldShow = status === 'dalam-proses';
                            break;
                        case 'draft':
                            shouldShow = status === 'draft';
                            break;
                        case 'selesai':
                            shouldShow = status === 'selesai';
                            break;
                        case 'favorit':
                            shouldShow = favorit === true;
                            break;
                        default:
                            shouldShow = true;
                    }
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        visibleCount++;
                        // Animasi fade in
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Update counter
                filteredCountEl.textContent = visibleCount;
            }
            
            // Event listener untuk tombol filter
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Hapus kelas active dari semua tombol
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Tambahkan kelas active ke tombol yang diklik
                    this.classList.add('active');
                    
                    const filterType = this.getAttribute('data-filter');
                    filterProjects(filterType);
                });
            });
            
            // Inisialisasi filter
            updateFilterCounters();
            filterProjects('all');
            
            // Pencarian
            const searchInput = document.querySelector('.search-box input');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    
                    if (searchTerm === '') {
                        // Jika pencarian kosong, tampilkan semua berdasarkan filter aktif
                        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                        filterProjects(activeFilter);
                        return;
                    }
                    
                    let foundCount = 0;
                    
                    projectCardsAll.forEach(card => {
                        const title = card.querySelector('h3').textContent.toLowerCase();
                        const description = card.querySelector('p').textContent.toLowerCase();
                        const status = card.querySelector('.project-status').textContent.toLowerCase();
                        
                        if (title.includes(searchTerm) || description.includes(searchTerm) || status.includes(searchTerm)) {
                            card.style.display = 'block';
                            foundCount++;
                            // Highlight efek pencarian
                            card.style.borderColor = 'rgba(255, 152, 0, 0.5)';
                            card.style.boxShadow = '0 0 0 2px rgba(255, 152, 0, 0.2)';
                        } else {
                            card.style.display = 'none';
                            card.style.borderColor = '';
                            card.style.boxShadow = '';
                        }
                    });
                    
                    filteredCountEl.textContent = foundCount;
                });
            }
            
            // Cek apakah gambar berhasil dimuat
            const images = document.querySelectorAll('.project-thumbnail img, .logo-img, .user-avatar');
            images.forEach(img => {
                img.addEventListener('error', function() {
                    console.log(`Gambar tidak ditemukan: ${this.src}`);
                    // Tampilkan teks fallback untuk gambar proyek
                    if (this.classList.contains('project-thumbnail')) {
                        const fallbackText = this.parentElement.querySelector('.fallback-text');
                        if (fallbackText) {
                            fallbackText.style.display = 'block';
                        }
                    }
                });
                
                img.addEventListener('load', function() {
                    console.log(`Gambar berhasil dimuat: ${this.src}`);
                    // Untuk gambar proyek, sembunyikan teks fallback
                    const fallbackText = this.parentElement.querySelector('.fallback-text');
                    if (fallbackText) {
                        fallbackText.style.display = 'none';
                    }
                });
            });
        });