const { useState, useEffect } = React;

// ───────── ИКОНКИ ─────────
const Icons = {
    Sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>,
    Book: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    Lotus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22c-4.97 0-9-4.03-9-9 0-1.66 1.34-3 3-3 1.31 0 2.42.84 2.83 2C9.24 10.17 10.54 9 12 9s2.76 1.17 3.17 3c.41-1.16 1.52-2 2.83-2 1.66 0 3 1.34 3 3 0 4.97-4.03 9-9 9z"/></svg>,
    Drop: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    Walk: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M13 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM10 22l2-6 3 3v5M7 13l3-3 3 3"/></svg>,
    Pen: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    Moon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    PhoneOff: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.33A19.79 19.79 0 0 1 2 12.18 2 2 0 0 1 4 10h3a2 2 0 0 1 1.95 1.44 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.93 17.63"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
};

const HABITS_LIST = [
    { id: 'exercise', label: 'Зарядка', icon: Icons.Sun },
    { id: 'reading', label: 'Чтение', icon: Icons.Book },
    { id: 'meditation', label: 'Медитация', icon: Icons.Lotus },
    { id: 'water', label: 'Вода', icon: Icons.Drop },
    { id: 'walk', label: 'Прогулка', icon: Icons.Walk },
    { id: 'journal', label: 'Дневник', icon: Icons.Pen },
    { id: 'sleep', label: 'Сон', icon: Icons.Moon },
    { id: 'nosocial', label: 'Без соцсетей', icon: Icons.PhoneOff },
];

function Logo() {
    return (
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="var(--stroke)" strokeWidth="1.5" />
            <path d="M50 2 A48 48 0 0 1 98 50" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="4" fill="var(--accent)" />
        </svg>
    );
}

// ───────── ЭКРАНЫ ─────────
function WelcomeScreen({ onStart }) {
    return (
        <div className="content">
            <div className="brand-lockup fade-up">
                <Logo />
                <span className="brand-name">KAIROS</span>
            </div>
            <h1 className="title fade-up" style={{animationDelay: '0.1s'}}>Ритуал,<br/>а не гонка</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.2s'}}>
                Тихая сила ежедневных повторений.<br/>Одна привычка. Один день. Один шаг.
            </p>
            <div style={{ flex: 1 }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.4s'}} onClick={onStart}>Начать</button>
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
            <h1 className="title fade-up" style={{ fontSize: 'clamp(36px, 10vw, 48px)' }}>Как тебя<br/>зовут?</h1>
            <div className="fade-up" style={{animationDelay: '0.1s', marginTop: '40px'}}>
                <input type="text" className={`input-underline ${isFocused ? 'focused' : ''}`} placeholder="Твоё имя" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} autoFocus />
            </div>
            <div style={{ flex: 1 }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.2s', opacity: name.trim().length > 0 ? 1 : 0.4}} onClick={handleNext} disabled={name.trim().length === 0}>Далее</button>
        </div>
    );
}

function HabitsScreen({ name, onNext }) {
    const [selected, setSelected] = useState(() => {
        const saved = localStorage.getItem('kairos_habits');
        return saved ? JSON.parse(saved) : [];
    });
    const toggleHabit = (id) => {
        if (selected.includes(id)) setSelected(selected.filter(h => h !== id));
        else if (selected.length < 3) setSelected([...selected, id]);
    };
    const handleNext = () => {
        if (selected.length > 0) {
            localStorage.setItem('kairos_habits', JSON.stringify(selected));
            onNext();
        }
    };
    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Что будешь<br/>развивать, {name}?</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s', marginBottom: '24px'}}>Выбери от 1 до 3 привычек.</p>
            <div className="habits-grid fade-up" style={{animationDelay: '0.2s'}}>
                {HABITS_LIST.map((habit) => {
                    const isSelected = selected.includes(habit.id);
                    const Icon = habit.icon;
                    return (
                        <div key={habit.id} className={`habit-card ${isSelected ? 'selected' : ''}`} onClick={() => toggleHabit(habit.id)}>
                            <div className="habit-icon"><Icon /></div>
                            <span className="habit-label">{habit.label}</span>
                        </div>
                    );
                })}
            </div>
            <div style={{ flex: 1, minHeight: '24px' }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.3s', opacity: selected.length > 0 ? 1 : 0.4}} onClick={handleNext} disabled={selected.length === 0}>Далее</button>
        </div>
    );
}

// ───────── ЭКРАН 4: ВРЕМЯ НАПОМИНАНИЯ ─────────
function ReminderScreen({ name, onFinish }) {
    const [time, setTime] = useState(() => localStorage.getItem('kairos_time') || '09:00');

    const handleFinish = () => {
        localStorage.setItem('kairos_time', time);
        localStorage.setItem('kairos_onboarded', 'true'); // Флаг завершения онбординга
        onFinish();
    };

    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Когда тебе<br/>напомнить, {name}?</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s'}}>Утренний ритуал задаст тон всему дню.</p>
            
            {/* Интерактивный селектор времени */}
            <div className="fade-up time-picker-container" style={{animationDelay: '0.2s'}}>
                <div className="time-display">{time}</div>
                {/* Нативный input прозрачный, но перекрывает цифры для клика */}
                <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    className="time-input-hidden" 
                />
            </div>

            <div style={{ flex: 1 }}></div>
            
            <button className="btn-primary fade-up" style={{animationDelay: '0.3s'}} onClick={handleFinish}>
                Готово
            </button>
        </div>
    );
}

// ───────── ЭКРАН 5: СЕГОДНЯ (ЗАГЛУШКА) ─────────
function TodayScreen({ name }) {
    return (
        <div className="content">
            <div className="fade-up" style={{ marginTop: '20px' }}>
                <span className="date-label">ВТОРНИК, 22 ОКТЯБРЯ</span>
                <h1 className="title" style={{ fontSize: '46px', marginTop: '8px' }}>Доброе утро,<br/>{name}.</h1>
            </div>
            
            <div className="fade-up" style={{animationDelay: '0.2s', marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
                {/* Заглушка для кольца энергии */}
                <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '2px dashed var(--stroke)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '48px', lineHeight: '1' }}>0</span>
                    <span style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)', marginTop: '4px' }}>ЭНЕРГИЯ ДНЯ</span>
                </div>
            </div>
        </div>
    );
}

// ───────── ГЛАВНЫЙ КОМПОНЕНТ ─────────
function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('kairos_theme') || 'aurora');
    // Проверяем, проходил ли пользователь онбординг
    const [step, setStep] = useState(() => localStorage.getItem('kairos_onboarded') ? 'today' : 'welcome'); 
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

            {/* Скрываем переключатель тем, когда мы уже в приложении */}
            {step !== 'today' && (
                <div className="theme-switcher">
                    {Object.keys(window.KAIROS_THEMES).map(key => (
                        <div key={key} className={`theme-dot ${theme === key ? 'active' : ''}`} style={{ backgroundColor: window.KAIROS_THEMES[key].accent }} onClick={() => setTheme(key)} />
                    ))}
                </div>
            )}

            {step === 'welcome' && <WelcomeScreen onStart={() => setStep('name')} />}
            {step === 'name' && <NameScreen onNext={handleNameNext} />}
            {step === 'habits' && <HabitsScreen name={name} onNext={() => setStep('reminder')} />}
            {step === 'reminder' && <ReminderScreen name={name} onFinish={() => setStep('today')} />}
            {step === 'today' && <TodayScreen name={name} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
