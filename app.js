const { useState, useEffect, useRef } = React;

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
    Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    Spark: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>,
    Heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
};

// Базовые привычки с поддержкой «Упругого режима» (baseDesc — обычный ритм, minDesc — бережный минимум)
const BASE_HABITS_LIST = [
    { id: 'exercise', label: 'Зарядка', icon: Icons.Sun, type: 'binary', baseDesc: '15 минут разминки', minDesc: '2 минуты потянуться' },
    { id: 'reading', label: 'Чтение', icon: Icons.Book, type: 'binary', baseDesc: '20–30 минут с книгой', minDesc: 'Прочитать 2 страницы' },
    { id: 'meditation', label: 'Медитация', icon: Icons.Lotus, type: 'binary', baseDesc: '10 минут тишины', minDesc: '3 осознанных вдоха' },
    { id: 'water', label: 'Вода', icon: Icons.Drop, type: 'counter', target: 8, minTarget: 4, unit: 'ст.', baseDesc: 'по 250 мл · 8 стаканов', minDesc: 'по 250 мл · 4 стакана (минимум)' },
    { id: 'walk', label: 'Прогулка', icon: Icons.Walk, type: 'binary', baseDesc: '30 минут на свежем воздухе', minDesc: '5 минут подышать у окна/на улице' },
    { id: 'journal', label: 'Дневник', icon: Icons.Pen, type: 'binary', baseDesc: 'Записать мысли и итоги', minDesc: 'Одна строчка благодарности' },
    { id: 'sleep', label: 'Сон вовремя', icon: Icons.Moon, type: 'binary', baseDesc: 'Лечь до 23:00 без экрана', minDesc: 'Отложить телефон в кровати' },
    { id: 'nosocial', label: 'Без соцсетей', icon: Icons.PhoneOff, type: 'binary', baseDesc: 'Утро и вечер без ленты', minDesc: 'Первые 15 минут утра без телефона' },
];

// Получение полного списка привычек (включая авторскую привычку пользователя, если она создана)
function getAllHabitsList() {
    const customRaw = localStorage.getItem('kairos_custom_habit');
    if (customRaw) {
        try {
            const custom = JSON.parse(customRaw);
            return [
                ...BASE_HABITS_LIST,
                {
                    id: 'custom_user',
                    label: custom.label || 'Свой ритуал',
                    icon: Icons.Spark,
                    type: 'binary',
                    baseDesc: custom.baseDesc || 'Полный шаг',
                    minDesc: custom.minDesc || 'Микро-шаг на 1 минуту'
                }
            ];
        } catch (e) {}
    }
    return BASE_HABITS_LIST;
}

const MOOD_LABELS = { 1: 'Тяжело', 2: 'Так себе', 3: 'Обычно', 4: 'Хорошо', 5: 'Отлично' };

function Logo() {
    return (
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="var(--stroke)" strokeWidth="1.5" />
            <path d="M50 2 A48 48 0 0 1 98 50" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="4" fill="var(--accent)" />
        </svg>
    );
}

function HeaderLogo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" stroke="var(--stroke)" strokeWidth="2" />
                <path d="M50 2 A48 48 0 0 1 98 50" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="50" r="4" fill="var(--accent)" />
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: '600', letterSpacing: '4px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>KAIROS</span>
        </div>
    );
}

function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(window.deferredInstallPrompt || null);
    const [isIOS, setIsIOS] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
            setIsStandalone(true);
        }
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); };
        const customHandler = () => setDeferredPrompt(window.deferredInstallPrompt);
        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('kairos-pwa-ready', customHandler);
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('kairos-pwa-ready', customHandler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (window.triggerHaptic) window.triggerHaptic(25);
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') setDeferredPrompt(null);
        } else {
            setShowHint(!showHint);
        }
    };

    if (isStandalone) return null;

    return (
        <div style={{ position: 'fixed', top: '70px', right: '24px', zIndex: 100 }}>
            <button onClick={handleInstallClick} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--text)', borderRadius: '99px', padding: '8px 14px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                На экран
            </button>
            {showHint && (
                <div style={{ position: 'absolute', top: '44px', right: '0', width: '240px', background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '12px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-muted)', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', animation: 'fadeUp 0.3s ease', lineHeight: '1.45' }}>
                    {isIOS ? (
                        <><strong style={{color: 'var(--text)'}}>На iPhone:</strong> Нажмите «Поделиться» внизу браузера, затем «На экран "Домой"».</>
                    ) : (
                        <><strong style={{color: 'var(--text)'}}>Установка:</strong> Откройте меню браузера (⋮) и выберите «Установить приложение».</>
                    )}
                </div>
            )}
        </div>
    );
}

function EnergyRing({ progress, accentColor, gradientColor, subtitle = 'ЭНЕРГИЯ ДНЯ' }) {
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
                <span className="ring-label">{subtitle}</span>
            </div>
        </div>
    );
}

// ───────── ХЕЛПЕРЫ ─────────
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

const getTodayKey = () => new Date().toISOString().split('T')[0];

function getChallenges() { return JSON.parse(localStorage.getItem('kairos_challenges') || '[]'); }
function saveChallenges(challenges) { localStorage.setItem('kairos_challenges', JSON.stringify(challenges)); }

function getDayOfChallenge(startDate) {
    const start = new Date(startDate).setHours(0,0,0,0);
    const now = new Date().setHours(0,0,0,0);
    return Math.floor(Math.abs(now - start) / (1000 * 60 * 60 * 24)) + 1;
}

