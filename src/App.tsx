import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useParams,
  useLocation
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  Zap, 
  MapPin, 
  BarChart3, 
  Users, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Mail,
  Building2,
  User,
  Check,
  FileText,
  CreditCard,
  Lock,
  ArrowLeft,
  ShoppingBag,
  CheckCircle
} from 'lucide-react';

// --- Components ---

const VERSION = "0.3.0";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="absolute top-2 right-4 text-[10px] text-slate-400 font-mono pointer-events-none">
      v{VERSION}
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#007F84] rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">AURA</span>
        </div>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link to="/#wyceny" className="hover:text-[#007F84] transition-colors">Rodzaje wycen</Link>
        <Link to="/#funkcje" className="hover:text-[#007F84] transition-colors">Funkcjonalności</Link>
        <Link to="/#o-nas" className="hover:text-[#007F84] transition-colors">O PropTech Solutions</Link>
        <Link 
          to="/kup-pakiet" 
          className="bg-[#007F84] text-white px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-all shadow-md shadow-[#007F84]/20 flex items-center gap-2"
        >
          <ShoppingBag size={16} />
          Kup pakiet wycen
        </Link>
        <a 
          href="#demo" 
          className="bg-[#EA7A61] text-white px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-all shadow-md shadow-[#EA7A61]/20"
        >
          Zamów demo
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    comment: '', 
    marketingConsent: false 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="demo" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FDF2F0] -z-10 hidden lg:block" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-[#007F84] leading-tight mb-6">
              Zoptymalizuj proces wyceny nieruchomości w swojej organizacji.
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Poznaj AURA by PropTech Solutions – innowacyjny System Analizy i Raportowania Aktywów. 
              Zlecaj wyceny automatyczne, monitoringi i operaty szacunkowe w jednym, 
              bezpiecznym środowisku, bez konieczności integracji IT.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: TrendingDown, text: "Redukcja kosztów" },
                { icon: Clock, text: "Oszczędność czasu" },
                { icon: Zap, text: "Usprawnienie procesów" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#007F84]/10 flex items-center justify-center">
                    <item.icon size={14} className="text-[#007F84]" />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 relative"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Dziękujemy!</h3>
                  <p className="text-slate-600">Twoje zgłoszenie zostało wysłane. Skontaktujemy się z Tobą wkrótce.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-[#007F84] font-medium hover:underline"
                  >
                    Wyślij kolejne zgłoszenie
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Zamów bezpłatne demo systemu</h2>
                    <p className="text-slate-500 text-sm">Zostaw swoje dane, a nasz ekspert przygotuje prezentację.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="Imię i nazwisko" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#EA7A61]/20 focus:border-[#EA7A61] outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="email" 
                        placeholder="Służbowy adres e-mail" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#EA7A61]/20 focus:border-[#EA7A61] outline-none transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Nazwa firmy (opcjonalnie)" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#EA7A61]/20 focus:border-[#EA7A61] outline-none transition-all"
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <textarea 
                        placeholder="Twoje pytanie / komentarz" 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#EA7A61]/20 focus:border-[#EA7A61] outline-none transition-all min-h-[100px] resize-none"
                        value={formData.comment}
                        onChange={e => setFormData({...formData, comment: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-[#EA7A61] focus:ring-[#EA7A61]"
                        checked={formData.marketingConsent}
                        onChange={e => setFormData({...formData, marketingConsent: e.target.checked})}
                      />
                      <span className="text-[11px] text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                        Chcę otrzymywać treści o charakterze marketingowym drogą e-mail od PropTech Solutions Sp. z o.o. z siedzibą w Warszawie. Mam świadomość, że mogę zrezygnować z subskrypcji w każdej chwili. Więcej informacji o przetwarzaniu moich danych dostępnych jest w <a href="#" className="underline font-bold">Polityce prywatności</a>.
                      </span>
                    </label>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Wypełnienie i przesłanie wiadomości wraz z podanymi danymi osobowymi stanowi zgodę na przetwarzanie Twoich danych osobowych przez PropTech Solutions Sp. z o.o. z siedzibą w Warszawie w celu udzielenia odpowiedzi na Twoje pytanie, przedstawienia oferty. Przesyłając wiadomość potwierdzasz, że masz świadomość możliwości wycofania zgody w dowolnym momencie. Wszelkie dodatkowe informacje o przetwarzaniu Twoich danych dostępne są w <a href="#" className="underline font-bold">Polityce prywatności</a>.
                    </p>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-[#EA7A61] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#EA7A61]/30 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {status === 'loading' ? 'Wysyłanie...' : 'Zamów demo'}
                    <ChevronRight size={20} />
                  </button>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    Wysyłając formularz, akceptujesz <a href="#" className="underline">Politykę Prywatności</a>. 
                    Twoje dane są bezpieczne i zostaną wykorzystane wyłącznie w celu umówienia prezentacji.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const banks = [
    { name: "Bank Horyzont", color: "text-blue-600" },
    { name: "Silesia Trust", color: "text-emerald-600" },
    { name: "Vistula Capital", color: "text-indigo-900" },
    { name: "Nordic Baltic Bank", color: "text-sky-500" },
    { name: "Polski Bank Rozwoju", color: "text-red-600" }
  ];

  return (
    <section className="bg-[#E6F3F3] py-12 border-y border-[#007F84]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <p className="text-[#007F84] font-semibold text-center md:text-left max-w-xs">
            Zaufali nam liderzy. Z rozwiązań PropTech Solutions korzysta 19 z 20 największych banków w Polsce.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {banks.map((bank, i) => (
              <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0">
                <Building2 className={`w-6 h-6 ${bank.color}`} />
                <span className={`font-bold tracking-tighter text-lg ${bank.color}`}>{bank.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ValuationTypes = () => {
  const types = [
    {
      title: "Wycena Automatyczna (AVM)",
      desc: "Natychmiastowe oszacowanie wartości lokali mieszkalnych (wynik natychmiast).",
      icon: Zap,
      color: "bg-[#048EC2]",
      pdf: "https://aura-system.pl/docs/raport_przyklad.pdf"
    },
    {
      title: "Monitoring",
      desc: "Wycena częściowo zautomatyzowana, weryfikowana przez analityka (realizacja: 1-2 dni).",
      icon: BarChart3,
      color: "bg-[#007F84]",
      pdf: "https://aura-system.pl/docs/monitoring_przyklad.pdf"
    },
    {
      title: "Ekspertyza",
      desc: "Dokument dostosowany do potrzeb Klienta, charakteryzujący nieruchomość (realizacja: kilka dni).",
      icon: FileText,
      color: "bg-[#33999D]",
      pdf: "https://aura-system.pl/docs/ekspertyza_przyklad.pdf"
    },
    {
      title: "Operat Szacunkowy",
      desc: "Pełna wycena zgodna z obowiązującymi standardami prawa (realizacja: kilka dni).",
      icon: ShieldCheck,
      color: "bg-slate-800",
      pdf: "https://aura-system.pl/docs/operat_przyklad.pdf"
    }
  ];

  return (
    <section id="wyceny" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#007F84] mb-4">Jeden system, pełne spektrum wycen.</h2>
          <div className="w-20 h-1 bg-[#EA7A61] mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {types.map((type, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl ${type.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-slate-200`}>
                <type.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#007F84] transition-colors">{type.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{type.desc}</p>
              <a 
                href={type.pdf} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#EA7A61] hover:underline"
              >
                <FileText size={16} />
                Zobacz przykład (PDF)
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      id: "automatyzacja",
      title: "Pełna automatyzacja procesów wyceny",
      desc: "Zautomatyzuj powtarzalne czynności i skróć czas oczekiwania na wycenę z dni do sekund dzięki algorytmom AVM.",
      image: "https://picsum.photos/seed/aura-dashboard/800/600",
      icon: Zap
    },
    {
      id: "analityka",
      title: "Zaawansowana analityka i raportowanie",
      desc: "Generuj szczegółowe raporty rynkowe i analizy porównawcze oparte o największą bazę transakcji w Polsce.",
      image: "https://picsum.photos/seed/data/800/600",
      icon: BarChart3
    },
    {
      id: "bezpieczenstwo",
      title: "Bezpieczna integracja z systemami bankowymi",
      desc: "System AURA spełnia najwyższe standardy bezpieczeństwa bankowego i pozwala na łatwą integrację przez API.",
      image: "https://picsum.photos/seed/security/800/600",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="funkcje" className="py-24 bg-[#FDF3D8]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#007F84] mb-4">Zaprojektowany z myślą o efektywności.</h2>
          <div className="w-20 h-1 bg-[#EA7A61] mx-auto rounded-full" />
        </div>
        <div className="space-y-32">
          {features.map((f, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007F84]/10 text-[#007F84] text-sm font-bold mb-6">
                  <f.icon size={16} />
                  Funkcjonalność
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{f.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">{f.desc}</p>
                <Link 
                  to={`/funkcja/${f.id}`}
                  className="text-[#007F84] font-bold flex items-center gap-2 hover:gap-4 transition-all group"
                >
                  Dowiedz się więcej <ArrowRight size={20} className="group-hover:text-[#EA7A61] transition-colors" />
                </Link>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-[#007F84]/5 rounded-3xl rotate-3 -z-10" />
                <img 
                  src={f.image} 
                  alt={f.title} 
                  className="rounded-3xl shadow-2xl border border-white/50 w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const [counts, setCounts] = useState({ transactions: 0, cities: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        transactions: prev.transactions < 9.5 ? +(prev.transactions + 0.1).toFixed(1) : 9.5,
        cities: prev.cities < 82 ? prev.cities + 2 : 82
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="o-nas" className="bg-[#007F84] py-24 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/20 h-full" />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">PropTech Solutions to autorskie rozwiązania IT i narzędzia oparte o machine-learning.</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Nasi eksperci dostarczają wiedzę dla sektora finansowego, dbając o zgodność z nowymi regulacjami, 
              takimi jak CRR3, Rekomendacja S KNF oraz wytyczne ESG.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-bold text-[#F6C43C] mb-2">~{counts.transactions} mln</div>
                <p className="text-sm text-white/60 uppercase tracking-wider font-medium">Transakcji w bazie danych</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#F6C43C] mb-2">{counts.cities}</div>
                <p className="text-sm text-white/60 uppercase tracking-wider font-medium">Obsługiwane miejscowości AVM</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://picsum.photos/seed/office/800/600?grayscale" 
              alt="PropTech Solutions Office" 
              className="rounded-3xl mix-blend-overlay opacity-50"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BottomCTA = () => (
  <section className="py-24 bg-white text-center">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Gotowy na usprawnienie wycen w Twojej firmie?</h2>
      <p className="text-slate-600 text-lg mb-10">Dołącz do liderów rynku i zacznij korzystać z najbardziej zaawansowanego systemu wycen w Polsce.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="#demo" 
          className="inline-flex items-center gap-3 bg-[#EA7A61] text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-[#EA7A61]/30"
        >
          Przetestuj AURA już dziś
          <ArrowRight size={24} />
        </a>
        <Link 
          to="/kup-pakiet" 
          className="inline-flex items-center gap-3 bg-[#007F84] text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-[#007F84]/30"
        >
          Kup pakiet wycen
          <ShoppingBag size={24} />
        </Link>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#007F84] rounded flex items-center justify-center text-white font-bold text-xs">A</div>
              <span className="text-lg font-bold text-slate-800 tracking-tight">AURA</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Lider analityki rynku nieruchomości w Polsce. Partner merytoryczny innowacyjnych rozwiązań PropTech.
          </p>
          <a 
            href="https://aura-system.pl/demo/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#007F84] mt-6 hover:underline"
          >
            AURA na aura-system.pl <ArrowRight size={12} />
          </a>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Kontakt</h4>
          <address className="text-slate-500 text-sm not-italic space-y-2">
            <p>PropTech Solutions Sp. z o.o.</p>
            <p>ul. Innowacyjna 12</p>
            <p>00-001 Warszawa</p>
            <p className="pt-2 font-medium text-[#007F84]">kontakt@aura-system.pl</p>
          </address>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
          <ul className="text-slate-500 text-sm space-y-3">
            <li><a href="#" className="hover:text-[#007F84] transition-colors">Regulamin systemu</a></li>
            <li><a href="#" className="hover:text-[#007F84] transition-colors">Polityka prywatności</a></li>
            <li><a href="#" className="hover:text-[#007F84] transition-colors">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-xs">© {new Date().getFullYear()} PropTech Solutions Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
        <div className="flex gap-6 text-slate-400 text-xs">
          <span>NIP: 1234567890</span>
          <span>REGON: 987654321</span>
        </div>
      </div>
    </div>
  </footer>
);

const CookieBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100]">
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex flex-col gap-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          Używamy plików cookies, aby zapewnić najlepszą jakość korzystania z naszej strony. 
          Kontynuując przeglądanie, akceptujesz naszą politykę cookies.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => setVisible(false)}
            className="flex-1 bg-[#007F84] text-white py-2 rounded-lg text-sm font-bold"
          >
            Akceptuję
          </button>
          <button 
            onClick={() => setVisible(false)}
            className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg text-sm font-bold"
          >
            Ustawienia
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Subpages ---

const FeaturePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const features: Record<string, any> = {
    "automatyzacja": {
      title: "Pełna automatyzacja procesów wyceny",
      content: "Nasze algorytmy AVM (Automated Valuation Model) wykorzystują zaawansowane modele statystyczne i machine learning do błyskawicznego szacowania wartości nieruchomości. Dzięki temu banki i instytucje finansowe mogą podejmować decyzje kredytowe niemal w czasie rzeczywistym, eliminując błędy ludzkie i drastycznie obniżając koszty operacyjne.",
      benefits: ["Wynik w mniej niż 1 sekundę", "Zgodność z wytycznymi EBA", "Najwyższa precyzja na rynku"],
      icon: Zap
    },
    "analityka": {
      title: "Zaawansowana analityka i raportowanie",
      content: "Dostęp do największej w Polsce bazy transakcji cenowych pozwala na tworzenie raportów o niespotykanej dotąd głębi. Analizujemy trendy lokalne, płynność rynku oraz ryzyka związane z lokalizacją. Nasze dashboardy menedżerskie pozwalają na monitorowanie portfela zabezpieczeń w sposób ciągły i przejrzysty.",
      benefits: ["Dane z aktów notarialnych", "Analiza trendów historycznych", "Eksport do wielu formatów"],
      icon: BarChart3
    },
    "bezpieczenstwo": {
      title: "Bezpieczna integracja z systemami bankowymi",
      content: "Bezpieczeństwo danych jest naszym priorytetem. System AURA jest regularnie audytowany i spełnia rygorystyczne wymagania sektora bankowego. Oferujemy gotowe konektory API oraz wsparcie w procesie integracji z systemami typu Core Banking, co pozwala na płynny przepływ danych bez kompromisów w zakresie ochrony informacji.",
      benefits: ["Szyfrowanie TLS 1.3", "Zgodność z RODO i ISO 27001", "Dedykowane środowiska testowe"],
      icon: ShieldCheck
    }
  };

  const feature = features[id || ""] || features["automatyzacja"];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#007F84] font-bold mb-12 hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} /> Wróć do strony głównej
        </button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="w-16 h-16 bg-[#007F84]/10 rounded-2xl flex items-center justify-center text-[#007F84] mb-8">
            <feature.icon size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">{feature.title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10">{feature.content}</p>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {feature.benefits.map((b: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 className="text-[#EA7A61]" size={20} />
                {b}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PricingPage = () => {
  const navigate = useNavigate();
  const packages = [
    {
      name: "Starter",
      price: "990",
      count: "10 wycen",
      features: ["Wyceny AVM", "Dostęp 24/7", "Wsparcie e-mail"],
      color: "bg-slate-100"
    },
    {
      name: "Professional",
      price: "2490",
      count: "30 wycen",
      features: ["Wyceny AVM", "Monitoringi", "Priorytetowe wsparcie", "Dostęp API"],
      color: "bg-[#007F84] text-white",
      popular: true
    },
    {
      name: "Enterprise",
      price: "7900",
      count: "100 wycen",
      features: ["Wszystkie rodzaje wycen", "Dedykowany opiekun", "SLA 99.9%", "Pełna analityka"],
      color: "bg-slate-900 text-white"
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Wybierz pakiet wycen dla swojej firmy</h1>
          <p className="text-slate-600 text-lg">Przejrzyste zasady, brak ukrytych kosztów.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`p-10 rounded-3xl shadow-xl flex flex-col h-full relative ${pkg.color}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EA7A61] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Najpopularniejszy
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="text-4xl font-bold mb-6">{pkg.price} PLN <span className="text-sm font-normal opacity-60">netto</span></div>
              <div className="text-lg font-bold mb-8">{pkg.count}</div>
              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm opacity-90">
                    <Check size={16} /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/checkout', { state: { package: pkg } })}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${pkg.popular ? 'bg-white text-[#007F84]' : 'bg-[#EA7A61] text-white'}`}
              >
                Wybierz pakiet
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pkg = location.state?.package || { name: "Professional", price: "2490" };
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/thank-you');
    }, 2500);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">Dane do faktury</h1>
            <div className="space-y-4">
              <input type="text" placeholder="Nazwa firmy" className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#007F84]/20" />
              <input type="text" placeholder="NIP" className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#007F84]/20" />
              <input type="email" placeholder="E-mail do faktury" className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#007F84]/20" />
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Podsumowanie zamówienia</h2>
            <div className="flex justify-between items-center py-4 border-b border-slate-100">
              <span className="text-slate-600">Pakiet: {pkg.name}</span>
              <span className="font-bold">{pkg.price} PLN</span>
            </div>
            <div className="flex justify-between items-center py-4 text-xl font-bold">
              <span>Suma (netto):</span>
              <span>{pkg.price} PLN</span>
            </div>
            
            <div className="pt-6">
              <button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#007F84] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                    Przekierowanie do Tpay...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Zapłać z Tpay
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
                <img src="https://tpay.com/img/logo/tpay-logo.svg" alt="Tpay" className="h-6" referrerPolicy="no-referrer" />
                <Lock size={16} />
                <span className="text-xs font-bold">Bezpieczna płatność</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThankYouPage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-slate-100"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Płatność udana!</h1>
        <p className="text-slate-600 mb-10 leading-relaxed">
          Dziękujemy za zakup pakietu wycen. Faktura oraz dane dostępowe do systemu zostały wysłane na Twój adres e-mail.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#EA7A61] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all"
        >
          Wróć do strony głównej
        </button>
      </motion.div>
    </div>
  );
};

// --- Main App ---

const HomePage = () => (
  <main>
    <Hero />
    <SocialProof />
    <ValuationTypes />
    <Features />
    <Stats />
    <BottomCTA />
  </main>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-[#EA7A61]/20 selection:text-[#EA7A61]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/funkcja/:id" element={<FeaturePage />} />
          <Route path="/kup-pakiet" element={<PricingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}
