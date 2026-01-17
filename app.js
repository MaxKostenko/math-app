// Debug logger with unique session ID
class Logger {
    constructor() {
        this.sessionId = Math.random().toString(36).substring(2, 8);
        this.startTime = Date.now();
    }

    log(category, message, data = null) {
        const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(2);
        const prefix = `[${this.sessionId}][${elapsed}s][${category}]`;
        if (data !== null) {
            console.log(prefix, message, structuredClone(data));
        } else {
            console.log(prefix, message);
        }
    }

    newSession() {
        this.sessionId = Math.random().toString(36).substring(2, 8);
        this.startTime = Date.now();
        this.log('SESSION', 'started');
    }
}

const logger = new Logger();

// App-level configuration constants
const CONFIG = {
    TIMER_WARNING_THRESHOLD: 10,
    TIMER_DANGER_THRESHOLD: 5,
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
};


const TRANSLATIONS = {
    'en-US': {
        selectLanguage: 'Select Language',
        micRequired: 'Microphone required - answer by speaking',
        nameTheNumber: 'Name the Number',
        subtractionBefore10: 'Subtraction before 10',
        subtractionSurvival: 'Subtraction Survival',
        sumBefore10: 'Sum before 10',
        sumSurvival: 'Sum Survival',
        instructionNameTheNumber: 'Say the number shown on screen',
        instructionSubtraction: 'Say the answer to the subtraction problem',
        instructionSubtractionSurvival: 'Solve subtractions - each correct answer adds 3 seconds',
        instructionSum: 'Say the answer to the addition problem',
        instructionSumSurvival: 'Solve additions - each correct answer adds 3 seconds',
        leaderboard: 'Leaderboard',
        noScores: 'No scores yet',
        getReady: 'Get Ready!',
        sayThisNumber: 'Say this number:',
        sayTheAnswer: 'Say the answer:',
        score: 'Score',
        answerLog: 'Answer Log',
        stop: 'Stop',
        restart: 'Restart',
        rawTranscript: 'Raw transcript:',
        timesUp: "Time's Up!",
        finalScore: 'Final Score',
        completed: 'Completed',
        avgTime: 'Avg Time',
        rate: 'Rate',
        playAgain: 'Play Again',
        mainMenu: 'Main Menu',
        speechSupported: 'Speech API is supported. Select a mode to begin.',
        speechNotSupported: 'Speech API is NOT supported in this browser. Please use Chrome.',
        micDenied: 'Microphone permission denied. Please allow microphone access.',
        micBlocked: 'Microphone access is blocked',
        micBlockedHint: 'Please allow microphone access in your browser settings to play',
        requestMic: 'Request Microphone Access',
        recognitionStopped: 'Recognition stopped. Select a mode to begin again.',
        languageSet: 'Language set to {lang}. Select a mode to begin.'
    },
    'uk-UA': {
        selectLanguage: 'Оберіть мову',
        micRequired: 'Потрібен мікрофон - відповідай голосом',
        nameTheNumber: 'Назви число',
        subtractionBefore10: 'Віднімання до 10',
        subtractionSurvival: 'Віднімання на виживання',
        sumBefore10: 'Додавання до 10',
        sumSurvival: 'Додавання на виживання',
        instructionNameTheNumber: 'Назви число на екрані',
        instructionSubtraction: 'Скажи відповідь на приклад віднімання',
        instructionSubtractionSurvival: 'Розвʼязуй віднімання - кожна правильна відповідь додає 3 секунди',
        instructionSum: 'Скажи відповідь на приклад додавання',
        instructionSumSurvival: 'Розвʼязуй додавання - кожна правильна відповідь додає 3 секунди',
        leaderboard: 'Таблиця лідерів',
        noScores: 'Ще немає результатів',
        getReady: 'Приготуйся!',
        sayThisNumber: 'Назви це число:',
        sayTheAnswer: 'Скажи відповідь:',
        score: 'Рахунок',
        answerLog: 'Історія відповідей',
        stop: 'Стоп',
        restart: 'Заново',
        rawTranscript: 'Розпізнаний текст:',
        timesUp: 'Час вийшов!',
        finalScore: 'Фінальний рахунок',
        completed: 'Завершено',
        avgTime: 'Сер. час',
        rate: 'Темп',
        playAgain: 'Грати знову',
        mainMenu: 'Головне меню',
        speechSupported: 'Speech API підтримується. Оберіть режим щоб почати.',
        speechNotSupported: 'Speech API не підтримується в цьому браузері. Використовуйте Chrome.',
        micDenied: 'Доступ до мікрофона заборонено. Дозвольте доступ до мікрофона.',
        micBlocked: 'Доступ до мікрофона заблоковано',
        micBlockedHint: 'Дозвольте доступ до мікрофона в налаштуваннях браузера',
        requestMic: 'Запитати доступ до мікрофона',
        recognitionStopped: 'Розпізнавання зупинено. Оберіть режим щоб почати знову.',
        languageSet: 'Мова: {lang}. Оберіть режим щоб почати.'
    },
    'nl-NL': {
        selectLanguage: 'Kies taal',
        micRequired: 'Microfoon vereist - antwoord door te spreken',
        nameTheNumber: 'Noem het getal',
        subtractionBefore10: 'Aftrekken tot 10',
        subtractionSurvival: 'Aftrekken Survival',
        sumBefore10: 'Optellen tot 10',
        sumSurvival: 'Optellen Survival',
        instructionNameTheNumber: 'Zeg het getal op het scherm',
        instructionSubtraction: 'Zeg het antwoord op de aftreksom',
        instructionSubtractionSurvival: 'Los aftreksommen op - elk goed antwoord geeft 3 seconden',
        instructionSum: 'Zeg het antwoord op de optelsom',
        instructionSumSurvival: 'Los optelsommen op - elk goed antwoord geeft 3 seconden',
        leaderboard: 'Ranglijst',
        noScores: 'Nog geen scores',
        getReady: 'Maak je klaar!',
        sayThisNumber: 'Zeg dit getal:',
        sayTheAnswer: 'Zeg het antwoord:',
        score: 'Score',
        answerLog: 'Antwoordlog',
        stop: 'Stop',
        restart: 'Herstarten',
        rawTranscript: 'Ruwe transcriptie:',
        timesUp: 'Tijd is om!',
        finalScore: 'Eindscore',
        completed: 'Voltooid',
        avgTime: 'Gem. tijd',
        rate: 'Tempo',
        playAgain: 'Opnieuw spelen',
        mainMenu: 'Hoofdmenu',
        speechSupported: 'Speech API wordt ondersteund. Kies een modus om te beginnen.',
        speechNotSupported: 'Speech API wordt niet ondersteund in deze browser. Gebruik Chrome.',
        micDenied: 'Microfoontoegang geweigerd. Sta microfoon toegang toe.',
        micBlocked: 'Microfoontoegang is geblokkeerd',
        micBlockedHint: 'Sta microfoontoegang toe in je browserinstellingen om te spelen',
        requestMic: 'Microfoontoegang aanvragen',
        recognitionStopped: 'Herkenning gestopt. Kies een modus om opnieuw te beginnen.',
        languageSet: 'Taal ingesteld op {lang}. Kies een modus om te beginnen.'
    },
    'tr-TR': {
        selectLanguage: 'Dil seçin',
        micRequired: 'Mikrofon gerekli - konuşarak cevapla',
        nameTheNumber: 'Sayıyı söyle',
        subtractionBefore10: '10\'a kadar çıkarma',
        subtractionSurvival: 'Çıkarma Hayatta Kalma',
        sumBefore10: '10\'a kadar toplama',
        sumSurvival: 'Toplama Hayatta Kalma',
        instructionNameTheNumber: 'Ekrandaki sayıyı söyle',
        instructionSubtraction: 'Çıkarma işleminin cevabını söyle',
        instructionSubtractionSurvival: 'Çıkarma işlemlerini çöz - her doğru cevap 3 saniye ekler',
        instructionSum: 'Toplama işleminin cevabını söyle',
        instructionSumSurvival: 'Toplama işlemlerini çöz - her doğru cevap 3 saniye ekler',
        leaderboard: 'Skor tablosu',
        noScores: 'Henüz skor yok',
        getReady: 'Hazır ol!',
        sayThisNumber: 'Bu sayıyı söyle:',
        sayTheAnswer: 'Cevabı söyle:',
        score: 'Puan',
        answerLog: 'Cevap geçmişi',
        stop: 'Dur',
        restart: 'Yeniden',
        rawTranscript: 'Ham metin:',
        timesUp: 'Süre doldu!',
        finalScore: 'Final Puanı',
        completed: 'Tamamlanan',
        avgTime: 'Ort. süre',
        rate: 'Hız',
        playAgain: 'Tekrar oyna',
        mainMenu: 'Ana menü',
        speechSupported: 'Speech API destekleniyor. Başlamak için bir mod seçin.',
        speechNotSupported: 'Speech API bu tarayıcıda desteklenmiyor. Chrome kullanın.',
        micDenied: 'Mikrofon erişimi reddedildi. Mikrofon erişimine izin verin.',
        micBlocked: 'Mikrofon erişimi engellendi',
        micBlockedHint: 'Oynamak için tarayıcı ayarlarından mikrofon erişimine izin verin',
        requestMic: 'Mikrofon Erişimi İste',
        recognitionStopped: 'Tanıma durduruldu. Tekrar başlamak için bir mod seçin.',
        languageSet: 'Dil: {lang}. Başlamak için bir mod seçin.'
    },
    'pl-PL': {
        selectLanguage: 'Wybierz język',
        micRequired: 'Wymagany mikrofon - odpowiadaj głosem',
        nameTheNumber: 'Nazwij liczbę',
        subtractionBefore10: 'Odejmowanie do 10',
        subtractionSurvival: 'Odejmowanie Survival',
        sumBefore10: 'Dodawanie do 10',
        sumSurvival: 'Dodawanie Survival',
        instructionNameTheNumber: 'Powiedz liczbę na ekranie',
        instructionSubtraction: 'Powiedz wynik odejmowania',
        instructionSubtractionSurvival: 'Rozwiązuj odejmowania - każda poprawna odpowiedź dodaje 3 sekundy',
        instructionSum: 'Powiedz wynik dodawania',
        instructionSumSurvival: 'Rozwiązuj dodawania - każda poprawna odpowiedź dodaje 3 sekundy',
        leaderboard: 'Tabela wyników',
        noScores: 'Brak wyników',
        getReady: 'Przygotuj się!',
        sayThisNumber: 'Powiedz tę liczbę:',
        sayTheAnswer: 'Powiedz odpowiedź:',
        score: 'Wynik',
        answerLog: 'Historia odpowiedzi',
        stop: 'Stop',
        restart: 'Od nowa',
        rawTranscript: 'Surowy tekst:',
        timesUp: 'Czas minął!',
        finalScore: 'Wynik końcowy',
        completed: 'Ukończone',
        avgTime: 'Śr. czas',
        rate: 'Tempo',
        playAgain: 'Zagraj ponownie',
        mainMenu: 'Menu główne',
        speechSupported: 'Speech API jest obsługiwane. Wybierz tryb aby rozpocząć.',
        speechNotSupported: 'Speech API nie jest obsługiwane w tej przeglądarce. Użyj Chrome.',
        micDenied: 'Odmowa dostępu do mikrofonu. Zezwól na dostęp do mikrofonu.',
        micBlocked: 'Dostęp do mikrofonu jest zablokowany',
        micBlockedHint: 'Zezwól na dostęp do mikrofonu w ustawieniach przeglądarki',
        requestMic: 'Poproś o dostęp do mikrofonu',
        recognitionStopped: 'Rozpoznawanie zatrzymane. Wybierz tryb aby rozpocząć ponownie.',
        languageSet: 'Język: {lang}. Wybierz tryb aby rozpocząć.'
    },
    'be-BY': {
        selectLanguage: 'Абярыце мову',
        micRequired: 'Патрэбны мікрафон - адказвай голасам',
        nameTheNumber: 'Назаві лік',
        subtractionBefore10: 'Адніманне да 10',
        subtractionSurvival: 'Адніманне на выжыванне',
        sumBefore10: 'Складанне да 10',
        sumSurvival: 'Складанне на выжыванне',
        instructionNameTheNumber: 'Назаві лік на экране',
        instructionSubtraction: 'Скажы адказ на прыклад адніманне',
        instructionSubtractionSurvival: 'Рашай адніманні - кожны правільны адказ дадае 3 секунды',
        instructionSum: 'Скажы адказ на прыклад складання',
        instructionSumSurvival: 'Рашай складанні - кожны правільны адказ дадае 3 секунды',
        leaderboard: 'Табліца лідараў',
        noScores: 'Яшчэ няма вынікаў',
        getReady: 'Рыхтуйся!',
        sayThisNumber: 'Назаві гэты лік:',
        sayTheAnswer: 'Скажы адказ:',
        score: 'Лік',
        answerLog: 'Гісторыя адказаў',
        stop: 'Стоп',
        restart: 'Спачатку',
        rawTranscript: 'Распазнаны тэкст:',
        timesUp: 'Час выйшаў!',
        finalScore: 'Фінальны лік',
        completed: 'Завершана',
        avgTime: 'Сяр. час',
        rate: 'Тэмп',
        playAgain: 'Гуляць зноў',
        mainMenu: 'Галоўнае меню',
        speechSupported: 'Speech API падтрымліваецца. Абярыце рэжым каб пачаць.',
        speechNotSupported: 'Speech API не падтрымліваецца ў гэтым браўзеры. Выкарыстоўвайце Chrome.',
        micDenied: 'Доступ да мікрафона забаронены. Дазвольце доступ да мікрафона.',
        micBlocked: 'Доступ да мікрафона заблакаваны',
        micBlockedHint: 'Дазвольце доступ да мікрафона ў наладах браўзера',
        requestMic: 'Запытаць доступ да мікрафона',
        recognitionStopped: 'Распазнаванне спынена. Абярыце рэжым каб пачаць зноў.',
        languageSet: 'Мова: {lang}. Абярыце рэжым каб пачаць.'
    },
    'sv-SE': {
        selectLanguage: 'Välj språk',
        micRequired: 'Mikrofon krävs - svara genom att prata',
        nameTheNumber: 'Säg talet',
        subtractionBefore10: 'Subtraktion till 10',
        subtractionSurvival: 'Subtraktion Survival',
        sumBefore10: 'Addition till 10',
        sumSurvival: 'Addition Survival',
        instructionNameTheNumber: 'Säg talet på skärmen',
        instructionSubtraction: 'Säg svaret på subtraktionen',
        instructionSubtractionSurvival: 'Lös subtraktioner - varje rätt svar ger 3 sekunder',
        instructionSum: 'Säg svaret på additionen',
        instructionSumSurvival: 'Lös additioner - varje rätt svar ger 3 sekunder',
        leaderboard: 'Topplista',
        noScores: 'Inga poäng ännu',
        getReady: 'Gör dig redo!',
        sayThisNumber: 'Säg detta tal:',
        sayTheAnswer: 'Säg svaret:',
        score: 'Poäng',
        answerLog: 'Svarslogg',
        stop: 'Stopp',
        restart: 'Börja om',
        rawTranscript: 'Rå transkription:',
        timesUp: 'Tiden är slut!',
        finalScore: 'Slutpoäng',
        completed: 'Klara',
        avgTime: 'Snittid',
        rate: 'Takt',
        playAgain: 'Spela igen',
        mainMenu: 'Huvudmeny',
        speechSupported: 'Speech API stöds. Välj ett läge för att börja.',
        speechNotSupported: 'Speech API stöds inte i denna webbläsare. Använd Chrome.',
        micDenied: 'Mikrofonåtkomst nekad. Tillåt mikrofonåtkomst.',
        micBlocked: 'Mikrofonåtkomst är blockerad',
        micBlockedHint: 'Tillåt mikrofonåtkomst i webbläsarens inställningar för att spela',
        requestMic: 'Begär mikrofonåtkomst',
        recognitionStopped: 'Igenkänning stoppad. Välj ett läge för att börja igen.',
        languageSet: 'Språk: {lang}. Välj ett läge för att börja.'
    }
};


