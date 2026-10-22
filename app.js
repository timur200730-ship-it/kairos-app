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
    PhoneOff: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.33A19.79 19.79 0 0 1 2 12.18 2 2 0 0 1 4 10h3a2 2 0 0 1 1.95 1.44 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.93 17.63"/><line x1="2" y1="2" x2="22" y2="22"/></svg>,
    Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}><polyline points="20 6 9 17 4 12"/></svg>,
    Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
};

const HABITS_LIST = [
    { id: 'exercise', label: 'Зарядка', icon: Icons.Sun, type: 'binary' },
    { id: 'reading', label: 'Чтение', icon: Icons.Book, type: 'binary' },
    { id: 'meditation', label: 'Медитация', icon: Icons.Lotus, type: 'binary' },
    { id: 'water', label: 'Вода', icon: Icons.Drop, type: 'counter', target: 8, unit: 'ст.' },
    { id: 'walk', label: 'Прогулка', icon: Icons.Walk, type: 'binary' },
    { id: 'journal', label: 'Дневник', icon: Icons.Pen, type: 'binary' },
    { id: 'sleep', label: 'Сон', icon: Icons.Moon, type: 'binary' },
    { id: 'nosocial', label: 'Без соцсетей', icon: Icons.PhoneOff, type: 'binary' },
];

const MOOD_LABELS = { 1: 'Тяжело', 2: 'Так себе', 3: 'Обычно', 4: 'Хорошо', 5: 'Отлично' };

function Logo() { return (<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" stroke="var(--stroke)" strokeWidth="1.5" /><path d="M50 2 A48 48 0 0 1 98 50" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" /><circle cx="50" cy="50" r="4" fill="var(--accent)" /></svg>); }
function HeaderLogo() { return (<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}><svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" stroke="var(--stroke)" strokeWidth="2" /><path d="M50 2 A48 48 0 0 1 98 50" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" /><circle cx="50" cy="50" r="4" fill="var(--accent)" /></svg><span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: '600', letterSpacing: '4px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>KAIROS</span></div>); }
function InstallPrompt() { const [deferredPrompt, setDeferredPrompt] = useState(null); const [isIOS, setIsIOS] = useState(false); const [showHint, setShowHint] = useState(false); const [isStandalone, setIsStandalone] = useState(false); useEffect(() => { if (window.matchMedia('(display-mode: standalone)').matches) setIsStandalone(true); const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; setIsIOS(isIOSDevice); const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); }; window.addEventListener('beforeinstallprompt', handler); return () => window.removeEventListener('beforeinstallprompt', handler); }, []); const handleInstallClick = async () => { if (deferredPrompt) { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; if (outcome === 'accepted') setDeferredPrompt(null); } else { setShowHint(!showHint); } }; if (isStandalone) return null; return (<div style={{ position: 'fixed', top: '70px', right: '24px', zIndex: 100 }}><button onClick={handleInstallClick} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--text)', borderRadius: '99px', padding: '8px 16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Установить</button>{showHint && (<div style={{ position: 'absolute', top: '50px', right: '0', width: '240px', background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '12px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-muted)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', animation: 'fadeUp 0.3s ease', lineHeight: '1.4' }}>{isIOS ? <><strong style={{color: 'var(--text)'}}>iPhone:</strong> Нажмите «Поделиться» внизу, затем «На экран "Домой"».</> : <><strong style={{color: 'var(--text)'}}>ПК:</strong> Нажмите на иконку установки в адресной строке браузера.</>}</div>)}</div>); }
function EnergyRing({ progress, accentColor, gradientColor }) { const radius = 100; const strokeWidth = 14; const circumference = 2 * Math.PI * radius; const strokeDashoffset = circumference - (progress / 100) * circumference; return (<div className="ring-container"><svg width="240" height="240" className="ring-svg"><defs><linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={accentColor} /><stop offset="100%" stopColor={gradientColor} /></linearGradient></defs><circle cx="120" cy="120" r={radius} strokeWidth={strokeWidth} className="ring-bg" /><circle cx="120" cy="120" r={radius} strokeWidth={strokeWidth} stroke="url(#ringGradient)" className="ring-progress" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} /></svg><div className="ring-content"><span className="ring-number">{progress}%</span><span className="ring-label">ЭНЕРГИЯ ДНЯ</span></div></div>); }

