// ===== DOM ELEMENTS =====
        const teamMembers = document.querySelectorAll('.team-member');
        const solutionCards = document.querySelectorAll('.final-solution-card');
        const featureCards = document.querySelectorAll('.feature-card');

        // ===== TEAM MEMBER INTERACTION =====
        teamMembers.forEach(member => {
            member.addEventListener('click', function() {
                const name = this.querySelector('.member-name').textContent;
                const nim = this.querySelector('.member-nim').textContent;
                
                // Create modal for member details
                const modal = document.createElement('div');
                modal.className = 'member-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Detail Anggota</h3>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-avatar">
                                ${this.querySelector('.member-avatar').innerHTML}
                            </div>
                            <h4>${name}</h4>
                            <p>${nim}</p>
                            <div class="member-bio">
                                <p>Anggota aktif Kelompok EzyDraw yang berkontribusi dalam pengembangan aplikasi desain grafis untuk kebutuhan akademik mahasiswa.</p>
                            </div>
                            <div class="member-skills">
                                <span class="skill-tag">UI/UX Design</span>
                                <span class="skill-tag">Frontend Dev</span>
                                <span class="skill-tag">Backend Dev</span>
                                <span class="skill-tag">Project Management</span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add styles
                const styles = document.createElement('style');
                styles.textContent = `
                    .member-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(15, 5, 31, 0.95);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                        animation: fadeIn 0.3s ease;
                    }
                    
                    .modal-content {
                        background: var(--card-bg);
                        border-radius: var(--border-radius);
                        padding: 30px;
                        max-width: 400px;
                        width: 90%;
                        border: 1px solid rgba(76, 175, 80, 0.3);
                        animation: slideUp 0.3s ease;
                    }
                    
                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    
                    .modal-header h3 {
                        font-size: 1.5rem;
                        color: var(--accent-primary);
                    }
                    
                    .close-modal {
                        background: none;
                        border: none;
                        color: var(--text-secondary);
                        font-size: 1.5rem;
                        cursor: pointer;
                        transition: var(--transition);
                    }
                    
                    .close-modal:hover {
                        color: var(--accent-primary);
                    }
                    
                    .modal-body {
                        text-align: center;
                    }
                    
                    .modal-avatar {
                        width: 100px;
                        height: 100px;
                        background: linear-gradient(135deg, var(--accent-primary), var(--accent-blue));
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 2rem;
                        font-weight: 700;
                        margin: 0 auto 20px;
                    }
                    
                    .modal-body h4 {
                        font-size: 1.5rem;
                        margin-bottom: 10px;
                    }
                    
                    .member-bio {
                        color: var(--text-secondary);
                        line-height: 1.6;
                        margin: 20px 0;
                        padding: 15px;
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: var(--border-radius);
                    }
                    
                    .member-skills {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                        justify-content: center;
                        margin-top: 20px;
                    }
                    
                    .skill-tag {
                        padding: 6px 12px;
                        background: rgba(76, 175, 80, 0.2);
                        color: var(--accent-primary);
                        border-radius: 20px;
                        font-size: 0.8rem;
                        font-weight: 600;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `;
                
                document.head.appendChild(styles);
                document.body.appendChild(modal);
                
                // Close modal functionality
                modal.querySelector('.close-modal').addEventListener('click', () => {
                    document.body.removeChild(modal);
                    document.head.removeChild(styles);
                });
                
                // Close modal on background click
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                        document.head.removeChild(styles);
                    }
                });
            });
        });

        // ===== SOLUTION CARDS INTERACTION =====
        solutionCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--shadow)';
            });
        });

        // ===== FEATURE CARDS INTERACTION =====
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.feature-icon');
                icon.style.transform = 'scale(1.15) rotate(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.feature-icon');
                icon.style.transform = 'scale(1.1)';
            });
        });

        // ===== SCROLL ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all section cards
        document.querySelectorAll('.section-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // ===== COPY CONTACT INFO =====
        document.querySelectorAll('.contact-item').forEach(item => {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', function() {
                const text = this.querySelector('p').textContent;
                
                // Copy to clipboard
                navigator.clipboard.writeText(text).then(() => {
                    // Show feedback
                    const originalBackground = this.style.background;
                    this.style.background = 'rgba(76, 175, 80, 0.1)';
                    this.style.borderColor = 'var(--accent-primary)';
                    
                    setTimeout(() => {
                        this.style.background = originalBackground;
                        this.style.borderColor = '';
                    }, 1000);
                });
            });
        });

        // ===== PAGE LOAD ANIMATION =====
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
            
            // Add current year
            const currentYear = new Date().getFullYear();
            const yearElements = document.querySelectorAll('.current-year');
            yearElements.forEach(el => {
                el.textContent = currentYear;
            });
        });

        // ===== KEYBOARD SHORTCUTS =====
        document.addEventListener('keydown', (e) => {
            // Ctrl + H to highlight team members
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                teamMembers.forEach(member => {
                    member.style.borderColor = 'var(--accent-secondary)';
                    member.style.boxShadow = '0 0 15px rgba(255, 152, 0, 0.3)';
                    
                    setTimeout(() => {
                        member.style.borderColor = '';
                        member.style.boxShadow = '';
                    }, 2000);
                });
            }
            
            // Escape to remove any modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.member-modal');
                if (modal) {
                    document.body.removeChild(modal);
                    const styles = document.querySelector('style[data-modal]');
                    if (styles) styles.remove();
                }
            }
        });

        // ===== PRINT FUNCTIONALITY =====
        function addPrintButton() {
            const printBtn = document.createElement('button');
            printBtn.className = 'print-button';
            printBtn.innerHTML = '<i class="fas fa-print"></i> Cetak Halaman';
            printBtn.title = 'Cetak informasi tentang kami';
            
            printBtn.style.position = 'fixed';
            printBtn.style.bottom = '20px';
            printBtn.style.right = '20px';
            printBtn.style.background = 'var(--accent-primary)';
            printBtn.style.color = 'var(--primary-bg)';
            printBtn.style.border = 'none';
            printBtn.style.padding = '12px 20px';
            printBtn.style.borderRadius = 'var(--border-radius)';
            printBtn.style.fontWeight = '600';
            printBtn.style.cursor = 'pointer';
            printBtn.style.zIndex = '999';
            printBtn.style.display = 'flex';
            printBtn.style.alignItems = 'center';
            printBtn.style.gap = '8px';
            printBtn.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
            
            printBtn.addEventListener('click', () => {
                window.print();
            });
            
            document.body.appendChild(printBtn);
        }

        // Initialize print button
        addPrintButton();