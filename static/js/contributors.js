document.addEventListener('DOMContentLoaded', function() {
            // ==================== DATA CONTRIBUTOR ====================
            const contributorsData = {
                1: {
                    name: "Alex Morgan",
                    role: "Senior UI/UX Designer",
                    location: "San Francisco, USA",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    badges: ["Top Contributor", "EzyDraw Pro", "Verified"],
                    plugins: 142,
                    assets: 45,
                    templates: 89,
                    rating: 4.9,
                    bio: "UI/UX designer dengan pengalaman 8 tahun di industri teknologi. Spesialis dalam desain produk digital yang user-centered. Telah membuat lebih dari 200 plugin Figma yang digunakan oleh ribuan desainer di seluruh dunia.",
                    skills: ["Figma", "Adobe XD", "UI Design", "Prototyping", "Design Systems", "User Research"],
                    work: [
                        { title: "Lead UI Designer", company: "TechCorp Inc.", duration: "2020 - Sekarang" },
                        { title: "Senior UX Designer", company: "DesignStudio", duration: "2017 - 2020" },
                        { title: "UI Designer", company: "StartupXYZ", duration: "2015 - 2017" }
                    ],
                    education: [
                        { degree: "Sarjana Desain Komunikasi Visual", school: "Stanford University", year: "2015" }
                    ]
                },
                2: {
                    name: "Maya Rodriguez",
                    role: "Illustrator & Graphic Designer",
                    location: "Barcelona, Spain",
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    badges: ["Vector Artist", "EzyDraw Pro", "Verified"],
                    plugins: 15,
                    assets: 76,
                    templates: 34,
                    rating: 4.8,
                    bio: "Illustrator profesional dengan spesialisasi dalam desain vektor dan karakter. Karya saya telah digunakan oleh brand-brand ternama di seluruh dunia. Passion saya adalah menciptakan ilustrasi yang membawa cerita menjadi hidup.",
                    skills: ["Adobe Illustrator", "Procreate", "Vector Art", "Character Design", "Digital Painting", "Branding"],
                    work: [
                        { title: "Freelance Illustrator", company: "Mandiri", duration: "2018 - Sekarang" },
                        { title: "Graphic Designer", company: "Creative Agency Barcelona", duration: "2015 - 2018" }
                    ],
                    education: [
                        { degree: "Sarjana Seni Rupa", school: "University of Barcelona", year: "2015" }
                    ]
                },
                3: {
                    name: "Kenji Tanaka",
                    role: "Motion Graphics Designer",
                    location: "Tokyo, Japan",
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    badges: ["Animation Expert"],
                    plugins: 58,
                    assets: 42,
                    templates: 17,
                    rating: 4.7,
                    bio: "Motion designer dengan passion dalam animasi 2D dan 3D. Spesialis dalam membuat plugin After Effects yang mempermudah workflow animasi. Telah berkontribusi di berbagai proyek film, iklan, dan konten digital.",
                    skills: ["After Effects", "Cinema 4D", "Motion Design", "3D Animation", "Visual Effects", "Typography"],
                    work: [
                        { title: "Motion Designer", company: "Animation Studio Tokyo", duration: "2019 - Sekarang" },
                        { title: "Freelance Animator", company: "Mandiri", duration: "2016 - 2019" }
                    ],
                    education: [
                        { degree: "Diploma Animasi Digital", school: "Tokyo Design Academy", year: "2016" }
                    ]
                },
                4: {
                    name: "David Chen",
                    role: "Product Designer",
                    location: "New York, USA",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    badges: ["UX Expert", "Verified"],
                    plugins: 45,
                    assets: 22,
                    templates: 28,
                    rating: 4.8,
                    bio: "Product designer dengan fokus pada pengalaman pengguna dan penelitian. Percaya bahwa desain yang baik dimulai dengan pemahaman mendalam tentang kebutuhan pengguna.",
                    skills: ["Figma", "UX Research", "Wireframing", "User Testing", "Product Strategy"],
                    work: [
                        { title: "Product Designer", company: "Tech Startup NY", duration: "2020 - Sekarang" },
                        { title: "UX Designer", company: "Digital Agency", duration: "2018 - 2020" }
                    ],
                    education: [
                        { degree: "Sarjana Desain Interaksi", school: "NYU", year: "2018" }
                    ]
                }
            };

            // ==================== SISTEM FILTER CONTRIBUTOR ====================
            const filterTabs = document.querySelectorAll('.filter-tab');
            const contributorCards = document.querySelectorAll('.contributor-card');
            
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    filterTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filterType = this.getAttribute('data-filter');
                    filterContributors(filterType);
                });
            });
            
            function filterContributors(filterType) {
                let visibleCount = 0;
                
                contributorCards.forEach((card, index) => {
                    const categories = card.getAttribute('data-category');
                    
                    let shouldShow = false;
                    
                    if (filterType === 'all') {
                        shouldShow = true;
                    } else if (filterType === 'verified') {
                        shouldShow = categories.includes('verified');
                    } else if (filterType === 'pro') {
                        shouldShow = categories.includes('pro');
                    } else {
                        shouldShow = categories.includes(filterType);
                    }
                    
                    card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    if (shouldShow) {
                        card.style.display = 'flex';
                        card.style.order = visibleCount;
                        visibleCount++;
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50 + (index * 30));
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            // ==================== SISTEM PROFIL CONTRIBUTOR ====================
            const profileModal = document.getElementById('profile-modal');
            const closeProfileModalBtn = document.getElementById('close-profile-modal');
            const profileFollowBtn = document.getElementById('profile-follow-btn');
            let currentProfileId = null;
            let followedContributors = JSON.parse(localStorage.getItem('followedContributors') || '[]');
            
            // Buka modal profil
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn-view-profile') || e.target.closest('.top-contributor')) {
                    let contributorId;
                    
                    if (e.target.closest('.btn-view-profile')) {
                        contributorId = e.target.closest('.btn-view-profile').getAttribute('data-contributor-id');
                    } else if (e.target.closest('.top-contributor')) {
                        contributorId = e.target.closest('.top-contributor').getAttribute('data-contributor-id');
                    }
                    
                    openProfileModal(contributorId);
                }
            });
            
            // Klik pada kartu contributor untuk membuka profil
            contributorCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    // Hanya jika tidak mengklik tombol di dalam kartu
                    if (!e.target.closest('.btn-follow') && !e.target.closest('.btn-view-profile')) {
                        const contributorId = this.getAttribute('data-id');
                        openProfileModal(contributorId);
                    }
                });
            });
            
            function openProfileModal(contributorId) {
                const contributor = contributorsData[contributorId];
                if (!contributor) return;
                
                currentProfileId = contributorId;
                
                // Isi data profil
                document.getElementById('profile-avatar').src = contributor.avatar;
                document.getElementById('profile-name').innerHTML = `
                    ${contributor.name}
                    ${contributor.badges.includes('Verified') ? '<i class="fas fa-check-circle" style="color: var(--accent-blue); font-size: 1.2rem;"></i>' : ''}
                `;
                document.getElementById('profile-title').textContent = contributor.role;
                document.getElementById('profile-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${contributor.location}`;
                
                // Isi badges
                const badgesContainer = document.getElementById('profile-badges');
                badgesContainer.innerHTML = '';
                contributor.badges.forEach(badge => {
                    const badgeElement = document.createElement('span');
                    badgeElement.className = 'profile-badge';
                    if (badge.includes('Pro')) badgeElement.classList.add('pro');
                    if (badge.includes('Verified')) badgeElement.classList.add('verified');
                    badgeElement.textContent = badge;
                    badgesContainer.appendChild(badgeElement);
                });
                
                // Isi statistik
                document.getElementById('profile-plugins').textContent = contributor.plugins;
                document.getElementById('profile-assets').textContent = contributor.assets;
                document.getElementById('profile-templates').textContent = contributor.templates;
                document.getElementById('profile-rating').textContent = contributor.rating;
                
                // Isi bio
                document.getElementById('profile-bio').textContent = contributor.bio;
                
                // Isi skills
                const skillsContainer = document.getElementById('profile-skills');
                skillsContainer.innerHTML = '';
                contributor.skills.forEach(skill => {
                    const skillElement = document.createElement('span');
                    skillElement.className = 'profile-skill';
                    skillElement.textContent = skill;
                    skillsContainer.appendChild(skillElement);
                });
                
                // Isi pengalaman kerja
                const workContainer = document.getElementById('profile-work');
                workContainer.innerHTML = '';
                contributor.work.forEach(job => {
                    const workElement = document.createElement('div');
                    workElement.className = 'profile-work-item';
                    workElement.innerHTML = `
                        <div class="profile-work-title">${job.title}</div>
                        <div class="profile-work-company">${job.company}</div>
                        <div class="profile-work-duration">${job.duration}</div>
                    `;
                    workContainer.appendChild(workElement);
                });
                
                // Isi pendidikan
                const educationContainer = document.getElementById('profile-education');
                educationContainer.innerHTML = '';
                contributor.education.forEach(edu => {
                    const eduElement = document.createElement('div');
                    eduElement.className = 'profile-work-item';
                    eduElement.innerHTML = `
                        <div class="profile-work-title">${edu.degree}</div>
                        <div class="profile-work-company">${edu.school}</div>
                        <div class="profile-work-duration">${edu.year}</div>
                    `;
                    educationContainer.appendChild(eduElement);
                });
                
                // Update follow button status
                updateProfileFollowButton();
                
                // Tampilkan modal
                profileModal.style.display = 'flex';
                setTimeout(() => {
                    profileModal.style.opacity = '1';
                }, 10);
            }
            
            function updateProfileFollowButton() {
                if (followedContributors.includes(currentProfileId)) {
                    profileFollowBtn.innerHTML = '<i class="fas fa-check"></i> Diikuti';
                    profileFollowBtn.classList.add('following');
                } else {
                    profileFollowBtn.innerHTML = '<i class="fas fa-user-plus"></i> Ikuti';
                    profileFollowBtn.classList.remove('following');
                }
            }
            
            // Tutup modal profil
            closeProfileModalBtn.addEventListener('click', function() {
                profileModal.style.opacity = '0';
                setTimeout(() => {
                    profileModal.style.display = 'none';
                }, 300);
            });
            
            profileModal.addEventListener('click', function(e) {
                if (e.target === profileModal) {
                    profileModal.style.opacity = '0';
                    setTimeout(() => {
                        profileModal.style.display = 'none';
                    }, 300);
                }
            });
            
            // Follow button di modal profil
            profileFollowBtn.addEventListener('click', function() {
                if (!currentProfileId) return;
                
                if (followedContributors.includes(currentProfileId)) {
                    // Unfollow
                    followedContributors = followedContributors.filter(id => id !== currentProfileId);
                    showNotification('info', 'Berhenti Mengikuti', 'Anda tidak lagi mengikuti contributor ini');
                } else {
                    // Follow
                    followedContributors.push(currentProfileId);
                    showNotification('success', 'Mengikuti', 'Anda sekarang mengikuti contributor ini');
                }
                
                // Update local storage
                localStorage.setItem('followedContributors', JSON.stringify(followedContributors));
                
                // Update semua follow button
                updateAllFollowButtons();
            });

            // ==================== SISTEM FOLLOW CONTRIBUTOR ====================
            function updateAllFollowButtons() {
                // Update button di kartu
                document.querySelectorAll('.btn-follow').forEach(button => {
                    const contributorId = button.getAttribute('data-contributor-id');
                    if (followedContributors.includes(contributorId)) {
                        button.innerHTML = '<i class="fas fa-check"></i> Diikuti';
                        button.classList.add('following');
                    } else {
                        button.innerHTML = '<i class="fas fa-user-plus"></i> Ikuti';
                        button.classList.remove('following');
                    }
                });
                
                // Update button di modal profil
                if (currentProfileId) {
                    updateProfileFollowButton();
                }
            }
            
            // Event listener untuk follow button di kartu
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn-follow') && !e.target.closest('.btn-follow').id.includes('profile')) {
                    const button = e.target.closest('.btn-follow');
                    const contributorId = button.getAttribute('data-contributor-id');
                    
                    if (followedContributors.includes(contributorId)) {
                        // Unfollow
                        followedContributors = followedContributors.filter(id => id !== contributorId);
                        showNotification('info', 'Berhenti Mengikuti', 'Anda tidak lagi mengikuti contributor ini');
                    } else {
                        // Follow
                        followedContributors.push(contributorId);
                        showNotification('success', 'Mengikuti', 'Anda sekarang mengikuti contributor ini');
                    }
                    
                    localStorage.setItem('followedContributors', JSON.stringify(followedContributors));
                    updateAllFollowButtons();
                }
            });

            // ==================== SISTEM PENDAFTARAN CONTRIBUTOR ====================
            const registrationModal = document.getElementById('registration-modal');
            const openRegistrationModalBtn = document.getElementById('open-registration-modal');
            const openRegistrationSidebarBtn = document.getElementById('open-registration-sidebar');
            const closeRegistrationModalBtn = document.getElementById('close-registration-modal');
            const pricingPlans = document.getElementById('pricing-plans');
            const registrationForm = document.getElementById('registration-form');
            const backToPlansBtn = document.getElementById('back-to-plans');
            const submitRegistrationBtn = document.getElementById('submit-registration');
            const selectedPlanInput = document.getElementById('selected-plan');
            const paymentMethods = document.querySelectorAll('.payment-method');
            
            let selectedPlan = null;
            let selectedPaymentMethod = null;
            
            // Buka modal pendaftaran
            openRegistrationModalBtn.addEventListener('click', function() {
                openRegistrationModal();
            });
            
            openRegistrationSidebarBtn.addEventListener('click', function() {
                openRegistrationModal();
            });
            
            function openRegistrationModal() {
                registrationModal.style.display = 'flex';
                setTimeout(() => {
                    registrationModal.style.opacity = '1';
                }, 10);
            }
            
            // Tutup modal pendaftaran
            closeRegistrationModalBtn.addEventListener('click', function() {
                registrationModal.style.opacity = '0';
                setTimeout(() => {
                    registrationModal.style.display = 'none';
                }, 300);
            });
            
            registrationModal.addEventListener('click', function(e) {
                if (e.target === registrationModal) {
                    registrationModal.style.opacity = '0';
                    setTimeout(() => {
                        registrationModal.style.display = 'none';
                    }, 300);
                }
            });
            
            // Pilih paket
            document.querySelectorAll('.plan-select-btn').forEach(button => {
                button.addEventListener('click', function() {
                    selectedPlan = this.getAttribute('data-plan');
                    const planNames = {
                        'starter': 'Starter (Rp 99.000/tahun)',
                        'pro': 'Pro (Rp 199.000/tahun)',
                        'agency': 'Agency (Rp 499.000/tahun)'
                    };
                    
                    selectedPlanInput.value = planNames[selectedPlan];
                    
                    // Tampilkan form, sembunyikan pricing plans
                    pricingPlans.style.display = 'none';
                    registrationForm.style.display = 'flex';
                });
            });
            
            // Kembali ke pilihan paket
            backToPlansBtn.addEventListener('click', function() {
                pricingPlans.style.display = 'flex';
                registrationForm.style.display = 'none';
            });
            
            // Pilih metode pembayaran
            paymentMethods.forEach(method => {
                method.addEventListener('click', function() {
                    paymentMethods.forEach(m => m.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedPaymentMethod = this.getAttribute('data-method');
                });
            });
            
            // Submit pendaftaran
            submitRegistrationBtn.addEventListener('click', function() {
                const name = document.getElementById('reg-name').value;
                const email = document.getElementById('reg-email').value;
                const skills = document.getElementById('reg-skills').value;
                const bio = document.getElementById('reg-bio').value;
                
                if (!name || !email || !skills || !bio || !selectedPlan || !selectedPaymentMethod) {
                    showNotification('warning', 'Data Tidak Lengkap', 'Harap lengkapi semua data yang diperlukan');
                    return;
                }
                
                // Simulasi proses pendaftaran
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Reset form
                    registrationForm.reset();
                    pricingPlans.style.display = 'flex';
                    registrationForm.style.display = 'none';
                    paymentMethods.forEach(m => m.classList.remove('selected'));
                    selectedPlan = null;
                    selectedPaymentMethod = null;
                    
                    // Tutup modal
                    registrationModal.style.opacity = '0';
                    setTimeout(() => {
                        registrationModal.style.display = 'none';
                    }, 300);
                    
                    // Tampilkan notifikasi sukses
                    showNotification('success', 'Pendaftaran Berhasil', 
                        'Selamat! Anda sekarang adalah contributor EzyDraw. Tim kami akan menghubungi Anda dalam 1x24 jam.');
                    
                    // Reset button
                    this.innerHTML = 'Daftar Sekarang';
                    this.disabled = false;
                }, 2000);
            });

            // ==================== SISTEM PENCARIAN CONTRIBUTOR ====================
            const searchInput = document.getElementById('search-contributors');
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                contributorCards.forEach(card => {
                    const name = card.querySelector('.contributor-name').textContent.toLowerCase();
                    const role = card.querySelector('.contributor-role').textContent.toLowerCase();
                    const location = card.querySelector('.contributor-location').textContent.toLowerCase();
                    const skills = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase());
                    
                    const matchesSearch = searchTerm === '' || 
                                         name.includes(searchTerm) || 
                                         role.includes(searchTerm) || 
                                         location.includes(searchTerm) ||
                                         skills.some(skill => skill.includes(searchTerm));
                    
                    if (matchesSearch) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });

            // ==================== REFRESH BUTTON ====================
            const refreshButton = document.getElementById('refresh-contributors');
            refreshButton.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyegarkan...';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-sync-alt"></i> Segarkan';
                    showNotification('success', 'Diperbarui', 'Daftar contributor telah diperbarui');
                }, 1000);
            });

            // ==================== SISTEM NOTIFIKASI ====================
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

            // ==================== NAVIGASI MENU ====================
            // Handle klik pada tombol "Buat Desain Baru"
            document.querySelector('.btn-new-design').addEventListener('click', function() {
                showNotification('info', 'Buat Desain Baru', 'Mengarahkan ke editor desain...');
                // Di sini Anda bisa redirect ke halaman editor
            window.location.href = 'editor.html';
            });

            // Handle klik pada logo untuk kembali ke beranda
            document.querySelector('.logo').addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('info', 'Beranda', 'Mengarahkan ke halaman utama...');
             window.location.href = 'index.html';
            });

            // Handle klik pada menu yang belum ada halamannya
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    // Jika halaman contributors sudah aktif, jangan redirect
                    if (this.classList.contains('active')) {
                        e.preventDefault();
                        return;
                    }
                    
                    const pageName = this.textContent.trim();
                    showNotification('info', 'Navigasi', `Mengarahkan ke halaman ${pageName}...`);
                    
                    // Untuk demo, kita akan tetap di halaman contributor
                    // Uncomment baris di bawah untuk redirect sebenarnya:
                    window.location.href = this.getAttribute('href');
                    
                    e.preventDefault();
                });
            });

            // ==================== INISIALISASI ====================
            filterContributors('all');
            updateAllFollowButtons();
            
            // Inisialisasi status follow dari localStorage
            followedContributors = JSON.parse(localStorage.getItem('followedContributors') || '[]');
        });