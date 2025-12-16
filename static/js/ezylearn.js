document.addEventListener('DOMContentLoaded', function() {
            // Filter kursus
            const filterBtns = document.querySelectorAll('.filter-btn');
            const courseCards = document.querySelectorAll('.course-card');
            const searchInput = document.querySelector('.header-search input');
            
            // Fungsi filter
            function filterCourses(filterType) {
                let visibleCount = 0;
                
                courseCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    let shouldShow = false;
                    
                    if (filterType === 'all') {
                        shouldShow = true;
                    } else {
                        shouldShow = categories.includes(filterType);
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
                const activeBtn = document.querySelector(`.filter-btn[data-filter="${filterType}"]`);
                if (activeBtn) {
                    const countSpan = activeBtn.querySelector('.filter-count');
                    if (countSpan) {
                        // Animate count update
                        countSpan.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            countSpan.style.transform = 'scale(1)';
                        }, 200);
                    }
                }
            }
            
            // Event listener untuk filter buttons
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Hapus active dari semua tombol
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Tambahkan active ke tombol yang diklik
                    this.classList.add('active');
                    
                    const filterType = this.getAttribute('data-filter');
                    filterCourses(filterType);
                });
            });
            
            // Pencarian
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase().trim();
                    
                    if (searchTerm === '') {
                        // Jika pencarian kosong, tampilkan semua berdasarkan filter aktif
                        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                        filterCourses(activeFilter);
                        return;
                    }
                    
                    let foundCount = 0;
                    
                    courseCards.forEach(card => {
                        const title = card.querySelector('.course-title').textContent.toLowerCase();
                        const description = card.querySelector('.course-description').textContent.toLowerCase();
                        const instructor = card.querySelector('.course-instructor').textContent.toLowerCase();
                        
                        if (title.includes(searchTerm) || description.includes(searchTerm) || instructor.includes(searchTerm)) {
                            card.style.display = 'block';
                            foundCount++;
                            // Highlight efek pencarian
                            card.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.3)';
                        } else {
                            card.style.display = 'none';
                            card.style.boxShadow = '';
                        }
                    });
                    
                    // Update counter di header
                    const activeFilter = document.querySelector('.filter-btn.active');
                    if (activeFilter) {
                        const countSpan = activeFilter.querySelector('.filter-count');
                        if (countSpan) {
                            countSpan.textContent = foundCount;
                        }
                    }
                });
            }
            
            // Button actions
            const enrollButtons = document.querySelectorAll('.btn-enroll');
            const continueButtons = document.querySelectorAll('.btn-continue');
            const previewButtons = document.querySelectorAll('.btn-preview');
            
            enrollButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const courseTitle = this.closest('.course-card').querySelector('.course-title').textContent;
                    const coursePrice = this.closest('.course-card').querySelector('.course-price').textContent;
                    
                    // Simulasi pendaftaran
                    this.innerHTML = '<span class="loading"></span> Memproses...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        alert(`Berhasil mendaftar kursus: ${courseTitle}\nHarga: ${coursePrice}`);
                        this.innerHTML = '<i class="fas fa-check"></i> Terdaftar';
                        this.style.backgroundColor = '#9C27B0';
                    }, 1500);
                });
            });
            
            continueButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const courseTitle = this.closest('.course-card').querySelector('.course-title').textContent;
                    alert(`Membuka kursus: ${courseTitle}`);
                });
            });
            
            previewButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const courseTitle = this.closest('.course-card').querySelector('.course-title').textContent;
                    alert(`Membuka pratinjau kursus: ${courseTitle}`);
                });
            });
            
            // Inisialisasi filter
            filterCourses('all');
        });