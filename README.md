# Math Training App

A voice-powered math training game for kids that uses speech recognition to make learning arithmetic fun and interactive.

**[Play Now](https://maxkostenko.github.io/math-app/)**

---

## Features

- **Voice-Based Answers** — Speak your answers instead of typing. The app uses the Web Speech API for real-time speech recognition.
- **Multiple Game Modes:**
  - **Name the Number** — Practice number recognition (0-100)
  - **Sum before 10** — Addition practice with numbers that sum to 10 or less
  - **Sum Survival** — Timed addition challenge
  - **Subtraction before 10** — Subtraction practice within 10
  - **Subtraction Survival** — Timed subtraction challenge
- **7 Languages Supported** — English, Ukrainian, Dutch, Turkish, Polish, Belarusian, Swedish
- **Leaderboard** — Track your best scores locally
- **Responsive Design** — Works on desktop and mobile devices

## How to Play

1. Select your language
2. Allow microphone access when prompted
3. Choose a game mode
4. Speak the answer to each math problem
5. Try to answer as many as you can before time runs out!

## Game Modes

| Mode | Description | Time |
|------|-------------|------|
| Name the Number | Say random numbers 0-100 | 20 sec |
| Sum before 10 | Addition with results ≤ 10 | 20 sec |
| Sum Survival | Addition challenge, wrong answer ends game | Unlimited |
| Subtraction before 10 | Subtraction within 10 | 20 sec |
| Subtraction Survival | Subtraction challenge, wrong answer ends game | Unlimited |

## Supported Languages

- English (en-US)
- Українська (uk-UA)
- Nederlands (nl-NL)
- Türkçe (tr-TR)
- Polski (pl-PL)
- Беларуская (be-BY)
- Svenska (sv-SE)

## Technology

- Pure JavaScript (no frameworks)
- Web Speech API for voice recognition
- CSS3 with responsive design
- GitHub Pages for hosting

## Browser Support

Best experience in Chrome or Edge (which have the most robust Web Speech API implementation). Safari and Firefox have limited speech recognition support.

## Local Development

Simply open `index.html` in a browser, or serve with any static file server:

```bash
npx serve .
```

## License

MIT