class NumberDictionary {
    static data = {
        'en-US': {
            'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
            'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
            'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
            'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17,
            'eighteen': 18, 'nineteen': 19, 'twenty': 20, 'thirty': 30,
            'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70,
            'eighty': 80, 'ninety': 90, 'hundred': 100
        },
        'uk-UA': {
            'нуль': 0, 'один': 1, 'одна': 1, 'два': 2, 'дві': 2, 'три': 3, 'чотири': 4,
            "п'ять": 5, 'пять': 5, 'шість': 6, 'сім': 7, 'вісім': 8, "дев'ять": 9, 'девять': 9,
            'десять': 10, 'одинадцять': 11, 'дванадцять': 12, 'тринадцять': 13,
            'чотирнадцять': 14, "п'ятнадцять": 15, 'пятнадцять': 15, 'шістнадцять': 16,
            'сімнадцять': 17, 'вісімнадцять': 18, "дев'ятнадцять": 19, 'девятнадцять': 19,
            'двадцять': 20, 'тридцять': 30, 'сорок': 40, "п'ятдесят": 50, 'пятдесят': 50,
            'шістдесят': 60, 'сімдесят': 70, 'вісімдесят': 80, "дев'яносто": 90, 'девяносто': 90,
            'сто': 100
        },
        'nl-NL': {
            'nul': 0, 'null': 0, 'een': 1, 'één': 1, 'twee': 2, 'drie': 3, 'vier': 4,
            'vijf': 5, 'zes': 6, 'zeven': 7, 'acht': 8, 'negen': 9,
            'tien': 10, 'elf': 11, 'twaalf': 12, 'dertien': 13, 'veertien': 14,
            'vijftien': 15, 'zestien': 16, 'zeventien': 17, 'achttien': 18, 'negentien': 19,
            'twintig': 20, 'dertig': 30, 'veertig': 40, 'vijftig': 50,
            'zestig': 60, 'zeventig': 70, 'tachtig': 80, 'negentig': 90, 'honderd': 100,
            'eenentwintig': 21, 'tweeëntwintig': 22, 'drieëntwintig': 23, 'vierentwintig': 24,
            'vijfentwintig': 25, 'zesentwintig': 26, 'zevenentwintig': 27, 'achtentwintig': 28, 'negenentwintig': 29,
            'eenendertig': 31, 'tweeëndertig': 32, 'drieëndertig': 33, 'vierendertig': 34,
            'vijfendertig': 35, 'zesendertig': 36, 'zevenendertig': 37, 'achtendertig': 38, 'negenendertig': 39,
            'eenenveertig': 41, 'tweeënveertig': 42, 'drieënveertig': 43, 'vierenveertig': 44,
            'vijfenveertig': 45, 'zesenveertig': 46, 'zevenenveertig': 47, 'achtenveertig': 48, 'negenenveertig': 49,
            'eenenvijftig': 51, 'tweeënvijftig': 52, 'drieënvijftig': 53, 'vierenvijftig': 54,
            'vijfenvijftig': 55, 'zesenvijftig': 56, 'zevenenvijftig': 57, 'achtenvijftig': 58, 'negenenvijftig': 59,
            'eenenzestig': 61, 'tweeënzestig': 62, 'drieënzestig': 63, 'vierenzestig': 64,
            'vijfenzestig': 65, 'zesenzestig': 66, 'zevenenzestig': 67, 'achtenzestig': 68, 'negenenzestig': 69,
            'eenenzeventig': 71, 'tweeënzeventig': 72, 'drieënzeventig': 73, 'vierenzeventig': 74,
            'vijfenzeventig': 75, 'zesenzeventig': 76, 'zevenenzeventig': 77, 'achtenzeventig': 78, 'negenenzeventig': 79,
            'eenentachtig': 81, 'tweeëntachtig': 82, 'drieëntachtig': 83, 'vierentachtig': 84,
            'vijfentachtig': 85, 'zesentachtig': 86, 'zevenentachtig': 87, 'achtentachtig': 88, 'negenentachtig': 89,
            'eenennegentig': 91, 'tweeënnegentig': 92, 'drieënnegentig': 93, 'vierennegentig': 94,
            'vijfennegentig': 95, 'zesennegentig': 96, 'zevenennegentig': 97, 'achtennegentig': 98, 'negenennegentig': 99
        },
        'tr-TR': {
            'sıfır': 0, 'bir': 1, 'iki': 2, 'üç': 3, 'dört': 4,
            'beş': 5, 'altı': 6, 'yedi': 7, 'sekiz': 8, 'dokuz': 9,
            'on': 10, 'on bir': 11, 'on iki': 12, 'on üç': 13, 'on dört': 14,
            'on beş': 15, 'on altı': 16, 'on yedi': 17, 'on sekiz': 18, 'on dokuz': 19,
            'yirmi': 20, 'yirmi bir': 21, 'yirmi iki': 22, 'yirmi üç': 23, 'yirmi dört': 24,
            'yirmi beş': 25, 'yirmi altı': 26, 'yirmi yedi': 27, 'yirmi sekiz': 28, 'yirmi dokuz': 29,
            'otuz': 30, 'kırk': 40, 'elli': 50, 'altmış': 60, 'yetmiş': 70, 'seksen': 80, 'doksan': 90, 'yüz': 100
        },
        'pl-PL': {
            'zero': 0, 'jeden': 1, 'jedna': 1, 'jedno': 1, 'dwa': 2, 'dwie': 2, 'trzy': 3, 'cztery': 4,
            'pięć': 5, 'sześć': 6, 'siedem': 7, 'osiem': 8, 'dziewięć': 9,
            'dziesięć': 10, 'jedenaście': 11, 'dwanaście': 12, 'trzynaście': 13, 'czternaście': 14,
            'piętnaście': 15, 'szesnaście': 16, 'siedemnaście': 17, 'osiemnaście': 18, 'dziewiętnaście': 19,
            'dwadzieścia': 20, 'dwadzieścia jeden': 21, 'dwadzieścia dwa': 22, 'dwadzieścia trzy': 23,
            'dwadzieścia cztery': 24, 'dwadzieścia pięć': 25, 'dwadzieścia sześć': 26,
            'dwadzieścia siedem': 27, 'dwadzieścia osiem': 28, 'dwadzieścia dziewięć': 29,
            'trzydzieści': 30, 'czterdzieści': 40, 'pięćdziesiąt': 50,
            'sześćdziesiąt': 60, 'siedemdziesiąt': 70, 'osiemdziesiąt': 80, 'dziewięćdziesiąt': 90, 'sto': 100
        },
        'be-BY': {
            'нуль': 0, 'адзін': 1, 'адна': 1, 'два': 2, 'дзве': 2, 'тры': 3, 'чатыры': 4,
            'пяць': 5, 'шэсць': 6, 'сем': 7, 'восем': 8, 'дзевяць': 9,
            'дзесяць': 10, 'адзінаццаць': 11, 'дванаццаць': 12, 'трынаццаць': 13, 'чатырнаццаць': 14,
            'пятнаццаць': 15, 'шаснаццаць': 16, 'семнаццаць': 17, 'васямнаццаць': 18, 'дзевятнаццаць': 19,
            'дваццаць': 20, 'трыццаць': 30, 'сорак': 40, 'пяцьдзясят': 50,
            'шэсцьдзясят': 60, 'семдзесят': 70, 'восемдзесят': 80, 'дзевяноста': 90, 'сто': 100
        },
        'sv-SE': {
            'noll': 0, 'ett': 1, 'en': 1, 'två': 2, 'tre': 3, 'fyra': 4,
            'fem': 5, 'sex': 6, 'sju': 7, 'åtta': 8, 'nio': 9,
            'tio': 10, 'elva': 11, 'tolv': 12, 'tretton': 13, 'fjorton': 14,
            'femton': 15, 'sexton': 16, 'sjutton': 17, 'arton': 18, 'nitton': 19,
            'tjugo': 20, 'tjugoett': 21, 'tjugotvå': 22, 'tjugotre': 23, 'tjugofyra': 24,
            'tjugofem': 25, 'tjugosex': 26, 'tjugosju': 27, 'tjugoåtta': 28, 'tjugonio': 29,
            'trettio': 30, 'fyrtio': 40, 'femtio': 50,
            'sextio': 60, 'sjuttio': 70, 'åttio': 80, 'nittio': 90, 'hundra': 100
        }
    };

