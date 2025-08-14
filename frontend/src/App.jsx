import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [insight, setInsight] = useState('');

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInsight('');
    
    try {
      const response = await fetch(`${API_BASE}/api/gemini/zero-shot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Request failed with ${response.status}`);
      }
      
      const data = await response.json();
      setInsight(data.insight || 'No insight returned.');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

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
                <div className="text-xs text-gray-300">AI Cricket Analytics</div>
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
              Powered by Advanced AI
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
              Cricket Intelligence
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the future of cricket analysis with AI-powered insights on players, teams, venues, and strategies.
            </p>

            {/* Cricket Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'AI Models', value: '50+', icon: '🤖' },
                { label: 'Data Points', value: '1M+', icon: '📊' },
                { label: 'Accuracy', value: '95%', icon: '🎯' },
                { label: 'Response Time', value: '<2s', icon: '⚡' }
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
                  <h2 className="text-2xl font-bold text-white">Ask Your Question</h2>
                  <div className="text-xs text-gray-400 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                    API: {API_BASE}
                  </div>
                </div>
                
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-3">
                      Cricket Analysis Prompt
                    </label>
                    <textarea
                      id="prompt"
                      className="w-full h-48 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none backdrop-blur-sm"
                      placeholder="Ask about players, teams, matches, strategies, or predictions..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      {prompt.length} characters
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !prompt.trim()}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
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
                  <h2 className="text-2xl font-bold text-white">AI Analysis</h2>
                  {insight && (
                    <button
                      onClick={() => navigator.clipboard.writeText(insight)}
                      className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors duration-200"
                    >
                      <span>📋</span>
                      <span>Copy</span>
                    </button>
                  )}
                </div>
                
                <div className="min-h-48 bg-black/20 rounded-xl p-6 border border-white/10">
                  {insight ? (
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-gray-200 font-sans text-sm leading-relaxed">{insight}</pre>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-gray-400">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🏏</div>
                        <p className="text-lg font-medium text-gray-300 mb-2">Ready for Analysis</p>
                        <p className="text-sm text-gray-500">Ask a question to see AI-powered cricket insights</p>
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
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose CricIntel?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Advanced AI-powered analysis for comprehensive cricket insights
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏟️",
                  title: "Venue Analysis",
                  description: "Deep insights into pitch conditions, boundary sizes, and historical performance data with AI precision."
                },
                {
                  icon: "📊",
                  title: "Player Analytics",
                  description: "Comprehensive player statistics, form analysis, and performance predictions using machine learning."
                },
                {
                  icon: "🎯",
                  title: "Strategy Insights",
                  description: "Tactical recommendations for field placements, bowling plans, and batting approaches."
                },
                {
                  icon: "⚡",
                  title: "Real-time Updates",
                  description: "Instant analysis during live matches with sub-second response times."
                },
                {
                  icon: "🧠",
                  title: "AI-Powered",
                  description: "Advanced neural networks trained on extensive cricket data for accurate predictions."
                },
                {
                  icon: "🔍",
                  title: "Explainable AI",
                  description: "Clear reasoning behind every prediction with detailed analysis breakdowns."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
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
                <div className="text-xs text-gray-400">AI Cricket Analytics</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2024 CricIntel. All rights reserved.</span>
              <span>Built with React + Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
