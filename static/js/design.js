// EzyDraw Pro - Advanced Design Editor
// Main Application Class

class EzyDrawEditor {
    constructor() {
        // State Management
        this.state = {
            currentTool: 'select',
            selectedElement: null,
            elements: [],
            canvas: {
                width: 1920,
                height: 1080,
                backgroundColor: '#FFFFFF',
                zoom: 1,
                grid: {
                    enabled: true,
                    size: 50,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                rulers: {
                    enabled: false
                }
            },
            history: {
                stack: [],
                index: -1,
                maxSize: 50
            },
            mouse: {
                x: 0,
                y: 0,
                startX: 0,
                startY: 0,
                isDown: false,
                isDragging: false
            },
            selection: {
                box: null,
                handles: [],
                isResizing: false,
                isRotating: false
            }
        };

        // DOM Elements
        this.elements = {
            canvas: null,
            ctx: null,
            canvasContainer: null,
            canvasWrapper: null,
            selectionBox: null,
            statusText: null,
            coordinates: null,
            canvasInfo: null,
            zoomDisplay: null,
            leftSidebar: null,
            rightSidebar: null,
            notificationContainer: null
        };

        // Initialize
        this.init();
    }

    init() {
        this.setupDOMElements();
        this.setupCanvas();
        this.setupEventListeners();
        this.setupInitialState();
        this.render();
        this.showNotification('Welcome to EzyDraw Pro!', 'success');
    }

    setupDOMElements() {
        this.elements.canvas = document.getElementById('mainCanvas');
        this.elements.ctx = this.elements.canvas.getContext('2d');
        this.elements.canvasContainer = document.getElementById('canvasContainer');
        this.elements.canvasWrapper = document.getElementById('canvasWrapper');
        this.elements.selectionBox = document.getElementById('selectionBox');
        this.elements.statusText = document.getElementById('statusText');
        this.elements.coordinates = document.getElementById('coordinates');
        this.elements.canvasInfo = document.getElementById('canvasInfo');
        this.elements.zoomDisplay = document.querySelector('.zoom-display');
        this.elements.leftSidebar = document.getElementById('leftSidebar');
        this.elements.rightSidebar = document.getElementById('rightSidebar');
        this.elements.notificationContainer = document.getElementById('notificationContainer');
    }

    setupCanvas() {
        this.updateCanvasSize();
        this.setupCanvasEvents();
    }

    setupCanvasEvents() {
        const canvas = this.elements.canvas;
        
        // Mouse events
        canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        canvas.addEventListener('wheel', this.handleWheel.bind(this));
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Context menu
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    setupEventListeners() {
        // Tool selection
        document.querySelectorAll('.tool-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tool = e.currentTarget.dataset.tool;
                this.selectTool(tool);
            });
        });

        // Canvas size inputs
        document.getElementById('canvasWidth').addEventListener('change', (e) => {
            this.setCanvasSize(parseInt(e.target.value), this.state.canvas.height);
        });

        document.getElementById('canvasHeight').addEventListener('change', (e) => {
            this.setCanvasSize(this.state.canvas.width, parseInt(e.target.value));
        });

        // Preset sizes
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const width = parseInt(e.target.dataset.width);
                const height = parseInt(e.target.dataset.height);
                this.setCanvasSize(width, height);
                
                // Update active state
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Background color
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.setBackgroundColor(color);
                
                // Update active state
                document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Property controls
        document.getElementById('strokeWidth').addEventListener('input', (e) => {
            this.updateStrokeWidth(e.target.value);
        });

        document.getElementById('fontSize').addEventListener('input', (e) => {
            this.updateFontSize(e.target.value);
        });

        document.getElementById('textContent').addEventListener('input', (e) => {
            this.updateTextContent(e.target.value);
        });

        document.getElementById('fontFamily').addEventListener('change', (e) => {
            this.updateFontFamily(e.target.value);
        });

