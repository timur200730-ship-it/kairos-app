const { useState, useEffect } = React;

// ───────── КОМПОНЕНТ ЛОГОТИПА ─────────
function Logo() {
    return (
        <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" stroke="var(--stroke)" strokeWidth="2" />
            <path d="M50 6 A44 44 0 0 1 94 50" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
            <text x="50" y="68" fontFamily="'Cormorant Garamond', serif" fontSize="52" fill="var(--text)" textAnchor="middle" fontWeight="500">K</text>
        </svg>
    );
}

// ───────── ЭКРАН 1: ПРИВЕТСТВИЕ ─────────
function WelcomeScreen({ onStart }) {
    return (
        <div className="content">
            <div className="fade-up" style={{ marginBottom: '32px' }}>
                <Logo />
            </div>
            <h1 className="title fade-up" style={{animationDelay: '0.1s'}}>
                Ритуал,<br/>а не гонка
            </h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.2s'}}>
                Тихая сила ежедневных повторений.<br/>
                Одна привычка. Один день. Один шаг.
            </p>
            
            <div style={{ flex: 1 }}></div>
            
            <button className="btn-primary fade-up" style={{animationDelay: '0.4s'}} onClick={onStart}>
                Начать
            </button>
        </div>
    );
}

// ───────── ЭКРАН 2: ВВОД ИМЕНИ ─────────
function NameScreen({ onNext }) {
    const [name, setName] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleNext = () => {
        if (name.trim().length > 0) {
            localStorage.setItem('kairos_name', name.trim());
            onNext();
        }
    };

    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: '48px' }}>
                Как тебя<br/>зовут?
            </h1>
            
            <div className="fade-up" style={{animationDelay: '0.1s', marginTop: '48px'}}>
                <input 
                    type="text" 
                    className={`input-underline ${isFocused ? 'focused' : ''}`}
                    placeholder="Твоё имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoFocus
                />
            </div>

            <div style={{ flex: 1 }}></div>
            
            <button 
                className="btn-primary fade-up" 
                style={{animationDelay: '0.2s', opacity: name.trim().length > 0 ? 1 : 0.5}}
                onClick={handleNext}
                disabled={name.trim().length === 0}
            >
                Далее
            </button>
        </div>
    );
}

// ───────── ЭКРАН 3: ЗАГЛУШКА (ПРИВЫЧКИ) ─────────
function HabitsScreen({ name }) {
    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: '48px' }}>
                Приятно<br/>познакомиться,<br/>{name}
            </h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s', marginTop: '24px'}}>
                Здесь мы будем выбирать привычки...
            </p>
        </div>
    );
}

// ───────── ГЛАВНЫЙ КОМПОНЕНТ (РОУТИНГ) ─────────
function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('kairos_theme') || 'aurora');
    const [step, setStep] = useState('welcome'); // welcome | name | habits
    const [name, setName] = useState(() => localStorage.getItem('kairos_name') || '');

    useEffect(() => {
        const t = window.KAIROS_THEMES[theme];
        const root = document.documentElement;
        root.style.setProperty('--accent', t.accent);
        root.style.setProperty('--accent-glow', t.glow);
        root.style.setProperty('--halo-1', t.halo1);
        root.style.setProperty('--halo-2', t.halo2);
        localStorage.setItem('kairos_theme', theme);
    }, [theme]);

    const handleNameNext = () => {
        setName(localStorage.getItem('kairos_name') || '');
        setStep('habits');
    };

    return (
        <div className="screen">
            <div className="halo-container">
                <div className="halo-1"></div>
                <div className="halo-2"></div>
            </div>

            <div className="theme-switcher">
                {Object.keys(window.KAIROS_THEMES).map(key => (
                    <div 
                        key={key}
                        className={`theme-dot ${theme === key ? 'active' : ''}`}
                        style={{ backgroundColor: window.KAIROS_THEMES[key].accent }}
                        onClick={() => setTheme(key)}
                    />
                ))}
            </div>

            {/* Роутинг экранов */}
            {step === 'welcome' && <WelcomeScreen onStart={() => setStep('name')} />}
            {step === 'name' && <NameScreen onNext={handleNameNext} />}
            {step === 'habits' && <HabitsScreen name={name} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
