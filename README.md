# ⚡ Typing Speed Test - Pro Edition

Un'applicazione web ad alte prestazioni progettata per testare e migliorare la velocità e la precisione di digitazione. Questo progetto combina un'architettura JavaScript moderna con un'interfaccia utente raffinata e analisi dei dati in tempo reale.

![Typing Test Preview](https://via.placeholder.com/800x400?text=Typing+Speed+Test+Interface)

## 🚀 Funzionalità Principali

- **Motore di Digitazione Real-time**: Feedback visivo istantaneo per caratteri corretti, errati e posizione corrente del cursore.
- **Analisi Avanzata (Heatmap)**: Generazione dinamica di una mappa di calore della tastiera basata sull'accuratezza per ogni singolo tasto.
- **Personalizzazione Totale**:
  - **Difficoltà**: Easy, Medium, Hard.
  - **Categorie**: Quotes (Citazioni), Lyrics (Testi musicali), Code (Snippet di programmazione reale).
  - **Durata**: Test da 15, 30, 60 o 120 secondi.
- **Gestione Sessione Pro**:
  - **Skip**: Cambia testo istantaneamente senza resettare le impostazioni.
  - **Stop/Cancel**: Annulla il test in corso e torna alla home senza inquinare le statistiche.
- **Record Personali (PB)**: Salvataggio automatico del miglior punteggio (WPM) nel browser tramite LocalStorage.
- **Export dei Risultati**: Generazione di un'immagine (PNG) dei tuoi risultati pronta per essere condivisa.

## 🛠️ Stack Tecnologico

- **HTML5**: Struttura semantica avanzata per accessibilità (ARIA labels) e SEO.
- **CSS3 (Modern Design System)**: Variabili CSS, Flexbox, Grid, e animazioni fluide con curve di Bézier.
- **JavaScript (ES6+)**: Architettura basata su pattern **Object Literal** per una gestione dello stato pulita e modulare.
- **Librerie Esterne**:
  - [html2canvas](https://html2canvas.hertzen.com/) per l'export dei risultati.
  - [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) per le celebrazioni dei nuovi record.

## 📁 Struttura del Progetto

```text
├── index.html          # Struttura semantica dell'applicazione
├── style.css           # Design system e layout responsivo
├── script.js           # Logica applicativa e gestione stato
├── data.json           # Database dei testi (45+ passaggi)
└── assets/             # Icone, loghi e immagini