    static langNames = {
        'en-US': 'English',
        'uk-UA': 'Ukrainian',
        'nl-NL': 'Dutch',
        'tr-TR': 'Turkish',
        'pl-PL': 'Polish',
        'be-BY': 'Belarusian',
        'sv-SE': 'Swedish'
    };

    static getWordsForLang(lang) {
        return this.data[lang] || this.data['en-US'];
    }

    static getLangName(lang) {
        return this.langNames[lang] || lang;
    }
}


class NumberExtractor {
    constructor(lang = 'en-US') {
        this.lang = lang;
        this.maxNumber = 100; // Default for Name the Number
    }

    setLang(lang) {
        this.lang = lang;
    }

    setMaxNumber(max) {
        this.maxNumber = max;
    }

    extract(transcript) {
        const lower = transcript.toLowerCase();
        let lastNumber = null;
        let lastEndIndex = -1;
        let lastWordLength = 0;

        // Find all digit sequences
        const digitMatches = [...lower.matchAll(/\d+/g)];
        for (const match of digitMatches) {
            const num = parseInt(match[0], 10);
            const endIndex = match.index + match[0].length;
            const wordLength = match[0].length;

            // If number is within valid range, use it
            if (num <= this.maxNumber) {
                if (endIndex > lastEndIndex || (endIndex === lastEndIndex && wordLength > lastWordLength)) {
                    lastEndIndex = endIndex;
                    lastWordLength = wordLength;
                    lastNumber = num;
                }
            } else {
                // Number too large (e.g., "A2433" concatenated digits)
                // Extract the last digit only
                const lastDigit = num % 10;
                if (endIndex > lastEndIndex) {
                    lastEndIndex = endIndex;
                    lastWordLength = 1;
                    lastNumber = lastDigit;
                    logger.log('EXTRACT', 'truncated', { from: num, to: lastDigit });
                }
            }
        }

        // Find all word numbers and track the last one by END position
        // Prefer longer words when they end at the same position (e.g., "вісім" over "сім")
        const langMap = NumberDictionary.getWordsForLang(this.lang);
        for (const [word, num] of Object.entries(langMap)) {
            let searchStart = 0;
            let idx;
            // Find ALL occurrences and use the last one's end position
            while ((idx = lower.indexOf(word, searchStart)) !== -1) {
                const endIndex = idx + word.length;
                const wordLength = word.length;
                // Prefer later end position, or longer word if same end position
                if (endIndex > lastEndIndex || (endIndex === lastEndIndex && wordLength > lastWordLength)) {
                    lastEndIndex = endIndex;
                    lastWordLength = wordLength;
                    lastNumber = num;
                }
                searchStart = idx + 1;
            }
        }

        return lastNumber;
    }
}


