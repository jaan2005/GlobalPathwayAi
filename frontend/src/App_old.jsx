import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, Sun, Moon, UserCircle, Lightbulb, 
  ArrowRight, Loader2,
  BookOpen, GraduationCap, Pencil, Coffee, Home, LayoutDashboard, Info, AlertCircle,
  BrainCircuit, TrendingUp, Coins, Landmark, CheckCircle2, Smile
} from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  
  const [apiResult, setApiResult] = useState(null);
  const [aiNote, setAiNote] = useState("");

  const resultRef = useRef(null);

  const [formData, setFormData] = useState({
    current_degree: '',
    gpa: '',
    major: '',
    budget_max: 5000000,
    priority_goal: 'High ROI',
    funding_source: '', 
    preferred_countries: [],
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

  const toggleCountry = (country) => {
    setFormData(prev => {
      const exists = prev.preferred_countries.includes(country);
      return {
        ...prev,
        preferred_countries: exists 
          ? prev.preferred_countries.filter(c => c !== country)
          : [...prev.preferred_countries, country]
      };
    });
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
        funding_source: formData.funding_source,
        countries: formData.preferred_countries
      };

      const response = await axios.post('http://localhost:8000/api/recommend', payload);

      if (response.data.status === 'success') {
         setApiResult(response.data.recommendations);
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

  // --- SWAP LOGIC ---
  const handleSwap = (selectedCountry) => {
    // 1. Find the selected country object
    const newTop = selectedCountry;
    // 2. Filter it out of the current list
    const others = apiResult.filter(c => c.country !== newTop.country);
    // 3. Put selected at the top
    const newOrder = [newTop, ...others];
    
    setApiResult(newOrder);
    setAiNote(`(Swapped View) detailed AI analysis available for original recommendation.`);
    setShowModal(false);
    
    // Scroll to top of card
    resultRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-2">Refined Academic Intelligence</p>
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
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[#6b8e81]">GPA Score</label>
                      <input type="number" placeholder="9.0" className={`serif-input ${isDark ? 'text-white placeholder:text-white/20' : ''}`} value={formData.gpa} onChange={(e) => setFormData({...formData, gpa: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-8">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[#6b8e81]">Major / Field of Interest</label>
                    <input type="text" placeholder="e.g. Computer Science" className={`serif-input w-full ${isDark ? 'text-white placeholder:text-white/20' : ''}`} value={formData.major} onChange={(e) => setFormData({...formData, major: e.target.value})} />
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

              <div className="space-y-4 mb-10">
                 <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-center">Preferred Countries</h5>
                 <div className="flex flex-wrap gap-2 justify-center">
                    {['USA', 'UK', 'Germany', 'Canada', 'Australia'].map(country => (
                      <button key={country} type="button" onClick={() => toggleCountry(country)} className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${formData.preferred_countries.includes(country) ? 'bg-[#2c3e50] text-white border-[#2c3e50]' : 'bg-transparent border-slate-300 text-slate-500 hover:border-[#6b8e81]'}`}>
                        {country}
                      </button>
                    ))}
                 </div>
              </div>

              <button type="submit" className="w-full py-7 bg-[#2c3e50] text-white rounded-[2.5rem] font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-[#1a252f] transition-all flex items-center justify-center gap-3 shadow-lg">
                {isLoading ? <Loader2 className="animate-spin" /> : <>Calculate Strategy <ArrowRight size={16}/></>}
              </button>
            </div>
          </div>
        </form>

        {/* RESULTS */}
        {showResult && apiResult && (
          <div ref={resultRef} className="mt-24 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10">
            <div className="flex items-center gap-3 mb-8">
              <BrainCircuit className="text-[#4f46e5] w-8 h-8" />
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>Your AI Recommended Pathway</h3>
            </div>

            <div className={`relative rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden ${isDark ? 'bg-[#1e293b] border-white/10' : 'bg-white border-slate-100'}`}>
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7]"></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef2ff] text-[#4f46e5] text-[10px] font-black uppercase tracking-widest border border-[#e0e7ff]">
                  <CheckCircle2 size={14} /> Top Recommendation
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Match Score</div>
                  <div className={`text-3xl font-serif italic ${apiResult[0].match_score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {apiResult[0].match_score}%
                  </div>
                </div>
              </div>

              <h1 className={`text-6xl font-serif italic mb-6 ${isDark ? 'text-white' : 'text-[#2c3e50]'}`}>
                {apiResult[0].country}
              </h1>

              <div className={`p-6 rounded-2xl mb-10 border ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#fafcfb] border-slate-100'}`}>
                 <div className="flex items-center gap-2 mb-3 text-[#6b8e81]">
                    <Smile size={18}/>
                    <span className="text-[10px] font-bold uppercase tracking-widest">AI Strategic Advice</span>
                 </div>
                 <p className={`text-lg leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                   "{aiNote || "Calculating strategic roadmap..."}"
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <MetricCard icon={TrendingUp} label="Risk Profile" value={apiResult[0].match_score > 80 ? "Low Risk" : "Moderate Risk"} isDark={isDark} />
                <MetricCard icon={Coins} label="Cost Estimate" value={apiResult[0].country === "Germany" ? "Tuition Free" : "Tuition + Living"} isDark={isDark} />
                <MetricCard icon={Landmark} label="Visa Policy" value={apiResult[0].country === "Germany" ? "Opportunity Card" : "Standard"} isDark={isDark} />
              </div>

              <div className="space-y-4 mb-12 pl-2">
                {apiResult[0].reasoning.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                       <CheckCircle2 size={16} className={reason.includes("❌") ? "text-red-400" : "text-[#6b8e81]"} />
                     </div>
                     <p className={`text-sm py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{reason}</p>
                  </div>
                ))}
              </div>

              {/* COMPARE BUTTON */}
              <button 
                onClick={() => setShowModal(true)}
                className={`w-full py-4 border rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] ${isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                Compare Other Options
              </button>

            </div>
          </div>
        )}

        {/* COMPARISON MODAL */}
        {showModal && apiResult && (
          <ComparisonModal 
            results={apiResult} 
            onClose={() => setShowModal(false)} 
            isDark={isDark} 
            onSwap={handleSwap} // <--- Pass the swap function
          />
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

function MetricCard({ icon: Icon, label, value, isDark }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#f8fafc] border-slate-100'}`}>
      <div className="flex items-center gap-2 mb-4 opacity-50">
        <Icon size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-700'}`}>{value}</div>
    </div>
  );
}

function ComparisonModal({ results, onClose, isDark, onSwap }) {
  const alternatives = results.slice(1);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 ${isDark ? 'bg-[#1e293b] border border-white/10 text-white' : 'bg-white text-slate-800'}`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-serif italic mb-1">Alternative Pathways</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Click a card to view full analysis</p>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-black/5 transition ${isDark ? 'hover:bg-white/10' : ''}`}>
            <span className="text-xl font-bold">×</span>
          </button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {alternatives.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => onSwap(item)} // <--- CLICKABLE!
              className={`p-6 rounded-2xl border flex items-center justify-between group cursor-pointer hover:scale-[1.01] transition-all ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-sm ${item.match_score > 80 ? 'bg-emerald-100 text-emerald-600' : item.match_score > 50 ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                  {item.match_score}
                </div>
                <div>
                  <h4 className="text-xl font-serif italic group-hover:underline decoration-[#6b8e81] underline-offset-4">{item.country}</h4>
                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wide opacity-50 mt-1">
                    <span>{item.match_score > 80 ? 'Low Risk' : item.match_score > 50 ? 'Moderate Risk' : 'High Risk'}</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="flex items-center gap-2 text-xs opacity-50 font-bold uppercase tracking-widest">
                  View Analysis <ArrowRight size={12}/>
                </div>
              </div>
            </div>
          ))}
          {alternatives.length === 0 && <div className="text-center py-10 opacity-50 text-xs uppercase tracking-widest">No other countries matched your criteria.</div>}
        </div>
        <div className="mt-8 text-center">
          <button onClick={onClose} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition">Close Comparison</button>
        </div>
      </div>
    </div>
  );
}
