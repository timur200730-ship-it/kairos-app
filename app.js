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

function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSHint, setShowIOSHint] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) setIsStandalone(true);
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);
        const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) { setShowIOSHint(!showIOSHint); return; }
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') setDeferredPrompt(null);
        }
    };

    if (isStandalone || (!deferredPrompt && !isIOS)) return null;

    return (
        <div style={{ position: 'fixed', top: '70px', right: '24px', zIndex: 100 }}>
            <button onClick={handleInstallClick} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--text)', borderRadius: '99px', padding: '8px 16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Установить
            </button>
            {showIOSHint && (
                <div style={{ position: 'absolute', top: '50px', right: '0', width: '220px', background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '12px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-muted)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', animation: 'fadeUp 0.3s ease' }}>
                    Нажмите <strong style={{color: 'var(--text)'}}>Поделиться</strong> внизу экрана, затем выберите <strong style={{color: 'var(--text)'}}>«На экран "Домой"»</strong>.
                </div>
            )}
        </div>
    );
}

function EnergyRing({ progress, accentColor, gradientColor }) {
    const radius = 100;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="ring-container">
            <svg width="240" height="240" className="ring-svg">
                <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={accentColor} />
                        <stop offset="100%" stopColor={gradientColor} />
                    </linearGradient>
                </defs>
                <circle cx="120" cy="120" r={radius} strokeWidth={strokeWidth} className="ring-bg" />
                <circle cx="120" cy="120" r={radius} strokeWidth={strokeWidth} stroke="url(#ringGradient)" className="ring-progress" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </svg>
            <div className="ring-content">
                <span className="ring-number">{progress}%</span>
                <span className="ring-label">ЭНЕРГИЯ ДНЯ</span>
            </div>
        </div>
    );
}

function BottomNav({ activeTab, setTab }) {
    const tabs = [
        { id: 'today', icon: '◐' },
        { id: 'challenges', icon: '◇' },
        { id: 'profile', icon: '◯' }
    ];

    return (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', padding: '8px', background: 'rgba(19, 22, 27, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid var(--stroke)', borderRadius: '99px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 100 }}>
            {tabs.map(tab => (
                <button key={tab.id} onClick={() => setTab(tab.id)} style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', cursor: 'pointer', transition: 'all 0.3s ease', background: activeTab === tab.id ? 'var(--accent)' : 'transparent', color: activeTab === tab.id ? '#0B0D10' : 'var(--text-muted)', border: 'none' }}>
                    {tab.icon}
                </button>
            ))}
        </div>
    );
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Доброе утро';
    if (hour >= 12 && hour < 18) return 'Добрый день';
    if (hour >= 18 && hour < 23) return 'Добрый вечер';
    return 'Доброй ночи';
}

function getFormattedDate() {
    const now = new Date();
    let dateStr = now.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1).replace('.', '');
}

