const { useState, useEffect } = React;

// ───────── КОМПОНЕНТ ЛОГОТИПА ─────────
function Logo() {
    return (
        <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Фоновое кольцо */}
            <circle cx="50" cy="50" r="44" stroke="var(--stroke)" strokeWidth="2" />
            {/* Активное кольцо (градиентный разрыв) */}
            <path d="M50 6 A44 44 0 0 1 94 50" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
            {/* Буква K */}
            <text x="50" y="68" fontFamily="'Cormorant Garamond', serif" fontSize="52" fill="var(--text)" textAnchor="middle" fontWeight="500">K</text>
        </svg>
    );
}

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('kairos_theme') || 'aurora';
    });

    useEffect(() => {
        const t = window.KAIROS_THEMES[theme];
        const root = document.documentElement;
        
        root.style.setProperty('--accent', t.accent);
        root.style.setProperty('--accent-glow', t.glow);
        root.style.setProperty('--halo-1', t.halo1);
        root.style.setProperty('--halo-2', t.halo2);
        
        localStorage.setItem('kairos_theme', theme);
    }, [theme]);

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

            <div className="content">
                {/* Вставляем логотип с анимацией */}
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
                
                <button className="btn-primary fade-up" style={{animationDelay: '0.4s'}}>
                    Начать
                </button>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
