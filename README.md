# ⚡ Typing Speed Test `Pro Edition`

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/UI/UX-Design-FF69B4?style=for-the-badge" alt="Design" />
</p>

---

## 📖 Panoramica
**Typing Speed Test Pro** non è un semplice esercizio di stile, ma un ecosistema completo per il *competitive typing*. Progettato con un approccio **minimalista ma potente**, offre agli sviluppatori e agli appassionati uno strumento per monitorare precisione e velocità attraverso dati analitici avanzati.

> "La precisione è l'eleganza della velocità." — Un'esperienza di digitazione senza compromessi.

---

## ✨ Caratteristiche Uniche

| Feature | Descrizione |
| :--- | :--- |
| 📊 **Heatmap Dinamica** | Analisi tasto per tasto con mappa di calore HSLA in tempo reale. |
| 💻 **Coding Mode** | Allenati con snippet reali di JavaScript, React e logica asincrona. |
| 📸 **Export PNG** | Esporta la tua scheda risultati estetica grazie a `html2canvas`. |
| 🎯 **Personal Best** | Sistema di persistenza dei dati tramite `LocalStorage`. |
| 🕹️ **Pro Controls** | Funzioni `Skip` e `Cancel` per una gestione fluida della sessione. |

---

## 🛠️ Architettura Tecnica

Il progetto implementa concetti di ingegneria del software avanzati per il web:

### 🧩 Pattern di Progettazione
L'intera logica è incapsulata nel modulo `TypingTest`. Questo riduce i tempi di accesso alle variabili e previene collisioni nello spazio dei nomi globale.

### ⚡ Ottimizzazioni Performance
* **DOM Prefetching:** Gli elementi vengono memorizzati nella cache all'avvio per evitare costosi `getElementById` durante i picchi di WPM.
* **State Machine:** Gestione rigorosa degli stati `isTestRunning` per prevenire input indesiderati o glitch del timer.
* **HSLA Color Mapping:** Algoritmo matematico per tradurre l'accuratezza percentuale in tonalità di colore percepite dall'occhio umano.

---

## 🎨 Design System

Il look & feel si ispira ai moderni editor di codice (Dark Mode):
- **Superfici:** `hsl(0, 0%, 7%)` (Grigio Profondo)
- **Accenti:** `hsl(49, 85%, 70%)` (Giallo Neon per il cursore)
- **Feedback:** Verde smeraldo per il corretto, Rosso rubino per l'errore.

---

##  Come Iniziare

### Prerequisiti
È necessario un server locale (Live Server, Python, o Node.js) per gestire correttamente le richieste `fetch` al database JSON.

### Installazione rapida
1. **Clona**: `git clone https://github.com/MatteoParrella/typing-speed-test.git`
2. **Entra**: `cd typing-speed-test`
3. **Lancia**: Apri il file `index.html` tramite il tuo server locale preferito.

---

##  Struttura Directory
```text
.
├── 📄 index.html        # Struttura semantica A11y
├── 🎨 style.css         # Design System & Responsive Layout
├── ⚙️ script.js         # Motore JavaScript (Logic & State)
├── 📦 data.json         # Dataset 45+ testi (Easy/Med/Hard)
└── 📂 assets/           # Risorse grafiche vettoriali