function getTodayCheckins() {
    const raw = localStorage.getItem(`kairos_checkins_${getTodayKey()}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
        const obj = {};
        parsed.forEach(id => obj[id] = 1);
        return obj;
    }
    return parsed;
}

function saveTodayCheckins(data) {
    localStorage.setItem(`kairos_checkins_${getTodayKey()}`, JSON.stringify(data));
}

// Умный подсчет статистики с учетом «Заморозок» (kairos_freezes)
function calculateStats() {
    let totalCheckins = 0;
    let currentStreak = 0;
    const freezes = JSON.parse(localStorage.getItem('kairos_freezes') || '[]');
    const challenges = getChallenges();
    const completedChallenges = challenges.filter(c => getDayOfChallenge(c.startDate) > c.length).length;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('kairos_checkins_')) {
            const val = JSON.parse(localStorage.getItem(key) || '{}');
            if (Array.isArray(val)) totalCheckins += val.length;
            else totalCheckins += Object.values(val).filter(v => v >= 1).length;
        }
    }

    let checkDate = new Date();
    const todayStr = getTodayKey();
    while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        const dayCheckinsRaw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}');
        const dayCheckins = Array.isArray(dayCheckinsRaw) ? dayCheckinsRaw : Object.keys(dayCheckinsRaw).filter(k => dayCheckinsRaw[k] >= 1);
        const isFrozen = freezes.includes(dateStr);

        if (dayCheckins.length > 0 || isFrozen) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else if (dateStr === todayStr) {
            // Если сегодня еще ничего не отмечено, проверяем вчерашний день, чтобы не обнулять стрик с утра
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    return { totalCheckins, currentStreak, completedChallenges };
}

// ───────── МОДАЛЬНОЕ ОКНО: SOS-КАПСУЛА ПОДДЕРЖКИ И ДЫХАНИЕ ─────────
function SosModal({ onClose, onEnableGentleMode }) {
    const capsules = (window.KAIROS_MENTOR && window.KAIROS_MENTOR.sosCapsules) || [];
    const [activeCapsule, setActiveCapsule] = useState(null);
    const [breathStep, setBreathStep] = useState(null); // 'inhale' | 'hold' | 'exhale'
    const [breathSeconds, setBreathSeconds] = useState(0);

    useEffect(() => {
        if (!breathStep) return;
        const timer = setInterval(() => {
            setBreathSeconds(prev => {
                if (prev <= 1) {
                    if (breathStep === 'inhale') { setBreathStep('hold'); return 4; }
                    if (breathStep === 'hold') { setBreathStep('exhale'); return 6; }
                    if (breathStep === 'exhale') { setBreathStep('inhale'); return 4; }
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [breathStep]);

    const startBreathing = () => {
        if (window.triggerHaptic) window.triggerHaptic([40, 60, 40]);
        setBreathStep('inhale');
        setBreathSeconds(4);
    };

    const why = localStorage.getItem('kairos_why') || '';

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(6, 8, 10, 0.86)', backdropFilter: 'blur(12px)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
            <div style={{ background: 'var(--surface)', width: '100%', maxWidth: '480px', maxHeight: '88vh', overflowY: 'auto', padding: '24px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px', borderTop: '1px solid var(--stroke)', animation: 'fadeUp 0.3s ease', boxSizing: 'border-box' }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Капсула присутствия</span>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                </div>

                {!activeCapsule ? (
                    <>
                        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: '0 0 8px 0', fontWeight: 600 }}>Что ты сейчас чувствуешь?</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                            Выбери своё состояние — я помогу вернуть опору без чувства вины и давления.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                            {capsules.map(c => (
                                <div key={c.id} onClick={() => { if (window.triggerHaptic) window.triggerHaptic(25); setActiveCapsule(c); }} style={{ padding: '14px 16px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--stroke)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '20px' }}>{c.icon}</span>
                                        <span style={{ fontSize: '15px', fontWeight: 500 }}>{c.title}</span>
                                    </div>
                                    <span style={{ color: 'var(--text-muted)' }}>›</span>
                                </div>
                            ))}
                        </div>

                        {/* Дыхательный тренажер 4-4-6 */}
                        <div style={{ padding: '16px', borderRadius: '18px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--stroke)', textAlign: 'center' }}>
                            {!breathStep ? (
                                <>
                                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>🌬️ Перезагрузка за 60 секунд</div>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>Дыхательный квадрат снимет тревогу и вернет фокус в момент «сейчас».</p>
                                    <button onClick={startBreathing} className="ghost-btn" style={{ height: '40px', fontSize: '13px', width: '100%' }}>Начать дыхание</button>
                                </>
                            ) : (
                                <div style={{ padding: '8px 0' }}>
                                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', color: 'var(--accent)', marginBottom: '4px' }}>
                                        {breathStep === 'inhale' ? 'Медленный вдох...' : breathStep === 'hold' ? 'Задержка дыхания...' : 'Плавный выдох...'}
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: 700, margin: '8px 0' }}>{breathSeconds}</div>
                                    <button onClick={() => setBreathStep(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer', marginTop: '6px' }}>Завершить практику</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div>
                        <button onClick={() => setActiveCapsule(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', marginBottom: '12px', padding: 0 }}>← Ко всем состояниям</button>
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>{activeCapsule.icon}</div>
                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', margin: '0 0 12px 0' }}>{activeCapsule.title}</h3>
                        
                        <blockquote style={{ margin: '0 0 16px 0', padding: '12px 16px', borderLeft: '2px solid var(--accent)', background: 'rgba(255,255,255,0.03)', borderRadius: '0 12px 12px 0', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '18px', lineHeight: 1.4 }}>
                            «{activeCapsule.quote}»
                        </blockquote>

                        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text)', marginBottom: '16px' }}>{activeCapsule.message}</p>

                        {why && (
                            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--stroke)', marginBottom: '16px', fontSize: '13px' }}>
                                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase' }}>Твой главный смысл:</span>
                                <strong>«{why}»</strong>
                            </div>
                        )}

                        <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', marginBottom: '20px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>Вопрос наставника:</div>
                            <div style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: '10px' }}>{activeCapsule.actionPrompt}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--stroke)', paddingTop: '8px' }}>💡 <strong>Практика:</strong> {activeCapsule.practice}</div>
                        </div>

                        <button className="btn-primary" onClick={() => { onEnableGentleMode(); onClose(); }} style={{ marginBottom: '8px' }}>
                            🪶 Включить «Бережный минимум» на сегодня
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ───────── ЭКРАНЫ ОНБОРДИНГА ─────────
function WelcomeScreen({ onStart }) {
    return (
        <div className="content">
            <div className="brand-lockup fade-up"><Logo /><span className="brand-name">KAIROS</span></div>
            <h1 className="title fade-up" style={{animationDelay: '0.1s'}}>Ритуал,<br/>а не гонка</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.2s'}}>Тихая сила ежедневных повторений.<br/>Твой карманный наставник в моменте «сейчас».</p>
            <div style={{ flex: 1 }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.4s'}} onClick={onStart}>Начать путь</button>
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

function HabitsScreen({ name, onNext, isEditMode = false }) {
    const allHabits = getAllHabitsList();
    const [selected, setSelected] = useState(() => {
        const saved = localStorage.getItem('kairos_habits');
        return saved ? JSON.parse(saved) : [];
    });
    const [step, setStep] = useState('select');
    const [why, setWhy] = useState(() => localStorage.getItem('kairos_why') || '');
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [customTitle, setCustomTitle] = useState('');
    const [customBase, setCustomBase] = useState('');
    const [customMin, setCustomMin] = useState('');

    const toggleHabit = (id) => {
        if (window.triggerHaptic) window.triggerHaptic(20);
        if (selected.includes(id)) setSelected(selected.filter(h => h !== id));
        else if (selected.length < 4) setSelected([...selected, id]);
    };

    const handleSaveCustom = () => {
        if (!customTitle.trim()) return;
        const customObj = {
            label: customTitle.trim(),
            baseDesc: customBase.trim() || 'Полный шаг',
            minDesc: customMin.trim() || 'Микро-шаг на 2 минуты'
        };
        localStorage.setItem('kairos_custom_habit', JSON.stringify(customObj));
        if (!selected.includes('custom_user') && selected.length < 4) {
            setSelected([...selected, 'custom_user']);
        }
        setShowCustomModal(false);
    };

    const handleNext = () => {
        if (step === 'select') {
            if (selected.length > 0) setStep('why');
        } else {
            localStorage.setItem('kairos_habits', JSON.stringify(selected));
            localStorage.setItem('kairos_why', why.trim());
            const firstHabitId = selected[0];
            const habit = getAllHabitsList().find(h => h.id === firstHabitId);
            const existing = getChallenges();
            if (existing.length === 0 && habit) {
                saveChallenges([{ id: Date.now().toString(), habitId: firstHabitId, title: habit.label, startDate: getTodayKey(), length: 21 }]);
            }
            onNext();
        }
    };

    if (step === 'why') {
        return (
            <div className="content">
                <h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Ради какого<br/>большего смысла?</h1>
                <p className="subtitle fade-up" style={{animationDelay: '0.1s', marginBottom: '24px'}}>Сформулируй своё «Зачем». Этот якорь поддержит тебя, когда мотивация пойдет на спад.</p>
                <div className="fade-up" style={{animationDelay: '0.2s'}}>
                    <textarea className="note-input" placeholder="Например: Хочу иметь ясный ум, крепкое тело и энергию для своих проектов и близких..." value={why} onChange={(e) => setWhy(e.target.value)} rows={4} style={{ width: '100%', backgroundColor: 'var(--surface)', border: '1px solid var(--stroke)', borderRadius: '16px', padding: '16px', color: 'var(--text)', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}></div>
                <button className="btn-primary fade-up" style={{animationDelay: '0.3s'}} onClick={handleNext}>{isEditMode ? 'Сохранить изменения' : 'Продолжить'}</button>
            </div>
        );
    }

    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: 'clamp(30px, 8.5vw, 42px)' }}>Твой фокус,<br/>{name}</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s', marginBottom: '20px'}}>Выбери от 1 до 4 привычек. Меньше — значит глубже.</p>
            <div className="habits-grid fade-up" style={{animationDelay: '0.2s'}}>
                {allHabits.map((habit) => (
                    <div key={habit.id} className={`habit-card ${selected.includes(habit.id) ? 'selected' : ''}`} onClick={() => toggleHabit(habit.id)}>
                        <div className="habit-icon"><habit.icon /></div>
                        <span className="habit-label">{habit.label}</span>
                    </div>
                ))}
                <div className="habit-card" onClick={() => setShowCustomModal(true)} style={{ borderStyle: 'dashed', opacity: 0.85 }}>
                    <div className="habit-icon"><Icons.Spark /></div>
                    <span className="habit-label">+ Свой ритуал</span>
                </div>
            </div>
            <div style={{ flex: 1, minHeight: '24px' }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.3s', opacity: selected.length > 0 ? 1 : 0.4}} onClick={handleNext} disabled={selected.length === 0}>Далее ({selected.length}/4)</button>

            {showCustomModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowCustomModal(false)}>
                    <div style={{ background: 'var(--surface)', width: '100%', maxWidth: '380px', padding: '24px', borderRadius: '24px', border: '1px solid var(--stroke)' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 16px 0', fontFamily: 'Cormorant Garamond, serif', fontSize: '24px' }}>Своя привычка</h3>
                        <input type="text" placeholder="Название (напр. Финансовый учет)" value={customTitle} onChange={e => setCustomTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--stroke)', background: 'var(--bg)', color: 'var(--text)', marginBottom: '10px', boxSizing: 'border-box' }} />
                        <input type="text" placeholder="Обычный шаг (напр. 15 минут практики)" value={customBase} onChange={e => setCustomBase(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--stroke)', background: 'var(--bg)', color: 'var(--text)', marginBottom: '10px', boxSizing: 'border-box' }} />
                        <input type="text" placeholder="Бережный минимум (напр. 2 минуты)" value={customMin} onChange={e => setCustomMin(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--stroke)', background: 'var(--bg)', color: 'var(--text)', marginBottom: '16px', boxSizing: 'border-box' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="ghost-btn" onClick={() => setShowCustomModal(false)} style={{ flex: 1 }}>Отмена</button>
                            <button className="btn-primary" onClick={handleSaveCustom} style={{ flex: 1 }}>Добавить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ReminderScreen({ name, onFinish }) {
    const [time, setTime] = useState(() => localStorage.getItem('kairos_time') || '09:00');
    const handleFinish = () => {
        localStorage.setItem('kairos_time', time);
        localStorage.setItem('kairos_onboarded', 'true');
        onFinish();
    };
    return (
        <div className="content">
            <h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Когда тебе<br/>напомнить, {name}?</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s'}}>Утренний настрой задаст тон всему дню.</p>
            <div className="fade-up time-picker-container" style={{animationDelay: '0.2s'}}>
                <div className="time-display">{time}</div>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="time-input-hidden" />
            </div>
            <div style={{ flex: 1 }}></div>
            <button className="btn-primary fade-up" style={{animationDelay: '0.3s'}} onClick={handleFinish}>Войти в Kairos</button>
        </div>
    );
}

// ───────── ГОЛОС НАСТАВНИКА НА ГЛАВНОМ ЭКРАНЕ ─────────
function MentorNote({ userHabits, completed, name, gentleMode, energyLevel }) {
    const why = localStorage.getItem('kairos_why') || '';
    let doneCount = 0;
    userHabits.forEach(h => {
        const target = gentleMode && h.minTarget ? h.minTarget : (h.target || 1);
        if ((completed[h.id] || 0) >= target) doneCount++;
    });

    const isAllDone = userHabits.length > 0 && doneCount === userHabits.length;
    const mentorData = window.KAIROS_MENTOR ? window.KAIROS_MENTOR.getCurrentGreeting() : null;
    const energyObj = (window.KAIROS_MENTOR && energyLevel) ? window.KAIROS_MENTOR.energyLevels.find(e => e.level === energyLevel) : null;

    let mainText = '';
    let subQuestion = '';

    if (isAllDone) {
        mainText = `${name}, все шаги на сегодня сделаны. ${why ? `Помни свой главный ориентир: «${why}». Сегодня ты вложился в него делом.` : 'Посвяти остаток дня спокойному восстановлению.'}`;
    } else if (energyObj) {
        mainText = `${energyObj.emoji} Состояние: ${energyObj.label}. ${energyObj.advice}`;
        subQuestion = mentorData ? mentorData.question : '';
    } else if (mentorData) {
        mainText = `${mentorData.icon} ${mentorData.title}`;
        subQuestion = why ? `Твой ориентир: «${why}». ${mentorData.question}` : mentorData.question;
    } else {
        mainText = `${name}, двигайся в своем темпе. Маленький шаг сегодня важнее идеального плана завтра.`;
    }

    return (
        <div className="fade-up mentor-note" style={{animationDelay: '0.15s', flexDirection: 'column', alignItems: 'flex-start', gap: '8px'}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                <div className="mentor-icon">✧</div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent)', fontWeight: 600 }}>
                    {isAllDone ? 'Гармония момента' : (mentorData ? mentorData.period : 'Голос наставника')}
                </span>
            </div>
            <p className="mentor-text" style={{ margin: 0 }}>{mainText}</p>
            {subQuestion && !isAllDone && (
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                    «{subQuestion}»
                </p>
            )}
        </div>
    );
}

// ───────── ГЛАВНЫЙ ЭКРАН «СЕГОДНЯ» ─────────
function TodayScreen({ name, themeData, onReflect, onOpenHabit }) {
    const greeting = getGreeting();
    const dateString = getFormattedDate();
    const todayKey = getTodayKey();
    const allHabits = getAllHabitsList();
    const userHabitsIds = JSON.parse(localStorage.getItem('kairos_habits') || '[]');
    const userHabits = allHabits.filter(h => userHabitsIds.includes(h.id));

    const [completed, setCompleted] = useState(getTodayCheckins());
    const [gentleMode, setGentleMode] = useState(() => localStorage.getItem(`kairos_gentle_${todayKey}`) === 'true');
    const [energyLevel, setEnergyLevel] = useState(() => Number(localStorage.getItem(`kairos_energy_${todayKey}`)) || 0);
    const [toastMessage, setToastMessage] = useState(null);
    const [showSos, setShowSos] = useState(false);

    const hasReflected = !!localStorage.getItem(`kairos_reflection_${todayKey}`);

    const showFeedbackToast = (text) => {
        setToastMessage(text);
        setTimeout(() => {
            setToastMessage(prev => (prev === text ? null : prev));
        }, 4200);
    };

    const toggleGentleMode = (forceState) => {
        const nextState = typeof forceState === 'boolean' ? forceState : !gentleMode;
        if (window.triggerHaptic) window.triggerHaptic(30);
        setGentleMode(nextState);
        localStorage.setItem(`kairos_gentle_${todayKey}`, String(nextState));
        if (nextState) {
            showFeedbackToast('🪶 Включен «Бережный минимум». Сегодня достаточно микро-шагов, чтобы сохранить ритм.');
        }
    };

    const handleSelectEnergy = (lvl) => {
        if (window.triggerHaptic) window.triggerHaptic(25);
        setEnergyLevel(lvl);
        localStorage.setItem(`kairos_energy_${todayKey}`, String(lvl));
        if (lvl <= 2 && !gentleMode) {
            toggleGentleMode(true);
        }
    };

    const toggleCheckin = (habit) => {
        const target = gentleMode && habit.minTarget ? habit.minTarget : (habit.target || 1);
        const current = completed[habit.id] || 0;
        let newVal;
        if (habit.type === 'counter') {
            newVal = current + 1;
            if (newVal > target) newVal = 0;
        } else {
            newVal = current >= 1 ? 0 : 1;
        }
        const newCompleted = { ...completed, [habit.id]: newVal };
        setCompleted(newCompleted);
        saveTodayCheckins(newCompleted);

        // Живой тактильный и текстовый отклик при закрытии привычки
        if (newVal >= target && current < target) {
            if (window.triggerHaptic) window.triggerHaptic([35, 50, 35]);
            const newDoneCount = userHabits.filter(h => {
                const t = gentleMode && h.minTarget ? h.minTarget : (h.target || 1);
                return (newCompleted[h.id] || 0) >= t;
            }).length;

            if (window.KAIROS_MENTOR) {
                if (newDoneCount === userHabits.length) {
                    showFeedbackToast(window.KAIROS_MENTOR.getRandomFeedback('allCompleted'));
                } else if (gentleMode) {
                    showFeedbackToast(window.KAIROS_MENTOR.getRandomFeedback('minDone'));
                } else {
                    showFeedbackToast(window.KAIROS_MENTOR.getRandomFeedback('fullDone'));
                }
            }
        } else if (window.triggerHaptic) {
            window.triggerHaptic(15);
        }
    };

    const longPressCheckin = (habit) => {
        if (habit.type === 'counter') {
            const current = completed[habit.id] || 0;
            const newVal = Math.max(0, current - 1);
            const newCompleted = { ...completed, [habit.id]: newVal };
            setCompleted(newCompleted);
            saveTodayCheckins(newCompleted);
        }
    };

    const doneCount = userHabits.filter(h => {
        const target = gentleMode && h.minTarget ? h.minTarget : (h.target || 1);
        return (completed[h.id] || 0) >= target;
    }).length;
    const progress = userHabits.length === 0 ? 0 : Math.round((doneCount / userHabits.length) * 100);

    const energyLevelsList = (window.KAIROS_MENTOR && window.KAIROS_MENTOR.energyLevels) || [
        { level: 1, emoji: '🪫', label: '1' },
        { level: 2, emoji: '🌧️', label: '2' },
        { level: 3, emoji: '⚖️', label: '3' },
        { level: 4, emoji: '🔥', label: '4' },
        { level: 5, emoji: '⚡', label: '5' }
    ];

    return (
        <div className="content">
            <HeaderLogo />
            <div className="fade-up" style={{ marginTop: '0px' }}>
                <span className="date-label">{dateString}</span>
                <h1 className="title" style={{ fontSize: 'clamp(34px, 9.5vw, 44px)', marginTop: '6px' }}>{greeting},<br/>{name}.</h1>
            </div>

            {/* Чек-ин уровня энергии */}
            <div className="fade-up" style={{ animationDelay: '0.08s', marginTop: '16px', padding: '12px 14px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--stroke)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Заряд сил:</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {energyLevelsList.map(item => (
                        <button key={item.level} onClick={() => handleSelectEnergy(item.level)} title={item.label} style={{ width: '34px', height: '34px', borderRadius: '10px', border: energyLevel === item.level ? '1.5px solid var(--accent)' : '1px solid var(--stroke)', background: energyLevel === item.level ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                            {item.emoji}
                        </button>
                    ))}
                </div>
            </div>

            <div className="fade-up" style={{animationDelay: '0.1s'}}>
                <EnergyRing progress={progress} accentColor={themeData.accent} gradientColor={themeData.halo2} subtitle={gentleMode ? 'БЕРЕЖНЫЙ РИТМ' : 'ЭНЕРГИЯ ДНЯ'} />
            </div>

            <MentorNote userHabits={userHabits} completed={completed} name={name} gentleMode={gentleMode} energyLevel={energyLevel} />

            {/* Панель управления режимом дня: Бережный минимум + SOS */}
            <div className="fade-up" style={{ animationDelay: '0.18s', display: 'flex', gap: '8px', marginTop: '14px', marginBottom: '4px' }}>
                <button onClick={() => toggleGentleMode()} style={{ flex: 1, padding: '10px 12px', borderRadius: '14px', border: gentleMode ? '1px solid var(--accent)' : '1px solid var(--stroke)', background: gentleMode ? 'rgba(255,255,255,0.06)' : 'var(--surface)', color: gentleMode ? 'var(--accent)' : 'var(--text-muted)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.25s' }}>
                    <span>{gentleMode ? '🪶 Бережный минимум: ВКЛ' : '⚡ Режим: Обычный шаг'}</span>
                </button>
                <button onClick={() => { if (window.triggerHaptic) window.triggerHaptic(25); setShowSos(true); }} style={{ padding: '10px 14px', borderRadius: '14px', border: '1px solid var(--stroke)', background: 'var(--surface)', color: 'var(--text)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🧭 Опора</span>
                </button>
            </div>

            {/* Живое всплывающее сообщение от наставника */}
            {toastMessage && (
                <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', borderLeft: '3px solid var(--accent)', color: 'var(--text)', fontSize: '13px', lineHeight: 1.45, animation: 'fadeUp 0.25s ease' }}>
                    {toastMessage}
                </div>
            )}

            <div className="fade-up habits-list" style={{animationDelay: '0.2s'}}>
                {userHabits.map(habit => {
                    const target = gentleMode && habit.minTarget ? habit.minTarget : (habit.target || 1);
                    const currentVal = completed[habit.id] || 0;
                    const isDone = currentVal >= target;
                    const descText = gentleMode ? (habit.minDesc || habit.baseDesc) : habit.baseDesc;
                    let longPressTimer;
                    const handlePressIn = () => { if (habit.type === 'counter') longPressTimer = setTimeout(() => longPressCheckin(habit), 500); };
                    const handlePressOut = () => { if (longPressTimer) clearTimeout(longPressTimer); };

                    return (
                        <div key={habit.id} className={`habit-row ${isDone ? 'completed' : ''}`} onClick={() => toggleCheckin(habit)} onMouseDown={handlePressIn} onMouseUp={handlePressOut} onMouseLeave={handlePressOut} onTouchStart={handlePressIn} onTouchEnd={handlePressOut}>
                            <div className="habit-row-left">
                                <div className="habit-row-icon"><habit.icon /></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span className="habit-row-title">{habit.label}</span>
                                    {descText && (
                                        <span style={{ fontSize: '11px', color: gentleMode ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.2px' }}>
                                            {gentleMode ? `Минимум: ${descText}` : descText}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {habit.type === 'counter' && (
                                    <span style={{ fontSize: '15px', color: isDone ? 'var(--accent)' : 'var(--text-muted)', fontWeight: '600', minWidth: '32px', textAlign: 'right' }}>
                                        {currentVal}/{target}
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
                {hasReflected ? '✓ Вечерняя рефлексия сохранена' : 'Вечерняя рефлексия'}
            </button>
            <div style={{ height: '40px' }}></div>

            {showSos && (
                <SosModal
                    onClose={() => setShowSos(false)}
                    onEnableGentleMode={() => toggleGentleMode(true)}
                />
            )}
        </div>
    );
}

// ───────── ДЕТАЛИ ПРИВЫЧКИ ─────────
function HabitDetailsScreen({ habit, onBack }) {
    const [noteDate, setNoteDate] = useState(null);
    const [noteText, setNoteText] = useState('');
    const freezes = JSON.parse(localStorage.getItem('kairos_freezes') || '[]');
    const days = [];
    let completedDaysCount = 0;

    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const raw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}');
        const isGentle = localStorage.getItem(`kairos_gentle_${dateStr}`) === 'true';
        const target = isGentle && habit.minTarget ? habit.minTarget : (habit.target || 1);
        const isDone = (raw[habit.id] || 0) >= target;
        if (isDone) completedDaysCount++;
        const savedNote = localStorage.getItem(`kairos_note_${dateStr}_${habit.id}`) || '';
        days.push({ date: dateStr, dayNum: d.getDate(), isDone, isFrozen: freezes.includes(dateStr), note: savedNote });
    }

    let realStreak = 0;
    let checkDate = new Date();
    const todayStr = getTodayKey();
    while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        const raw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}');
        const isGentle = localStorage.getItem(`kairos_gentle_${dateStr}`) === 'true';
        const target = isGentle && habit.minTarget ? habit.minTarget : (habit.target || 1);
        if ((raw[habit.id] || 0) >= target || freezes.includes(dateStr)) {
            realStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else if (dateStr === todayStr) {
            checkDate.setDate(checkDate.getDate() - 1);
        } else break;
    }

    const avgPercent = Math.round((completedDaysCount / 30) * 100);
    const openNote = (day) => { setNoteDate(day.date); setNoteText(day.note); };
    const saveNote = () => {
        if (noteDate) {
            localStorage.setItem(`kairos_note_${noteDate}_${habit.id}`, noteText);
            setNoteDate(null);
        }
    };

    return (
        <div className="content">
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ color: 'var(--accent)', width: '32px', height: '32px' }}><habit.icon /></div>
                <h1 className="title" style={{ fontSize: '32px', margin: 0 }}>{habit.label}</h1>
            </div>

            <div className="fade-up" style={{ padding: '12px 14px', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--stroke)', marginBottom: '20px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <div><strong style={{ color: 'var(--text)' }}>Обычный ритм:</strong> {habit.baseDesc}</div>
                <div><strong style={{ color: 'var(--accent)' }}>Бережный минимум:</strong> {habit.minDesc}</div>
            </div>

            <div className="fade-up" style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
                <div style={{ flex: 1, background: 'var(--surface)', padding: '16px', borderRadius: '16px', border: '1px solid var(--stroke)', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontFamily: 'Cormorant Garamond', fontSize: '32px', color: 'var(--accent)' }}>{realStreak}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Дней подряд</span>
                </div>
                <div style={{ flex: 1, background: 'var(--surface)', padding: '16px', borderRadius: '16px', border: '1px solid var(--stroke)', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontFamily: 'Cormorant Garamond', fontSize: '32px', color: 'var(--text)' }}>{avgPercent}%</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>За 30 дней</span>
                </div>
            </div>

            <p className="subtitle fade-up" style={{ marginBottom: '16px' }}>Нажми на день в календаре, чтобы оставить заметку или инсайт:</p>
            <div className="calendar-grid fade-up" style={{ animationDelay: '0.1s', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {days.map(day => (
                    <div key={day.date} className={`calendar-day ${day.isDone ? 'completed' : ''}`} onClick={() => openNote(day)} style={{ border: day.note ? '1.5px dashed var(--accent)' : '' }}>
                        {day.dayNum}
                    </div>
                ))}
            </div>
            <div style={{ flex: 1 }}></div>

            {noteDate && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'flex-end' }} onClick={() => setNoteDate(null)}>
                    <div style={{ background: 'var(--surface)', width: '100%', padding: '24px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', borderTop: '1px solid var(--stroke)', animation: 'fadeUp 0.3s ease' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Заметка за {noteDate}</h3>
                        <textarea className="note-input" placeholder="Что помогло выполнить привычку или что помешало?" value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={3} style={{ width: '100%', backgroundColor: 'var(--bg)', border: '1px solid var(--stroke)', borderRadius: '16px', padding: '16px', color: 'var(--text)', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                            <button className="ghost-btn" onClick={() => setNoteDate(null)} style={{ flex: 1 }}>Отмена</button>
                            <button className="btn-primary" onClick={saveNote} style={{ flex: 1 }}>Сохранить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ───────── ЧЕЛЛЕНДЖИ («ТВОИ ПУТИ») ─────────
function ChallengesScreen({ onNewChallenge, onOpenChallenge }) {
    const [challenges] = useState(getChallenges());
    const allHabits = getAllHabitsList();
    return (
        <div className="content">
            <HeaderLogo />
            <h1 className="title fade-up" style={{ marginTop: '0px', marginBottom: '24px' }}>Твои пути</h1>
            {challenges.length === 0 ? (
                <div className="fade-up" style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)' }}>
                    <p>Пока нет активных челленджей.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {challenges.map((challenge, index) => {
                        const rawDay = getDayOfChallenge(challenge.startDate);
                        const currentDay = Math.min(rawDay, challenge.length);
                        const isCompleted = rawDay > challenge.length;
                        const habit = allHabits.find(h => h.id === challenge.habitId) || allHabits[0];
                        return (
                            <div key={challenge.id} className="challenge-card fade-up" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => onOpenChallenge(challenge)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ color: 'var(--accent)' }}><habit.icon /></div>
                                        <span style={{ fontSize: '18px', fontWeight: '500' }}>{challenge.title}</span>
                                    </div>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{isCompleted ? 'Завершен ✓' : `День ${currentDay} из ${challenge.length}`}</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--stroke)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${Math.min((currentDay / challenge.length) * 100, 100)}%`, background: 'var(--accent)', transition: 'width 0.8s ease' }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                    {[3, 7, 21, 66].map(milestone => {
                                        if (milestone > challenge.length) return null;
                                        const isReached = currentDay >= milestone;
                                        return (
                                            <div key={milestone} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isReached ? 'var(--accent)' : 'var(--stroke)' }}></div>
                                                <span style={{ fontSize: '10px', color: isReached ? 'var(--accent)' : 'var(--text-muted)' }}>{milestone} дн.</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <div style={{ flex: 1, minHeight: '40px' }}></div>
            <button className="btn-primary fade-up" style={{ animationDelay: '0.4s' }} onClick={onNewChallenge}>+ Новый челлендж</button>
            <div style={{ height: '40px' }}></div>
        </div>
    );
}

function ChallengeDetailsScreen({ challenge, onBack, themeData }) {
    const allHabits = getAllHabitsList();
    const habit = allHabits.find(h => h.id === challenge.habitId) || allHabits[0];
    const [freezes, setFreezes] = useState(() => JSON.parse(localStorage.getItem('kairos_freezes') || '[]'));

    const days = [];
    const start = new Date(challenge.startDate);
    let completedCount = 0;
    for (let i = 0; i < challenge.length; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const raw = JSON.parse(localStorage.getItem(`kairos_checkins_${dateStr}`) || '{}');
        const isGentle = localStorage.getItem(`kairos_gentle_${dateStr}`) === 'true';
        const target = isGentle && habit.minTarget ? habit.minTarget : (habit.target || 1);
        const isDone = (raw[challenge.habitId] || 0) >= target || freezes.includes(dateStr);
        if (isDone) completedCount++;
        days.push({ date: dateStr, dayNum: i + 1, completed: isDone, isFuture: d > new Date() });
    }
    const progress = Math.round((completedCount / challenge.length) * 100);

    const handleFreeze = () => {
        if (freezes.includes(getTodayKey())) {
            alert("Заморозка на сегодня уже активирована.");
            return;
        }
        if (freezes.length >= 2) {
            alert("Лимит заморозок (2 из 2) исчерпан. Используйте режим «Бережный минимум» на главном экране!");
            return;
        }
        const updated = [...freezes, getTodayKey()];
        localStorage.setItem('kairos_freezes', JSON.stringify(updated));
        setFreezes(updated);
        alert("❄️ День бережно заморожен! Ваша непрерывная цепочка сохранена.");
    };

    return (
        <div className="content">
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ color: 'var(--accent)' }}><habit.icon /></div>
                <h1 className="title" style={{ fontSize: '32px', margin: 0 }}>{challenge.title}</h1>
            </div>
            <div className="fade-up"><EnergyRing progress={progress} accentColor={themeData.accent} gradientColor={themeData.halo2} subtitle="ПРОГРЕСС ПУТИ" /></div>
            <div className="calendar-grid fade-up" style={{ animationDelay: '0.1s' }}>
                {days.map(day => (
                    <div key={day.date} className={`calendar-day ${day.completed ? 'completed' : ''} ${day.isFuture ? 'future' : ''}`}>{day.dayNum}</div>
                ))}
            </div>
            <div style={{ flex: 1, minHeight: '40px' }}></div>
            <button onClick={handleFreeze} className="ghost-btn fade-up" style={{ animationDelay: '0.2s', marginBottom: '16px' }}>
                ❄️ Использовать заморозку ({2 - freezes.length} осталось)
            </button>
            <button className="btn-primary fade-up" style={{ animationDelay: '0.3s' }} onClick={onBack}>Вернуться</button>
        </div>
    );
}

