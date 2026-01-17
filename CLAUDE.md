# Math Training App

## Project Goal
A math training app where users answer as many questions as possible within a time limit. Answers are given via voice using the Web Speech API.

## Current Status
**Phase: Working Prototype**

Fully functional vanilla JS app with five game modes, voice recognition, and leaderboard.

## Features Implemented

### Four-Screen UI

**Screen 1: Setup**
- "Microphone required" notice (translated)
- Language selector (7 languages)
- Speech API support detection
- CSS grid button layout (2 columns on desktop, 1 on mobile):
  - **Full width:** "Name the Number" (20-second game)
  - **Row 1:** "Sum before 10" | "Sum Survival"
  - **Row 2:** "Subtraction before 10" | "Subtraction Survival"
  - Mobile order: mode followed by its survival variant

**Screen 2: Countdown**
- "Get Ready!" label
- Large animated countdown (3, 2, 1)
- Pulse animation on numbers
- Sound effects for countdown ticks
- Game-specific instruction text (translated):
  - Name the Number: "Say the number shown on screen"
  - Subtraction/Sum: "Say the answer to the problem"
  - Survival modes: "Solve problems - each correct answer adds 3 seconds"

**Screen 3: Game**
- **Timer bar** at top with countdown
  - Green (normal) → Orange (≤10s) → Red (≤5s)
- Split layout:
  - **Left column:** Target number/problem, recognized number with color feedback, Restart/Stop buttons
  - **Right column:** Score counter, answer log (scrollable, newest first)
- **Grace period:** 2 extra seconds after timer ends to answer final problem
- Raw transcript section at bottom

**Screen 4: Results**
- "Time's Up!" heading
- Final score (large display)
- Stats: Completed (numbers answered), Avg Time (seconds per answer), Rate (answers per minute)
- **Leaderboard:** Top 10 scores per mode, current score highlighted, persisted in localStorage
- "Play Again" button (restarts with same mode/language)
- "Main Menu" button (returns to setup)

### Game Modes

**Name the Number**
- Shows random target number (1-100)
- User must say the number
- 20-second timer
- Number history avoids repeating last 20 numbers

**Subtraction before 10**
- Shows subtraction problem (e.g., "9 - 2 = ?")
- Results are always 0-9
- 60-second timer
- Problem balancing: limits "easy" problems (result 0/1, subtrahend 1) to 30%
- Problem history avoids repeating last 10 problems
- Avoids consecutive same results

**Subtraction Survival**
- Same subtraction problems as "Subtraction before 10"
- Starts with 30 seconds
- Each correct answer adds 3 seconds to the timer
- Game continues until time runs out

**Sum before 10**
- Shows addition problem (e.g., "3 + 4 = ?")
- Results are always 0-9
- 60-second timer
- Problem balancing: limits "easy" problems (either addend is 0 or 1) to 30%
- Problem history avoids repeating last 10 problems
- Avoids consecutive same results

**Sum Survival**
- Same addition problems as "Sum before 10"
- Starts with 30 seconds
- Each correct answer adds 3 seconds to the timer
- Game continues until time runs out

### Features
- **Full UI translations** for all 7 languages (using `data-i18n` attributes)
- Language toggle: English / Ukrainian / Dutch / Turkish / Polish / Belarusian / Swedish
- **Sound effects:** Countdown ticks, "Go!" sound, success ding
- **Comprehensive logging:** Session IDs, timestamps, all speech/game events
- **Grace period:** 2 extra seconds at end to answer last problem
- **Restart button:** Restart game without returning to menu
- Score tracking: +1 for each correct answer
- Answer log with color coding (green ✓ for correct, red with wrong answer)
- Extracts the **last** number spoken (not first)
- Uses interim results for fast response, skips duplicate correct answers
- **Silence timeout handling:** Auto-restarts recognition if Speech API times out