class SpeechRecognizer {
    constructor(lang = 'en-US') {
        this.lang = lang;
        this.recognition = null;
        this.onResult = null;
        this.onStart = null;
        this.onEnd = null;
        this.onError = null;
        this.transcriptOffset = 0;
    }

    static isSupported() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    }

    setLang(lang) {
        this.lang = lang;
        if (this.recognition) {
            this.stop();
            this.recognition = null;
        }
    }

    setup() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.lang;

        this.recognition.onstart = () => {
            logger.log('SPEECH', 'started');
            this.onStart?.();
        };

        this.recognition.onresult = (event) => {
            let fullTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
                fullTranscript += event.results[i][0].transcript;
            }
            const newContent = fullTranscript.substring(this.transcriptOffset);
            logger.log('SPEECH', 'result', { new: newContent, full: fullTranscript });
            this.onResult?.(newContent, fullTranscript);
        };

        this.recognition.onerror = (event) => {
            logger.log('SPEECH', 'error', { error: event.error });
            this.onError?.(event.error);
        };

        this.recognition.onend = () => {
            logger.log('SPEECH', 'ended');
            this.onEnd?.();
        };
    }

    start() {
        if (!this.recognition) {
            this.setup();
        }
        this.transcriptOffset = 0;
        this.recognition.start();
    }

    stop() {
        this.recognition?.stop();
    }

    clearBuffer(currentTranscriptLength) {
        logger.log('SPEECH', 'buffer cleared', { offset: currentTranscriptLength });
        this.transcriptOffset = currentTranscriptLength;
    }
}


class SoundManager {
    constructor() {
        this.audioContext = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        // Resume if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    playSuccess() {
        this.init();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Two-tone ascending "ding" - common success sound
        // First tone: C5 (523Hz), Second tone: E5 (659Hz)
        const frequencies = [523, 659];
        const duration = 0.08;
        const gap = 0.06;

        frequencies.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = freq;

            // Quick fade out to avoid click
            gainNode.gain.setValueAtTime(0.3, now + i * (duration + gap));
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * (duration + gap) + duration);

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.start(now + i * (duration + gap));
            oscillator.stop(now + i * (duration + gap) + duration);
        });
    }

    playCountdown() {
        this.init();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Low tone for countdown tick (G4 - 392Hz)
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 392;

        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.15);
    }

    playGo() {
        this.init();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Higher ascending tone for "Go!" (C5 → G5)
        const frequencies = [523, 784];
        const duration = 0.1;

        frequencies.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = freq;

            gainNode.gain.setValueAtTime(0.3, now + i * duration);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * duration + duration);

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.start(now + i * duration);
            oscillator.stop(now + i * duration + duration);
        });
    }
}


class Leaderboard {
    constructor(storageKey = CONFIG.STORAGE_KEY_NAME_NUMBER) {
        this.storageKey = storageKey;
        this.entries = this.load();
    }

    setStorageKey(storageKey) {
        this.storageKey = storageKey;
        this.entries = this.load();
    }

    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
        } catch {
            // Storage might be full or disabled
        }
    }

    addEntry(score, lang) {
        const entry = {
            score,
            lang,
            date: Date.now(),
            id: Date.now()
        };

        this.entries.push(entry);
        this.entries.sort((a, b) => b.score - a.score);
        this.entries = this.entries.slice(0, CONFIG.LEADERBOARD_MAX_ENTRIES);
        this.save();

        return entry.id;
    }

    getEntries() {
        return this.entries;
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    }
}


class Timer {
    constructor(duration = CONFIG.TIMER_DURATION_NAME_NUMBER) {
        this.duration = duration;
        this.timeRemaining = this.duration;
        this.intervalId = null;
        this.onTick = null;
        this.onEnd = null;
    }

    setDuration(duration) {
        this.duration = duration;
        this.timeRemaining = duration;
    }