function NewChallengeScreen({ onBack, onCreated }) {
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [length, setLength] = useState(21);
    const allHabits = getAllHabitsList();
    const userHabitsIds = JSON.parse(localStorage.getItem('kairos_habits') || '[]');
    const userHabits = allHabits.filter(h => userHabitsIds.includes(h.id));

    const handleCreate = () => {
        if (!selectedHabit) return;
        const habit = allHabits.find(h => h.id === selectedHabit);
        const challenges = getChallenges();
        challenges.push({ id: Date.now().toString(), habitId: selectedHabit, title: habit.label, startDate: getTodayKey(), length: length });
        saveChallenges(challenges);
        onCreated();
    };

    return (
        <div className="content">
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button>
            <h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Новый<br/>челлендж</h1>
            <p className="subtitle fade-up" style={{animationDelay: '0.1s', marginTop: '24px', marginBottom: '16px'}}>Выбери привычку:</p>
            <div className="habits-grid fade-up" style={{animationDelay: '0.15s'}}>
                {userHabits.map(habit => (
                    <div key={habit.id} className={`habit-card ${selectedHabit === habit.id ? 'selected' : ''}`} onClick={() => setSelectedHabit(habit.id)}>
                        <div className="habit-icon"><habit.icon /></div>
                        <span className="habit-label">{habit.label}</span>
                    </div>
                ))}
            </div>
            <p className="subtitle fade-up" style={{animationDelay: '0.2s', marginTop: '32px', marginBottom: '16px'}}>Длительность цикла:</p>
            <div className="fade-up" style={{animationDelay: '0.25s', display: 'flex', gap: '12px'}}>
                {[7, 21, 66].map(days => (
                    <button key={days} onClick={() => setLength(days)} style={{ flex: 1, height: '48px', borderRadius: '12px', background: length === days ? 'var(--accent)' : 'var(--surface)', color: length === days ? '#0B0D10' : 'var(--text)', border: '1px solid', borderColor: length === days ? 'var(--accent)' : 'var(--stroke)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>{days} дней</button>
                ))}
            </div>
            <div style={{ flex: 1, minHeight: '40px' }}></div>
            <button className="btn-primary fade-up" style={{ animationDelay: '0.3s', opacity: selectedHabit ? 1 : 0.4 }} onClick={handleCreate} disabled={!selectedHabit}>Начать цикл</button>
        </div>
    );
}

// ───────── ВЕЧЕРНЯЯ РЕФЛЕКСИЯ ─────────
function ReflectionScreen({ onSave, onBack }) {
    const todayKey = getTodayKey();
    const savedData = JSON.parse(localStorage.getItem(`kairos_reflection_${todayKey}`) || '{}');
    const [mood, setMood] = useState(savedData.mood || 0);
    const [note, setNote] = useState(savedData.note || '');
    const [gratitude, setGratitude] = useState(savedData.gratitude || '');

    const handleSave = () => {
        if (mood === 0) return;
        if (window.triggerHaptic) window.triggerHaptic([30, 50, 30]);
        localStorage.setItem(`kairos_reflection_${todayKey}`, JSON.stringify({ mood, note, gratitude }));
        onSave();
    };

    return (
        <div className="content">
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', outline: 'none' }}>← Назад</button>
            <HeaderLogo />
            <h1 className="title fade-up" style={{ fontSize: 'clamp(32px, 9vw, 44px)' }}>Итоги дня<br/>без критики</h1>
            <div className="fade-up" style={{animationDelay: '0.1s', marginTop: '28px'}}>
                <div className="mood-grid">
                    {[1, 2, 3, 4, 5].map(value => (
                        <div key={value} className={`mood-circle ${mood === value ? 'selected' : ''}`} onClick={() => setMood(value)}></div>
                    ))}
                </div>
                <div className="mood-label" style={{ opacity: mood > 0 ? 1 : 0 }}>{MOOD_LABELS[mood] || ''}</div>
            </div>

            <div className="fade-up" style={{animationDelay: '0.15s', marginTop: '16px'}}>
                <label style={{ fontSize: '12px', color: 'var(--accent)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>За какой шаг сегодня ты благодарен себе?</label>
                <input type="text" placeholder="Даже самое маленькое усилие..." value={gratitude} onChange={(e) => setGratitude(e.target.value)} style={{ width: '100%', backgroundColor: 'var(--surface)', border: '1px solid var(--stroke)', borderRadius: '14px', padding: '14px 16px', color: 'var(--text)', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div className="fade-up" style={{animationDelay: '0.2s', marginTop: '14px'}}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Мысли и наблюдения дня:</label>
                <textarea className="note-input" placeholder="Что наполнило энергией, а что забрало силы?" value={note} onChange={(e) => setNote(e.target.value)} rows={3} style={{ width: '100%', backgroundColor: 'var(--surface)', border: '1px solid var(--stroke)', borderRadius: '16px', padding: '16px', color: 'var(--text)', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box', WebkitAppearance: 'none' }} />
            </div>
            <div style={{ flex: 1, minHeight: '40px' }}></div>
            <button className="btn-primary" style={{ opacity: mood > 0 ? 1 : 0.4 }} onClick={handleSave} disabled={mood === 0}>Сохранить и отпустить день</button>
        </div>
    );
}

// ───────── ПРОФИЛЬ И НАСТРОЙКИ ─────────
function ProfileScreen({ name, theme, setTheme, onEditHabits }) {
    const [notifPermission, setNotifPermission] = useState('default');
    const fileInputRef = useRef(null);
    const stats = calculateStats();
    const initial = name ? name.charAt(0).toUpperCase() : 'K';
    const why = localStorage.getItem('kairos_why') || '';

    useEffect(() => {
        if ('Notification' in window) setNotifPermission(Notification.permission);
    }, []);

    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            alert('Ваш браузер не поддерживает системные уведомления.');
            return;
        }
        const permission = await Notification.requestPermission();
        setNotifPermission(permission);
        if (permission === 'granted') {
            alert(`Отлично! Наставник напомнит вам о ритуале в ${localStorage.getItem('kairos_time') || '09:00'}.`);
        } else {
            alert('Уведомления отключены. Вы всегда можете включить их в настройках браузера.');
        }
    };

    const handleExport = () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('kairos_')) data[key] = localStorage.getItem(key);
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kairos_backup_${getTodayKey()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportFile = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                Object.keys(imported).forEach(k => {
                    if (k.startsWith('kairos_')) localStorage.setItem(k, imported[k]);
                });
                alert('Прогресс успешно восстановлен!');
                window.location.reload();
            } catch (err) {
                alert('Ошибка чтения файла резервной копии.');
            }
        };
        reader.readAsText(file);
    };

    const handleReset = () => {
        if (window.confirm("Вы уверены? Это удалит все ваши привычки, челленджи и историю. Действие необратимо.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="content">
            <HeaderLogo />
            <div className="fade-up profile-header">
                <div className="avatar">{initial}</div>
                <h1 className="title" style={{ fontSize: '32px', marginTop: '16px' }}>{name}</h1>
                {why && (
                    <p style={{ fontSize: '14px', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'center', maxWidth: '280px' }}>
                        «{why}»
                    </p>
                )}
            </div>

            <div className="fade-up stats-grid" style={{ animationDelay: '0.1s' }}>
                <div className="stat-item"><span className="stat-value">{stats.currentStreak}</span><span className="stat-label">Стрик</span></div>
                <div className="stat-item"><span className="stat-value">{stats.totalCheckins}</span><span className="stat-label">Шагов</span></div>
                <div className="stat-item"><span className="stat-value">{stats.completedChallenges}</span><span className="stat-label">Путей</span></div>
            </div>

            <div className="fade-up settings-list" style={{ animationDelay: '0.2s' }}>
                <div className="settings-header">Настройки пространства</div>

                <div className="settings-row" style={{ cursor: 'default' }}>
                    <span>Атмосфера (Тема)</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {Object.keys(window.KAIROS_THEMES).map(key => (
                            <div key={key} title={window.KAIROS_THEMES[key].label || key} onClick={() => setTheme(key)} style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: window.KAIROS_THEMES[key].accent, border: theme === key ? '2px solid white' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }} />
                        ))}
                    </div>
                </div>

                <div className="settings-row" onClick={onEditHabits}>
                    <span>Изменить привычки и смысл «Зачем»</span>
                    <span style={{ color: 'var(--accent)' }}>Настроить ›</span>
                </div>

                <div className="settings-row" onClick={requestNotificationPermission}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }}><Icons.Bell /></div>
                        <span>Напоминания ({localStorage.getItem('kairos_time') || '09:00'})</span>
                    </div>
                    <span style={{ color: notifPermission === 'granted' ? 'var(--accent)' : 'var(--text-muted)' }}>
                        {notifPermission === 'granted' ? 'Включены' : 'Включить'}
                    </span>
                </div>

                <div className="settings-row" onClick={handleExport}>
                    <span>Сохранить резервную копию</span>
                    <span style={{ color: 'var(--text-muted)' }}>Экспорт JSON ↓</span>
                </div>

                <div className="settings-row" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                    <span>Восстановить из копии</span>
                    <span style={{ color: 'var(--text-muted)' }}>Импорт JSON ↑</span>
                </div>
                <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImportFile} />

                <div className="settings-row" onClick={() => alert("Kairos v2.0 · Авторское приложение\nФилософия благоприятного момента: ритуал, бережная дисциплина и живое присутствие.")}>
                    <span>О философии Kairos</span>
                    <span style={{ color: 'var(--text-muted)' }}>v2.0</span>
                </div>

                <div className="settings-row" onClick={handleReset} style={{ color: '#FF7A59', marginTop: '16px' }}>
                    <span>Сбросить прогресс и начать заново</span>
                </div>
            </div>
            <div style={{ height: '100px' }}></div>
        </div>
    );
}

