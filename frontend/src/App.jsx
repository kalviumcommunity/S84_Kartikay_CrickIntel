import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  const [prompt, setPrompt] = useState('Analyze Virat Kohli\'s recent T20 performance and predict his form for the upcoming World Cup.');
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

  // Function to format the AI response with better styling
  const formatInsight = (text) => {
    if (!text) return '';
    
    // Function to convert markdown-style text to JSX
    const formatText = (text) => {
      // Convert **bold** text to styled spans
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = text.split(boldRegex);
      
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is bold text
          return (
            <span key={index} className="font-bold text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded-md border border-cyan-500/30">
              {part}
            </span>
          );
        }
        return part;
      });
    };
    
    // Split into paragraphs and add formatting
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      
      // Check if it's a heading (starts with number or key words)
      const isHeading = /^(\d+\.|•|\*|#|\*\*)/.test(trimmedParagraph) || 
                       trimmedParagraph.toLowerCase().includes('analysis:') ||
                       trimmedParagraph.toLowerCase().includes('prediction:') ||
                       trimmedParagraph.toLowerCase().includes('recommendation:') ||
                       trimmedParagraph.toLowerCase().includes('conclusion:') ||
                       trimmedParagraph.toLowerCase().includes('summary:') ||
                       trimmedParagraph.toLowerCase().includes('key insights:');
      
      // Check if it's a bullet point or list item
      const isBulletPoint = /^(\*|\-|\•|\d+\.)/.test(trimmedParagraph);
      
      // Check if it's a key insight (contains important keywords)
      const isKeyInsight = trimmedParagraph.toLowerCase().includes('key') ||
                          trimmedParagraph.toLowerCase().includes('important') ||
                          trimmedParagraph.toLowerCase().includes('notable') ||
                          trimmedParagraph.toLowerCase().includes('significant');
      
      // Format bullet points
      if (isBulletPoint) {
        const bulletContent = trimmedParagraph.replace(/^(\*|\-|\•|\d+\.)\s*/, '');
        return (
          <div key={index} className="flex items-start space-x-4 mb-4 pl-6">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
            <div className="text-gray-200 leading-relaxed text-base">
              {formatText(bulletContent)}
            </div>
          </div>
        );
      }
      
      // Format headings
      if (isHeading) {
        const headingText = trimmedParagraph.replace(/^(\d+\.|•|\*|#|\*\*)\s*/, '');
        return (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-3 border-b-2 border-cyan-500/40 pb-2 bg-gradient-to-r from-cyan-500/10 to-transparent px-3 py-2 rounded-lg">
              {formatText(headingText)}
            </h3>
          </div>
        );
      }
      
      // Format key insights
      if (isKeyInsight) {
        return (
          <div key={index} className="mb-6 p-4 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-xl border border-yellow-500/30 shadow-lg">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 text-lg">💡</span>
              <div className="text-gray-200 leading-relaxed text-base">
                {formatText(trimmedParagraph)}
              </div>
            </div>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <div key={index} className="mb-5 text-gray-200 leading-relaxed text-base">
          {formatText(trimmedParagraph)}
        </div>
      );
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
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                  🏏
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CricIntel
                </span>
                <div className="text-sm text-gray-300 font-medium">AI Cricket Analytics</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium text-lg">Features</a>
              <a href="#playground" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium text-lg">Playground</a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium text-lg">About</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-cyan-500/20 text-cyan-300 text-base font-medium mb-10 border border-cyan-500/30 shadow-lg">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              Powered by Advanced AI
            </div>
            
            <h1 className="text-6xl sm:text-8xl font-bold text-white mb-8 leading-tight">
              Cricket Intelligence
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
              Experience the future of cricket analysis with AI-powered insights on players, teams, venues, and strategies.
            </p>

            {/* Cricket Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { label: 'AI Models', value: '50+', icon: '🤖' },
                { label: 'Data Points', value: '1M+', icon: '📊' },
                { label: 'Accuracy', value: '95%', icon: '🎯' },
                { label: 'Response Time', value: '<2s', icon: '⚡' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/25 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Interface */}
        <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              
              {/* Input Form */}
              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-10 border border-white/25 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">Ask Your Question</h2>
                  <div className="text-sm text-gray-300 bg-black/30 px-4 py-2 rounded-full border border-white/15">
                    API: {API_BASE}
                  </div>
                </div>
                
                <form onSubmit={handleGenerate} className="space-y-8">
                  <div>
                    <label htmlFor="prompt" className="block text-lg font-semibold text-gray-300 mb-4">
                      Cricket Analysis Prompt
                    </label>
                    <textarea
                      id="prompt"
                      className="w-full h-56 px-6 py-4 bg-white/15 border border-white/25 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none backdrop-blur-sm text-lg leading-relaxed"
                      placeholder="Ask about cricket players, teams, matches, strategies, or predictions..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-base text-gray-400 font-medium">
                      {prompt.length} characters
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !prompt.trim()}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
                    >
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
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
                  <div className="mt-8 p-6 bg-red-500/20 border border-red-500/40 rounded-2xl">
                    <div className="flex items-center">
                      <span className="text-red-400 mr-3 text-xl">⚠️</span>
                      <span className="text-red-300 text-base font-medium">{error}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Results Display - Enhanced */}
              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-10 border border-white/25 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-3xl font-bold text-white">AI Analysis</h2>
                    {insight && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                        <span className="text-sm text-green-400 font-bold">LIVE</span>
                      </div>
                    )}
                  </div>
                  {insight && (
                    <button
                      onClick={() => navigator.clipboard.writeText(insight)}
                      className="text-base text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 transition-colors duration-200 bg-cyan-500/15 px-4 py-2 rounded-xl hover:bg-cyan-500/25 border border-cyan-500/30"
                    >
                      <span>📋</span>
                      <span>Copy</span>
                    </button>
                  )}
                </div>
                
                <div className="min-h-96 bg-black/30 rounded-2xl p-8 border border-white/15 overflow-y-auto max-h-96 shadow-inner">
                  {insight ? (
                    <div className="space-y-6">
                      {/* AI Response Header */}
                      <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-2xl border border-cyan-500/40 shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg">🤖</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-cyan-300">AI Cricket Analyst</div>
                          <div className="text-sm text-gray-400 font-medium">Powered by Gemini AI</div>
                        </div>
                      </div>
                      
                      {/* Formatted Content */}
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-200 leading-relaxed">
                          {formatInsight(insight)}
                        </div>
                      </div>
                      
                      {/* Analysis Summary */}
                      <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 shadow-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-purple-400 text-xl">📊</span>
                          <span className="text-lg font-bold text-purple-300">Analysis Summary</span>
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed">
                          This analysis is based on comprehensive cricket data and AI algorithms. 
                          For the most accurate insights, consider recent form and match conditions.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-80 text-gray-400">
                      <div className="text-center">
                        <div className="text-8xl mb-6">🏏</div>
                        <p className="text-2xl font-bold text-gray-300 mb-3">Ready for Analysis</p>
                        <p className="text-lg text-gray-500 mb-6">Ask a cricket question to see AI-powered insights</p>
                        <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                          <span className="font-medium">AI Ready</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                {insight && (
                  <div className="mt-6 flex items-center justify-between text-sm text-gray-400 font-medium">
                    <div className="flex items-center space-x-6">
                      <span>Generated at {new Date().toLocaleTimeString()}</span>
                      <span>•</span>
                      <span>{insight.split(' ').length} words</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-400 text-lg">✓</span>
                      <span>Analysis Complete</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-white mb-6">Why Choose CricIntel?</h2>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Advanced AI-powered analysis for comprehensive cricket insights
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                <div key={index} className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/25 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 text-base leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-md border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                🏏
              </div>
              <div>
                <span className="text-xl font-bold text-white">CricIntel</span>
                <div className="text-sm text-gray-400 font-medium">AI Cricket Analytics</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-400 font-medium">
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