    start() {
        this.timeRemaining = this.duration;
        this.intervalId = setInterval(() => {
            this.timeRemaining--;
            this.onTick?.(this.timeRemaining, this.duration);

            if (this.timeRemaining <= 0) {
                this.stop();
                this.onEnd?.();
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset() {
        this.stop();
        this.timeRemaining = this.duration;
    }

    addTime(seconds) {
        this.timeRemaining += seconds;
        this.onTick?.(this.timeRemaining, this.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}


// Base class for all game modes
class Game {
    constructor() {
        this.expectedAnswer = null;
    }

    reset() {
        this.expectedAnswer = null;
    }

    generateProblem() {
        throw new Error('generateProblem must be implemented');
    }

    getProblemDisplay() {
        throw new Error('getProblemDisplay must be implemented');
    }

    getFullStatement() {
        throw new Error('getFullStatement must be implemented');
    }

    getExpectedAnswer() {
        return this.expectedAnswer;
    }
}


class NameTheNumberGame extends Game {
    static TIMER_DURATION = 20;
    static NUMBER_RANGE_MIN = 1;
    static NUMBER_RANGE_MAX = 100;
    static NUMBER_HISTORY_SIZE = 20;
    static MAX_GENERATION_ATTEMPTS = 100;

    constructor() {
        super();
        this.numberHistory = [];
    }

    reset() {
        super.reset();
        this.numberHistory = [];
    }

    generateProblem() {
        let newNumber;
        let attempts = 0;
        const range = NameTheNumberGame.NUMBER_RANGE_MAX - NameTheNumberGame.NUMBER_RANGE_MIN + 1;

        do {
            newNumber = Math.floor(Math.random() * range) + NameTheNumberGame.NUMBER_RANGE_MIN;
            attempts++;
            if (attempts > NameTheNumberGame.MAX_GENERATION_ATTEMPTS) break;
        } while (this.numberHistory.includes(newNumber));

        this.expectedAnswer = newNumber;
        this.numberHistory.push(newNumber);

        if (this.numberHistory.length > NameTheNumberGame.NUMBER_HISTORY_SIZE) {
            this.numberHistory.shift();
        }

        return this.expectedAnswer;
    }

    getProblemDisplay() {
        return this.expectedAnswer;
    }

    getFullStatement() {
        return this.expectedAnswer;
    }
}


class SubtractionGame extends Game {
    static TIMER_DURATION = 60;
    static MAX_RESULT = 9;
    static EASY_MAX_RATIO = 0.3;
    static PROBLEM_HISTORY_SIZE = 10;
    static MAX_GENERATION_ATTEMPTS = 100;

    constructor() {
        super();
        this.currentProblem = null;
        this.lastResult = null;
        this.problemHistory = [];
        this.totalProblems = 0;
        this.easyProblems = 0;
    }

    reset() {
        super.reset();
        this.currentProblem = null;
        this.lastResult = null;
        this.problemHistory = [];
        this.totalProblems = 0;
        this.easyProblems = 0;
    }

    isEasyProblem(result, subtrahend) {
        return result === 0 || result === 1 || subtrahend === 1;
    }

    needsHardProblem() {
        if (this.totalProblems === 0) return false;
        const easyRatio = this.easyProblems / this.totalProblems;
        return easyRatio >= SubtractionGame.EASY_MAX_RATIO;
    }

    generateProblem() {
        let result;
        let minuend;
        let subtrahend;
        let problemKey;
        let attempts = 0;
        const forceHard = this.needsHardProblem();

        do {
            result = Math.floor(Math.random() * (SubtractionGame.MAX_RESULT + 1));
            const maxMinuend = 10;
            const minMinuend = result + 1;
            minuend = minMinuend + Math.floor(Math.random() * (maxMinuend - minMinuend + 1));
            subtrahend = minuend - result;
            problemKey = `${minuend}-${subtrahend}`;

            // If we need a hard problem and this one is easy, regenerate
            if (forceHard && this.isEasyProblem(result, subtrahend)) {
                attempts++;
                continue;
            }

            // Check for consecutive same result
            if (result === this.lastResult) {
                attempts++;
                continue;
            }

            // Check if this exact problem was used in last 10
            if (this.problemHistory.includes(problemKey)) {
                attempts++;
                continue;
            }

            break;
        } while (attempts < SubtractionGame.MAX_GENERATION_ATTEMPTS);

        this.expectedAnswer = result;
        this.currentProblem = { minuend, subtrahend, result };
        this.lastResult = result;

        // Track easy problem stats
        this.totalProblems++;
        if (this.isEasyProblem(result, subtrahend)) {
            this.easyProblems++;
        }

        // Track problem history
        this.problemHistory.push(problemKey);
        if (this.problemHistory.length > SubtractionGame.PROBLEM_HISTORY_SIZE) {
            this.problemHistory.shift();
        }

        return this.expectedAnswer;
    }

    getProblemDisplay() {
        if (this.currentProblem) {
            return `${this.currentProblem.minuend} - ${this.currentProblem.subtrahend} = ?`;
        }
        return '?';
    }

    getFullStatement() {
        if (this.currentProblem) {
            return `${this.currentProblem.minuend}-${this.currentProblem.subtrahend}=${this.currentProblem.result}`;
        }
        return '?';
    }
}


class SubtractionSurvivalGame extends SubtractionGame {
    static TIMER_DURATION = 30;
    static TIME_BONUS = 3;
}


class SumGame extends Game {
    static TIMER_DURATION = 60;
    static MAX_RESULT = 9;
    static EASY_MAX_RATIO = 0.3;
    static PROBLEM_HISTORY_SIZE = 10;
    static MAX_GENERATION_ATTEMPTS = 100;

    constructor() {
        super();
        this.currentProblem = null;
        this.lastResult = null;
        this.problemHistory = [];
        this.totalProblems = 0;
        this.easyProblems = 0;
    }

    reset() {
        super.reset();
        this.currentProblem = null;
        this.lastResult = null;
        this.problemHistory = [];
        this.totalProblems = 0;
        this.easyProblems = 0;
    }

    isEasyProblem(result, addend1, addend2) {
        return addend1 === 0 || addend1 === 1 || addend2 === 0 || addend2 === 1;
    }

    needsHardProblem() {
        if (this.totalProblems === 0) return false;
        const easyRatio = this.easyProblems / this.totalProblems;
        return easyRatio >= SumGame.EASY_MAX_RATIO;
    }

    generateProblem() {
        let result;
        let addend1;
        let addend2;
        let problemKey;
        let attempts = 0;
        const forceHard = this.needsHardProblem();

        do {
            result = Math.floor(Math.random() * (SumGame.MAX_RESULT + 1));
            // Generate two addends that sum to result
            addend1 = Math.floor(Math.random() * (result + 1));
            addend2 = result - addend1;
            problemKey = `${addend1}+${addend2}`;

            // If we need a hard problem and this one is easy, regenerate
            if (forceHard && this.isEasyProblem(result, addend1, addend2)) {
                attempts++;
                continue;
            }

            // Check for consecutive same result
            if (result === this.lastResult) {
                attempts++;
                continue;
            }

            // Check if this exact problem was used in last 10
            if (this.problemHistory.includes(problemKey)) {
                attempts++;
                continue;
            }

            break;
        } while (attempts < SumGame.MAX_GENERATION_ATTEMPTS);

        this.expectedAnswer = result;
        this.currentProblem = { addend1, addend2, result };
        this.lastResult = result;

        // Track easy problem stats
        this.totalProblems++;
        if (this.isEasyProblem(result, addend1, addend2)) {
            this.easyProblems++;
        }

        // Track problem history
        this.problemHistory.push(problemKey);
        if (this.problemHistory.length > SumGame.PROBLEM_HISTORY_SIZE) {
            this.problemHistory.shift();
        }

        return this.expectedAnswer;
    }

    getProblemDisplay() {
        if (this.currentProblem) {
            return `${this.currentProblem.addend1} + ${this.currentProblem.addend2} = ?`;
        }
        return '?';
    }

    getFullStatement() {
        if (this.currentProblem) {
            return `${this.currentProblem.addend1}+${this.currentProblem.addend2}=${this.currentProblem.result}`;
        }
        return '?';
    }
}


class SumSurvivalGame extends SumGame {
    static TIMER_DURATION = 30;
    static TIME_BONUS = 3;
}


// Registry of available game modes
const GameModes = {
    NAME_THE_NUMBER: 'name-the-number',
    SUBTRACTION: 'subtraction',
    SUBTRACTION_SURVIVAL: 'subtraction-survival',
    SUM: 'sum',
    SUM_SURVIVAL: 'sum-survival'
};

const GameRegistry = {
    [GameModes.NAME_THE_NUMBER]: NameTheNumberGame,
    [GameModes.SUBTRACTION]: SubtractionGame,
    [GameModes.SUBTRACTION_SURVIVAL]: SubtractionSurvivalGame,
    [GameModes.SUM]: SumGame,
    [GameModes.SUM_SURVIVAL]: SumSurvivalGame
};


// Manages game session: score, answers, delegates to specific game
class GameRunner {
    constructor() {
        this.currentGame = null;
        this.currentMode = null;
        this.score = 0;
        this.lastCorrectAnswer = null;
        this.responseLog = [];
    }

    setMode(mode) {
        const GameClass = GameRegistry[mode];
        if (!GameClass) {
            throw new Error(`Unknown game mode: ${mode}`);
        }
        this.currentMode = mode;
        this.currentGame = new GameClass();
    }

    reset() {
        this.score = 0;
        this.lastCorrectAnswer = null;
        this.responseLog = [];
        if (this.currentGame) {
            this.currentGame.reset();
        }
    }

    generateProblem() {
        if (!this.currentGame) {
            throw new Error('No game mode set');
        }
        return this.currentGame.generateProblem();
    }

    getProblemDisplay() {
        return this.currentGame?.getProblemDisplay() ?? '?';
    }

    getFullStatement() {
        return this.currentGame?.getFullStatement() ?? '?';
    }

    checkAnswer(spokenNumber, generateNewProblem = true) {
        if (spokenNumber === this.lastCorrectAnswer) {
            return { status: 'duplicate' };
        }

        const expectedAnswer = this.currentGame.getExpectedAnswer();

        if (spokenNumber === expectedAnswer) {
            this.score++;
            this.lastCorrectAnswer = spokenNumber;
            const fullStatement = this.getFullStatement();

            this.responseLog.push({
                target: expectedAnswer,
                statement: fullStatement,
                spoken: spokenNumber,
                timestamp: Date.now()
            });

            if (generateNewProblem) {
                this.generateProblem();
            }

            return {
                status: 'correct',
                score: this.score,
                newProblem: generateNewProblem ? this.getProblemDisplay() : null,
                answered: expectedAnswer,
                fullStatement: fullStatement
            };
        }

        return { status: 'wrong', spoken: spokenNumber, target: expectedAnswer };
    }

    getResponseLog() {
        return this.responseLog;
    }
}


class UI {
    constructor() {
        this.elements = {
            permissionStatus: document.getElementById('permission-status'),
            startBtn: document.getElementById('start-btn'),
            startSubtractionBtn: document.getElementById('start-subtraction-btn'),
            startSurvivalBtn: document.getElementById('start-survival-btn'),
            startSumBtn: document.getElementById('start-sum-btn'),
            startSumSurvivalBtn: document.getElementById('start-sum-survival-btn'),
            restartBtn: document.getElementById('restart-btn'),
            stopBtn: document.getElementById('stop-btn'),
            recognizedNumber: document.getElementById('recognized-number'),
            transcript: document.getElementById('transcript'),
            targetNumber: document.getElementById('target-number'),
            targetLabel: document.querySelector('.target-section .label'),
            score: document.getElementById('score'),
            setupScreen: document.getElementById('setup-screen'),
            countdownScreen: document.getElementById('countdown-screen'),
            countdownNumber: document.getElementById('countdown-number'),
            gameInstruction: document.getElementById('game-instruction'),
            gameScreen: document.getElementById('game-screen'),
            resultsScreen: document.getElementById('results-screen'),
            answerLog: document.getElementById('answer-log'),
            langRadios: document.querySelectorAll('input[name="lang"]'),
            timerFill: document.getElementById('timer-fill'),
            timerDisplay: document.getElementById('timer-display'),
            finalScore: document.getElementById('final-score'),
            correctCount: document.getElementById('correct-count'),
            wrongCount: document.getElementById('wrong-count'),
            accuracy: document.getElementById('accuracy'),
            leaderboardList: document.getElementById('leaderboard-list'),
            playAgainBtn: document.getElementById('play-again-btn'),
            mainMenuBtn: document.getElementById('main-menu-btn'),
            micBlocked: document.getElementById('mic-blocked'),
            modeButtons: document.getElementById('mode-buttons'),
            requestMicBtn: document.getElementById('request-mic-btn')
        };
    }

    showMicBlocked() {
        this.elements.micBlocked.classList.remove('hidden');
        this.elements.modeButtons.classList.add('hidden');
    }

    showModeButtons() {
        this.elements.micBlocked.classList.add('hidden');
        this.elements.modeButtons.classList.remove('hidden');
    }

    onRequestMicClick(callback) {
        this.elements.requestMicBtn.addEventListener('click', callback);
    }

    showScreen(screenName) {
        this.elements.setupScreen.classList.add('hidden');
        this.elements.countdownScreen.classList.add('hidden');
        this.elements.gameScreen.classList.add('hidden');
        this.elements.resultsScreen.classList.add('hidden');

        if (screenName === 'setup') {
            this.elements.setupScreen.classList.remove('hidden');
        } else if (screenName === 'countdown') {
            this.elements.countdownScreen.classList.remove('hidden');
        } else if (screenName === 'game') {
            this.elements.gameScreen.classList.remove('hidden');
        } else if (screenName === 'results') {
            this.elements.resultsScreen.classList.remove('hidden');
        }
    }

    setCountdownNumber(num) {
        this.elements.countdownNumber.textContent = num;
    }

    setGameInstruction(text) {
        this.elements.gameInstruction.textContent = text;
    }

    applyTranslations(lang) {
        const t = TRANSLATIONS[lang] || TRANSLATIONS['en-US'];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.textContent = t[key];
            }
        });
    }

    getTranslation(lang, key, replacements = {}) {
        const t = TRANSLATIONS[lang] || TRANSLATIONS['en-US'];
        let text = t[key] || key;
        for (const [placeholder, value] of Object.entries(replacements)) {
            text = text.replace(`{${placeholder}}`, value);
        }
        return text;
    }

    setPermissionStatus(text) {
        this.elements.permissionStatus.textContent = text;
    }

    setStartButtonEnabled(enabled) {
        this.elements.startBtn.disabled = !enabled;
        this.elements.startSubtractionBtn.disabled = !enabled;
        this.elements.startSurvivalBtn.disabled = !enabled;
        this.elements.startSumBtn.disabled = !enabled;
        this.elements.startSumSurvivalBtn.disabled = !enabled;
    }

    setTargetLabel(text) {
        this.elements.targetLabel.textContent = text;
    }

    setTargetNumber(num) {
        this.elements.targetNumber.textContent = num;
    }

    setScore(score) {
        this.elements.score.textContent = score;
    }

    setRecognizedNumber(num, status) {
        if (status === 'correct') {
            this.elements.recognizedNumber.textContent = num + ' ✓';
            this.elements.recognizedNumber.className = 'recognized correct';
        } else if (status === 'wrong') {
            this.elements.recognizedNumber.textContent = num;
            this.elements.recognizedNumber.className = 'recognized wrong';
        } else {
            this.elements.recognizedNumber.textContent = num;
            this.elements.recognizedNumber.className = 'recognized';
        }
    }

    setTranscript(text) {
        this.elements.transcript.textContent = text;
    }

    clearAnswerLog() {
        this.elements.answerLog.innerHTML = '';
    }

    addLogEntry(target, spoken, isCorrect) {
        const entry = document.createElement('div');
        entry.className = `log-entry ${isCorrect ? 'correct' : 'wrong'}`;
        entry.innerHTML = `<span>${target}</span><span>${isCorrect ? '✓' : spoken}</span>`;
        this.elements.answerLog.insertBefore(entry, this.elements.answerLog.firstChild);
    }

    getSelectedLang() {
        const checked = document.querySelector('input[name="lang"]:checked');
        return checked ? checked.value : 'en-US';
    }

    setSelectedLang(lang) {
        const radio = document.querySelector(`input[name="lang"][value="${lang}"]`);
        if (radio) {
            radio.checked = true;
        }
    }

    getSavedLang() {
        try {
            const saved = localStorage.getItem(CONFIG.STORAGE_KEY_LANGUAGE);
            // Verify saved language is still supported
            if (saved && CONFIG.SUPPORTED_LANGUAGES.includes(saved)) {
                return saved;
            }
            return null;
        } catch {
            return null;
        }
    }

    saveLang(lang) {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY_LANGUAGE, lang);
        } catch {
            // Storage might be full or disabled
        }
    }

    getBrowserLang() {
        const browserLangs = navigator.languages || [navigator.language];
        for (const browserLang of browserLangs) {
            // Exact match
            if (CONFIG.SUPPORTED_LANGUAGES.includes(browserLang)) {
                return browserLang;
            }
            // Match by language code (e.g., 'uk' matches 'uk-UA')
            const langCode = browserLang.split('-')[0];
            const match = CONFIG.SUPPORTED_LANGUAGES.find(l => l.startsWith(langCode + '-'));
            if (match) {
                return match;
            }
        }
        return 'en-US'; // Fallback to English
    }

    getInitialLang() {
        return this.getSavedLang() || this.getBrowserLang();
    }

    updateTimer(timeRemaining, totalTime) {
        const percentage = (timeRemaining / totalTime) * 100;
        this.elements.timerFill.style.width = `${percentage}%`;

        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        this.elements.timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        // Update colors based on time remaining
        this.elements.timerFill.classList.remove('warning', 'danger');
        this.elements.timerDisplay.classList.remove('warning', 'danger');

        if (timeRemaining <= CONFIG.TIMER_DANGER_THRESHOLD) {
            this.elements.timerFill.classList.add('danger');
            this.elements.timerDisplay.classList.add('danger');
        } else if (timeRemaining <= CONFIG.TIMER_WARNING_THRESHOLD) {
            this.elements.timerFill.classList.add('warning');
            this.elements.timerDisplay.classList.add('warning');
        }
    }

    showResults(score, totalNumbers, avgTimePerAnswer, timerDuration) {
        const ratePerMinute = Math.round(score / timerDuration * CONFIG.SECONDS_PER_MINUTE);

        this.elements.finalScore.textContent = score;
        this.elements.correctCount.textContent = totalNumbers;
        this.elements.wrongCount.textContent = avgTimePerAnswer ? `${avgTimePerAnswer}s` : '-';
        this.elements.accuracy.textContent = `${ratePerMinute}/min`;

        this.showScreen('results');
    }

    renderLeaderboard(entries, currentEntryId, lang) {
        const t = TRANSLATIONS[lang] || TRANSLATIONS['en-US'];

        if (entries.length === 0) {
            this.elements.leaderboardList.innerHTML = `<p style="text-align: center; color: #666;">${t.noScores}</p>`;
            return;
        }

        const html = entries.map((entry, index) => {
            const isCurrent = entry.id === currentEntryId;
            const date = new Date(entry.date).toLocaleDateString();
            return `
                <div class="leaderboard-entry ${isCurrent ? 'current' : ''}">
                    <span class="leaderboard-rank">#${index + 1}</span>
                    <span class="leaderboard-score">${entry.score}</span>
                    <span class="leaderboard-date">${date}</span>
                </div>
            `;
        }).join('');

        this.elements.leaderboardList.innerHTML = html;
    }

    onLangChange(callback) {
        this.elements.langRadios.forEach(radio => {
            radio.addEventListener('change', (e) => callback(e.target.value));
        });
    }

    onStartClick(callback) {
        this.elements.startBtn.addEventListener('click', callback);
    }

    onStartSubtractionClick(callback) {
        this.elements.startSubtractionBtn.addEventListener('click', callback);
    }

    onStartSurvivalClick(callback) {
        this.elements.startSurvivalBtn.addEventListener('click', callback);
    }

    onStartSumClick(callback) {
        this.elements.startSumBtn.addEventListener('click', callback);
    }

    onStartSumSurvivalClick(callback) {
        this.elements.startSumSurvivalBtn.addEventListener('click', callback);
    }

    onStopClick(callback) {
        this.elements.stopBtn.addEventListener('click', callback);
    }

    onRestartClick(callback) {
        this.elements.restartBtn.addEventListener('click', callback);
    }

    onPlayAgainClick(callback) {
        this.elements.playAgainBtn.addEventListener('click', callback);
    }

    onMainMenuClick(callback) {
        this.elements.mainMenuBtn.addEventListener('click', callback);
    }
}


class App {
    constructor() {
        this.ui = new UI();
        this.game = new GameRunner();
        this.extractor = new NumberExtractor();
        this.recognizer = new SpeechRecognizer();
        this.timer = new Timer();
        this.leaderboard = new Leaderboard();
        this.sound = new SoundManager();
        this.gameEndedByTimer = false;
        this.isRestarting = false;
        this.isResuming = false;
        this.isGameActive = false;
        this.inGracePeriod = false;
        this.gracePeriodTimeout = null;
        this.currentLang = 'en-US';
        this.currentMode = GameModes.NAME_THE_NUMBER;
        this.currentEntryId = null;

        this.init();
    }

