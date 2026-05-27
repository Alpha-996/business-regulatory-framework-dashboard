# Business Regulatory Framework 7-Day Study Dashboard

A modular, offline-friendly HTML study system for B.Com Honours Business Regulatory Framework. It is built from the provided syllabus and the 2025 PYQ pattern, with expanded notes, question practice, definitions, flashcards, quizzes, progress tracking, and print support.

## How to open

Open `index.html` directly in a browser:

`business-regulatory-framework-dashboard/index.html`

No server is required for core use because all data is loaded from JavaScript files under `assets/data/`. A local server is useful only for automated testing.

## File map

- `index.html`: dashboard structure and section containers.
- `assets/css/base.css`: design tokens, typography, base page styles.
- `assets/css/layout.css`: top bar, sidebar, hero, grids, cards.
- `assets/css/components.css`: tables, filters, flashcards, quiz, progress, reusable UI components.
- `assets/css/responsive.css`: tablet/mobile layout.
- `assets/css/print.css`: print pack behavior.
- `assets/js/app.js`: initialization.
- `assets/js/renderers.js`: renders syllabus, PYQ, notes, definitions, differences, templates, revision, and strategy.
- `assets/js/filters.js`: searchable/filterable question bank.
- `assets/js/flashcards.js`: flashcard filtering, shuffle, mastered progress.
- `assets/js/quiz.js`: quiz sets, scoring, feedback, wrong-answer review, best scores.
- `assets/js/progress.js`: 7-day checklist and progress bar.
- `assets/js/navigation.js`: sidebar, smooth scroll, active links, back-to-top, reveal states.
- `assets/js/theme.js`: light/dark mode.
- `assets/js/print.js`: print button.
- `assets/js/utils.js`: shared helpers.

## How to edit content

All major content lives in `assets/data/`. Each file attaches data to `window.BRFData`, so the page works from local files without JSON fetch.

### Add or edit notes

Edit `assets/data/notes-data.js`. A note should include fields like:

`id`, `unit`, `topic`, `title`, `type`, `priority`, `probability`, `beginnerExplanation`, `examKeywords`, `example`, `likely5`, `likely10`, `revisionHook`.

### Add or edit questions

Edit `assets/data/questions-data.js`. A question should include:

`id`, `unit`, `subtopic`, `marks`, `type`, `priority`, `probability`, `source`, `question`, `outline`, `headings`, `keywords`, `suggestedLength`.

The question bank filters read `unit`, `marks`, `type`, `priority`, `probability`, and `source` automatically.

### Add or edit definitions

Edit `assets/data/definitions-data.js`. A definition should include:

`term`, `unit`, `priority`, `probability`, `simpleMeaning`, `examDefinition`, `example`, `likelyFormat`, `marksUse`.

### Add or edit flashcards

Edit `assets/data/flashcards-data.js`. A flashcard should include:

`id`, `unit`, `category`, `priority`, `probability`, `front`, `back`, `hint`.

The mastered-card state is saved in browser `localStorage`, not in the data file.

### Add or edit quiz sets

Edit `assets/data/quiz-data.js`. A quiz set has:

`id`, `title`, `description`, `questions`.

Each quiz question has:

`type`, `question`, `options`, `answer`, `explanation`, `unit`, `priority`, `difficulty`, `examRelevance`, and optional `keywords` for short-answer checking.

Supported quiz types are `MCQ`, `True-False`, `Short`, and `Statement-based`.

### Add or edit difference tables

Edit `assets/data/differences-data.js`. Each table uses:

`title`, `unit`, `priority`, `probability`, `marksUse`, `heads`, `rows`.

### Add or edit procedures and rights/remedies

Edit `assets/data/procedures-rights-data.js`. Each entry uses:

`title`, `unit`, `priority`, `probability`, `likelyQuestion`, `fiveMarkApproach`, `tenMarkApproach`, `points`.

## Content basis

The dashboard is restricted to:

- Unit I: Introduction to Business Law
- Unit II: Indian Contract Act, 1872
- Unit III: Sale of Goods Act, 1930
- Unit IV: Partnership Act, 1932 and LLP Act, 2008
- Unit V: Consumer Protection Act, 2019

Priority labels are based on the supplied lecture-hour weightage plus the supplied 2025 PYQ. They are predictive study guidance, not a guarantee of future questions.

## Testing notes

The dashboard was checked for data counts, script loading, rendering, filters, flashcards, quiz scoring, localStorage features, theme toggle, print button availability, and desktop/mobile layout behavior.
