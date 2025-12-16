        // Global variables
        let selectedElement = null;
        let zoomLevel = 100;
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };
        let currentTemplate = '';
        let currentCanvasSize = { width: 794, height: 1123 };
        let selectedFormat = 'pdf';
        let isExporting = false;
        let isOfflineMode = false;
        let layers = [];
        let currentPanel = null;
        let currentSettingsTab = 'general';

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Tampilkan halaman pemilihan template di awal
            document.getElementById('templateSelectionPage').style.display = 'flex';
            document.getElementById('appContainer').style.display = 'none';
            
            // Setup event listeners untuk asset cards
            setupAssetCards();
            
            // Update layer list
            updateLayersList();
            
            // Setup settings tabs
            setupSettingsTabs();
            
            // Setup UI font size slider
            setupUIFontSizeSlider();
            
            // Setup canvas drag and drop
            setTimeout(() => {
                setupCanvasDragAndDrop();
            }, 100);
        });

        // PERBAIKAN: Fungsi untuk kembali ke dashboard
        function goToDashboard() {
            // Sembunyikan editor
            document.getElementById('appContainer').style.display = 'none';
            
            // Tampilkan halaman pemilihan template
            document.getElementById('templateSelectionPage').style.display = 'flex';
            
            // Reset state panel
            closePanel();
            
            // Reset tombol navigasi
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Aktifkan tombol home
            const homeBtn = document.querySelector('.nav-btn[title="Dashboard"]');
            if (homeBtn) {
                homeBtn.classList.add('active');
            }
            
            showToast('Kembali ke dashboard');
        }

        // Setup settings tabs
        function setupSettingsTabs() {
            const tabs = document.querySelectorAll('.settings-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active to clicked tab
                    this.classList.add('active');
                    
                    // Hide all settings content
                    document.querySelectorAll('.settings-content').forEach(content => {
                        content.classList.add('hidden');
                    });
                    
                    // Show selected tab content
                    const tabId = this.getAttribute('data-tab');
                    currentSettingsTab = tabId;
                    document.getElementById(tabId + 'Settings').classList.remove('hidden');
                });
            });
        }

        // Setup UI font size slider
        function setupUIFontSizeSlider() {
            const slider = document.getElementById('uiFontSize');
            const value = document.getElementById('uiFontSizeValue');
            
            slider.addEventListener('input', function() {
                value.textContent = this.value + 'px';
                // In a real app, this would update the UI font size
            });
        }

        // Fungsi untuk memilih template
        function selectTemplate(templateType) {
            currentTemplate = templateType;
            
            // Sembunyikan halaman pemilihan template
            document.getElementById('templateSelectionPage').style.display = 'none';
            
            // Tampilkan editor
            document.getElementById('appContainer').style.display = 'flex';
            
            // Setup editor berdasarkan template yang dipilih
            setupEditorForTemplate(templateType);
            showToast(`Template ${templateType.toUpperCase()} dipilih!`);
        }

        // Fungsi untuk memulai dengan halaman kosong
        function startWithBlank() {
            currentTemplate = 'blank';
            
            // Sembunyikan halaman pemilihan template
            document.getElementById('templateSelectionPage').style.display = 'none';
            
            // Tampilkan editor
            document.getElementById('appContainer').style.display = 'flex';
            
            // Setup editor dengan ukuran default
            setupEditorForTemplate('blank');
            showToast('Mulai dengan halaman kosong!');
        }

        // Setup editor berdasarkan template
        function setupEditorForTemplate(templateType) {
            const canvas = document.getElementById('canvas');
            
            // Bersihkan canvas
            canvas.innerHTML = '';
            layers = [];
            
            // Atur ukuran canvas berdasarkan template
            let width, height;
            let defaultElements = [];
            
            switch(templateType) {
                case 'a4':
                    width = 794;
                    height = 1123;
                    currentCanvasSize = { width, height };
                    defaultElements = [
                        { type: 'text', content: 'Dokumen A4', left: 100, top: 100, fontSize: 36, color: '#1A0A33', layerName: 'Title Text' },
                        { type: 'text', content: 'Ini adalah template dokumen A4 standar', left: 100, top: 150, fontSize: 18, color: '#666', layerName: 'Subtitle Text' },
                        { type: 'shape', shape: 'rectangle', left: 100, top: 250, width: 200, height: 150, bgColor: 'linear-gradient(135deg, #4CAF50, #2196F3)', layerName: 'Shape 1' }
                    ];
                    break;
                    
                case 'a3':
                    width = 1123;
                    height = 794;
                    currentCanvasSize = { width, height };
                    defaultElements = [
                        { type: 'text', content: 'Poster A3 Landscape', left: 150, top: 100, fontSize: 48, color: '#1A0A33', layerName: 'Main Title' },
                        { type: 'text', content: 'Ukuran besar untuk poster dan presentasi', left: 150, top: 170, fontSize: 24, color: '#666', layerName: 'Description' },
                        { type: 'shape', shape: 'rectangle', left: 150, top: 250, width: 300, height: 200, bgColor: 'linear-gradient(135deg, #FF9800, #E91E63)', layerName: 'Background Shape' }
                    ];
                    break;
                    
                case 'youtube':
                    width = 1280;
                    height = 720;
                    currentCanvasSize = { width, height };
                    defaultElements = [
                        { type: 'text', content: 'YouTube Thumbnail', left: 100, top: 100, fontSize: 48, color: '#FF0000', layerName: 'YouTube Title' },
                        { type: 'text', content: 'Klik untuk menonton!', left: 100, top: 170, fontSize: 24, color: '#333', layerName: 'Call to Action' },
                        { type: 'shape', shape: 'rectangle', left: 100, top: 250, width: 300, height: 150, bgColor: '#FF0000', layerName: 'Red Banner' }
                    ];
                    break;
                    
                default: // blank
                    width = 794;
                    height = 1123;
                    currentCanvasSize = { width, height };
                    defaultElements = [
                        { type: 'text', content: 'Halaman Kosong', left: 100, top: 100, fontSize: 36, color: '#1A0A33', layerName: 'Title' },
                        { type: 'text', content: 'Mulai desain dari nol', left: 100, top: 150, fontSize: 18, color: '#666', layerName: 'Instruction' }
                    ];
            }
            
            // Atur ukuran canvas
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            // Update status bar
            document.getElementById('canvasSize').textContent = `Canvas Size: ${width} × ${height}px`;
            
            // Tambahkan elemen default
            defaultElements.forEach((element, index) => {
                addElementToCanvas(element.type, element.content || element.shape, element.left, element.top, element);
                
                // Add to layers
                layers.push({
                    id: index + 1,
                    name: element.layerName || `${element.type} ${index + 1}`,
                    type: element.type,
                    visible: true,
                    element: document.querySelectorAll('.canvas-element')[index]
                });
            });
            
            // Update layer list
            updateLayersList();
            
            // Select first element
            if (defaultElements.length > 0) {
                selectElement(document.querySelector('.canvas-element'));
            }
            
            // Update element count
            updateElementCount();
            
            // PERBAIKAN: Reset tombol navigasi
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Aktifkan tombol home
            const homeBtn = document.querySelector('.nav-btn[title="Dashboard"]');
            if (homeBtn) {
                homeBtn.classList.add('active');
            }
        }

        // Setup asset cards for drag and drop
        function setupAssetCards() {
            const assetCards = document.querySelectorAll('.asset-card[draggable="true"]');
            assetCards.forEach(card => {
                card.addEventListener('dragstart', function(e) {
                    const type = this.getAttribute('data-type');
                    const data = this.getAttribute('data-src') || this.getAttribute('data-icon');
                    
                    e.dataTransfer.setData('elementType', type);
                    e.dataTransfer.setData('elementData', data);
                });
                
                card.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    const data = this.getAttribute('data-src') || this.getAttribute('data-icon');
                    const name = this.querySelector('.asset-name').textContent;
                    
                    addElementToCanvas(type, data, 200, 200, { layerName: name });
                });
            });
        }

        // Element Creation
        function addElementToCanvas(type, data, x = 100, y = 100, options = {}) {
            const canvas = document.getElementById('canvas');
            let newElement;
            let elementId = layers.length + 1;
            
            if (type === 'text') {
                newElement = document.createElement('div');
                newElement.className = 'canvas-element text-element';
                newElement.style.left = x + 'px';
                newElement.style.top = y + 'px';
                newElement.style.fontSize = (options.fontSize || 24) + 'px';
                newElement.style.color = options.color || '#1A0A33';
                newElement.style.fontFamily = options.fontFamily || 'Arial';
                newElement.style.fontWeight = options.fontWeight || 'normal';
                newElement.textContent = data || 'New Text';
                newElement.dataset.elementId = elementId;
                
                // Double-click to edit
                newElement.addEventListener('dblclick', function() {
                    this.contentEditable = true;
                    this.focus();
                });
                
                newElement.addEventListener('blur', function() {
                    this.contentEditable = false;
                    document.getElementById('textContent').value = this.textContent;
                    
                    // Update layer name
                    const layer = layers.find(l => l.element === this);
                    if (layer && this.textContent.length > 0) {
                        layer.name = this.textContent.substring(0, 20) + (this.textContent.length > 20 ? '...' : '');
                        updateLayersList();
                    }
                });
            }
            else if (type === 'shape') {
                newElement = document.createElement('div');
                newElement.className = 'canvas-element shape-element';
                newElement.style.left = x + 'px';
                newElement.style.top = y + 'px';
                newElement.style.width = (options.width || 100) + 'px';
                newElement.style.height = (options.height || 100) + 'px';
                newElement.dataset.elementId = elementId;
                
                if (data === 'rectangle') {
                    newElement.style.borderRadius = options.borderRadius || '8px';
                    newElement.style.background = options.bgColor || 'linear-gradient(135deg, #4CAF50, #2196F3)';
                }
            }
            else if (type === 'image' || type === 'icon') {
                newElement = document.createElement('div');
                newElement.className = 'canvas-element';
                newElement.style.left = x + 'px';
                newElement.style.top = y + 'px';
                newElement.style.width = '100px';
                newElement.style.height = '100px';
                newElement.style.background = 'linear-gradient(135deg, #4CAF50, #2196F3)';
                newElement.style.borderRadius = '8px';
                newElement.style.display = 'flex';
                newElement.style.alignItems = 'center';
                newElement.style.justifyContent = 'center';
                newElement.dataset.elementId = elementId;
                
                const icon = document.createElement('i');
                icon.className = type === 'icon' ? `fas fa-${data}` : 'fas fa-image';
                icon.style.color = 'white';
                icon.style.fontSize = '40px';
                newElement.appendChild(icon);
            }
            
            // Add click listener
            newElement.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                selectElement(this);
                
                if (!e.target.classList.contains('fa-arrows-alt')) {
                    startDrag(this, e);
                }
            });
            
            canvas.appendChild(newElement);
            
            // Add to layers
            const layerName = options.layerName || `${type} ${elementId}`;
            layers.push({
                id: elementId,
                name: layerName,
                type: type,
                visible: true,
                element: newElement
            });
            
            selectElement(newElement);
            updateLayersList();
            updateElementCount();
            showToast('Element added to canvas');
        }

        // Element Selection
        function selectElement(element) {
            // Remove selection from all elements
            document.querySelectorAll('.canvas-element').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Remove selection from all layers
            document.querySelectorAll('.layer-item').forEach(layer => {
                layer.classList.remove('selected');
            });
            
            // Update selectedElement
            selectedElement = element;
            
            if (element) {
                element.classList.add('selected');
                updatePropertyPanel(element);
                updateStatusBar(element);
                
                // Select corresponding layer
                const layer = layers.find(l => l.element === element);
                if (layer) {
                    const layerItem = document.querySelector(`.layer-item[data-id="${layer.id}"]`);
                    if (layerItem) {
                        layerItem.classList.add('selected');
                    }
                }
            } else {
                clearPropertyPanel();
            }
        }

        function updatePropertyPanel(element) {
            if (element.classList.contains('text-element')) {
                document.getElementById('textContent').value = element.textContent;
                const fontSize = parseInt(element.style.fontSize) || 24;
                document.getElementById('fontSize').value = fontSize;
                document.getElementById('fontSizeValue').textContent = fontSize + 'px';
                
                // Update position sliders
                const left = parseInt(element.style.left) || 100;
                const top = parseInt(element.style.top) || 100;
                document.getElementById('posX').value = left;
                document.getElementById('posY').value = top;
                document.getElementById('posXValue').textContent = left + 'px';
                document.getElementById('posYValue').textContent = top + 'px';
                
                // Update layer name
                const layer = layers.find(l => l.element === element);
                if (layer) {
                    document.getElementById('layerName').value = layer.name;
                }
                
                // Update color preview
                const color = element.style.color || '#1A0A33';
                document.getElementById('colorPreview').style.background = color;
            } else if (element.classList.contains('shape-element')) {
                // Update shape properties
                const width = parseInt(element.style.width) || 100;
                const height = parseInt(element.style.height) || 100;
                document.getElementById('shapeWidth').value = width;
                document.getElementById('shapeHeight').value = height;
                
                const left = parseInt(element.style.left) || 100;
                const top = parseInt(element.style.top) || 100;
                document.getElementById('posX').value = left;
                document.getElementById('posY').value = top;
                document.getElementById('posXValue').textContent = left + 'px';
                document.getElementById('posYValue').textContent = top + 'px';
                
                // Update layer name
                const layer = layers.find(l => l.element === element);
                if (layer) {
                    document.getElementById('layerName').value = layer.name;
                }
            }
        }

        function clearPropertyPanel() {
            document.getElementById('textContent').value = '';
            document.getElementById('selectedElement').textContent = 'Selected: None';
        }

        function updateStatusBar(element) {
            const elementType = element.classList.contains('text-element') ? 'Text Element' :
                               element.classList.contains('shape-element') ? 'Shape Element' : 'Element';
            document.getElementById('selectedElement').textContent = `Selected: ${elementType}`;
        }

        function updateElementCount() {
            document.getElementById('elementCount').textContent = `Elements: ${layers.length}`;
        }

        // Update layers list
        function updateLayersList() {
            const layersList = document.getElementById('layersList');
            layersList.innerHTML = '';
            
            // Sort layers by their position in DOM (z-index)
            const sortedLayers = [...layers].reverse();
            
            sortedLayers.forEach(layer => {
                const layerItem = document.createElement('div');
                layerItem.className = `layer-item ${layer.visible ? '' : 'hidden'} ${layer.type === 'text' ? 'layer-text' : 'layer-shape'}`;
                layerItem.dataset.id = layer.id;
                
                layerItem.innerHTML = `
                    <div class="layer-icon">
                        <i class="fas fa-${layer.type === 'text' ? 'font' : layer.type === 'shape' ? 'square' : 'image'}"></i>
                    </div>
                    <div class="layer-info">
                        <div class="layer-name">${layer.name}</div>
                        <div class="layer-type">${layer.type.charAt(0).toUpperCase() + layer.type.slice(1)}</div>
                    </div>
                    <button class="layer-visibility" onclick="toggleLayerVisibility(${layer.id}, event)">
                        <i class="fas fa-${layer.visible ? 'eye' : 'eye-slash'}"></i>
                    </button>
                `;
                
                layerItem.addEventListener('click', () => {
                    selectElement(layer.element);
                });
                
                layersList.appendChild(layerItem);
            });
        }

        // PERBAIKAN: Panel Management
        function togglePanel(panelName) {
            const leftPanel = document.getElementById('leftPanel');
            const panel = document.getElementById(panelName + 'Panel');
            
            // If clicking the same panel, close it
            if (currentPanel === panelName) {
                closePanel();
                return;
            }
            
            // Hide all panels
            document.querySelectorAll('.panel-content').forEach(p => {
                p.classList.add('hidden');
            });
            
            // Show selected panel
            panel.classList.remove('hidden');
            
            // Show left panel if it's collapsed
            leftPanel.classList.remove('panel-collapsed');
            
            // Update current panel
            currentPanel = panelName;
            
            // Update tombol navigasi aktif
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Aktifkan tombol yang sesuai dengan panel yang dibuka
            const activeBtn = document.querySelector(`.nav-btn[title="${panelName.charAt(0).toUpperCase() + panelName.slice(1)}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }

        // PERBAIKAN: Fungsi closePanel
        function closePanel() {
            const leftPanel = document.getElementById('leftPanel');
            leftPanel.classList.add('panel-collapsed');
            currentPanel = null;
            
            // Reset semua tombol navigasi
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Aktifkan tombol home
            const homeBtn = document.querySelector('.nav-btn[title="Dashboard"]');
            if (homeBtn) {
                homeBtn.classList.add('active');
            }
        }

        // Tool Selection
        function selectTool(tool) {
            // Remove active from all tool buttons
            document.querySelectorAll('.tool-btn-top').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active to clicked tool
            event.currentTarget.classList.add('active');
            
            showToast(`${tool.charAt(0).toUpperCase() + tool.slice(1)} tool selected`);
        }

        // Alignment Functions
        function alignElements(alignment) {
            if (!selectedElement) {
                showToast('Select an element first');
                return;
            }
            
            const canvas = document.getElementById('canvas');
            const canvasWidth = canvas.clientWidth;
            
            switch(alignment) {
                case 'left':
                    selectedElement.style.left = '20px';
                    break;
                case 'center':
                    const elementWidth = selectedElement.offsetWidth;
                    selectedElement.style.left = (canvasWidth / 2 - elementWidth / 2) + 'px';
                    break;
                case 'right':
                    const elementWidthRight = selectedElement.offsetWidth;
                    selectedElement.style.left = (canvasWidth - elementWidthRight - 20) + 'px';
                    break;
            }
            
            showToast(`Aligned ${alignment}`);
        }

        function distributeElements(direction) {
            const elements = document.querySelectorAll('.canvas-element');
            if (elements.length < 2) {
                showToast('Need at least 2 elements to distribute');
                return;
            }
            
            // Simple distribution simulation
            showToast(`Distributed elements ${direction}ly`);
        }

        // Margin and Spacing Controls
        function updateCanvasMargin() {
            const margin = document.getElementById('marginTop').value;
            const canvas = document.getElementById('canvas');
            canvas.style.margin = margin + 'px';
            showToast(`Canvas margin updated to ${margin}px`);
        }

        function updateElementSpacing() {
            const spacing = document.getElementById('elementSpacing').value;
            // In a real app, this would adjust spacing between selected elements
            showToast(`Element spacing set to ${spacing}px`);
        }

        // Layer Functions
        function toggleLayerVisibility(layerId, event) {
            if (event) event.stopPropagation();
            
            const layer = layers.find(l => l.id === layerId);
            if (layer) {
                layer.visible = !layer.visible;
                layer.element.style.display = layer.visible ? 'block' : 'none';
                updateLayersList();
                showToast(`Layer ${layer.visible ? 'shown' : 'hidden'}`);
            }
        }

        // Font Functions
        function selectFont(font) {
            if (selectedElement && selectedElement.classList.contains('text-element')) {
                selectedElement.style.fontFamily = font;
                showToast(`Font changed to ${font}`);
                
                // Update font buttons
                document.querySelectorAll('.font-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                event.currentTarget.classList.add('active');
            }
        }

        // Color Functions
        function selectColorFromWheel(event) {
            // Simulated color selection
            const colors = ['#1A0A33', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            document.getElementById('colorPreview').style.background = randomColor;
            
            if (selectedElement && selectedElement.classList.contains('text-element')) {
                selectedElement.style.color = randomColor;
                showToast('Text color updated');
            }
        }

        // Tool Functions
        function undo() {
            showToast('Undo action');
        }

        function redo() {
            showToast('Redo action');
        }

        function deleteSelected() {
            if (selectedElement) {
                // Remove from layers
                const layerIndex = layers.findIndex(l => l.element === selectedElement);
                if (layerIndex !== -1) {
                    layers.splice(layerIndex, 1);
                }
                
                selectedElement.remove();
                selectedElement = null;
                clearPropertyPanel();
                updateLayersList();
                updateElementCount();
                showToast('Element deleted');
            } else {
                showToast('No element selected');
            }
        }

        // Offline Mode
        function toggleOfflineMode() {
            isOfflineMode = !isOfflineMode;
            const btn = document.getElementById('offlineBtn');
            
            if (isOfflineMode) {
                btn.innerHTML = '<i class="fas fa-wifi-slash"></i> Offline';
                btn.classList.add('active');
                showToast('Offline mode activated');
            } else {
                btn.innerHTML = '<i class="fas fa-wifi"></i> Online';
                btn.classList.remove('active');
                showToast('Online mode activated');
            }
        }

        // Settings Functions
        function showSettingsModal() {
            document.getElementById('settingsModal').classList.add('active');
        }

        function selectLanguage(lang) {
            // Remove selected from all language options
            document.querySelectorAll('.language-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected to clicked option
            event.currentTarget.classList.add('selected');
            
            showToast(`Language changed to ${lang}`);
        }

        function selectTheme(theme) {
            // Remove selected from all theme options
            document.querySelectorAll('.theme-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected to clicked option
            event.currentTarget.classList.add('selected');
            
            showToast(`Theme changed to ${theme}`);
        }

        function changePassword() {
            showToast('Password change dialog would open here');
        }

        function exportUserData() {
            showToast('Exporting user data...');
        }

        function deleteAccount() {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                showToast('Account deletion initiated...');
            }
        }

        function saveSettings() {
            showToast('Settings saved successfully!');
            closeModal('settingsModal');
        }

        // Modal Functions
        function showExportModal() {
            document.getElementById('exportModal').classList.add('active');
        }

        function showShareModal() {
            document.getElementById('shareModal').classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        function selectFormat(element) {
            // Remove selected from all format options
            document.querySelectorAll('.format-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected to clicked option
            element.classList.add('selected');
            selectedFormat = element.getAttribute('data-format');
        }

        // Export Functions (Simulasi)
        function startExport() {
            if (isExporting) return;
            
            isExporting = true;
            document.getElementById('exportBtn').disabled = true;
            document.getElementById('exportProgress').classList.remove('hidden');
            
            // Simulate export process
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 10;
                document.getElementById('progressFill').style.width = progress + '%';
                document.getElementById('progressText').textContent = 
                    progress < 100 ? `Exporting ${selectedFormat.toUpperCase()}... ${progress}%` : 'Finishing up...';
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        document.getElementById('exportProgress').classList.add('hidden');
                        document.getElementById('exportSuccess').classList.remove('hidden');
                        document.getElementById('exportBtn').textContent = 'Done';
                        document.getElementById('exportBtn').disabled = false;
                        document.getElementById('exportBtn').onclick = function() {
                            closeModal('exportModal');
                            showToast(`Design exported as ${selectedFormat.toUpperCase()} successfully!`);
                        };
                        isExporting = false;
                    }, 500);
                }
            }, 200);
        }

        // Share Functions (Simulasi)
        function shareViaWhatsApp() {
            showToast('Opening WhatsApp to share design...');
            
            setTimeout(() => {
                showToast('Design shared via WhatsApp!');
            }, 1000);
        }

        function copyShareLink() {
            const linkInput = document.getElementById('shareLink');
            linkInput.select();
            linkInput.setSelectionRange(0, 99999);
            
            try {
                navigator.clipboard.writeText(linkInput.value).then(() => {
                    document.getElementById('shareSuccess').classList.remove('hidden');
                    showToast('Collaboration link copied to clipboard!');
                });
            } catch (err) {
                document.execCommand('copy');
                document.getElementById('shareSuccess').classList.remove('hidden');
                showToast('Collaboration link copied to clipboard!');
            }
        }

        // Toast Notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Drag and Drop for Canvas
        function setupCanvasDragAndDrop() {
            const canvas = document.getElementById('canvas');
            
            // Allow drop
            canvas.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            
            // Handle drop
            canvas.addEventListener('drop', function(e) {
                e.preventDefault();
                const elementType = e.dataTransfer.getData('elementType');
                const elementData = e.dataTransfer.getData('elementData');
                
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                addElementToCanvas(elementType, elementData, x, y);
            });
            
            // Mouse events for dragging elements
            canvas.addEventListener('mousedown', handleCanvasMouseDown);
            canvas.addEventListener('mousemove', handleCanvasMouseMove);
            canvas.addEventListener('mouseup', handleCanvasMouseUp);
            
            // Update mouse coordinates
            canvas.addEventListener('mousemove', function(e) {
                const rect = canvas.getBoundingClientRect();
                const x = Math.round(e.clientX - rect.left);
                const y = Math.round(e.clientY - rect.top);
                document.getElementById('mouseCoords').textContent = `X: ${x}, Y: ${y}`;
            });
        }

        function handleCanvasMouseDown(e) {
            if (e.target.classList.contains('canvas-element') || 
                e.target.closest('.canvas-element')) {
                const element = e.target.classList.contains('canvas-element') 
                    ? e.target 
                    : e.target.closest('.canvas-element');
                
                e.stopPropagation();
                selectElement(element);
                
                if (!e.target.classList.contains('fa-arrows-alt')) {
                    startDrag(element, e);
                }
            } else {
                selectElement(null);
            }
        }

        function handleCanvasMouseMove(e) {
            if (!isDragging || !selectedElement) return;
            
            const canvas = document.getElementById('canvas');
            const rect = canvas.getBoundingClientRect();
            
            const x = e.clientX - rect.left - dragOffset.x;
            const y = e.clientY - rect.top - dragOffset.y;
            
            const maxX = canvas.clientWidth - selectedElement.offsetWidth;
            const maxY = canvas.clientHeight - selectedElement.offsetHeight;
            
            selectedElement.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            selectedElement.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
            
            // Update position sliders
            const left = parseInt(selectedElement.style.left) || 100;
            const top = parseInt(selectedElement.style.top) || 100;
            document.getElementById('posX').value = left;
            document.getElementById('posY').value = top;
            document.getElementById('posXValue').textContent = left + 'px';
            document.getElementById('posYValue').textContent = top + 'px';
        }

        function handleCanvasMouseUp() {
            isDragging = false;
            document.body.style.cursor = 'default';
        }

        function startDrag(element, e) {
            isDragging = true;
            
            const rect = element.getBoundingClientRect();
            const canvasRect = document.getElementById('canvas').getBoundingClientRect();
            
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            
            document.body.style.cursor = 'grabbing';
        }