function WelcomeScreen({ onStart }) {
    return (
        <div className="content">
            <div className="brand-lockup fade-up">
                <Logo />
                <span className="brand-name">KAIROS</span>
            </div>
            <h1 className="title fade-up" style={{animationDelay: '0.1s'}}>Ритуал,<br/>а не гонка</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.2s'}}>Тихая сила ежедневных повторений.<br/>Одна привычка. Один день. Один шаг.</p>
            <div style={{ flex: 1 }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.4s'}} onClick={onStart}>Начать</button>
        </div>
    );
}

function NameScreen({ onNext }) {
    const [name, setName] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const handleNext = () => { if (name.trim().length > 0) { localStorage.setItem('kairos_name', name.trim()); onNext(); } };
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
    const [selected, setSelected] = useState(() => { const saved = localStorage.getItem('kairos_habits'); return saved ? JSON.parse(saved) : []; });
    const toggleHabit = (id) => { if (selected.includes(id)) setSelected(selected.filter(h => h !== id)); else if (selected.length < 3) setSelected([...selected, id]); };
    const handleNext = () => { if (selected.length > 0) { localStorage.setItem('kairos_habits', JSON.stringify(selected)); onNext(); } };
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

function ReminderScreen({ name, onFinish }) {
    const [time, setTime] = useState(() => localStorage.getItem('kairos_time') || '09:00');
    const handleFinish = () => { localStorage.setItem('kairos_time', time); localStorage.setItem('kairos_onboarded', 'true'); onFinish(); };
    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Когда тебе<br/>напомнить, {name}?</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s'}}>Утренний ритуал задаст тон всему дню.</p>
            <div className="fade-up time-picker-container" style={{animationDelay: '0.2s'}}>
                <div className="time-display">{time}</div>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="time-input-hidden" />
            </div>
            <div style={{ flex: 1 }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.3s'}} onClick={handleFinish}>Готово</button>
        </div>
    );
}

function TodayScreen({ name, themeData }) {
    const greeting = getGreeting();
    const dateString = getFormattedDate();
    const userHabitsIds = JSON.parse(localStorage.getItem('kairos_habits') || '[]');
    const userHabits = HABITS_LIST.filter(h => userHabitsIds.includes(h.id));

    const [completed, setCompleted] = useState(() => {
        const todayKey = `kairos_checkins_${new Date().toISOString().split('T')[0]}`;
        return JSON.parse(localStorage.getItem(todayKey) || '[]');
    });

    const toggleCheckin = (id) => {
        let newCompleted;
        if (completed.includes(id)) newCompleted = completed.filter(h => h !== id);
        else newCompleted = [...completed, id];
        setCompleted(newCompleted);
        localStorage.setItem(`kairos_checkins_${new Date().toISOString().split('T')[0]}`, JSON.stringify(newCompleted));
    };

    const progress = userHabits.length === 0 ? 0 : Math.round((completed.length / userHabits.length) * 100);

    return (
        <div className="content">
            <div className="fade-up" style={{ marginTop: '20px' }}>
                <span className="date-label">{dateString}</span>
                <h1 className="title" style={{ fontSize: 'clamp(36px, 10vw, 46px)', marginTop: '8px' }}>{greeting},<br/>{name}.</h1>
            </div>
            <div className="fade-up" style={{animationDelay: '0.1s'}}>
                <EnergyRing progress={progress} accentColor={themeData.accent} gradientColor={themeData.halo2} />
            </div>
            <div className="fade-up habits-list" style={{animationDelay: '0.2s'}}>
                {userHabits.map(habit => {
                    const Icon = habit.icon;
                    const isCompleted = completed.includes(habit.id);
                    return (
                        <div key={habit.id} className={`habit-row ${isCompleted ? 'completed' : ''}`} onClick={() => toggleCheckin(habit.id)}>
                            <div className="habit-row-left">
                                <div className="habit-row-icon"><Icon /></div>
                                <span className="habit-row-title">{habit.label}</span>
                            </div>
                            <div className="habit-check"></div>
                        </div>
                    );
                })}
            </div>
            <div style={{ height: '40px' }}></div>
        </div>
    );
}

function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('kairos_theme') || 'aurora');
    const [step, setStep] = useState(() => localStorage.getItem('kairos_onboarded') ? 'today' : 'welcome'); 
    const [name, setName] = useState(() => localStorage.getItem('kairos_name') || '');
    const [activeTab, setActiveTab] = useState('today'); 
    const themeData = window.KAIROS_THEMES[theme];

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--accent', themeData.accent);
        root.style.setProperty('--accent-glow', themeData.glow);
        root.style.setProperty('--halo-1', themeData.halo1);
        root.style.setProperty('--halo-2', themeData.halo2);
        localStorage.setItem('kairos_theme', theme);
    }, [theme, themeData]);

    return (
        <div className="screen">
            <InstallPrompt />
            <div className="halo-container">
                <div className="halo-1"></div>
                <div className="halo-2"></div>
            </div>

            {step !== 'today' && (
                <div className="theme-switcher">
                    {Object.keys(window.KAIROS_THEMES).map(key => (
                        <div key={key} className={`theme-dot ${theme === key ? 'active' : ''}`} style={{ backgroundColor: window.KAIROS_THEMES[key].accent }} onClick={() => setTheme(key)} />
                    ))}
                </div>
            )}

            {step === 'welcome' && <WelcomeScreen onStart={() => setStep('name')} />}
            {step === 'name' && <NameScreen onNext={() => { setName(localStorage.getItem('kairos_name')); setStep('habits'); }} />}
            {step === 'habits' && <HabitsScreen name={name} onNext={() => setStep('reminder')} />}
            {step === 'reminder' && <ReminderScreen name={name} onFinish={() => setStep('today')} />}
            
            {step === 'today' && (
                <>
                    <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 10 }}>
                        <button onClick={() => setTheme(theme === 'aurora' ? 'ember' : theme === 'ember' ? 'jade' : 'aurora')} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--text)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>◐</button>
                    </div>
                    
                    {activeTab === 'today' && <TodayScreen name={name} themeData={themeData} />}
                    {activeTab === 'challenges' && (
                        <div className="content fade-up">
                            <h1 className="title" style={{ marginTop: '40px' }}>Челленджи</h1>
                            <p className="subtitle">Здесь будут твои 21-дневные пути.</p>
                        </div>
                    )}
                    {activeTab === 'profile' && (
                        <div className="content fade-up">
                            <h1 className="title" style={{ marginTop: '40px' }}>Профиль</h1>
                            <p className="subtitle">Здесь будут настройки и статистика.</p>
                        </div>
                    )}
                    // ... (код выше с роутингом activeTab) ...

                    {/* Добавляем градиент затухания */}
                    <div className="nav-gradient"></div>
                    
                    <BottomNav activeTab={activeTab} setTab={setActiveTab} />
                </>
            )}
        </div>
    );
}
                    <BottomNav activeTab={activeTab} setTab={setActiveTab} />
                </>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
