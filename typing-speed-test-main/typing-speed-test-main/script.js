/**
 * Typing Speed Test - Pro Edition
 * Architecture: Modular State Management
 */

const TypingTest = {
    // --- Stato ---
    passages: {},
    currentPassage: "",
    isTestRunning: false,
    timer: null,
    timeLeft: 60,
    charIndex: 0,
    errors: 0,
    totalTyped: 0,
    stats: {
        keysPressed: {},
        keysErrors: {}
    },

    // --- Cache Elementi DOM ---
    ui: {
        passage: document.getElementById('passage-display'),
        wpm: document.getElementById('current-wpm'),
        accuracy: document.getElementById('current-accuracy'),
        time: document.getElementById('current-time'),
        pb: document.getElementById('pb-value'),
        modal: document.getElementById('results-modal'),
        overlay: document.getElementById('start-overlay'),
        skipBtn: document.getElementById('skip-btn'),
        stopBtn: document.getElementById('stop-btn'),
        heatmap: document.getElementById('keyboard-heatmap')
    },

    // --- Inizializzazione ---
    async init() {
        try {
            const response = await fetch('./data.json');
            this.passages = await response.json();
            
            this.ui.pb.innerText = localStorage.getItem('typingTestPB') || 0;
            this.bindEvents();
            this.setupTest();
        } catch (err) {
            console.error("Critical Error:", err);
            this.ui.passage.innerText = "Error loading data.json";
        }
    },

    bindEvents() {
        window.addEventListener('keydown', (e) => this.handleTyping(e));
        document.getElementById('start-btn')?.addEventListener('click', () => this.startTest());
        document.getElementById('restart-btn')?.addEventListener('click', () => this.setupTest());
        document.getElementById('restart-btn-main')?.addEventListener('click', () => this.setupTest());
        
        this.ui.skipBtn?.addEventListener('click', () => this.skipPassage());
        this.ui.stopBtn?.addEventListener('click', () => this.cancelTest()); // Correzione richiesta

        // Options Delegation
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleOptionChange(e));
        });

        // Export
        document.getElementById('download-results')?.addEventListener('click', () => this.exportResults());
    },

    // --- Logica Core ---
    setupTest() {
        this.isTestRunning = false;
        clearInterval(this.timer);
        
        const difficulty = document.querySelector('#difficulty-options .active')?.dataset.level || 'easy';
        const category = document.querySelector('#category-options .active')?.dataset.cat || 'quotes';
        const duration = parseInt(document.querySelector('#duration-options .active')?.dataset.time || 60);

        const list = this.passages[difficulty]?.[category] || [{text: "No text available."}];
        this.currentPassage = list[Math.floor(Math.random() * list.length)].text;
        
        this.resetState(duration);
        this.renderPassage();
        this.updateUI();
    },

    resetState(duration) {
        this.charIndex = 0;
        this.errors = 0;
        this.totalTyped = 0;
        this.timeLeft = duration;
        this.stats.keysPressed = {};
        this.stats.keysErrors = {};
        
        this.ui.modal.classList.add('hidden');
        this.ui.stopBtn?.classList.add('hidden');
        this.ui.overlay.classList.remove('hidden');
    },

    renderPassage() {
        this.ui.passage.innerHTML = [...this.currentPassage].map((char, i) => 
            `<span class="${i === 0 ? 'char-current' : ''}">${char}</span>`
        ).join('');
    },

    startTest() {
        this.isTestRunning = true;
        this.ui.overlay.classList.add('hidden');
        this.ui.stopBtn?.classList.remove('hidden');
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) this.endTest();
            this.updateUI();
        }, 1000);
    },

    handleTyping(e) {
        if (!this.ui.modal.classList.contains('hidden') || e.ctrlKey || e.altKey || e.metaKey) return;
        if (!this.isTestRunning && e.key.length === 1) this.startTest();
        if (!this.isTestRunning) return;

        const chars = this.ui.passage.querySelectorAll('span');
        
        if (e.key === 'Backspace') {
            if (this.charIndex > 0) {
                chars[this.charIndex].classList.remove('char-current');
                this.charIndex--;
                chars[this.charIndex].className = 'char-current';
            }
            return;
        }

        if (e.key.length !== 1) return;

        const expected = this.currentPassage[this.charIndex];
        const key = e.key.toLowerCase();

        this.stats.keysPressed[key] = (this.stats.keysPressed[key] || 0) + 1;
        this.totalTyped++;

        chars[this.charIndex].classList.remove('char-current');

        if (e.key === expected) {
            chars[this.charIndex].classList.add('char-correct');
        } else {
            chars[this.charIndex].classList.add('char-error');
            this.errors++;
            this.stats.keysErrors[expected.toLowerCase()] = (this.stats.keysErrors[expected.toLowerCase()] || 0) + 1;
        }

        this.charIndex++;

        if (this.charIndex < this.currentPassage.length) {
            chars[this.charIndex].classList.add('char-current');
        } else {
            this.endTest();
        }
        this.updateUI();
    },

    // --- Utility & UI ---
    updateUI() {
        const activeTime = parseInt(document.querySelector('#duration-options .active')?.dataset.time || 60);
        const timeSpent = (activeTime - this.timeLeft) / 60;
        
        const wpm = timeSpent > 0 ? Math.round((this.charIndex / 5) / timeSpent) : 0;
        const accuracy = this.totalTyped > 0 ? Math.round(((this.totalTyped - this.errors) / this.totalTyped) * 100) : 100;

        this.ui.wpm.innerText = wpm;
        this.ui.accuracy.innerText = `${Math.max(0, accuracy)}%`;
        this.ui.time.innerText = this.formatTime(this.timeLeft);
    },

    formatTime(s) {
        return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    },

    cancelTest() {
        // Richiesta: Termina senza mostrare risultati
        this.setupTest();
    },

    skipPassage() {
        if (this.isTestRunning && !confirm("Skip current test?")) return;
        this.setupTest();
    },

    handleOptionChange(e) {
        if (this.isTestRunning) return;
        const btn = e.currentTarget;
        btn.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setupTest();
    },

    // --- Risultati Finali ---
    endTest() {
        this.isTestRunning = false;
        clearInterval(this.timer);
        this.ui.stopBtn?.classList.add('hidden');

        const wpm = parseInt(this.ui.wpm.innerText);
        const acc = this.ui.accuracy.innerText;
        
        document.getElementById('final-wpm').innerText = wpm;
        document.getElementById('final-accuracy').innerText = acc;
        document.getElementById('final-chars').innerText = `${this.charIndex - this.errors}/${this.errors}`;

        this.generateHeatmap();
        this.handleHighscore(wpm);
        
        this.ui.modal.classList.remove('hidden');
    },

    generateHeatmap() {
        if (!this.ui.heatmap) return;
        this.ui.heatmap.innerHTML = '';
        
        [..."qwertyuiopasdfghjklzxcvbnm"].forEach(key => {
            const pressed = this.stats.keysPressed[key] || 0;
            const errs = this.stats.keysErrors[key] || 0;
            const acc = pressed > 0 ? ((pressed - errs) / pressed) * 100 : 100;
            const hue = acc * 1.2; 

            const keyEl = document.createElement('div');
            keyEl.className = 'key-box';
            keyEl.innerText = key;
            if (pressed > 0) {
                keyEl.style.backgroundColor = `hsla(${hue}, 70%, 40%, 0.8)`;
                keyEl.style.borderColor = `hsl(${hue}, 70%, 50%)`;
            }
            this.ui.heatmap.appendChild(keyEl);
        });
    },

    handleHighscore(wpm) {
        const oldPB = parseInt(localStorage.getItem('typingTestPB') || 0);
        if (wpm > oldPB) {
            localStorage.setItem('typingTestPB', wpm);
            this.ui.pb.innerText = wpm;
            if (window.confetti) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
    },

    exportResults() {
        const content = document.querySelector('.modal-content');
        if (window.html2canvas) {
            html2canvas(content, { backgroundColor: '#121212', scale: 2 }).then(canvas => {
                const link = document.createElement('a');
                link.download = `Typing_Score_${Date.now()}.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    }
};

// Start
TypingTest.init();