// ───────── ХЕЛПЕРЫ ─────────
function getGreeting() { const hour = new Date().getHours(); if (hour >= 5 && hour < 12) return 'Доброе утро'; if (hour >= 12 && hour < 18) return 'Добрый день'; if (hour >= 18 && hour < 23) return 'Добрый вечер'; return 'Доброй ночи'; }
function getFormattedDate() { const now = new Date(); let dateStr = now.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }); return dateStr.charAt(0).toUpperCase() + dateStr.slice(1).replace('.', ''); }
const getTodayKey = () => new Date().toISOString().split('T')[0];
function getChallenges() { return JSON.parse(localStorage.getItem('kairos_challenges') || '[]'); }
function saveChallenges(challenges) { localStorage.setItem('kairos_challenges', JSON.stringify(challenges)); }
function getDayOfChallenge(startDate) { const start = new Date(startDate).setHours(0,0,0,0); const now = new Date().setHours(0,0,0,0); return Math.floor(Math.abs(now - start) / (1000 * 60 * 60 * 24)) + 1; }
function getTodayCheckins() { const raw = localStorage.getItem(`kairos_checkins_${getTodayKey()}`); if (!raw) return {}; const parsed = JSON.parse(raw); if (Array.isArray(parsed)) { const obj = {}; parsed.forEach(id => obj[id] = 1); return obj; } return parsed; }
function saveTodayCheckins(data) { localStorage.setItem(`kairos_checkins_${getTodayKey()}`, JSON.stringify(data)); }
function calculateStats() { let totalCheckins = 0; let currentStreak = 0; const challenges = getChallenges(); const completedChallenges = challenges.filter(c => getDayOfChallenge(c.startDate) > c.length).length; for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i); if (key.startsWith('kairos_checkins_')) { const val = JSON.parse(localStorage.getItem(key)); if (Array.isArray(val)) totalCheckins += val.length; else totalCheckins += Object.values(val).filter(v => v >= 1).length; } } let checkDate = new Date(); while (true) { const dateStr = checkDate.toISOString().split('T')[0]; const dayCheckinsRaw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}'); const dayCheckins = Array.isArray(dayCheckinsRaw) ? dayCheckinsRaw : Object.keys(dayCheckinsRaw).filter(k => dayCheckinsRaw[k] >= 1); if (dayCheckins.length > 0) { currentStreak++; checkDate.setDate(checkDate.getDate() - 1); } else break; } return { totalCheckins, currentStreak, completedChallenges }; }

