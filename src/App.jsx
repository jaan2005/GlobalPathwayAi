import React, { useState, useRef } from 'react';
import { Globe, GraduationCap, Coins, BrainCircuit, CheckCircle2, ArrowRight, ChevronDown, Info, Loader2, TrendingUp, Landmark, Clock, FileText } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    current_degree: '',
    gpa: '',
    major_interest: '',
    budget_max: 2500000, // Default to 25 Lakhs
    funding_source: '',
    priority_goal: '',
    preferred_countries: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef(null);

  // Helper to format currency in Indian system (Lakhs/Crores)
  const formatBudget = (value) => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(value / 100000).toFixed(0)} Lakhs`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (country) => {
    setFormData(prev => {
      const current = prev.preferred_countries;
      if (current.includes(country)) {
        return { ...prev, preferred_countries: current.filter(c => c !== country) };
      } else {
        return { ...prev, preferred_countries: [...current, country] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting to Backend:", formData);
    setIsLoading(true);
    setShowResult(false);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
      // Scroll to result section after a brief delay for render
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Global Pathways AI</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-blue-600 transition">Methodology</a>
              <a href="#" className="hover:text-blue-600 transition">Case Studies</a>
              <a href="#" className="text-blue-600">Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 pb-12 pt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Data-Driven Decisions for Your Future
          </h1>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            Stop relying on commission-driven agents. Our AI evaluates your profile against global opportunities to find your highest ROI pathway.
          </p>
          <div className="flex justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unbiased</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Transparent</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Personalized</span>
          </div>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Academic Profile */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-lg text-slate-800">1. Academic Profile</h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* current_degree */}
              <div className="space-y-2">
                <label htmlFor="current_degree" className="block text-sm font-medium text-slate-700">
                  Current Degree Level
                </label>
                <div className="relative">
                  <select
                    id="current_degree"
                    name="current_degree"
                    required
                    value={formData.current_degree}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8 shadow-sm"
                  >
                    <option value="" disabled>Select your degree</option>
                    <option value="HS">High School</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* major_interest */}
              <div className="space-y-2">
                <label htmlFor="major_interest" className="block text-sm font-medium text-slate-700">
                  Major Interest
                </label>
                <div className="relative">
                  <select
                    id="major_interest"
                    name="major_interest"
                    required
                    value={formData.major_interest}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8 shadow-sm"
                  >
                    <option value="" disabled>Select field of study</option>
                    <option value="CS">Computer Science (CS)</option>
                    <option value="DS">Data Science (DS)</option>
                    <option value="Biz">Business / Management</option>
                    <option value="Eng">Engineering</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* gpa */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label htmlFor="gpa" className="block text-sm font-medium text-slate-700">
                  GPA / Grade (0-10 Scale)
                </label>
                <input
                  type="number"
                  id="gpa"
                  name="gpa"
                  required
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder="e.g. 8.5"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 shadow-sm"
                />
                <p className="text-xs text-slate-500">Convert percentages to a 10-point scale if necessary.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Money Stuff */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <Coins className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-lg text-slate-800">2. Money Stuff</h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* budget_max */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="budget_max" className="block text-sm font-medium text-slate-700">
                    Max Total Budget (Tuition + Living)
                  </label>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-100">
                    {formatBudget(formData.budget_max)}
                  </span>
                </div>
                <input
                  type="range"
                  id="budget_max"
                  name="budget_max"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={formData.budget_max}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                  <span>₹ 5 Lakhs</span>
                  <span>₹ 1 Crore</span>
                </div>
              </div>

              {/* funding_source */}
              <div className="space-y-2">
                <label htmlFor="funding_source" className="block text-sm font-medium text-slate-700">
                  Primary Funding Source
                </label>
                <div className="relative">
                  <select
                    id="funding_source"
                    name="funding_source"
                    required
                    value={formData.funding_source}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8 shadow-sm"
                  >
                    <option value="" disabled>Select funding source</option>
                    <option value="Self">Self / Family Funded</option>
                    <option value="Loan">Education Loan</option>
                    <option value="Scholarship">Seeking Scholarship</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Logic Inputs */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-lg text-slate-800">3. Logic Inputs</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* priority_goal */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  What is your absolute priority?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['High ROI', 'Low Cost', 'Immigration'].map((goal) => (
                    <label 
                      key={goal}
                      className={`
                        relative flex flex-col items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                        ${formData.priority_goal === goal 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'}
                      `}
                    >
                      <input
                        type="radio"
                        name="priority_goal"
                        value={goal}
                        checked={formData.priority_goal === goal}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="font-semibold text-sm">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* preferred_countries */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  Preferred Countries (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-3">
                  {['US', 'UK', 'Ger', 'Can', 'Aus'].map((country) => {
                    const isSelected = formData.preferred_countries.includes(country);
                    return (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleMultiSelect(country)}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 border
                          ${isSelected 
                            ? 'bg-slate-800 text-white border-slate-800' 
                            : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}
                        `}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {country === 'Ger' ? 'Germany' : country === 'Aus' ? 'Australia' : country === 'Can' ? 'Canada' : country}
                      </button>
                    );
                  })}
                </div>
                {formData.preferred_countries.length === 0 && (
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Please select at least one country.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Action */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all
                ${isLoading ? 'bg-slate-700 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-300 transform hover:-translate-y-0.5'}
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing {formData.preferred_countries.length} Regions...
                </>
              ) : (
                <>
                  Generate Pathway Plan <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              By clicking "Generate", you agree to our Terms of Service. No credit card required.
            </p>
          </div>
        </form>

        {/* Empty Result Card Section */}
        {showResult && (
          <div ref={resultRef} className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-3 mb-6">
               <BrainCircuit className="w-6 h-6 text-indigo-600" />
               <h2 className="text-2xl font-bold text-slate-900">Your AI Recommended Pathway</h2>
            </div>

            {/* Main Result Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
              {/* Decorative gradient top */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
              
              <div className="p-8">
                {/* Header Placeholder */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                       <CheckCircle2 className="w-3 h-3" /> Top Recommendation
                    </div>
                    <div className="h-8 w-64 bg-slate-100 rounded-md animate-pulse"></div>
                    <div className="h-4 w-40 bg-slate-50 rounded-md mt-2 animate-pulse"></div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium uppercase">Match Score</p>
                    <div className="text-3xl font-black text-slate-200">--%</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase">Projected ROI</span>
                    </div>
                    <div className="h-8 w-24 bg-slate-200 rounded animate-pulse mb-1"></div>
                    <p className="text-xs text-slate-400">5-year outlook</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <Coins className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase">Total Cost</span>
                    </div>
                    <div className="h-8 w-24 bg-slate-200 rounded animate-pulse mb-1"></div>
                    <p className="text-xs text-slate-400">Tuition + Living</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <Landmark className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase">Immigration</span>
                    </div>
                    <div className="h-8 w-24 bg-slate-200 rounded animate-pulse mb-1"></div>
                    <p className="text-xs text-slate-400">PR Difficulty</p>
                  </div>
                </div>

                {/* Details Placeholder */}
                <div className="space-y-4 mb-8">
                   <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-slate-300" />
                      </div>
                      <div className="flex-1 space-y-2">
                         <div className="h-4 w-32 bg-slate-100 rounded"></div>
                         <div className="h-3 w-full bg-slate-50 rounded"></div>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-slate-300" />
                      </div>
                      <div className="flex-1 space-y-2">
                         <div className="h-4 w-32 bg-slate-100 rounded"></div>
                         <div className="h-3 w-3/4 bg-slate-50 rounded"></div>
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                    Unlock Full Report
                  </button>
                  <button className="flex-1 bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-50 transition">
                    Compare Other Options
                  </button>
                </div>

              </div>
            </div>
            
            <p className="text-center text-sm text-slate-400 mt-8 mb-12">
              Waiting for backend logic to populate recommended universities and visa pathways...
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Globe className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-xl text-white">Global Pathways AI</span>
          </div>
          <div className="flex justify-center gap-8 text-sm mb-8">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">About Us</a>
            <a href="#" className="hover:text-white transition">Partner with Universities</a>
          </div>
          <p className="text-xs text-slate-500">
            © 2024 Global Pathways AI. All rights reserved. 
            <br/>Designed for the NextGen Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
}