import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, Sun, Moon, ArrowRight, Loader2, 
  ShieldCheck, Zap, AlertTriangle, Smile, TrendingUp, DollarSign,
  Calendar, AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronUp,
  GitBranch, Clock, Award, Target, Lightbulb
} from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [aiNote, setAiNote] = useState("");
  const [riskNote, setRiskNote] = useState("");
  const [meta, setMeta] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const resultRef = useRef(null);

  const [formData, setFormData] = useState({
    gpa: '',
    major: '',
    budget_max: 2500000,
    priority_goal: 'High ROI',
    target_intake: 'Fall 2025'
  });

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const phrases = ["Your Strategy.", "Your Future.", "Your Terms."];
  
  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];
    const timer = setTimeout(() => {
      setDisplayText(prev => isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1));
      if (!isDeleting && displayText === fullText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && displayText === "") { setIsDeleting(false); setLoopNum(loopNum + 1); }
    }, isDeleting ? 30 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input Validation
    if (!formData.major || formData.major === "") {
      alert("Please select your field of study. This affects job-market demand and PR eligibility analysis.");
      return;
    }
    
    if (!formData.gpa || parseFloat(formData.gpa) <= 0) {
      alert("Please enter a valid GPA between 0 and 10.");
      return;
    }

    setIsLoading(true);
    setShowResult(false);

    try {
      const payload = {
        degree: "Bachelors",
        gpa: parseFloat(formData.gpa) || 0,
        major: formData.major,
        budget: formData.budget_max / 100000,
        priority: formData.priority_goal,
        funding_source: "Self",
        target_intake: formData.target_intake
      };

      const response = await axios.post('http://localhost:8000/api/recommend', payload);

      if (response.data.status === 'success') {
        setApiResult(response.data.strategies);
        setAiNote(response.data.consultant_note);
        setRiskNote(response.data.risk_advisory);
        setMeta(response.data.meta);
        setIsLoading(false);
        setShowResult(true);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    } catch (error) {
      alert("Backend Offline! Run: uvicorn main:app --reload");
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 font-sans ${isDark ? 'bg-[#0a0f1d] text-[#e0e7ff]' : 'bg-[#f8fafc] text-[#1e293b]'}`}>
      
      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-xl ${isDark ? 'border-white/5 bg-[#0a0f1d]/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">GlobalPathways<span className="text-emerald-500">.ai</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 hidden sm:block">Strategic Discovery Engine</span>
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg hover:bg-white/10">
              {isDark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* Hero */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Target size={12} /> Discovery Mode — We Find Paths You Didn't Know Existed
          </div>
          <h1 className="text-4xl md:text-6xl font-serif italic mb-4 min-h-[1.2em]">
            {displayText}<span className="inline-block w-0.5 h-8 md:h-12 bg-emerald-500 ml-1 animate-pulse"></span>
          </h1>
          <p className="text-sm opacity-60 max-w-xl mx-auto">
            Enter your profile. We analyze every immigration pathway globally and show you the <span className="text-emerald-400 font-semibold">optimal routes to permanent residency</span> — ranked by success probability, not marketing hype.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-16">
          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* GPA */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2">GPA (0-10) <span className="text-red-400">*</span></label>
                <input 
                  type="number" placeholder="7.5" min="0" max="10" step="0.1"
                  className={`w-full bg-transparent border-b-2 py-2 text-xl font-semibold outline-none transition-colors ${isDark ? 'border-white/20 focus:border-emerald-400' : 'border-slate-300 focus:border-emerald-500'}`}
                  value={formData.gpa}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (parseFloat(val) > 10) val = "10";
                    if (parseFloat(val) < 0) val = "0";
                    setFormData({...formData, gpa: val});
                  }}
                />
                <p className="text-[9px] opacity-40 mt-1">Used to filter academic eligibility</p>
              </div>

              {/* Major */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2">Field of Study <span className="text-red-400">*</span></label>
                <select
                  className={`w-full bg-transparent border-b-2 py-2 text-lg font-semibold outline-none cursor-pointer ${isDark ? 'border-white/20 focus:border-emerald-400' : 'border-slate-300 focus:border-emerald-500'}`}
                  value={formData.major}
                  onChange={(e) => setFormData({...formData, major: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science & AI</option>
                  <option value="Business">Business / MBA</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Healthcare</option>
                  <option value="Arts">Arts & Design</option>
                </select>
                <p className="text-[9px] opacity-40 mt-1">Affects job-market demand & PR eligibility</p>
              </div>

              {/* Budget */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2">Total Budget</label>
                <div className="text-xl font-bold text-emerald-400">₹{(formData.budget_max / 100000).toFixed(0)}L</div>
                <input
                  type="range" min="500000" max="10000000" step="100000"
                  value={formData.budget_max}
                  onChange={(e) => setFormData({...formData, budget_max: Number(e.target.value)})}
                  className="w-full accent-emerald-500 mt-2"
                />
                <p className="text-[9px] opacity-40 mt-1">Tuition + living + visa + insurance</p>
              </div>

              {/* Intake */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2">Target Intake</label>
                <select
                  className={`w-full bg-transparent border-b-2 py-2 text-lg font-semibold outline-none cursor-pointer ${isDark ? 'border-white/20 focus:border-emerald-400' : 'border-slate-300 focus:border-emerald-500'}`}
                  value={formData.target_intake}
                  onChange={(e) => setFormData({...formData, target_intake: e.target.value})}
                >
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                  <option value="Fall 2026">Fall 2026</option>
                </select>
                <p className="text-[9px] opacity-40 mt-1">Personalizes your action timeline</p>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]'}`}
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Analyze My Pathways <ArrowRight size={16} /></>}
            </button>

            {/* Reassurance */}
            <p className="text-center text-[10px] opacity-40 mt-4">
              No country preferences needed. We evaluate all viable immigration pathways for you.
            </p>
          </div>
        </form>

        {/* Results */}
        {showResult && apiResult && (
          <div ref={resultRef} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Stats Bar */}
            {meta && (
              <div className={`flex flex-wrap justify-center gap-4 mb-8 p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                <StatBadge icon={<Target size={14} />} label="Paths Found" value={meta.total_options} color="emerald" />
                <StatBadge icon={<ShieldCheck size={14} />} label="Safe Bets" value={meta.safe_count} color="green" />
                <StatBadge icon={<Zap size={14} />} label="Fast Track" value={meta.fast_count} color="yellow" />
                <StatBadge icon={<AlertTriangle size={14} />} label="Moonshots" value={meta.moonshot_count} color="red" />
              </div>
            )}

            {/* AI Notes */}
            <div className="max-w-3xl mx-auto space-y-4 mb-10">
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-emerald-900/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex items-start gap-3">
                  <Smile className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">{aiNote}</p>
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-xs opacity-80">{riskNote}</p>
              </div>
            </div>

            {/* Strategy Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <StrategyColumn 
                title="Safe Bets" subtitle="70%+ PR Success Rate" 
                icon={<ShieldCheck className="text-emerald-400" />}
                items={apiResult.safe_bets} isDark={isDark} accent="emerald"
                expandedCard={expandedCard} setExpandedCard={setExpandedCard}
              />
              <StrategyColumn 
                title="Fast Track" subtitle="Optimized for Speed"
                icon={<Zap className="text-yellow-400" />}
                items={apiResult.fast_track} isDark={isDark} accent="yellow"
                expandedCard={expandedCard} setExpandedCard={setExpandedCard}
              />
              <StrategyColumn 
                title="Moonshots" subtitle="High Risk, High Reward"
                icon={<AlertTriangle className="text-red-400" />}
                items={apiResult.moonshots} isDark={isDark} accent="red"
                expandedCard={expandedCard} setExpandedCard={setExpandedCard}
              />
            </div>
          </div>
        )}
      </main>

      <footer className={`border-t py-8 text-center text-xs opacity-40 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <p>GlobalPathways.ai — Data-driven immigration intelligence. Built for informed decisions.</p>
      </footer>
    </div>
  );
}

function StatBadge({ icon, label, value, color }) {
  const colors = { emerald: "text-emerald-400", green: "text-green-400", yellow: "text-yellow-400", red: "text-red-400" };
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
      <span className={colors[color]}>{icon}</span>
      <span className="text-xs opacity-70">{label}:</span>
      <span className={`font-bold ${colors[color]}`}>{value}</span>
    </div>
  );
}

function StrategyColumn({ title, subtitle, icon, items, isDark, accent, expandedCard, setExpandedCard }) {
  const borderColors = { emerald: "border-emerald-500/20", yellow: "border-yellow-500/20", red: "border-red-500/20" };
  
  return (
    <div className={`p-5 rounded-3xl border ${borderColors[accent]} ${isDark ? 'bg-white/[0.02]' : 'bg-white shadow-sm'}`}>
      <div className="flex items-center gap-2 mb-1">{icon}<h3 className="font-bold uppercase tracking-wider text-sm">{title}</h3></div>
      <p className="text-[10px] uppercase tracking-wider opacity-40 mb-5 ml-7">{subtitle}</p>
      
      {items.length === 0 ? (
        <div className="py-12 text-center opacity-30 text-xs uppercase tracking-wider">No matches for your profile</div>
      ) : (
        items.map((country, idx) => (
          <CountryCard 
            key={idx} 
            country={country} 
            isDark={isDark}
            isExpanded={expandedCard === country.name}
            onToggle={() => setExpandedCard(expandedCard === country.name ? null : country.name)}
          />
        ))
      )}
    </div>
  );
}

function CountryCard({ country, isDark, isExpanded, onToggle }) {
  const healthColors = {
    excellent: "text-emerald-400 bg-emerald-500/10",
    manageable: "text-yellow-400 bg-yellow-500/10",
    stretch: "text-red-400 bg-red-500/10"
  };
  
  const prColors = {
    green: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    red: "bg-red-500/20 text-red-400 border-red-500/30"
  };

  return (
    <div className={`rounded-2xl mb-3 border overflow-hidden transition-all ${isDark ? 'bg-[#0d1424] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
      
      {/* Header */}
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="text-lg font-bold">{country.flag} {country.name}</h4>
            <p className="text-[10px] uppercase tracking-wider opacity-50">{country.tagline}</p>
          </div>
          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${healthColors[country.financial_health]}`}>
            {country.financial_status}
          </span>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-2 mb-3">
          <MiniStat icon={<TrendingUp size={10} />} label="ROI" value={`${country.roi_percentage}%`} />
          <MiniStat icon={<Clock size={10} />} label="Break-even" value={`${country.break_even_months}mo`} />
          <MiniStat icon={<Award size={10} />} label="PR Rate" value={`${country.pr_success_rate}%`} />
        </div>

        {/* PR Timeline */}
        <div className="flex gap-1">
          {country.timeline_steps.map((step, i) => {
            const isLast = i === country.timeline_steps.length - 1;
            return (
              <div key={i} className={`flex-1 py-1.5 px-1 rounded text-[8px] font-bold uppercase text-center border ${isLast ? prColors[country.pr_risk_color] : (isDark ? 'bg-white/5 border-white/5' : 'bg-slate-200 border-slate-200')}`}>
                {step}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-3">
          <span className="text-[10px] opacity-50 flex items-center gap-1">
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {isExpanded ? 'Collapse' : 'Full Analysis'}
          </span>
        </div>
      </div>

      {/* Expanded */}
      {isExpanded && (
        <div className={`px-4 pb-4 space-y-4 border-t ${isDark ? 'border-white/5' : 'border-slate-200'} animate-in fade-in duration-200`}>
          
          {/* Costs */}
          <div className="pt-4">
            <h5 className="text-[10px] font-bold uppercase tracking-wider opacity-50 mb-2 flex items-center gap-1">
              <DollarSign size={10} /> Cost Breakdown (₹ Lakhs)
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between"><span className="opacity-60">Tuition</span><span>₹{country.costs.tuition}L</span></div>
              <div className="flex justify-between"><span className="opacity-60">Living (Total)</span><span>₹{country.costs.living}L</span></div>
              <div className="flex justify-between"><span className="opacity-60">Visa Fees</span><span>₹{country.costs.visa_fees}L</span></div>
              <div className="flex justify-between"><span className="opacity-60">Insurance</span><span>₹{country.costs.insurance}L</span></div>
              <div className="flex justify-between col-span-2 pt-2 border-t border-dashed border-white/10 font-bold">
                <span>Total Investment</span><span className="text-emerald-400">₹{country.total_cost}L</span>
              </div>
            </div>
          </div>

          {/* PR Branches */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-wider opacity-50 mb-2 flex items-center gap-1">
              <GitBranch size={10} /> All PR Pathways From This Route
            </h5>
            <div className="space-y-2">
              {country.pr_branches.map((branch, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-lg text-xs ${isDark ? 'bg-white/5' : 'bg-white'}`}>
                  <div>
                    <span className="font-medium">{branch.path}</span>
                    <span className="opacity-50 ml-2">({branch.timeline})</span>
                  </div>
                  <span className={`font-bold ${prColors[branch.color].split(' ')[1]}`}>{branch.success}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Alerts */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-wider opacity-50 mb-2 flex items-center gap-1">
              <AlertCircle size={10} /> Immigration Policy Updates
            </h5>
            <div className="space-y-1.5">
              {country.policy_alerts.map((alert, i) => (
                <div key={i} className={`flex items-start gap-2 text-[11px] p-2 rounded-lg ${
                  alert.type === 'positive' ? (isDark ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700') :
                  alert.type === 'negative' ? (isDark ? 'bg-red-500/10 text-red-300' : 'bg-red-50 text-red-700') :
                  (isDark ? 'bg-white/5 opacity-70' : 'bg-slate-100')
                }`}>
                  {alert.type === 'positive' ? <CheckCircle size={12} className="shrink-0 mt-0.5" /> :
                   alert.type === 'negative' ? <XCircle size={12} className="shrink-0 mt-0.5" /> :
                   <AlertCircle size={12} className="shrink-0 mt-0.5" />}
                  <span>{alert.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Timeline */}
          {country.deadlines && country.deadlines.length > 0 && (
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-wider opacity-50 mb-2 flex items-center gap-1">
                <Calendar size={10} /> Your Action Timeline
              </h5>
              <div className="space-y-1.5">
                {country.deadlines.map((d, i) => (
                  <div key={i} className={`flex items-center justify-between text-[11px] p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-white'}`}>
                    <span>{d.task}</span>
                    <span className="font-bold text-cyan-400">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insider Insight */}
          <div className={`p-3 rounded-xl border-l-2 border-emerald-500 ${isDark ? 'bg-emerald-900/10' : 'bg-emerald-50'}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
              <Lightbulb size={10} /> Strategic Insight
            </p>
            <p className="text-xs opacity-80">{country.insider_insight}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-white/5">
      <span className="opacity-50">{icon}</span>
      <span className="opacity-50">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