// ───────── ЭКРАНЫ ОНБОРДИНГА ─────────
function WelcomeScreen({ onStart }) { return (<div className="content"><div className="brand-lockup fade-up"><Logo /><span className="brand-name">KAIROS</span></div><h1 className="title fade-up" style={{animationDelay: '0.1s'}}>Ритуал,<br/>а не гонка</h1><p className="subtitle fade-up" style={{animationDelay: '0.2s'}}>Тихая сила ежедневных повторений.<br/>Одна привычка. Один день. Один шаг.</p><div style={{ flex: 1 }}></div><button className="btn-primary fade-up" style={{animationDelay: '0.4s'}} onClick={onStart}>Начать</button></div>); }
function NameScreen({ onNext }) { const [name, setName] = useState(''); const [isFocused, setIsFocused] = useState(false); const handleNext = () => { if (name.trim().length > 0) { localStorage.setItem('kairos_name', name.trim()); onNext(); } }; return (<div className="content"><h1 className="title fade-up" style={{ fontSize: 'clamp(36px, 10vw, 48px)' }}>Как тебя<br/>зовут?</h1><div className="fade-up" style={{animationDelay: '0.1s', marginTop: '40px'}}><input type="text" className={`input-underline ${isFocused ? 'focused' : ''}`} placeholder="Твоё имя" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} autoFocus /></div><div style={{ flex: 1 }}></div><button className="btn-primary fade-up" style={{animationDelay: '0.2s', opacity: name.trim().length > 0 ? 1 : 0.4}} onClick={handleNext} disabled={name.trim().length === 0}>Далее</button></div>); }
function HabitsScreen({ name, onNext }) { const [selected, setSelected] = useState(() => { const saved = localStorage.getItem('kairos_habits'); return saved ? JSON.parse(saved) : []; }); const [step, setStep] = useState('select'); const [why, setWhy] = useState(() => localStorage.getItem('kairos_why') || ''); const toggleHabit = (id) => { if (selected.includes(id)) setSelected(selected.filter(h => h !== id)); else if (selected.length < 3) setSelected([...selected, id]); }; const handleNext = () => { if (step === 'select') { if (selected.length > 0) setStep('why'); } else { localStorage.setItem('kairos_habits', JSON.stringify(selected)); localStorage.setItem('kairos_why', why.trim()); const firstHabitId = selected[0]; const habit = HABITS_LIST.find(h => h.id === firstHabitId); const existing = getChallenges(); if (existing.length === 0) saveChallenges([{ id: Date.now().toString(), habitId: firstHabitId, title: habit.label, startDate: getTodayKey(), length: 21 }]); onNext(); } }; if (step === 'why') { return (<div className="content"><h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Почему это<br/>важно для тебя?</h1><p className="subtitle fade-up" style={{animationDelay: '0.1s', marginBottom: '24px'}}>Одна фраза. Мы будем напоминать тебе об этом в трудные дни.</p><div className="fade-up" style={{animationDelay: '0.2s'}}><textarea className="note-input" placeholder="Например: Хочу чувствовать себя бодрее..." value={why} onChange={(e) => setWhy(e.target.value)} rows={3} style={{ width: '100%', backgroundColor: 'var(--surface)', border: '1px solid var(--stroke)', borderRadius: '16px', padding: '16px', color: 'var(--text)', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box' }} /></div><div style={{ flex: 1 }}></div><button className="btn-primary fade-up" style={{animationDelay: '0.3s'}} onClick={handleNext}>Продолжить</button></div>); } return (<div className="content"><h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Что будешь<br/>развивать, {name}?</h1><p className="subtitle fade-up" style={{animationDelay: '0.1s', marginBottom: '24px'}}>Выбери от 1 до 3 привычек.</p><div className="habits-grid fade-up" style={{animationDelay: '0.2s'}}>{HABITS_LIST.map((habit) => (<div key={habit.id} className={`habit-card ${selected.includes(habit.id) ? 'selected' : ''}`} onClick={() => toggleHabit(habit.id)}><div className="habit-icon"><habit.icon /></div><span className="habit-label">{habit.label}</span></div>))}</div><div style={{ flex: 1, minHeight: '24px' }}></div><button className="btn-primary fade-up" style={{animationDelay: '0.3s', opacity: selected.length > 0 ? 1 : 0.4}} onClick={handleNext} disabled={selected.length === 0}>Далее</button></div>); }
function ReminderScreen({ name, onFinish }) { const [time, setTime] = useState(() => localStorage.getItem('kairos_time') || '09:00'); const handleFinish = () => { localStorage.setItem('kairos_time', time); localStorage.setItem('kairos_onboarded', 'true'); onFinish(); }; return (<div className="content"><h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Когда тебе<br/>напомнить, {name}?</h1><p className="subtitle fade-up" style={{animationDelay: '0.1s'}}>Утренний ритуал задаст тон всему дню.</p><div className="fade-up time-picker-container" style={{animationDelay: '0.2s'}}><div className="time-display">{time}</div><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="time-input-hidden" /></div><div style={{ flex: 1 }}></div><button className="btn-primary fade-up" style={{animationDelay: '0.3s'}} onClick={handleFinish}>Готово</button></div>); }

function MentorNote({ userHabits, completed, name }) {
    const hour = new Date().getHours(); const why = localStorage.getItem('kairos_why') || '';
    let doneCount = 0; userHabits.forEach(h => { if ((completed[h.id] || 0) >= (h.target || 1)) doneCount++; });
    const isAllDone = userHabits.length > 0 && doneCount === userHabits.length; const isNothingDone = doneCount === 0;
    let message = "";
    if (isAllDone) message = `${name}, все привычки выполнены. Ты был безупречен. ${why ? `Вспомни, ты хотел: "${why}". Сегодня ты стал ближе к этому.` : 'Отдохни с чистым сердцем.'}`;
    else if (hour < 12) { if (isNothingDone) message = `${name}, новый день. Не спеши. Сделай один маленький шаг. ${why ? `Помни: "${why}".` : ''}`; else message = `${name}, хорошее начало. Ритуал важнее результата. Продолжай в своем темпе.`; }
    else if (hour < 18) { if (isNothingDone) message = `${name}, день в разгаре. Найди 5 минут для себя. ${why ? `Ты хотел: "${why}".` : ''}`; else message = `${name}, ты в потоке. Заметь, как приятно делать то, что обещал себе.`; }
    else { if (isNothingDone) message = `${name}, день подходит к концу. Если не успел — это нормально. Завтра будет новый шанс.`; else message = `${name}, вечер — время замедлиться. Поблагодари себя за то, что нашёл силы сегодня.`; }
    return (<div className="fade-up mentor-note" style={{animationDelay: '0.15s'}}><div className="mentor-icon">◇</div><p className="mentor-text">{message}</p></div>);
}
function TodayScreen({ name, themeData, onReflect, onOpenHabit }) {
    const greeting = getGreeting(); const dateString = getFormattedDate();
    const userHabitsIds = JSON.parse(localStorage.getItem('kairos_habits') || '[]');
    const userHabits = HABITS_LIST.filter(h => userHabitsIds.includes(h.id));
    const [completed, setCompleted] = useState(getTodayCheckins());
    const hasReflected = !!localStorage.getItem(`kairos_reflection_${getTodayKey()}`);

    const toggleCheckin = (habit) => {
        const current = completed[habit.id] || 0; let newVal;
        if (habit.type === 'counter') { newVal = current + 1; if (newVal > habit.target) newVal = 0; } else { newVal = current >= 1 ? 0 : 1; }
        const newCompleted = { ...completed, [habit.id]: newVal };
        setCompleted(newCompleted); saveTodayCheckins(newCompleted);
    };
    const longPressCheckin = (habit) => {
        if (habit.type === 'counter') { const current = completed[habit.id] || 0; const newVal = Math.max(0, current - 1); const newCompleted = { ...completed, [habit.id]: newVal }; setCompleted(newCompleted); saveTodayCheckins(newCompleted); }
    };

    const doneCount = userHabits.filter(h => (completed[h.id] || 0) >= (h.target || 1)).length;
    const progress = userHabits.length === 0 ? 0 : Math.round((doneCount / userHabits.length) * 100);

    return (
        <div className="content">
            <HeaderLogo />
            <div className="fade-up" style={{ marginTop: '0px' }}><span className="date-label">{dateString}</span><h1 className="title" style={{ fontSize: 'clamp(36px, 10vw, 46px)', marginTop: '8px' }}>{greeting},<br/>{name}.</h1></div>
            <div className="fade-up" style={{animationDelay: '0.1s'}}><EnergyRing progress={progress} accentColor={themeData.accent} gradientColor={themeData.halo2} /></div>
            <MentorNote userHabits={userHabits} completed={completed} name={name} />
            
            <div className="fade-up habits-list" style={{animationDelay: '0.2s'}}>
                {userHabits.map(habit => {
                    const currentVal = completed[habit.id] || 0; const isDone = currentVal >= (habit.target || 1);
                    let longPressTimer;
                    const handlePressIn = () => { if (habit.type === 'counter') longPressTimer = setTimeout(() => longPressCheckin(habit), 500); };
                    const handlePressOut = () => { if (longPressTimer) clearTimeout(longPressTimer); };

                    return (
                        <div key={habit.id} className={`habit-row ${isDone ? 'completed' : ''}`} onClick={() => toggleCheckin(habit)} onMouseDown={handlePressIn} onMouseUp={handlePressOut} onMouseLeave={handlePressOut} onTouchStart={handlePressIn} onTouchEnd={handlePressOut}>
                            <div className="habit-row-left">
                                <div className="habit-row-icon"><habit.icon /></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span className="habit-row-title">{habit.label}</span>
                                    {habit.type === 'counter' && (
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.3px' }}>
                                            по 250 мл · {habit.target} стаканов
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {habit.type === 'counter' && (
                                    <span style={{ fontSize: '15px', color: isDone ? 'var(--accent)' : 'var(--text-muted)', fontWeight: '600', minWidth: '32px', textAlign: 'right' }}>
                                        {currentVal}/{habit.target}
                                    </span>
                                )}
                                <div className={`habit-check ${isDone ? 'checked' : ''}`}>
                                    {isDone && <Icons.Check />}
                                </div>
                                <div onClick={(e) => { e.stopPropagation(); onOpenHabit(habit); }} style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '0 4px', fontSize: '18px', opacity: 0.6 }}>›</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="fade-up" style={{ animationDelay: '0.3s', marginTop: '24px', width: '100%', height: '56px', borderRadius: '99px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none', WebkitAppearance: 'none', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', backgroundColor: hasReflected ? 'var(--surface)' : 'var(--accent)', color: hasReflected ? 'var(--accent)' : '#0B0D10', border: hasReflected ? '1.5px solid var(--accent)' : 'none', boxShadow: hasReflected ? 'none' : '0 8px 24px var(--accent-glow)' }} onClick={onReflect}>
                {hasReflected ? '✓ Рефлексия пройдена' : 'Вечерняя рефлексия'}
            </button>
            <div style={{ height: '40px' }}></div>
        </div>
    );
}

function HabitDetailsScreen({ habit, onBack }) {
    const [noteDate, setNoteDate] = useState(null); const [noteText, setNoteText] = useState('');
    const days = []; let completedDaysCount = 0;
    for (let i = 29; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const dateStr = d.toISOString().split('T')[0]; const raw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}'); const isDone = (raw[habit.id] || 0) >= (habit.target || 1); if (isDone) completedDaysCount++; const savedNote = localStorage.getItem(`kairos_note_${dateStr}_${habit.id}`) || ''; days.push({ date: dateStr, dayNum: d.getDate(), isDone, note: savedNote }); }
    let realStreak = 0; let checkDate = new Date();
    while (true) { const dateStr = checkDate.toISOString().split('T')[0]; const raw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}'); if ((raw[habit.id] || 0) >= (habit.target || 1)) { realStreak++; checkDate.setDate(checkDate.getDate() - 1); } else break; }
    const avgPercent = Math.round((completedDaysCount / 30) * 100);
    const openNote = (day) => { setNoteDate(day.date); setNoteText(day.note); };
    const saveNote = () => { if (noteDate) { localStorage.setItem(`kairos_note_${noteDate}_${habit.id}`, noteText); setNoteDate(null); } };

    return (
        <div className="content">
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><div style={{ color: 'var(--accent)', width: '32px', height: '32px' }}><habit.icon /></div><h1 className="title" style={{ fontSize: '32px', margin: 0 }}>{habit.label}</h1></div>
            {habit.id === 'water' && (<p className="fade-up" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>Рекомендуемая норма: около 2 литров в день (8 стаканов по 250 мл). Слушайте свой организм.</p>)}
            <div className="fade-up" style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}><div style={{ flex: 1, background: 'var(--surface)', padding: '16px', borderRadius: '16px', border: '1px solid var(--stroke)', textAlign: 'center' }}><span style={{ display: 'block', fontFamily: 'Cormorant Garamond', fontSize: '32px', color: 'var(--accent)' }}>{realStreak}</span><span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Стрик</span></div><div style={{ flex: 1, background: 'var(--surface)', padding: '16px', borderRadius: '16px', border: '1px solid var(--stroke)', textAlign: 'center' }}><span style={{ display: 'block', fontFamily: 'Cormorant Garamond', fontSize: '32px', color: 'var(--text)' }}>{avgPercent}%</span><span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>За 30 дней</span></div></div>
            <p className="subtitle fade-up" style={{ marginBottom: '16px' }}>Нажми на день, чтобы оставить заметку:</p>
            <div className="calendar-grid fade-up" style={{ animationDelay: '0.1s', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>{days.map(day => (<div key={day.date} className={`calendar-day ${day.isDone ? 'completed' : ''}`} onClick={() => openNote(day)} style={{ border: day.note ? '1.5px dashed var(--accent)' : '' }}>{day.dayNum}</div>))}</div>
            <div style={{ flex: 1 }}></div>
            {noteDate && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'flex-end' }} onClick={() => setNoteDate(null)}><div style={{ background: 'var(--surface)', width: '100%', padding: '24px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', borderTop: '1px solid var(--stroke)', animation: 'fadeUp 0.3s ease' }} onClick={e => e.stopPropagation()}><h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Заметка на {noteDate}</h3><textarea className="note-input" placeholder="Как прошло?" value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={3} style={{ width: '100%', backgroundColor: 'var(--bg)', border: '1px solid var(--stroke)', borderRadius: '16px', padding: '16px', color: 'var(--text)', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box' }} /><div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}><button className="ghost-btn" onClick={() => setNoteDate(null)} style={{ flex: 1 }}>Отмена</button><button className="btn-primary" onClick={saveNote} style={{ flex: 1 }}>Сохранить</button></div></div></div>)}
        </div>
    );
}

function ChallengesScreen({ onNewChallenge, onOpenChallenge }) { const [challenges, setChallenges] = useState(getChallenges()); return (<div className="content"><HeaderLogo /><h1 className="title fade-up" style={{ marginTop: '0px', marginBottom: '24px' }}>Твои пути</h1>{challenges.length === 0 ? (<div className="fade-up" style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)' }}><p>Пока нет активных челленджей.</p></div>) : (<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{challenges.map((challenge, index) => { const currentDay = Math.min(getDayOfChallenge(challenge.startDate), challenge.length); const isCompleted = currentDay > challenge.length; const habit = HABITS_LIST.find(h => h.id === challenge.habitId); return (<div key={challenge.id} className="challenge-card fade-up" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => onOpenChallenge(challenge)}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ color: 'var(--accent)' }}><habit.icon /></div><span style={{ fontSize: '18px', fontWeight: '500' }}>{challenge.title}</span></div><span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{isCompleted ? 'Завершен' : `День ${currentDay} из ${challenge.length}`}</span></div><div style={{ height: '6px', background: 'var(--stroke)', borderRadius: '3px', overflow: 'hidden' }}><div style={{ height: '100%', width: `${Math.min((currentDay / challenge.length) * 100, 100)}%`, background: 'var(--accent)', transition: 'width 0.8s ease' }}></div></div><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>{[3, 7, 21, 66].map(milestone => { if (milestone > challenge.length) return null; const isReached = currentDay >= milestone; return (<div key={milestone} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isReached ? 'var(--accent)' : 'var(--stroke)' }}></div><span style={{ fontSize: '10px', color: isReached ? 'var(--accent)' : 'var(--text-muted)' }}>{milestone}</span></div>); })}</div></div>); })}</div>)}<div style={{ flex: 1, minHeight: '40px' }}></div><button className="btn-primary fade-up" style={{ animationDelay: '0.4s' }} onClick={onNewChallenge}>+ Новый челлендж</button><div style={{ height: '40px' }}></div></div>); }

function ChallengeDetailsScreen({ challenge, onBack, themeData }) { const habit = HABITS_LIST.find(h => h.id === challenge.habitId); const days = []; const start = new Date(challenge.startDate); let completedCount = 0; for (let i = 0; i < challenge.length; i++) { const d = new Date(start); d.setDate(d.getDate() + i); const dateStr = d.toISOString().split('T')[0]; const raw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}'); const isDone = (raw[challenge.habitId] || 0) >= (habit.target || 1); if (isDone) completedCount++; days.push({ date: dateStr, dayNum: i + 1, completed: isDone, isFuture: d > new Date() }); } const progress = Math.round((completedCount / challenge.length) * 100); const freezes = JSON.parse(localStorage.getItem('kairos_freezes') || '[]'); const handleFreeze = () => { if (freezes.includes(getTodayKey())) { alert("Вы уже использовали заморозку сегодня."); return; } if (freezes.length >= 2) { alert("Вы исчерпали лимит заморозок."); return; } localStorage.setItem('kairos_freezes', JSON.stringify([...freezes, getTodayKey()])); alert("День заморожен! Стрик сохранен."); }; return (<div className="content"><button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button><div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}><div style={{ color: 'var(--accent)' }}><habit.icon /></div><h1 className="title" style={{ fontSize: '32px', margin: 0 }}>{challenge.title}</h1></div><div className="fade-up"><EnergyRing progress={progress} accentColor={themeData.accent} gradientColor={themeData.halo2} /></div><div className="calendar-grid fade-up" style={{ animationDelay: '0.1s' }}>{days.map(day => (<div key={day.date} className={`calendar-day ${day.completed ? 'completed' : ''} ${day.isFuture ? 'future' : ''}`}>{day.dayNum}</div>))}</div><div style={{ flex: 1, minHeight: '40px' }}></div><button onClick={handleFreeze} className="ghost-btn fade-up" style={{ animationDelay: '0.2s', marginBottom: '16px' }}>❄️ Использовать заморозку</button><button className="btn-primary fade-up" style={{ animationDelay: '0.3s' }} onClick={onBack}>Вернуться</button></div>); }

function NewChallengeScreen({ onBack, onCreated }) { const [selectedHabit, setSelectedHabit] = useState(null); const [length, setLength] = useState(21); const userHabitsIds = JSON.parse(localStorage.getItem('kairos_habits') || '[]'); const userHabits = HABITS_LIST.filter(h => userHabitsIds.includes(h.id)); const handleCreate = () => { if (!selectedHabit) return; const habit = HABITS_LIST.find(h => h.id === selectedHabit); const challenges = getChallenges(); challenges.push({ id: Date.now().toString(), habitId: selectedHabit, title: habit.label, startDate: getTodayKey(), length: length }); saveChallenges(challenges); onCreated(); }; return (<div className="content"><button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button><h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Новый<br/>челлендж</h1><p className="subtitle fade-up" style={{animationDelay: '0.1s', marginTop: '24px', marginBottom: '16px'}}>Выбери привычку:</p><div className="habits-grid fade-up" style={{animationDelay: '0.15s'}}>{userHabits.map(habit => (<div key={habit.id} className={`habit-card ${selectedHabit === habit.id ? 'selected' : ''}`} onClick={() => setSelectedHabit(habit.id)}><div className="habit-icon"><habit.icon /></div><span className="habit-label">{habit.label}</span></div>))}</div><p className="subtitle fade-up" style={{animationDelay: '0.2s', marginTop: '32px', marginBottom: '16px'}}>Длительность:</p><div className="fade-up" style={{animationDelay: '0.25s', display: 'flex', gap: '12px'}}>{[7, 21, 66].map(days => (<button key={days} onClick={() => setLength(days)} style={{ flex: 1, height: '48px', borderRadius: '12px', background: length === days ? 'var(--accent)' : 'var(--surface)', color: length === days ? '#0B0D10' : 'var(--text)', border: '1px solid', borderColor: length === days ? 'var(--accent)' : 'var(--stroke)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>{days} дней</button>))}</div><div style={{ flex: 1, minHeight: '40px' }}></div><button className="btn-primary fade-up" style={{ animationDelay: '0.3s', opacity: selectedHabit ? 1 : 0.4 }} onClick={handleCreate} disabled={!selectedHabit}>Создать</button></div>); }

function ReflectionScreen({ onSave, onBack }) { const todayKey = getTodayKey(); const savedData = JSON.parse(localStorage.getItem(`kairos_reflection_${todayKey}`) || '{}'); const [mood, setMood] = useState(savedData.mood || 0); const [note, setNote] = useState(savedData.note || ''); const handleSave = () => { if (mood === 0) return; localStorage.setItem(`kairos_reflection_${todayKey}`, JSON.stringify({ mood, note })); onSave(); }; return (<div className="content"><button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button><HeaderLogo /><h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Как прошёл<br/>день?</h1><div className="fade-up" style={{animationDelay: '0.1s', marginTop: '32px'}}><div className="mood-grid">{[1, 2, 3, 4, 5].map(value => (<div key={value} className={`mood-circle ${mood === value ? 'selected' : ''}`} onClick={() => setMood(value)}></div>))}</div><div className="mood-label" style={{ opacity: mood > 0 ? 1 : 0 }}>{MOOD_LABELS[mood] || ''}</div></div><div className="fade-up" style={{animationDelay: '0.2s', marginTop: '16px'}}><textarea className="note-input" placeholder="Короткая заметка (необязательно)" value={note} onChange={(e) => setNote(e.target.value)} rows={3} style={{ width: '100%', backgroundColor: 'var(--surface)', border: '1px solid var(--stroke)', borderRadius: '16px', padding: '16px', color: 'var(--text)', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box', WebkitAppearance: 'none' }} /></div><div style={{ flex: 1, minHeight: '40px' }}></div><button className="btn-primary" style={{ opacity: mood > 0 ? 1 : 0.4 }} onClick={handleSave} disabled={mood === 0}>Сохранить</button></div>); }

function ProfileScreen({ name, theme, setTheme }) {
    const [notifPermission, setNotifPermission] = useState('default');
    const stats = calculateStats(); const initial = name ? name.charAt(0).toUpperCase() : 'K';

    useEffect(() => {
        if ('Notification' in window) setNotifPermission(Notification.permission);
    }, []);

    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            alert('Ваш браузер не поддерживает уведомления.');
            return;
        }
        const permission = await Notification.requestPermission();
        setNotifPermission(permission);
        if (permission === 'granted') {
            alert(`Отлично! Мы напомним вам о ритуале в ${localStorage.getItem('kairos_time') || '09:00'}.`);
        } else {
            alert('Уведомления отключены. Вы всегда можете включить их в настройках браузера.');
        }
    };

    const handleExport = () => { const data = {}; for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i); if (key.startsWith('kairos_')) data[key] = localStorage.getItem(key); } const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `kairos_backup_${getTodayKey()}.json`; a.click(); URL.revokeObjectURL(url); };
    const handleReset = () => { if (window.confirm("Вы уверены? Это удалит все ваши привычки, челленджи и историю. Действие необратимо.")) { localStorage.clear(); window.location.reload(); } };
    
    return (
        <div className="content">
            <HeaderLogo />
            <div className="fade-up profile-header"><div className="avatar">{initial}</div><h1 className="title" style={{ fontSize: '32px', marginTop: '16px' }}>{name}</h1></div>
            <div className="fade-up stats-grid" style={{ animationDelay: '0.1s' }}><div className="stat-item"><span className="stat-value">{stats.currentStreak}</span><span className="stat-label">Стрик</span></div><div className="stat-item"><span className="stat-value">{stats.totalCheckins}</span><span className="stat-label">Выполнено</span></div><div className="stat-item"><span className="stat-value">{stats.completedChallenges}</span><span className="stat-label">Путей</span></div></div>
            <div className="fade-up settings-list" style={{ animationDelay: '0.2s' }}>
                <div className="settings-header">Настройки</div>
                
                <div className="settings-row" style={{ cursor: 'default' }}>
                    <span>Тема оформления</span>
                    <div style={{ display: 'flex', gap: '8px' }}>{Object.keys(window.KAIROS_THEMES).map(key => (<div key={key} onClick={() => setTheme(key)} style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: window.KAIROS_THEMES[key].accent, border: theme === key ? '2px solid white' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }} />))}</div>
                </div>
                
                {/* Переключатель уведомлений */}
                <div className="settings-row" onClick={requestNotificationPermission}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }}><Icons.Bell /></div>
                        <span>Напоминания</span>
                    </div>
                    <span style={{ color: notifPermission === 'granted' ? 'var(--accent)' : 'var(--text-muted)' }}>
                        {notifPermission === 'granted' ? 'Включены' : 'Включить'}
                    </span>
                </div>

                <div className="settings-row" onClick={handleExport}><span>Экспорт данных</span><span style={{ color: 'var(--text-muted)' }}>JSON ↓</span></div>
                <div className="settings-row" onClick={() => alert("Kairos v1.0\nРитуал, а не гонка.\nСоздано с любовью.")}><span>О приложении</span><span style={{ color: 'var(--text-muted)' }}>v1.0</span></div>
                <div className="settings-row" onClick={handleReset} style={{ color: '#FF7A59', marginTop: '16px' }}><span>Сбросить прогресс</span></div>
            </div>
            <div style={{ height: '100px' }}></div>
        </div>
    );
}

function BottomNav({ activeTab, setTab }) { const tabs = [{ id: 'today', icon: '◐' }, { id: 'challenges', icon: '◇' }, { id: 'profile', icon: '◯' }]; return (<div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', padding: '8px', background: 'rgba(19, 22, 27, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid var(--stroke)', borderRadius: '99px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 20 }}>{tabs.map(tab => (<button key={tab.id} onClick={() => setTab(tab.id)} style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', cursor: 'pointer', transition: 'all 0.3s ease', background: activeTab === tab.id ? 'var(--accent)' : 'transparent', color: activeTab === tab.id ? '#0B0D10' : 'var(--text-muted)', border: 'none' }}>{tab.icon}</button>))}</div>); }

function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('kairos_theme') || 'aurora'); const [step, setStep] = useState(() => localStorage.getItem('kairos_onboarded') ? 'today' : 'welcome'); const [name, setName] = useState(() => localStorage.getItem('kairos_name') || ''); const [activeTab, setActiveTab] = useState('today'); const [selectedChallenge, setSelectedChallenge] = useState(null); const [selectedHabit, setSelectedHabit] = useState(null); const themeData = window.KAIROS_THEMES[theme];
    
    useEffect(() => { const root = document.documentElement; root.style.setProperty('--accent', themeData.accent); root.style.setProperty('--accent-glow', themeData.glow); root.style.setProperty('--halo-1', themeData.halo1); root.style.setProperty('--halo-2', themeData.halo2); localStorage.setItem('kairos_theme', theme); }, [theme, themeData]);

    // Логика Push-уведомлений (проверка каждые 30 секунд)
    useEffect(() => {
        if (!('Notification' in window)) return;
        
        const checkTime = setInterval(() => {
            if (Notification.permission === 'granted') {
                const now = new Date();
                const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                const reminderTime = localStorage.getItem('kairos_time') || '09:00';
                const today = getTodayKey();
                const lastNotified = localStorage.getItem('kairos_last_notified');

                if (currentTime === reminderTime && lastNotified !== today) {
                    // Отправляем уведомление
                    new Notification('Kairos · Ритуал', {
                        body: 'Время для твоего ритуала. Один маленький шаг сегодня.',
                        icon: './assets/icon.png', // Убедитесь, что путь к иконке верный
                        badge: './assets/icon.png'
                    });
                    localStorage.setItem('kairos_last_notified', today);
                }
            }
        }, 30000); // 30000 мс = 30 секунд
        
        return () => clearInterval(checkTime);
    }, []);

    return (
        <div className="screen">
            <InstallPrompt />
            <div className="halo-container"><div className="halo-1"></div><div className="halo-2"></div></div>
            {step !== 'today' && step !== 'reflection' && step !== 'new-challenge' && step !== 'challenge-details' && step !== 'habit-details' && (<div className="theme-switcher">{Object.keys(window.KAIROS_THEMES).map(key => (<div key={key} className={`theme-dot ${theme === key ? 'active' : ''}`} style={{ backgroundColor: window.KAIROS_THEMES[key].accent }} onClick={() => setTheme(key)} />))}</div>)}
            {step === 'welcome' && <WelcomeScreen onStart={() => setStep('name')} />}
            {step === 'name' && <NameScreen onNext={() => { setName(localStorage.getItem('kairos_name')); setStep('habits'); }} />}
            {step === 'habits' && <HabitsScreen name={name} onNext={() => setStep('reminder')} />}
            {step === 'reminder' && <ReminderScreen name={name} onFinish={() => setStep('today')} />}
            {step === 'today' && (
                <>
                    <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 10 }}><button onClick={() => setTheme(theme === 'aurora' ? 'ember' : theme === 'ember' ? 'jade' : 'aurora')} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--text)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>◐</button></div>
                    {activeTab === 'today' && <TodayScreen name={name} themeData={themeData} onReflect={() => setStep('reflection')} onOpenHabit={(h) => { setSelectedHabit(h); setStep('habit-details'); }} />}
                    {activeTab === 'challenges' && <ChallengesScreen onNewChallenge={() => setStep('new-challenge')} onOpenChallenge={(c) => { setSelectedChallenge(c); setStep('challenge-details'); }} />}
                    {activeTab === 'profile' && <ProfileScreen name={name} theme={theme} setTheme={setTheme} />}
                    <div className="nav-gradient"></div><BottomNav activeTab={activeTab} setTab={setActiveTab} />
                </>
            )}
            {step === 'reflection' && <ReflectionScreen onSave={() => setStep('today')} onBack={() => setStep('today')} />}
            {step === 'new-challenge' && <NewChallengeScreen onBack={() => setStep('today')} onCreated={() => setStep('today')} />}
            {step === 'challenge-details' && <ChallengeDetailsScreen challenge={selectedChallenge} themeData={themeData} onBack={() => setStep('today')} />}
            {step === 'habit-details' && <HabitDetailsScreen habit={selectedHabit} onBack={() => setStep('today')} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
