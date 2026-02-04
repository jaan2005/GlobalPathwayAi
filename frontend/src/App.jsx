import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, Sun, Moon, ArrowRight, Loader2,
  BookOpen, GraduationCap,
  BrainCircuit, TrendingUp, Coins, Landmark, CheckCircle2, Smile,
  Shield, Zap, AlertTriangle
} from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const [strategies, setStrategies] = useState(null);
  const [aiNote, setAiNote] = useState("");

  const resultRef = useRef(null);

  const [formData, setFormData] = useState({
    current_degree: '',
    gpa: '',
    major: '',
    budget_max: 5000000,
    priority_goal: 'High ROI',
    funding_source: '', 
  });

  // --- Typewriter Effect ---
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const phrases = ["Your Dream.", "Our Concern."];
  
  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];
    
    const timer = setTimeout(() => {
      setDisplayText(prev => isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1));
      
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, isDeleting ? 40 : 120);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]);

  // --- GPA Input Validation ---
  const handleGPAChange = (e) => {
    let value = e.target.value;
    // Prevent typing more than 4 characters
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    // Clamp to 0-10
    let numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      numValue = Math.min(10, Math.max(0, numValue));
      value = numValue.toString();
    }
    setFormData({...formData, gpa: value});
  };

  // --- REAL BACKEND CONNECTION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);

    try {
      const payload = {
        degree: formData.current_degree || "Bachelors",
        gpa: parseFloat(formData.gpa) || 0,
        major: formData.major || "General",
        budget: formData.budget_max / 100000, 
        priority: formData.priority_goal,
        funding_source: formData.funding_source
      };

      const response = await axios.post('http://localhost:8000/api/recommend', payload);

      if (response.data.status === 'success') {
         setStrategies(response.data.strategies);
         setAiNote(response.data.consultant_note);
         
         setIsLoading(false);
         setShowResult(true);
         setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Backend Offline! Make sure uvicorn is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 font-sans relative overflow-hidden ${isDark ? 'bg-[#0a0f1d] text-[#e0e7ff]' : 'bg-[#f4f7f5] text-[#334155]'}`}>
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.07]">
        <div className="absolute top-20 left-10 rotate-12"><GraduationCap size={120} /></div>
        <div className="absolute top-1/2 left-[5%] -rotate-12"><BookOpen size={80} /></div>
        <div className="absolute top-40 right-20 -rotate-12"><Globe size={140} /></div>
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full opacity-50 transition-colors duration-1000 ${isDark ? 'bg-gradient-to-br from-[#0a0f1d] via-[#1e293b] to-[#0f172a]' : 'bg-gradient-to-br from-[#e8f0ed] via-[#f4f7f5] to-[#e0e7ff]'}`}></div>
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-xl transition-all ${isDark ? 'border-white/5 bg-black/40' : 'border-black/5 bg-white/60'}`}>
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#6b8e81] to-[#5a7d9a] rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">global pathway<span className="text-[#6b8e81]">.ai</span></span>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-black/5">
                {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-[#2c3e50]" />}
             </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-48 pb-32">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-serif italic mb-2 leading-tight text-[#2c3e50] min-h-[1.2em]">
            <span className={isDark ? 'text-[#e0e7ff]' : 'text-[#2c3e50]'}>{displayText}</span>
            <span className="inline-block w-1.5 h-10 md:h-20 bg-[#6b8e81] ml-3 animate-pulse align-middle"></span>
          </h1>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-2">Discovery Mode - We Find Countries For You</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN */}
          <div className={`lg:col-span-8 p-12 rounded-[3.5rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#d1dbd6] shadow-xl shadow-emerald-100/20'}`}>
            <div className="space-y-16">
               <FormSection title="Academic Metrics" color="#6b8e81">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[#6b8e81]">Current Degree</label>
                      <select className={`serif-input ${isDark ? 'text-white' : ''}`} value={formData.current_degree} onChange={(e) => setFormData({...formData, current_degree: e.target.value})}>
                        <option value="" className="text-black">Choose Level</option>
                        <option value="Bachelors" className="text-black">Bachelors</option>
                        <option value="Masters" className="text-black">Masters</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[#6b8e81]">GPA Score (0-10)</label>
                      <input 
                        type="number" 
                        placeholder="8.5" 
                        min="0" 
                        max="10" 
                        step="0.1"
                        className={`serif-input ${isDark ? 'text-white placeholder:text-white/20' : ''}`} 
                        value={formData.gpa} 
                        onChange={handleGPAChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-3 pt-8">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[#6b8e81]">Major / Field of Interest</label>
                    <select className={`serif-input ${isDark ? 'text-white' : ''}`} value={formData.major} onChange={(e) => setFormData({...formData, major: e.target.value})}>
                      <option value="" className="text-black">Select your field</option>
                      <option value="Computer Science / IT" className="text-black">Computer Science / IT</option>
                      <option value="Data Science & AI" className="text-black">Data Science & AI</option>
                      <option value="Business / MBA" className="text-black">Business / MBA</option>
                      <option value="Engineering (Non-IT)" className="text-black">Engineering (Non-IT)</option>
                      <option value="Medicine / Health" className="text-black">Medicine / Health</option>
                      <option value="Arts & Humanities" className="text-black">Arts & Humanities</option>
                    </select>
                  </div>
               </FormSection>

               <FormSection title="Wealth Strategy" color="#5a7d9a">
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <span className={`text-6xl font-serif italic ${isDark ? 'text-[#e0e7ff]' : 'text-[#2c3e50]'}`}>₹{(formData.budget_max / 100000).toFixed(0)}L</span>
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Total Endowment</span>
                    </div>
                    <input type="range" min="1000000" max="10000000" step="100000" value={formData.budget_max} onChange={(e) => setFormData({...formData, budget_max: Number(e.target.value)})} className="w-full h-1.5 rounded-full appearance-none bg-[#e2e8f0] accent-[#6b8e81] cursor-pointer" />
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[#5a7d9a]">Primary Funding Source</label>
                      <select className={`serif-input ${isDark ? 'text-white' : ''}`} value={formData.funding_source} onChange={(e) => setFormData({...formData, funding_source: e.target.value})}>
                        <option value="" className="text-black">Select funding source</option>
                        <option value="Self" className="text-black">Self / Family Funded</option>
                        <option value="Education Loan" className="text-black">Education Loan</option>
                      </select>
                    </div>
                  </div>
               </FormSection>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4">
            <div className={`p-10 rounded-[3.5rem] border sticky top-36 ${isDark ? 'bg-black/40 border-white/5' : 'bg-white shadow-xl border-[#d1dbd6]'}`}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-center opacity-30">Directive</h4>
              
              <div className="space-y-3 mb-10">
                {['High ROI', 'Low Cost', 'Immigration'].map(goal => (
                  <button key={goal} type="button" onClick={() => setFormData({...formData, priority_goal: goal})} className={`w-full text-left py-5 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.priority_goal === goal ? 'bg-[#6b8e81] text-white shadow-lg' : 'bg-slate-100 opacity-60 hover:opacity-100 text-slate-800'}`}>{goal}</button>
                ))}
              </div>

              <button type="submit" className="w-full py-7 bg-[#2c3e50] text-white rounded-[2.5rem] font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-[#1a252f] transition-all flex items-center justify-center gap-3 shadow-lg">
                {isLoading ? <Loader2 className="animate-spin" /> : <>Discover My Path <ArrowRight size={16}/></>}
              </button>
            </div>
          </div>
        </form>

        {/* RESULTS - 3-COLUMN STRATEGIC DASHBOARD */}
        {showResult && strategies && (
          <div ref={resultRef} className="mt-24 w-full animate-in fade-in slide-in-from-bottom-10">
            {/* EMPATHY HEADER */}
            <div className={`mb-12 p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-xl'}`}>
              <div className="flex items-center gap-3 mb-4">
                <Smile size={24} className="text-[#6b8e81]" />
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>Your Strategic Advisor</h3>
              </div>
              <p className={`text-lg leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                "{aiNote || "Analyzing your profile..."}"
              </p>
            </div>

            <h2 className={`text-4xl font-serif italic mb-8 ${isDark ? 'text-white' : 'text-[#2c3e50]'}`}>
              Your Strategic Pathways
            </h2>

            {/* 3-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* SAFE BETS COLUMN */}
              <StrategyColumn
                title="SAFE BETS"
                icon={Shield}
                color="green"
                countries={strategies.safe_bets}
                isDark={isDark}
              />

              {/* FAST TRACK COLUMN */}
              <StrategyColumn
                title="FAST TRACK"
                icon={Zap}
                color="yellow"
                countries={strategies.fast_track}
                isDark={isDark}
              />

              {/* MOONSHOTS COLUMN */}
              <StrategyColumn
                title="MOONSHOTS"
                icon={AlertTriangle}
                color="red"
                countries={strategies.moonshots}
                isDark={isDark}
              />
            </div>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif-input {
          width: 100%; background: transparent; border-bottom: 2px solid #e2e8f0;
          padding: 1.2rem 0; font-family: serif; font-style: italic; font-size: 1.6rem;
          outline: none; transition: 0.4s; color: inherit;
        }
        .serif-input:focus { border-color: #6b8e81; padding-left: 8px; }
        option { font-family: sans-serif; font-style: normal; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
}

function FormSection({ title, color, children }) {
  return (
    <div className="space-y-8">
      <h2 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30" style={{ color }}>{title}</h2>
      {children}
    </div>
  );
}

function StrategyColumn({ title, icon: Icon, color, countries, isDark }) {
  const colorClasses = {
    green: {
      bg: isDark ? 'bg-emerald-900/20' : 'bg-emerald-50',
      border: isDark ? 'border-emerald-500/20' : 'border-emerald-200',
      text: 'text-emerald-600',
      icon: 'text-emerald-500'
    },
    yellow: {
      bg: isDark ? 'bg-amber-900/20' : 'bg-amber-50',
      border: isDark ? 'border-amber-500/20' : 'border-amber-200',
      text: 'text-amber-600',
      icon: 'text-amber-500'
    },
    red: {
      bg: isDark ? 'bg-red-900/20' : 'bg-red-50',
      border: isDark ? 'border-red-500/20' : 'border-red-200',
      text: 'text-red-600',
      icon: 'text-red-500'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`rounded-3xl border p-6 ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon size={24} className={colors.icon} />
        <h3 className={`text-xs font-black uppercase tracking-widest ${colors.text}`}>{title}</h3>
      </div>
      
      <div className="space-y-4">
        {countries && countries.length > 0 ? (
          countries.map((country, idx) => (
            <CountryCard key={idx} country={country} isDark={isDark} />
          ))
        ) : (
          <p className={`text-sm italic opacity-50 ${isDark ? 'text-white' : 'text-slate-600'}`}>
            No countries match your criteria in this category.
          </p>
        )}
      </div>
    </div>
  );
}

function CountryCard({ country, isDark }) {
  const prColors = {
    green: 'bg-emerald-500',
    yellow: 'bg-amber-500',
    red: 'bg-red-500'
  };

  return (
    <div className={`rounded-2xl border p-5 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} hover:scale-[1.02] transition-transform`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-3xl">{country.flag}</span>
        <div>
          <h4 className={`text-lg font-serif italic ${isDark ? 'text-white' : 'text-[#2c3e50]'}`}>{country.country}</h4>
          <p className={`text-[9px] uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{country.tagline}</p>
        </div>
      </div>

      {/* Financial Status */}
      <div className="mb-4">
        {country.financial_gap === 0 ? (
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
            <CheckCircle2 size={16} />
            <span>Fully Covered</span>
          </div>
        ) : country.financial_gap < 10 ? (
          <div className="flex items-center gap-2 text-amber-600 text-sm font-bold">
            <AlertTriangle size={16} />
            <span>Gap: ₹{country.financial_gap}L (Manageable)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600 text-sm font-bold">
            <AlertTriangle size={16} />
            <span>High Gap: ₹{country.financial_gap}L</span>
          </div>
        )}
      </div>

      {/* PR Timeline Bar */}
      <div className="mb-3">
        <p className={`text-[9px] font-bold uppercase tracking-wide mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>PR Timeline</p>
        <div className="flex gap-1">
          {country.timeline_steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded-full ${
                idx === country.timeline_steps.length - 1
                  ? prColors[country.pr_risk_color]
                  : isDark ? 'bg-white/20' : 'bg-slate-200'
              }`}
              title={step}
            ></div>
          ))}
        </div>
        <p className={`text-[10px] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {country.timeline_steps[country.timeline_steps.length - 1]}
        </p>
      </div>

      {/* Match Score */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200/50">
        <span className={`text-[9px] font-bold uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Match</span>
        <span className={`text-xl font-serif italic ${country.match_score > 80 ? 'text-emerald-500' : country.match_score > 60 ? 'text-amber-500' : 'text-red-500'}`}>
          {country.match_score}%
        </span>
      </div>
    </div>
  );
}