### Styling (styles.css)
- Dark theme (#1a1a2e background)
- Accent color: #4ecca3 (teal/green)
- Card-based UI with rounded corners
- Responsive (mobile-friendly)
- Color feedback: green for correct, red for wrong

### Number Recognition
Supports numbers 0-100 in seven languages:
- **English (en-US):** zero, one, two... twenty, thirty... hundred
- **Ukrainian (uk-UA):** нуль, один/одна, два/дві, три... сто
- **Dutch (nl-NL):** nul, een, twee... twintig, dertig... honderd
  - Uses reversed compound numbers (e.g., 23 = "drieëntwintig" = three-and-twenty)
  - All compound numbers 21-99 mapped explicitly
  - "null" added as alternative for "nul" (zero)
- **Turkish (tr-TR):** sıfır, bir, iki, üç... on, yirmi... yüz
  - Compound numbers use "tens + units" (e.g., 21 = "yirmi bir")
- **Polish (pl-PL):** zero, jeden, dwa, trzy... dziesięć, dwadzieścia... sto
  - Includes gender variants (jeden/jedna/jedno, dwa/dwie)
- **Belarusian (be-BY):** нуль, адзін, два, тры... дзесяць, дваццаць... сто
  - Includes gender variants (адзін/адна, два/дзве)
- **Swedish (sv-SE):** noll, ett, två, tre... tio, tjugo... hundra
  - Compound numbers 21-29 mapped (tjugoett, tjugotvå, etc.)
- Also recognizes digits spoken as "1", "2", etc.
- **Max number validation:** If Speech API concatenates digits (e.g., "2433"), extracts only last digit when number exceeds game's max

## File Structure
```
math-app/
├── index.html    # Main HTML page with four screens
├── app.js        # All application logic
├── styles.css    # Dark theme styling
└── CLAUDE.md     # This context file
```

## Tech Stack
- Vanilla JavaScript (ES6 classes, no frameworks)
- Web Speech API (SpeechRecognition)
- Web Audio API (sound effects)

## Architecture (OOP)

### CONFIG Constants
```javascript
CONFIG = {
    TIMER_WARNING_THRESHOLD: 10,    // orange color
    TIMER_DANGER_THRESHOLD: 5,      // red color
    GRACE_PERIOD_SECONDS: 2,
    PREGAME_COUNTDOWN_SECONDS: 3,
    SECONDS_PER_MINUTE: 60,
    COUNTDOWN_INTERVAL_MS: 1000,
    LEADERBOARD_MAX_ENTRIES: 10,
    STORAGE_KEY_NAME_NUMBER: 'mathApp_leaderboard_nameNumber',
    STORAGE_KEY_SUBTRACTION: 'mathApp_leaderboard_subtraction',
    STORAGE_KEY_SUBTRACTION_SURVIVAL: 'mathApp_leaderboard_subtractionSurvival',
    STORAGE_KEY_SUM: 'mathApp_leaderboard_sum',
    STORAGE_KEY_SUM_SURVIVAL: 'mathApp_leaderboard_sumSurvival',
    STORAGE_KEY_LANGUAGE: 'mathApp_language',
    SUPPORTED_LANGUAGES: ['en-US', 'uk-UA', 'nl-NL', 'tr-TR', 'pl-PL', 'be-BY', 'sv-SE']
}
```

### Game Classes (Static Constants)
```javascript
NameTheNumberGame.TIMER_DURATION = 20
NameTheNumberGame.NUMBER_RANGE_MIN = 1
NameTheNumberGame.NUMBER_RANGE_MAX = 100
NameTheNumberGame.NUMBER_HISTORY_SIZE = 20

SubtractionGame.TIMER_DURATION = 60
SubtractionGame.MAX_RESULT = 9
SubtractionGame.EASY_MAX_RATIO = 0.3
SubtractionGame.PROBLEM_HISTORY_SIZE = 10

SubtractionSurvivalGame.TIMER_DURATION = 30
SubtractionSurvivalGame.TIME_BONUS = 3

SumGame.TIMER_DURATION = 60
SumGame.MAX_RESULT = 9
SumGame.EASY_MAX_RATIO = 0.3
SumGame.PROBLEM_HISTORY_SIZE = 10

SumSurvivalGame.TIMER_DURATION = 30
SumSurvivalGame.TIME_BONUS = 3
```

### Classes

| Class | Responsibility |
|-------|----------------|
| `Logger` | Debug logging with session IDs and timestamps |
| `NumberDictionary` | Static data: number words for all languages, language names |
| `NumberExtractor` | Extracts last number from transcript (digits or words), validates against maxNumber |
| `SpeechRecognizer` | Wraps Web Speech API, handles recognition lifecycle, transcript buffer management |
| `SoundManager` | Web Audio API sound effects (countdown, go, success) |
| `Leaderboard` | Manages high scores in localStorage (separate per game mode) |
| `Timer` | Countdown timer with tick/end callbacks, addTime() for survival mode |
| `Game` | Base class for game modes |
| `NameTheNumberGame` | "Name the Number" mode logic (extends Game) |
| `SubtractionGame` | "Subtraction before 10" mode logic (extends Game) |
| `SubtractionSurvivalGame` | "Subtraction Survival" mode logic (extends SubtractionGame) |
| `SumGame` | "Sum before 10" mode logic (extends Game) |
| `SumSurvivalGame` | "Sum Survival" mode logic (extends SumGame) |
| `GameModes` | Constants for mode identifiers |
| `GameRegistry` | Maps mode IDs to game classes |
| `GameRunner` | Manages game session: score, answers, delegates to specific game |
| `UI` | DOM manipulation, screen switching, event binding |
| `App` | Main controller, wires everything together |

### Speech Recognition Handling
- `continuous: true` and `interimResults: true` for real-time feedback
- **Transcript buffer:** Uses offset tracking to ignore already-processed speech when new problem appears
- **Silence timeout:** Speech API stops after ~7s of silence; app auto-restarts recognition without resetting game
- **no-speech error:** Ignored (not a real error, just silence detected)

## Notes
- Web Speech API works best in Chrome
- Ukrainian numbers include variants with/without apostrophe (п'ять/пять)
- Separate leaderboards for each game mode
- Language preference saved to localStorage
