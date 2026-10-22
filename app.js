const { useState, useEffect } = React;

// ───────── ПРЕМИАЛЬНЫЙ ЛОГОТИП ─────────
function Logo() {
    return (
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Тонкое фоновое кольцо */}
            <circle cx="50" cy="50" r="48" stroke="var(--stroke)" strokeWidth="1.5" />
            {/* Акцентная дуга (прогресс) */}
            <path d="M50 2 A48 48 0 0 1 98 50" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Точка в центре (символ "сейчас") */}
            <circle cx="50" cy="50" r="4" fill="var(--accent)" />
        </svg>
    );
}

function WelcomeScreen({ onStart }) {
    return (
        <div className="content">
            {/* Бренд-лок: Иконка + Название */}
            <div className="brand-lockup fade-up">
                <Logo />
                <span className="brand-name">KAIROS</span>
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
            <h1 className="title fade-up" style={{ fontSize: 'clamp(36px, 10vw, 48px)' }}>
                Как тебя<br/>зовут?
            </h1>
            
            <div className="fade-up" style={{animationDelay: '0.1s', marginTop: '40px'}}>
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
                style={{animationDelay: '0.2s', opacity: name.trim().length > 0 ? 1 : 0.4}}
                onClick={handleNext}
                disabled={name.trim().length === 0}
            >
                Далее
            </button>
        </div>
    );
}

function HabitsScreen({ name }) {
    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: 'clamp(36px, 10vw, 48px)' }}>
                Приятно<br/>познакомиться,<br/>{name}
            </h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s', marginTop: '24px'}}>
                Здесь мы будем выбирать привычки...
            </p>
        </div>
    );
}

function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('kairos_theme') || 'aurora');
    const [step, setStep] = useState('welcome'); 
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

            {step === 'welcome' && <WelcomeScreen onStart={() => setStep('name')} />}
            {step === 'name' && <NameScreen onNext={handleNameNext} />}
            {step === 'habits' && <HabitsScreen name={name} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