    init() {
        // Get language from localStorage or browser preference (fallback to English)
        this.currentLang = this.ui.getInitialLang();
        this.ui.setSelectedLang(this.currentLang);
        this.ui.applyTranslations(this.currentLang);
        this.checkSpeechSupport();
        this.bindEvents();
    }

    checkSpeechSupport() {
        if (!SpeechRecognizer.isSupported()) {
            this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'speechNotSupported'));
            return;
        }
        this.checkMicPermission();
    }

    async checkMicPermission() {
        try {
            const result = await navigator.permissions.query({ name: 'microphone' });
            this.handleMicPermissionState(result.state);
            result.onchange = () => this.handleMicPermissionState(result.state);
        } catch {
            // Permissions API not supported, try to request directly
            this.requestMicAccess();
        }
    }

    handleMicPermissionState(state) {
        if (state === 'granted') {
            this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'speechSupported'));
            this.ui.showModeButtons();
            this.ui.setStartButtonEnabled(true);
        } else if (state === 'denied') {
            this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'micDenied'));
            this.ui.showMicBlocked();
        } else {
            // prompt state - show buttons but permission will be asked on game start
            this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'speechSupported'));
            this.ui.showModeButtons();
            this.ui.setStartButtonEnabled(true);
        }
    }

    async requestMicAccess() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            this.handleMicPermissionState('granted');
        } catch (err) {
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                this.handleMicPermissionState('denied');
            } else {
                // Other error, still show buttons and let it fail on game start
                this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'speechSupported'));
                this.ui.showModeButtons();
                this.ui.setStartButtonEnabled(true);
            }
        }
    }

    bindEvents() {
        this.ui.onLangChange((lang) => this.handleLangChange(lang));
        this.ui.onRequestMicClick(() => this.requestMicAccess());
        this.ui.onStartClick(() => this.startGame(GameModes.NAME_THE_NUMBER));
        this.ui.onStartSubtractionClick(() => this.startGame(GameModes.SUBTRACTION));
        this.ui.onStartSurvivalClick(() => this.startGame(GameModes.SUBTRACTION_SURVIVAL));
        this.ui.onStartSumClick(() => this.startGame(GameModes.SUM));
        this.ui.onStartSumSurvivalClick(() => this.startGame(GameModes.SUM_SURVIVAL));
        this.ui.onRestartClick(() => this.restartGame());
        this.ui.onStopClick(() => this.stopGame());
        this.ui.onPlayAgainClick(() => this.startGame(this.currentMode));
        this.ui.onMainMenuClick(() => this.goToMainMenu());

        this.recognizer.onStart = () => this.handleRecognitionStart();
        this.recognizer.onResult = (latest, full) => this.handleRecognitionResult(latest, full);
        this.recognizer.onError = (error) => this.handleRecognitionError(error);
        this.recognizer.onEnd = () => this.handleRecognitionEnd();

        this.timer.onTick = (remaining, total) => this.ui.updateTimer(remaining, total);
        this.timer.onEnd = () => this.handleTimerEnd();
    }

    handleLangChange(lang) {
        this.currentLang = lang;
        this.ui.saveLang(lang);
        this.extractor.setLang(lang);
        this.recognizer.setLang(lang);
        this.ui.applyTranslations(lang);
        this.ui.setRecognizedNumber('-', 'neutral');
        this.ui.setTranscript('-');
        this.ui.setPermissionStatus(
            this.ui.getTranslation(lang, 'languageSet', { lang: NumberDictionary.getLangName(lang) })
        );
    }

    startGame(mode) {
        this.currentMode = mode;
        this.game.setMode(mode);

        const lang = this.ui.getSelectedLang();
        this.extractor.setLang(lang);
        this.recognizer.setLang(lang);
        this.gameEndedByTimer = false;

        // Set timer duration, max number, and leaderboard based on mode
        if (mode === GameModes.SUBTRACTION_SURVIVAL) {
            this.timer.setDuration(SubtractionSurvivalGame.TIMER_DURATION);
            this.extractor.setMaxNumber(SubtractionGame.MAX_RESULT);
            this.leaderboard.setStorageKey(CONFIG.STORAGE_KEY_SUBTRACTION_SURVIVAL);
        } else if (mode === GameModes.SUBTRACTION) {
            this.timer.setDuration(SubtractionGame.TIMER_DURATION);
            this.extractor.setMaxNumber(SubtractionGame.MAX_RESULT);
            this.leaderboard.setStorageKey(CONFIG.STORAGE_KEY_SUBTRACTION);
        } else if (mode === GameModes.SUM_SURVIVAL) {
            this.timer.setDuration(SumSurvivalGame.TIMER_DURATION);
            this.extractor.setMaxNumber(SumGame.MAX_RESULT);
            this.leaderboard.setStorageKey(CONFIG.STORAGE_KEY_SUM_SURVIVAL);
        } else if (mode === GameModes.SUM) {
            this.timer.setDuration(SumGame.TIMER_DURATION);
            this.extractor.setMaxNumber(SumGame.MAX_RESULT);
            this.leaderboard.setStorageKey(CONFIG.STORAGE_KEY_SUM);
        } else {
            this.timer.setDuration(NameTheNumberGame.TIMER_DURATION);
            this.extractor.setMaxNumber(NameTheNumberGame.NUMBER_RANGE_MAX);
            this.leaderboard.setStorageKey(CONFIG.STORAGE_KEY_NAME_NUMBER);
        }

        logger.log('GAME', 'starting', { mode: this.currentMode });
        this.startPregameCountdown();
    }

    startPregameCountdown() {
        let count = CONFIG.PREGAME_COUNTDOWN_SECONDS;
        this.ui.showScreen('countdown');
        this.ui.setCountdownNumber(count);

        // Set game instruction based on mode
        const instructionKeys = {
            [GameModes.NAME_THE_NUMBER]: 'instructionNameTheNumber',
            [GameModes.SUBTRACTION]: 'instructionSubtraction',
            [GameModes.SUBTRACTION_SURVIVAL]: 'instructionSubtractionSurvival',
            [GameModes.SUM]: 'instructionSum',
            [GameModes.SUM_SURVIVAL]: 'instructionSumSurvival'
        };
        const instructionKey = instructionKeys[this.currentMode] || 'instructionNameTheNumber';
        this.ui.setGameInstruction(this.ui.getTranslation(this.currentLang, instructionKey));

        this.sound.playCountdown();

        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                this.ui.setCountdownNumber(count);
                this.sound.playCountdown();
            } else {
                clearInterval(countdownInterval);
                this.sound.playGo();
                this.recognizer.start();
            }
        }, CONFIG.COUNTDOWN_INTERVAL_MS);
    }

    stopGame() {
        logger.log('GAME', 'stopped');
        this.isGameActive = false;
        this.clearGracePeriod();
        this.timer.stop();
        this.recognizer.stop();
    }

    restartGame() {
        logger.log('GAME', 'restarting');
        this.isRestarting = true;
        this.clearGracePeriod();
        this.timer.stop();
        this.recognizer.stop();
        this.startGame(this.currentMode);
    }

    clearGracePeriod() {
        if (this.gracePeriodTimeout) {
            clearTimeout(this.gracePeriodTimeout);
            this.gracePeriodTimeout = null;
        }
        this.inGracePeriod = false;
    }

    goToMainMenu() {
        this.ui.showScreen('setup');
        this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'speechSupported'));
    }

    handleRecognitionStart() {
        // If resuming after silence timeout, just log and continue
        if (this.isResuming) {
            logger.log('SPEECH', 'resumed');
            this.isResuming = false;
            return;
        }

        logger.newSession();
        logger.log('GAME', 'started', { mode: this.currentMode, lang: this.currentLang });

        this.clearGracePeriod();
        this.gameEndedByTimer = false;
        this.isRestarting = false;
        this.isGameActive = true;

        this.ui.showScreen('game');
        this.game.reset();
        this.game.generateProblem();

        const problem = this.game.getProblemDisplay();
        const expected = this.game.currentGame.getExpectedAnswer();
        logger.log('GAME', 'problem', { display: problem, expected });

        // Set the prompt label based on mode
        const isMathProblem = this.currentMode === GameModes.SUBTRACTION ||
                              this.currentMode === GameModes.SUBTRACTION_SURVIVAL ||
                              this.currentMode === GameModes.SUM ||
                              this.currentMode === GameModes.SUM_SURVIVAL;
        const labelKey = isMathProblem ? 'sayTheAnswer' : 'sayThisNumber';
        this.ui.setTargetLabel(this.ui.getTranslation(this.currentLang, labelKey));

        // Display problem or number based on mode
        this.ui.setTargetNumber(problem);
        this.ui.setScore(0);
        this.ui.clearAnswerLog();
        this.ui.setRecognizedNumber('-', 'neutral');
        this.ui.setTranscript('-');
        this.ui.updateTimer(this.timer.duration, this.timer.duration);

        this.timer.start();
    }

    handleRecognitionResult(newContent, fullTranscript) {
        this.ui.setTranscript(fullTranscript);

        const number = this.extractor.extract(newContent);
        if (number === null) {
            return;
        }

        const expected = this.game.currentGame.getExpectedAnswer();

        // During grace period, don't generate new problem
        const generateNewProblem = !this.inGracePeriod;
        const result = this.game.checkAnswer(number, generateNewProblem);

        if (result.status === 'correct') {
            logger.log('ANSWER', 'correct', { ans: number, next: result.newProblem });
            this.sound.playSuccess();
            this.ui.setRecognizedNumber(number, 'correct');
            this.ui.setScore(result.score);
            this.ui.addLogEntry(result.fullStatement || result.answered, number, true);

            if (this.inGracePeriod) {
                logger.log('GAME', 'grace period answer - ending');
                this.clearGracePeriod();
                this.isGameActive = false;
                this.gameEndedByTimer = true;
                this.recognizer.stop();
            } else {
                // Add time bonus for survival modes
                if (this.currentMode === GameModes.SUBTRACTION_SURVIVAL) {
                    this.timer.addTime(SubtractionSurvivalGame.TIME_BONUS);
                } else if (this.currentMode === GameModes.SUM_SURVIVAL) {
                    this.timer.addTime(SumSurvivalGame.TIME_BONUS);
                }
                this.ui.setTargetNumber(result.newProblem);
                this.ui.setTranscript('-');
                this.recognizer.clearBuffer(fullTranscript.length);
            }
        } else if (result.status === 'wrong') {
            logger.log('ANSWER', 'wrong', { got: number, want: expected });
            this.ui.setRecognizedNumber(number, 'wrong');
        }
        // duplicate answers are silently ignored
    }

    handleTimerEnd() {
        logger.log('GAME', 'grace period start');
        this.inGracePeriod = true;
        this.ui.updateTimer(0, this.timer.duration);

        this.gracePeriodTimeout = setTimeout(() => {
            logger.log('GAME', 'grace period end');
            this.inGracePeriod = false;
            this.isGameActive = false;
            this.gameEndedByTimer = true;
            this.recognizer.stop();
        }, CONFIG.GRACE_PERIOD_SECONDS * 1000);
    }

    handleRecognitionError(error) {
        // 'no-speech' just means silence - let handleRecognitionEnd restart
        if (error === 'no-speech') {
            return;
        }

        logger.log('GAME', 'error', { error });
        this.isGameActive = false;
        this.timer.stop();
        if (error === 'not-allowed') {
            this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'micDenied'));
        } else {
            this.ui.setPermissionStatus('Error: ' + error);
        }
        this.ui.showScreen('setup');
        this.ui.setStartButtonEnabled(true);
    }

    handleRecognitionEnd() {
        // If restarting, startGame will handle the UI
        if (this.isRestarting) {
            return;
        }

        // Silence timeout - restart recognition
        if (this.isGameActive && !this.gameEndedByTimer) {
            logger.log('SPEECH', 'silence restart');
            this.isResuming = true;
            this.recognizer.start();
            return;
        }

        this.timer.stop();
        this.isGameActive = false;

        if (this.gameEndedByTimer) {
            const log = this.game.getResponseLog();
            const totalNumbers = log.length;
            const avgTime = totalNumbers > 0
                ? (this.timer.duration / totalNumbers).toFixed(1)
                : null;

            logger.log('GAME', 'finished', { score: this.game.score, count: totalNumbers, avg: avgTime });

            this.currentEntryId = this.leaderboard.addEntry(this.game.score, this.currentLang);
            this.ui.showResults(this.game.score, totalNumbers, avgTime, this.timer.duration);
            this.ui.renderLeaderboard(this.leaderboard.getEntries(), this.currentEntryId, this.currentLang);
        } else {
            logger.log('GAME', 'manual stop');
            this.ui.showScreen('setup');
            this.ui.setPermissionStatus(this.ui.getTranslation(this.currentLang, 'recognitionStopped'));
            this.ui.setStartButtonEnabled(true);
        }
    }
}


// Initialize the app
const app = new App();
