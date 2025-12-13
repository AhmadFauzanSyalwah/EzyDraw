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
                    } else if (menuText.includes('Contributors')) {
                        window.location.href = 'contributors.html';
                    }
                });
            });
            
            // Category filter untuk kontributor
            const categoryChips = document.querySelectorAll('.category-chip');
            const contributorCards = document.querySelectorAll('.contributor-card');
            const contributorsContainer = document.getElementById('contributors-container');
            
            // Function untuk filter kontributor
            function filterContributors(filterType) {
                let visibleCount = 0;
                
                contributorCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    let shouldShow = false;
                    
                    switch(filterType) {
                        case 'all':
                            shouldShow = true;
                            break;
                        case 'uiux':
                            shouldShow = categories.includes('uiux');
                            break;
                        case 'social':
                            shouldShow = categories.includes('social');
                            break;
                        case 'presentation':
                            shouldShow = categories.includes('presentation');
                            break;
                        case 'branding':
                            shouldShow = categories.includes('branding');
                            break;
                        case 'illustration':
                            shouldShow = categories.includes('illustration');
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
                            'all': '142',
                            'uiux': '38',
                            'social': '45',
                            'presentation': '22',
                            'branding': '28',
                            'illustration': '19'
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
                    filterContributors(filterType);
                });
            });
            
            // Profile button functionality
            const profileBtns = document.querySelectorAll('.btn-profile');
            profileBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const card = this.closest('.contributor-card');
                    const contributorName = card.querySelector('.contributor-name').textContent.split('\n')[0].trim();
                    
                    // Simulasi membuka profil kontributor
                    alert(`Membuka profil: ${contributorName}\n\nDi implementasi lengkap, ini akan mengarahkan ke halaman profil kontributor.`);
                });
            });
            
            // Contact button functionality
            const contactBtns = document.querySelectorAll('.btn-primary:not(.btn-join-contributor)');
            contactBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const card = this.closest('.contributor-card');
                    const contributorName = card.querySelector('.contributor-name').textContent.split('\n')[0].trim();
                    
                    // Simulasi kontak kontributor
                    alert(`Mengirim pesan ke: ${contributorName}\n\nDi implementasi lengkap, ini akan membuka form pesan untuk kontak kontributor.`);
                });
            });
            
            // Search functionality
            const searchInput = document.querySelector('.search-box input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                contributorCards.forEach(card => {
                    const name = card.querySelector('.contributor-name').textContent.toLowerCase();
                    const title = card.querySelector('.contributor-title').textContent.toLowerCase();
                    const description = card.querySelector('.contributor-description').textContent.toLowerCase();
                    
                    if (searchTerm === '' || name.includes(searchTerm) || title.includes(searchTerm) || description.includes(searchTerm)) {
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
                alert('Menampilkan lebih banyak kontributor...\n\n(Dalam implementasi nyata, ini akan memuat lebih banyak data dari server)');
                
                // Simulasi loading
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-arrow-down"></i> Tampilkan Lebih Banyak Kontributor';
                    this.disabled = false;
                    alert('6 kontributor tambahan berhasil dimuat!');
                }, 1500);
            });
            
            // Card hover effect
            contributorCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // Top contributors click functionality
            const topContributorItems = document.querySelectorAll('.top-contributor-item');
            topContributorItems.forEach(item => {
                item.addEventListener('click', function() {
                    const contributorName = this.querySelector('h4').textContent;
                    alert(`Membuka profil: ${contributorName}\n\nIni akan mengarahkan ke halaman profil kontributor.`);
                });
            });
            
            // Modal functionality
            const registrationModal = document.getElementById('registration-modal');
            const joinContributorBtn = document.getElementById('join-contributor-btn');
            const closeModalBtn = document.getElementById('close-modal');
            const cancelRegistrationBtn = document.getElementById('cancel-registration');
            const registrationForm = document.getElementById('contributor-registration-form');
            
            // Open modal
            joinContributorBtn.addEventListener('click', function() {
                registrationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Close modal
            function closeModal() {
                registrationModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            closeModalBtn.addEventListener('click', closeModal);
            cancelRegistrationBtn.addEventListener('click', closeModal);
            
            // Close modal when clicking outside
            registrationModal.addEventListener('click', function(e) {
                if (e.target === registrationModal) {
                    closeModal();
                }
            });
            
            // Form submission
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const firstName = document.getElementById('first-name').value;
                const lastName = document.getElementById('last-name').value;
                const email = document.getElementById('email').value;
                const profession = document.getElementById('profession').value;
                const portfolio = document.getElementById('portfolio').value;
                const experience = document.getElementById('experience').value;
                const tools = document.getElementById('tools').value;
                const motivation = document.getElementById('motivation').value;
                
                // Simulate form submission
                const submitBtn = registrationForm.querySelector('.btn-modal-submit');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Success message
                    alert(`Pendaftaran berhasil dikirim!\n\nTerima kasih ${firstName} ${lastName} telah mendaftar sebagai kontributor EzyDraw.\n\nTim kami akan menghubungi Anda di ${email} dalam waktu 1-3 hari kerja untuk proses verifikasi portfolio.`);
                    
                    // Reset form
                    registrationForm.reset();
                    closeModal();
                    
                    // Reset button
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pendaftaran';
                    submitBtn.disabled = false;
                }, 2000);
            });
            
            // Create new design button
            const newDesignBtn = document.querySelector('.btn-new-design');
            newDesignBtn.addEventListener('click', function() {
                alert('Membuka editor desain baru...\n\nAnda akan diarahkan ke editor EzyDraw untuk mulai membuat desain dari awal.');
            });
            
            // Upload template button in sidebar
            const uploadTemplateBtn = document.querySelector('.contributor-widget .btn-primary');
            uploadTemplateBtn.addEventListener('click', function() {
                alert('Membuka halaman upload template...\n\nDi sini Anda dapat mengupload template Anda untuk dibagikan ke komunitas EzyDraw.');
            });
            
            // Initialize dengan filter "all"
            filterContributors('all');
            
            // Keyboard shortcut for modal
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && registrationModal.classList.contains('active')) {
                    closeModal();
                }
            });
        });