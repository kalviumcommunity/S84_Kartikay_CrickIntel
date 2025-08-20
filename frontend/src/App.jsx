import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [insight, setInsight] = useState('');
  const [method, setMethod] = useState('zero-shot');
  const [temperature, setTemperature] = useState(0.7);
  const [topK, setTopK] = useState(40);
  const [topP, setTopP] = useState(0.8);
  const [context, setContext] = useState({
    userLevel: '',
    matchType: '',
    teamPreference: '',
    venue: ''
  });
  const [responseData, setResponseData] = useState(null);

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInsight('');
    setResponseData(null);
    
    try {
      let endpoint = `/api/gemini/${method}`;
      let requestBody = { prompt };
      
      // Add parameters based on method
      if (method !== 'zero-shot') {
        requestBody.temperature = parseFloat(temperature);
        requestBody.topK = parseInt(topK);
        requestBody.topP = parseFloat(topP);
      }
      
      // Add context for dynamic prompting
      if (method === 'dynamic') {
        requestBody.context = context;
      }
      
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Request failed with ${response.status}`);
      }
      
      const data = await response.json();
      setInsight(typeof data.insight === 'object' ? JSON.stringify(data.insight, null, 2) : data.insight);
      setResponseData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const handleContextChange = (field, value) => {
    setContext(prev => ({ ...prev, [field]: value }));
  };

  // Format text with asterisks for bold formatting (like ChatGPT)
  const formatTextWithAsterisks = (text) => {
    if (typeof text !== 'string') return text;
    
    // Split text by asterisks and map to bold/normal text
    const parts = text.split(/(\*[^*]+\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        // Remove asterisks and make bold
        const boldText = part.slice(1, -1);
        return (
          <span key={index} className="font-bold text-white">
            {boldText}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  🏏
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CricIntel
                </span>
                <div className="text-xs text-gray-300">Advanced AI Cricket Analytics</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">Features</a>
              <a href="#playground" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">Playground</a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">About</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium mb-8 border border-cyan-500/30">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
              Powered by Advanced AI Techniques
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
              Cricket Intelligence
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the future of cricket analysis with advanced AI techniques including one-shot prompting, function calling, structured output, and more.
            </p>

            {/* AI Features Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Prompting Methods', value: '5+', icon: '🧠' },
                { label: 'AI Parameters', value: '3', icon: '⚙️' },
                { label: 'Function Calls', value: '2', icon: '🔧' },
                { label: 'Response Types', value: '2', icon: '📊' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Interface */}
        <section id="playground" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              
              {/* Input Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">AI Cricket Analysis</h2>
                  <div className="text-xs text-gray-400 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                    API: {API_BASE}
                  </div>
                </div>
                
                <form onSubmit={handleGenerate} className="space-y-6">
                  {/* Method Selection */}
                  <div>
                    <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-3">
                      AI Method
                    </label>
                    <div className="relative">
                      <select
                        id="method"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200 hover:bg-white/15 focus:bg-white/15"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                      >
                        <option value="zero-shot" className="bg-slate-800 text-white">Zero-Shot Prompting</option>
                        <option value="one-shot" className="bg-slate-800 text-white">One-Shot Prompting</option>
                        <option value="multi-shot" className="bg-slate-800 text-white">Multi-Shot Prompting</option>
                        <option value="function-calling" className="bg-slate-800 text-white">Function Calling 🔧</option>
                        <option value="structured" className="bg-slate-800 text-white">Structured Output</option>
                        <option value="dynamic" className="bg-slate-800 text-white">Dynamic Prompting</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <div className="w-4 h-4 bg-cyan-400 rounded-full opacity-60"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Method Help Section */}
                  {method === 'function-calling' && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                      <div className="text-sm text-blue-300 font-medium mb-3 flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        🚀 Function Calling - Instant Cricket Calculations
                      </div>
                      <div className="text-xs text-gray-300 space-y-3">
                        <div>
                          <div className="text-blue-400 font-medium mb-2">🎯 Perfect for:</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <div>• <span className="text-white">Batting averages</span> - "1000 runs in 15 innings"</div>
                              <div>• <span className="text-white">Strike rates</span> - "150 runs in 120 balls"</div>
                              <div>• <span className="text-white">Economy rates</span> - "60 runs in 10 overs"</div>
                            </div>
                            <div className="space-y-1">
                              <div>• <span className="text-white">Form analysis</span> - "Kohli: 50, 75, 100, 25, 80"</div>
                              <div>• <span className="text-white">Performance stats</span> - "200 runs in 5 matches"</div>
                              <div>• <span className="text-white">Win percentages</span> - "8 wins in 12 games"</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-400 font-medium mb-2">💡 Pro Tips:</div>
                          <div className="space-y-1">
                            <div>• Use clear numbers and keywords (runs, innings, scores, form)</div>
                            <div>• Include player names for personalized analysis</div>
                            <div>• Specify format (Test, ODI, T20) for better context</div>
                          </div>
                        </div>
                        <div className="text-xs text-blue-400 italic">
                          ⚡ <span className="text-white">Instant results</span> - No API calls needed for calculations!
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Parameters */}
                  {method !== 'zero-shot' && (
                    <div className="space-y-4 p-6 bg-gradient-to-br from-black/30 to-black/10 rounded-xl border border-white/20 backdrop-blur-sm">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                        AI Parameters
                      </h3>
                      
                      {/* Function Calling Prompt Guide */}
                      {method === 'function-calling' && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                          <div className="text-sm text-cyan-300 font-medium mb-3 flex items-center">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                            💡 How to Use Function Calling
                          </div>
                          <div className="text-xs text-gray-300 space-y-2">
                            <div className="flex items-start space-x-2">
                              <span className="text-cyan-400 mt-1">🔢</span>
                              <div>
                                <span className="text-white font-medium">Batting Average:</span>
                                <span className="text-gray-400 ml-1">"Calculate average for 1000 runs in 15 innings"</span>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-cyan-400 mt-1">📊</span>
                              <div>
                                <span className="text-white font-medium">Form Analysis:</span>
                                <span className="text-gray-400 ml-1">"Analyze form for Virat Kohli with scores 50, 75, 100, 25, 80"</span>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-cyan-400 mt-1">⚡</span>
                              <div>
                                <span className="text-white font-medium">Strike Rate:</span>
                                <span className="text-gray-400 ml-1">"Calculate strike rate for 150 runs in 120 balls"</span>
                              </div>
                            </div>
                            <div className="text-xs text-cyan-400 mt-2 italic">
                              💡 Tip: Include numbers and keywords like "average", "form", "scores", "runs", "innings"
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Temperature: <span className="text-cyan-400 font-mono">{temperature}</span>
                            <span className="text-xs text-gray-500 ml-2">(0.0 = focused, 1.0 = creative)</span>
                          </label>
                          <div className="relative">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={temperature}
                              onChange={(e) => setTemperature(parseFloat(e.target.value))}
                              className="w-full h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer slider-thumb"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>Focused</span>
                              <span>Balanced</span>
                              <span>Creative</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Top-K: <span className="text-cyan-400 font-mono">{topK}</span>
                            <span className="text-xs text-gray-500 ml-2">(1-100, lower = more predictable)</span>
                          </label>
                          <div className="relative">
                            <input
                              type="range"
                              min="1"
                              max="100"
                              value={topK}
                              onChange={(e) => setTopK(parseInt(e.target.value))}
                              className="w-full h-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg appearance-none cursor-pointer slider-thumb"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>Predictable</span>
                              <span>Balanced</span>
                              <span>Diverse</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Top-P: <span className="text-cyan-400 font-mono">{topP}</span>
                            <span className="text-xs text-gray-500 ml-2">(0.0-1.0, lower = more focused)</span>
                          </label>
                          <div className="relative">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={topP}
                              onChange={(e) => setTopP(parseFloat(e.target.value))}
                              className="w-full h-3 bg-gradient-to-r from-red-500 to-green-500 rounded-lg appearance-none cursor-pointer slider-thumb"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>Focused</span>
                              <span>Balanced</span>
                              <span>Exploratory</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Context */}
                  {method === 'dynamic' && (
                    <div className="space-y-4 p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
                        Dynamic Context
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">User Level</label>
                          <input
                            type="text"
                            placeholder="e.g., beginner, expert"
                            value={context.userLevel}
                            onChange={(e) => handleContextChange('userLevel', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Match Type</label>
                          <input
                            type="text"
                            placeholder="e.g., T20, Test, ODI"
                            value={context.matchType}
                            onChange={(e) => handleContextChange('matchType', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Team Preference</label>
                          <input
                            type="text"
                            placeholder="e.g., India, Australia"
                            value={context.teamPreference}
                            onChange={(e) => handleContextChange('teamPreference', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Venue</label>
                          <input
                            type="text"
                            placeholder="e.g., Wankhede, MCG"
                            value={context.venue}
                            onChange={(e) => handleContextChange('venue', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prompt Input */}
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-3">
                      Cricket Analysis Prompt
                    </label>
                    
                    {/* Function Calling Examples */}
                    {method === 'function-calling' && (
                      <div className="mb-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                        <div className="text-sm text-green-300 font-medium mb-3 flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          🎯 Function Calling Examples
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-2">
                            <div className="text-green-400 font-medium">📊 Calculations:</div>
                            <div className="text-gray-300 space-y-1">
                              <div>• "Average for 1000 runs in 15 innings"</div>
                              <div>• "Strike rate: 150 runs in 120 balls"</div>
                              <div>• "Economy rate: 60 runs in 10 overs"</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-green-400 font-medium">📈 Analysis:</div>
                            <div className="text-gray-300 space-y-1">
                              <div>• "Form for Kohli: 50, 75, 100, 25, 80"</div>
                              <div>• "Last 5 scores: 45, 67, 89, 23, 78"</div>
                              <div>• "Performance: 200 runs in 5 matches"</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-green-400 mt-3 italic">
                          💡 <span className="text-white">Keywords:</span> average, form, scores, runs, innings, balls, overs, economy, strike rate
                        </div>
                      </div>
                    )}
                    
                    <textarea
                      id="prompt"
                      className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-200 hover:bg-white/15 focus:bg-white/15"
                      placeholder={method === 'function-calling' ? "Try: 'Calculate average for 1000 runs in 15 innings' or 'Analyze form for Kohli with scores 50, 75, 100, 25, 80'" : "Ask about players, teams, matches, strategies, or predictions..."}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400 flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      {prompt.length} characters
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !prompt.trim()}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <span>🚀</span>
                          <span>Generate Insight</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                {error && (
                  <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">⚠️</span>
                      <span className="text-red-300 text-sm">{error}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Results Display */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">AI Analysis Results</h2>
                </div>
                
                <div className="min-h-48 bg-black/20 rounded-xl p-6 border border-white/10">
                  {loading ? (
                    // Loading State
                    <div className="flex items-center justify-center h-48">
                      <div className="text-center space-y-4">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
                          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-medium text-cyan-400">Analyzing Cricket Data...</p>
                          <p className="text-sm text-gray-400">Using {method.replace('-', ' ')} method</p>
                        </div>
                      </div>
                    </div>
                  ) : insight ? (
                    <div className="space-y-4">
                      {/* Response Data */}
                      {responseData && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
                          <div className="text-sm text-cyan-300 font-medium mb-3 flex items-center">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                            Request Details
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="text-cyan-400">🔧</span>
                              <span className="text-gray-400">Method:</span>
                              <span className="text-white font-medium">{method.replace('-', ' ').toUpperCase()}</span>
                            </div>
                            
                            {method !== 'zero-shot' && (
                              <>
                                <div className="flex items-center space-x-2">
                                  <span className="text-cyan-400">🌡️</span>
                                  <span className="text-gray-400">Temperature:</span>
                                  <span className="text-white font-medium">{temperature}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-cyan-400">🎯</span>
                                  <span className="text-gray-400">Top-K:</span>
                                  <span className="text-white font-medium">{topK}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-cyan-400">⚡</span>
                                  <span className="text-gray-400">Top-P:</span>
                                  <span className="text-white font-medium">{topP}</span>
                                </div>
                              </>
                            )}
                            
                            {method === 'dynamic' && Object.values(context).some(val => val) && (
                              <div className="md:col-span-2">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-cyan-400">🔄</span>
                                  <span className="text-gray-400">Context:</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 ml-6">
                                  {Object.entries(context).map(([key, value]) => value && (
                                    <div key={key} className="flex items-center space-x-2">
                                      <span className="text-gray-500 text-xs">{key}:</span>
                                      <span className="text-white text-xs font-medium">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Main Insight */}
                      <div className="space-y-4">
                        {/* Method Badge */}
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium rounded-full">
                            {method.replace('-', ' ').toUpperCase()}
                          </span>
                          {method !== 'zero-shot' && (
                            <span className="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded-full">
                              T:{temperature} K:{topK} P:{topP}
                            </span>
                          )}
                        </div>
                        
                        {/* Clean Response Display */}
                        <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden">
                          {typeof insight === 'object' && insight.analysis ? (
                            // Structured Output Display
                            <div className="p-6 space-y-4">
                              <div className="border-b border-white/20 pb-3">
                                <h3 className="text-lg font-semibold text-white mb-2">📊 Analysis</h3>
                                <p className="text-gray-200 leading-relaxed">{formatTextWithAsterisks(insight.analysis)}</p>
                              </div>
                              
                              {insight.keyPoints && (
                                <div className="border-b border-white/20 pb-3">
                                  <h3 className="text-lg font-semibold text-white mb-2">🎯 Key Points</h3>
                                  <ul className="space-y-2">
                                    {insight.keyPoints.map((point, index) => (
                                      <li key={index} className="flex items-start space-x-2">
                                        <span className="text-cyan-400 mt-1">•</span>
                                        <span className="text-gray-200">{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {insight.recommendation && (
                                <div className="border-b border-white/20 pb-3">
                                  <h3 className="text-lg font-semibold text-white mb-2">💡 Recommendation</h3>
                                  <p className="text-gray-200 leading-relaxed">{formatTextWithAsterisks(insight.recommendation)}</p>
                                </div>
                              )}
                              
                              {insight.confidence && (
                                <div>
                                  <h3 className="text-lg font-semibold text-white mb-2">🎯 Confidence Level</h3>
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                                      <div 
                                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(insight.confidence / 10) * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-cyan-400 font-semibold">{insight.confidence}/10</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            // Regular Text Response Display
                            <div className="p-6">
                              <div className="prose prose-invert max-w-none">
                                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                                  {formatTextWithAsterisks(insight)}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Copy Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => navigator.clipboard.writeText(typeof insight === 'object' ? JSON.stringify(insight, null, 2) : insight)}
                            className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 transition-colors duration-200 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 rounded-lg border border-cyan-500/20"
                          >
                            <span>📋</span>
                            <span>Copy Response</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-gray-400">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🏏</div>
                        <p className="text-lg font-medium text-gray-300 mb-2">Ready for Analysis</p>
                        <p className="text-sm text-gray-500">Choose a method and ask a question to see AI-powered cricket insights</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Advanced AI Features</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore cutting-edge AI techniques for comprehensive cricket analysis
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "One-Shot Prompting",
                  description: "Provide one example to guide AI response format and style for consistent analysis."
                },
                {
                  icon: "🧠",
                  title: "Multi-Shot Prompting",
                  description: "Multiple examples establish patterns and expectations for better AI understanding."
                },
                {
                  icon: "🔧",
                  title: "Function Calling",
                  description: "AI can execute predefined functions for calculations and data analysis tasks."
                },
                {
                  icon: "📊",
                  title: "Structured Output",
                  description: "Get responses in JSON format for easy programmatic processing and integration."
                },
                {
                  icon: "⚙️",
                  title: "Parameter Control",
                  description: "Fine-tune AI behavior with temperature, top-K, and top-P parameters."
                },
                {
                  icon: "🔄",
                  title: "Dynamic Prompting",
                  description: "Context-aware prompts that adapt based on user preferences and match conditions."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                🏏
              </div>
              <div>
                <span className="text-lg font-semibold text-white">CricIntel</span>
                <div className="text-xs text-gray-400">Advanced AI Cricket Analytics</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2024 CricIntel. All rights reserved.</span>
              <span>Built with React + Tailwind CSS + Gemini AI</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for enhanced styling */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
          transition: all 0.2s ease;
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default App