function BottomNav({ activeTab, setTab }) {
    const tabs = [{ id: 'today', icon: '◐' }, { id: 'challenges', icon: '◇' }, { id: 'profile', icon: '◯' }];
    return (
        <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', padding: '8px', background: 'rgba(19, 22, 27, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid var(--stroke)', borderRadius: '99px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 20 }}>
            {tabs.map(tab => (
                <button key={tab.id} onClick={() => { if (window.triggerHaptic) window.triggerHaptic(15); setTab(tab.id); }} style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', cursor: 'pointer', transition: 'all 0.3s ease', background: activeTab === tab.id ? 'var(--accent)' : 'transparent', color: activeTab === tab.id ? '#0B0D10' : 'var(--text-muted)', border: 'none' }}>
                    {tab.icon}
                </button>
            ))}
        </div>
    );
}

// ───────── КОРНЕВОЙ КОМПОНЕНТ APP ─────────
function App() {
    const themeKeys = Object.keys(window.KAIROS_THEMES || { aurora: {} });
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('kairos_theme');
        return (saved && window.KAIROS_THEMES[saved]) ? saved : (window.KAIROS_THEMES.gold ? 'gold' : themeKeys[0]);
    });
    const [step, setStep] = useState(() => localStorage.getItem('kairos_onboarded') ? 'today' : 'welcome');
    const [name, setName] = useState(() => localStorage.getItem('kairos_name') || '');
    const [activeTab, setActiveTab] = useState('today');
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const themeData = window.KAIROS_THEMES[theme] || Object.values(window.KAIROS_THEMES)[0];

    const cycleNextTheme = () => {
        if (window.triggerHaptic) window.triggerHaptic(20);
        const idx = themeKeys.indexOf(theme);
        const nextKey = themeKeys[(idx + 1) % themeKeys.length];
        setTheme(nextKey);
    };

    useEffect(() => {
        if (!themeData) return;
        const root = document.documentElement;
        root.style.setProperty('--accent', themeData.accent);
        root.style.setProperty('--accent-glow', themeData.glow);
        root.style.setProperty('--halo-1', themeData.halo1);
        root.style.setProperty('--halo-2', themeData.halo2);
        localStorage.setItem('kairos_theme', theme);
    }, [theme, themeData]);

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
                    new Notification('Kairos · Момент настал', {
                        body: `${localStorage.getItem('kairos_name') || 'Друг'}, время для твоего ритуала. Один осознанный шаг сегодня.`,
                        icon: './icon-192.png'
                    });
                    localStorage.setItem('kairos_last_notified', today);
                }
            }
        }, 30000);
        return () => clearInterval(checkTime);
    }, []);

    return (
        <div className="screen">
            <InstallPrompt />
            <div className="halo-container"><div className="halo-1"></div><div className="halo-2"></div></div>

            {step !== 'today' && step !== 'reflection' && step !== 'new-challenge' && step !== 'challenge-details' && step !== 'habit-details' && step !== 'edit-habits' && (
                <div className="theme-switcher">
                    {themeKeys.map(key => (
                        <div key={key} className={`theme-dot ${theme === key ? 'active' : ''}`} style={{ backgroundColor: window.KAIROS_THEMES[key].accent }} onClick={() => setTheme(key)} />
                    ))}
                </div>
            )}

            {step === 'welcome' && <WelcomeScreen onStart={() => setStep('name')} />}
            {step === 'name' && <NameScreen onNext={() => { setName(localStorage.getItem('kairos_name')); setStep('habits'); }} />}
            {step === 'habits' && <HabitsScreen name={name} onNext={() => setStep('reminder')} />}
            {step === 'edit-habits' && <HabitsScreen name={name} isEditMode={true} onNext={() => setStep('today')} />}
            {step === 'reminder' && <ReminderScreen name={name} onFinish={() => setStep('today')} />}

            {step === 'today' && (
                <>
                    <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 10 }}>
                        <button onClick={cycleNextTheme} title="Сменить атмосферу" style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--accent)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            ◐
                        </button>
                    </div>
                    {activeTab === 'today' && <TodayScreen name={name} themeData={themeData} onReflect={() => setStep('reflection')} onOpenHabit={(h) => { setSelectedHabit(h); setStep('habit-details'); }} />}
                    {activeTab === 'challenges' && <ChallengesScreen onNewChallenge={() => setStep('new-challenge')} onOpenChallenge={(c) => { setSelectedChallenge(c); setStep('challenge-details'); }} />}
                    {activeTab === 'profile' && <ProfileScreen name={name} theme={theme} setTheme={setTheme} onEditHabits={() => setStep('edit-habits')} />}
                    <div className="nav-gradient"></div>
                    <BottomNav activeTab={activeTab} setTab={setActiveTab} />
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