        // Toolbar buttons
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('zoomInBtn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOutBtn').addEventListener('click', () => this.zoomOut());
        document.getElementById('resetZoomBtn').addEventListener('click', () => this.resetZoom());
        document.getElementById('gridToggle').addEventListener('click', () => this.toggleGrid());
        document.getElementById('rulersToggle').addEventListener('click', () => this.toggleRulers());

        // Action buttons
        document.getElementById('exportBtn').addEventListener('click', () => this.showExportModal());
        document.getElementById('shareBtn').addEventListener('click', () => this.showShareModal());
        document.getElementById('previewBtn').addEventListener('click', () => this.togglePreview());

        // Modal controls
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.dataset.modal;
                this.closeModal(modalId);
            });
        });

        document.getElementById('exportConfirm').addEventListener('click', () => this.exportDesign());

        // Template loading
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const template = e.currentTarget.dataset.template;
                this.loadTemplate(template);
            });
        });

        // Sidebar toggles
        document.getElementById('leftToggle').addEventListener('click', () => this.toggleLeftSidebar());
        document.getElementById('rightToggle').addEventListener('click', () => this.toggleRightSidebar());

        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupInitialState() {
        // Add some default elements
        this.addElement({
            type: 'rectangle',
            x: 100,
            y: 100,
            width: 300,
            height: 200,
            fill: '#4CAF50',
            stroke: '#000000',
            strokeWidth: 2,
            name: 'Green Rectangle'
        });

        this.addElement({
            type: 'text',
            x: 200,
            y: 200,
            text: 'Welcome to EzyDraw Pro',
            fontSize: 48,
            fontFamily: 'Arial',
            fill: '#333333',
            name: 'Welcome Text'
        });

        this.addElement({
            type: 'circle',
            x: 500,
            y: 300,
            radius: 80,
            fill: '#FF9800',
            stroke: '#000000',
            strokeWidth: 2,
            name: 'Orange Circle'
        });

        this.saveState();
    }

    // Canvas Management
    updateCanvasSize() {
        const { width, height } = this.state.canvas;
        this.elements.canvas.width = width;
        this.elements.canvas.height = height;
        
        // Update inputs
        document.getElementById('canvasWidth').value = width;
        document.getElementById('canvasHeight').value = height;
        
        // Update status
        this.elements.canvasInfo.textContent = `${width} × ${height}`;
    }

    setCanvasSize(width, height) {
        this.state.canvas.width = width;
        this.state.canvas.height = height;
        this.updateCanvasSize();
        this.render();
        this.saveState();
        this.updateStatus(`Canvas size set to ${width}×${height}`);
    }

    setBackgroundColor(color) {
        this.state.canvas.backgroundColor = color;
        document.getElementById('bgColor').value = color;
        document.getElementById('bgColorPreview').style.background = color;
        this.render();
        this.updateStatus(`Background color changed to ${color}`);
    }

    // Tool Management
    selectTool(tool) {
        this.state.currentTool = tool;
        
        // Update UI
        document.querySelectorAll('.tool-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tool="${tool}"]`).classList.add('active');
        
        // Update cursor
        const cursors = {
            select: 'default',
            hand: 'grab',
            rectangle: 'crosshair',
            circle: 'crosshair',
            triangle: 'crosshair',
            line: 'crosshair',
            text: 'text',
            image: 'copy',
            icon: 'copy'
        };
        
        this.elements.canvas.style.cursor = cursors[tool] || 'default';
        this.updateStatus(`${tool.charAt(0).toUpperCase() + tool.slice(1)} tool selected`);
    }

    // Element Management
    addElement(elementData) {
        const element = {
            id: Date.now() + Math.random(),
            ...elementData,
            visible: true,
            locked: false,
            opacity: 1,
            rotation: 0
        };
        
        this.state.elements.push(element);
        this.selectElement(this.state.elements.length - 1);
        this.updateLayersList();
        this.render();
        this.saveState();
        
        return element;
    }

    selectElement(index) {
        this.state.selectedElement = index;
        this.updatePropertiesPanel();
        this.updateLayersList();
        this.render();
    }

    deleteElement(index) {
        if (index >= 0 && index < this.state.elements.length) {
            this.state.elements.splice(index, 1);
            if (this.state.selectedElement === index) {
                this.state.selectedElement = null;
            } else if (this.state.selectedElement > index) {
                this.state.selectedElement--;
            }
            this.updateLayersList();
            this.render();
            this.saveState();
            this.updateStatus('Element deleted');
        }
    }

    // Mouse and Touch Events
    handleMouseDown(e) {
        const rect = this.elements.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / this.state.canvas.zoom;
        const y = (e.clientY - rect.top) / this.state.canvas.zoom;
        
        this.state.mouse.startX = x;
        this.state.mouse.startY = y;
        this.state.mouse.x = x;
        this.state.mouse.y = y;
        this.state.mouse.isDown = true;
        
        if (this.state.currentTool === 'select') {
            const elementIndex = this.getElementAtPosition(x, y);
            if (elementIndex !== -1) {
                this.selectElement(elementIndex);
                this.state.mouse.isDragging = true;
            } else {
                this.state.selectedElement = null;
                this.render();
            }
        } else if (this.state.currentTool === 'hand') {
            this.state.mouse.isDragging = true;
        } else {
            this.startDrawing(x, y);
        }
    }

    handleMouseMove(e) {
        const rect = this.elements.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / this.state.canvas.zoom;
        const y = (e.clientY - rect.top) / this.state.canvas.zoom;
        
        this.state.mouse.x = x;
        this.state.mouse.y = y;
        
        // Update coordinates display
        this.elements.coordinates.textContent = `${Math.round(x)}, ${Math.round(y)}`;
        
        if (this.state.mouse.isDown) {
            if (this.state.currentTool === 'select' && this.state.mouse.isDragging) {
                this.dragElement(x, y);
            } else if (this.state.currentTool === 'hand' && this.state.mouse.isDragging) {
                this.panCanvas(x, y);
            } else if (this.isDrawingTool()) {
                this.updateDrawing(x, y);
            }
        }
    }

    handleMouseUp(e) {
        this.state.mouse.isDown = false;
        this.state.mouse.isDragging = false;
        
        if (this.isDrawingTool()) {
            this.finishDrawing();
        }
        
        this.saveState();
    }

    handleWheel(e) {
        e.preventDefault();
        
        const zoomFactor = 0.1;
        if (e.deltaY < 0) {
            this.zoomIn();
        } else {
            this.zoomOut();
        }
    }

    // Touch Events for Mobile
    handleTouchStart(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const rect = this.elements.canvas.getBoundingClientRect();
            const x = (touch.clientX - rect.left) / this.state.canvas.zoom;
            const y = (touch.clientY - rect.top) / this.state.canvas.zoom;
            
            this.handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
        }
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
        }
    }

    handleTouchEnd(e) {
        this.handleMouseUp();
    }

    // Drawing Tools
    startDrawing(x, y) {
        let element;
        
        switch (this.state.currentTool) {
            case 'rectangle':
                element = {
                    type: 'rectangle',
                    x: x,
                    y: y,
                    width: 0,
                    height: 0,
                    fill: '#4CAF50',
                    stroke: '#000000',
                    strokeWidth: 2,
                    name: 'Rectangle'
                };
                break;
            case 'circle':
                element = {
                    type: 'circle',
                    x: x,
                    y: y,
                    radius: 0,
                    fill: '#FF9800',
                    stroke: '#000000',
                    strokeWidth: 2,
                    name: 'Circle'
                };
                break;
            case 'text':
                element = {
                    type: 'text',
                    x: x,
                    y: y,
                    text: 'New Text',
                    fontSize: 48,
                    fontFamily: 'Arial',
                    fill: '#333333',
                    name: 'Text'
                };
                break;
            case 'line':
                element = {
                    type: 'line',
                    x1: x,
                    y1: y,
                    x2: x,
                    y2: y,
                    stroke: '#000000',
                    strokeWidth: 2,
                    name: 'Line'
                };
                break;
        }
        
        if (element) {
            this.addElement(element);
        }
    }

    updateDrawing(x, y) {
        const element = this.state.elements[this.state.selectedElement];
        if (!element) return;
        
        switch (element.type) {
            case 'rectangle':
                element.width = x - element.x;
                element.height = y - element.y;
                break;
            case 'circle':
                const dx = x - element.x;
                const dy = y - element.y;
                element.radius = Math.sqrt(dx * dx + dy * dy);
                break;
            case 'line':
                element.x2 = x;
                element.y2 = y;
                break;
        }
        
        this.render();
    }

    finishDrawing() {
        // Additional logic for finishing drawing
        this.updateStatus('Drawing completed');
    }

    // Element Interaction
    dragElement(x, y) {
        const element = this.state.elements[this.state.selectedElement];
        if (!element || element.locked) return;
        
        const deltaX = x - this.state.mouse.startX;
        const deltaY = y - this.state.mouse.startY;
        
        element.x += deltaX;
        element.y += deltaY;
        
        this.state.mouse.startX = x;
        this.state.mouse.startY = y;
        
        this.render();
    }

    panCanvas(x, y) {
        const deltaX = x - this.state.mouse.startX;
        const deltaY = y - this.state.mouse.startY;
        
        this.elements.canvasContainer.scrollLeft -= deltaX;
        this.elements.canvasContainer.scrollTop -= deltaY;
        
        this.state.mouse.startX = x;
        this.state.mouse.startY = y;
    }

    getElementAtPosition(x, y) {
        for (let i = this.state.elements.length - 1; i >= 0; i--) {
            const element = this.state.elements[i];
            if (!element.visible) continue;
            
            if (this.isPointInElement(x, y, element)) {
                return i;
            }
        }
        return -1;
    }

    isPointInElement(x, y, element) {
        switch (element.type) {
            case 'rectangle':
                return x >= element.x && x <= element.x + element.width &&
                       y >= element.y && y <= element.y + element.height;
            case 'circle':
                const dx = x - element.x;
                const dy = y - element.y;
                return Math.sqrt(dx * dx + dy * dy) <= element.radius;
            case 'text':
                this.elements.ctx.font = `${element.fontSize}px ${element.fontFamily}`;
                const metrics = this.elements.ctx.measureText(element.text);
                return x >= element.x && x <= element.x + metrics.width &&
                       y >= element.y && y <= element.y + element.fontSize;
            case 'line':
                const dist = this.distanceToLine(x, y, element.x1, element.y1, element.x2, element.y2);
                return dist <= 5;
        }
        return false;
    }

    distanceToLine(px, py, x1, y1, x2, y2) {
        const A = py - y1;
        const B = x1 - px;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        
        if (lenSq !== 0) {
            param = dot / lenSq;
        }
        
        let xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        const dx = px - xx;
        const dy = py - yy;
        
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Rendering
    render() {
        const { ctx, canvas } = this.elements;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = this.state.canvas.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        if (this.state.canvas.grid.enabled) {
            this.drawGrid();
        }
        
        // Draw elements
        this.state.elements.forEach((element, index) => {
            if (element.visible) {
                this.drawElement(element, index === this.state.selectedElement);
            }
        });
        
        // Draw selection box
        if (this.state.selectedElement !== null) {
            this.drawSelectionBox();
        }
    }

    drawGrid() {
        const { ctx, canvas } = this.elements;
        const { size, color } = this.state.canvas.grid;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x < canvas.width; x += size) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < canvas.height; y += size) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    drawElement(element, selected = false) {
        const { ctx } = this.elements;
        
        ctx.save();
        
        // Apply rotation
        if (element.rotation) {
            ctx.translate(element.x + (element.width || 0) / 2, element.y + (element.height || 0) / 2);
            ctx.rotate(element.rotation * Math.PI / 180);
            ctx.translate(-(element.x + (element.width || 0) / 2), -(element.y + (element.height || 0) / 2));
        }
        
        // Apply opacity
        if (element.opacity !== 1) {
            ctx.globalAlpha = element.opacity;
        }
        
        switch (element.type) {
            case 'rectangle':
                this.drawRectangle(element);
                break;
            case 'circle':
                this.drawCircle(element);
                break;
            case 'text':
                this.drawText(element);
                break;
            case 'line':
                this.drawLine(element);
                break;
            case 'image':
                this.drawImage(element);
                break;
        }
        
        // Draw selection outline
        if (selected) {
            this.drawSelectionOutline(element);
        }
        
        ctx.restore();
    }

    drawRectangle(element) {
        const { ctx } = this.elements;
        
        // Fill
        ctx.fillStyle = element.fill;
        ctx.fillRect(element.x, element.y, element.width, element.height);
        
        // Stroke
        if (element.strokeWidth > 0) {
            ctx.lineWidth = element.strokeWidth;
            ctx.strokeStyle = element.stroke;
            ctx.strokeRect(element.x, element.y, element.width, element.height);
        }
    }

    drawCircle(element) {
        const { ctx } = this.elements;
        
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
        
        // Fill
        ctx.fillStyle = element.fill;
        ctx.fill();
        
        // Stroke
        if (element.strokeWidth > 0) {
            ctx.lineWidth = element.strokeWidth;
            ctx.strokeStyle = element.stroke;
            ctx.stroke();
        }
    }

    drawText(element) {
        const { ctx } = this.elements;
        
        ctx.font = `${element.fontSize}px ${element.fontFamily}`;
        ctx.fillStyle = element.fill;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(element.text, element.x, element.y);
    }

    drawLine(element) {
        const { ctx } = this.elements;
        
        ctx.lineWidth = element.strokeWidth;
        ctx.strokeStyle = element.stroke;
        ctx.beginPath();
        ctx.moveTo(element.x1, element.y1);
        ctx.lineTo(element.x2, element.y2);
        ctx.stroke();
    }

    drawImage(element) {
        const { ctx } = this.elements;
        
        if (element.image) {
            ctx.drawImage(element.image, element.x, element.y, element.width, element.height);
        }
    }

    drawSelectionOutline(element) {
        const { ctx } = this.elements;
        
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        switch (element.type) {
            case 'rectangle':
                ctx.strokeRect(element.x - 5, element.y - 5, element.width + 10, element.height + 10);
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius + 5, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 'text':
                ctx.font = `${element.fontSize}px ${element.fontFamily}`;
                const metrics = ctx.measureText(element.text);
                ctx.strokeRect(element.x - 5, element.y - 5, metrics.width + 10, element.fontSize + 10);
                break;
        }
        
        ctx.setLineDash([]);
    }

    drawSelectionBox() {
        // Implementation for selection box with resize handles
        // This would be more complex with proper handle positioning
    }

    // Zoom and Pan
    zoomIn() {
        this.state.canvas.zoom = Math.min(3, this.state.canvas.zoom + 0.1);
        this.updateZoom();
    }

    zoomOut() {
        this.state.canvas.zoom = Math.max(0.1, this.state.canvas.zoom - 0.1);
        this.updateZoom();
    }

    resetZoom() {
        this.state.canvas.zoom = 1;
        this.updateZoom();
    }

    updateZoom() {
        this.elements.canvasWrapper.style.transform = `scale(${this.state.canvas.zoom})`;
        this.elements.zoomDisplay.textContent = `${Math.round(this.state.canvas.zoom * 100)}%`;
    }

    // Grid and Rulers
    toggleGrid() {
        this.state.canvas.grid.enabled = !this.state.canvas.grid.enabled;
        document.getElementById('gridToggle').classList.toggle('active', this.state.canvas.grid.enabled);
        this.render();
        this.updateStatus(`Grid ${this.state.canvas.grid.enabled ? 'enabled' : 'disabled'}`);
    }

    toggleRulers() {
        this.state.canvas.rulers.enabled = !this.state.canvas.rulers.enabled;
        document.getElementById('rulersToggle').classList.toggle('active', this.state.canvas.rulers.enabled);
        
        const rulers = ['rulerH', 'rulerV'];
        rulers.forEach(rulerId => {
            const ruler = document.getElementById(rulerId);
            ruler.classList.toggle('rulers-active', this.state.canvas.rulers.enabled);
        });
        
        this.updateStatus(`Rulers ${this.state.canvas.rulers.enabled ? 'enabled' : 'disabled'}`);
    }

    // Properties Panel
    updatePropertiesPanel() {
        const element = this.state.elements[this.state.selectedElement];
        if (!element) return;
        
        // Update color inputs
        if (element.fill) {
            document.getElementById('fillColor').value = element.fill;
            document.getElementById('fillColorPreview').style.background = element.fill;
        }
        
        if (element.stroke) {
            document.getElementById('strokeColor').value = element.stroke;
            document.getElementById('strokeColorPreview').style.background = element.stroke;
        }
        
        if (element.strokeWidth !== undefined) {
            document.getElementById('strokeWidth').value = element.strokeWidth;
            document.getElementById('strokeWidthValue').textContent = `${element.strokeWidth}px`;
        }
        
        // Update text properties
        if (element.type === 'text') {
            document.getElementById('textContent').value = element.text;
            document.getElementById('fontSize').value = element.fontSize;
            document.getElementById('fontSizeValue').textContent = `${element.fontSize}px`;
            document.getElementById('fontFamily').value = element.fontFamily;
            
            // Show text properties
            document.getElementById('textProperties').style.display = 'block';
        } else {
            // Hide text properties
            document.getElementById('textProperties').style.display = 'none';
        }
    }

    updateStrokeWidth(value) {
        document.getElementById('strokeWidthValue').textContent = `${value}px`;
        
        const element = this.state.elements[this.state.selectedElement];
        if (element && element.strokeWidth !== undefined) {
            element.strokeWidth = parseInt(value);
            this.render();
        }
    }

    updateFontSize(value) {
        document.getElementById('fontSizeValue').textContent = `${value}px`;
        
        const element = this.state.elements[this.state.selectedElement];
        if (element && element.type === 'text') {
            element.fontSize = parseInt(value);
            this.render();
        }
    }

    updateTextContent(value) {
        const element = this.state.elements[this.state.selectedElement];
        if (element && element.type === 'text') {
            element.text = value;
            this.render();
        }
    }

    updateFontFamily(value) {
        const element = this.state.elements[this.state.selectedElement];
        if (element && element.type === 'text') {
            element.fontFamily = value;
            this.render();
        }
    }

    // Layers Management
    updateLayersList() {
        const layersList = document.getElementById('layersList');
        if (!layersList) return;
        
        layersList.innerHTML = this.state.elements.map((element, index) => `
            <div class="layer-item ${index === this.state.selectedElement ? 'selected' : ''}" 
                 onclick="editor.selectElement(${index})">
                <div class="layer-icon">
                    <i class="fas fa-${this.getElementIcon(element.type)}"></i>
                </div>
                <div class="layer-info">
                    <div class="layer-name">${element.name}</div>
                    <div class="layer-type">${element.type.charAt(0).toUpperCase() + element.type.slice(1)}</div>
                </div>
                <div class="layer-controls-right">
                    <button class="layer-btn" onclick="editor.toggleLayerVisibility(${index})" 
                            title="${element.visible ? 'Hide' : 'Show'} layer">
                        <i class="fas fa-${element.visible ? 'eye' : 'eye-slash'}"></i>
                    </button>
                    <button class="layer-btn" onclick="editor.deleteElement(${index})" 
                            title="Delete layer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).reverse().join('');
    }

    getElementIcon(type) {
        const icons = {
            rectangle: 'square',
            circle: 'circle',
            triangle: 'play',
            line: 'minus',
            text: 'font',
            image: 'image',
            icon: 'icons'
        };
        return icons[type] || 'square';
    }

    toggleLayerVisibility(index) {
        const element = this.state.elements[index];
        if (element) {
            element.visible = !element.visible;
            this.updateLayersList();
            this.render();
        }
    }

    // History Management
    saveState() {
        const state = JSON.stringify({
            elements: this.state.elements,
            canvas: this.state.canvas
        });
        
        // Remove future history if we're not at the end
        if (this.state.history.index < this.state.history.stack.length - 1) {
            this.state.history.stack = this.state.history.stack.slice(0, this.state.history.index + 1);
        }
        
        // Add new state
        this.state.history.stack.push(state);
        this.state.history.index++;
        
        // Limit history size
        if (this.state.history.stack.length > this.state.history.maxSize) {
            this.state.history.stack.shift();
            this.state.history.index--;
        }
        
        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.state.history.index > 0) {
            this.state.history.index--;
            this.loadState(this.state.history.stack[this.state.history.index]);
            this.updateStatus('Undo performed');
        }
    }

    redo() {
        if (this.state.history.index < this.state.history.stack.length - 1) {
            this.state.history.index++;
            this.loadState(this.state.history.stack[this.state.history.index]);
            this.updateStatus('Redo performed');
        }
    }

    loadState(stateString) {
        const state = JSON.parse(stateString);
        this.state.elements = state.elements;
        this.state.canvas = state.canvas;
        this.state.selectedElement = null;
        
        this.updateCanvasSize();
        this.updatePropertiesPanel();
        this.updateLayersList();
        this.render();
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        
        undoBtn.disabled = this.state.history.index <= 0;
        redoBtn.disabled = this.state.history.index >= this.state.history.stack.length - 1;
    }

    // Template Management
    loadTemplate(templateType) {
        // Clear existing elements
        this.state.elements = [];
        this.state.selectedElement = null;
        
        switch (templateType) {
            case 'social':
                this.setCanvasSize(1080, 1080);
                this.setBackgroundColor('#4CAF50');
                
                this.addElement({
                    type: 'text',
                    x: 540,
                    y: 400,
                    text: 'SOCIAL MEDIA',
                    fontSize: 80,
                    fontFamily: 'Arial',
                    fill: '#FFFFFF',
                    name: 'Title'
                });
                
                this.addElement({
                    type: 'circle',
                    x: 540,
                    y: 700,
                    radius: 60,
                    fill: '#FF9800',
                    stroke: '#FFFFFF',
                    strokeWidth: 5,
                    name: 'Icon Circle'
                });
                break;
                
            case 'presentation':
                this.setCanvasSize(1920, 1080);
                this.setBackgroundColor('#FFFFFF');
                
                this.addElement({
                    type: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1920,
                    height: 200,
                    fill: '#1A0A33',
                    name: 'Header'
                });
                
                this.addElement({
                    type: 'text',
                    x: 100,
                    y: 80,
                    text: 'Presentation Title',
                    fontSize: 60,
                    fontFamily: 'Arial',
                    fill: '#FFFFFF',
                    name: 'Title'
                });
                
                this.addElement({
                    type: 'rectangle',
                    x: 100,
                    y: 300,
                    width: 400,
                    height: 300,
                    fill: '#4CAF50',
                    stroke: '#1A0A33',
                    strokeWidth: 2,
                    name: 'Content Box 1'
                });
                
                this.addElement({
                    type: 'rectangle',
                    x: 600,
                    y: 300,
                    width: 400,
                    height: 300,
                    fill: '#2196F3',
                    stroke: '#1A0A33',
                    strokeWidth: 2,
                    name: 'Content Box 2'
                });
                break;
                
            case 'poster':
                this.setCanvasSize(794, 1123); // A4 size in pixels at 72 DPI
                this.setBackgroundColor('#FFFFFF');
                
                this.addElement({
                    type: 'text',
                    x: 397,
                    y: 100,
                    text: 'POSTER TITLE',
                    fontSize: 72,
                    fontFamily: 'Arial',
                    fill: '#333333',
                    name: 'Main Title'
                });
                
                this.addElement({
                    type: 'rectangle',
                    x: 50,
                    y: 200,
                    width: 694,
                    height: 400,
                    fill: '#f0f0f0',
                    stroke: '#cccccc',
                    strokeWidth: 1,
                    name: 'Main Content Area'
                });
                break;
        }
        
        this.updateStatus(`"${templateType}" template loaded`);
        this.showNotification(`${templateType.charAt(0).toUpperCase() + templateType.slice(1)} template loaded`, 'success');
    }

    // Export and Share
    showExportModal() {
        document.getElementById('exportModal').classList.add('active');
    }

    showShareModal() {
        document.getElementById('shareModal').classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    exportDesign() {
        const format = document.querySelector('input[name="exportFormat"]:checked').value;
        const quality = parseFloat(document.getElementById('exportQuality').value);
        const scale = parseInt(document.getElementById('exportScale').value);
        
        // Create export canvas
        const exportCanvas = document.createElement('canvas');
        const exportCtx = exportCanvas.getContext('2d');
        
        exportCanvas.width = this.state.canvas.width * scale;
        exportCanvas.height = this.state.canvas.height * scale;
        
        // Scale context
        exportCtx.scale(scale, scale);
        
        // Draw background
        exportCtx.fillStyle = this.state.canvas.backgroundColor;
        exportCtx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
        
        // Draw elements
        this.state.elements.forEach(element => {
            if (element.visible) {
                this.drawElementOnCanvas(element, exportCtx);
            }
        });
        
        // Download
        let mimeType, extension;
        switch (format) {
            case 'jpg':
                mimeType = 'image/jpeg';
                extension = 'jpg';
                break;
            case 'png':
            default:
                mimeType = 'image/png';
                extension = 'png';
                break;
        }
        
        exportCanvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = `ezy-draw-design.${extension}`;
            link.href = URL.createObjectURL(blob);
            link.click();
            
            this.closeModal('exportModal');
            this.showNotification('Design exported successfully', 'success');
        }, mimeType, quality);
    }

    drawElementOnCanvas(element, ctx) {
        // Similar to drawElement but with custom context
        // Implementation would be similar to the main drawElement method
    }

    togglePreview() {
        // Toggle preview mode
        const isPreview = document.getElementById('previewBtn').classList.contains('active');
        
        if (isPreview) {
            // Exit preview
            document.getElementById('previewBtn').classList.remove('active');
            this.elements.leftSidebar.style.display = 'flex';
            this.elements.rightSidebar.style.display = 'flex';
            this.updateStatus('Preview mode disabled');
        } else {
            // Enter preview
            document.getElementById('previewBtn').classList.add('active');
            this.elements.leftSidebar.style.display = 'none';
            this.elements.rightSidebar.style.display = 'none';
            this.updateStatus('Preview mode enabled');
        }
    }

    // Sidebar Management
    toggleLeftSidebar() {
        this.elements.leftSidebar.classList.toggle('active');
    }

    toggleRightSidebar() {
        this.elements.rightSidebar.classList.toggle('active');
    }

    // Keyboard Shortcuts
    handleKeyDown(e) {
        // Ctrl/Cmd key combinations
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    this.redo();
                    break;
                case 's':
                    e.preventDefault();
                    this.exportDesign();
                    break;
                case 'a':
                    e.preventDefault();
                    // Select all
                    break;
            }
        }
        
        // Other shortcuts
        switch (e.key) {
            case 'Delete':
            case 'Backspace':
                if (this.state.selectedElement !== null) {
                    this.deleteElement(this.state.selectedElement);
                }
                break;
            case 'Escape':
                this.state.selectedElement = null;
                this.render();
                break;
        }
    }

    // Utility Functions
    isDrawingTool() {
        return ['rectangle', 'circle', 'line', 'text'].includes(this.state.currentTool);
    }

    updateStatus(message) {
        this.elements.statusText.textContent = message;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'error' ? 'exclamation-circle' : 
                          type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        this.elements.notificationContainer.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    handleResize() {
        // Handle window resize
        this.render();
    }
}

// Initialize the editor
let editor;

document.addEventListener('DOMContentLoaded', () => {
    editor = new EzyDrawEditor();
});

// Global functions for HTML onclick handlers
window.editor = editor;