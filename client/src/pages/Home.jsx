import { useState, useEffect } from "react";
import { Database, ArrowRight, Zap, Code,Sparkles, Play } from "lucide-react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    {
      query: "Show me all customers from New York who spent over $1000",
      sql: "SELECT * FROM customers WHERE city = 'New York' AND total_spent > 1000;"
    },
    {
      query: "Find the top 5 products by sales this month",
      sql: "SELECT product_name, SUM(quantity) as sales FROM orders WHERE date >= '2024-01-01' GROUP BY product_name ORDER BY product_name ORDER BY sales DESC LIMIT 5;"
    },
    {
      query: "List employees hired in the last 6 months",
      sql: "SELECT * FROM employees WHERE hire_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH);"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Database className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              sqlgen-ai
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Natural Language
              </span>
              <br />
              into Perfect SQL
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Generate complex SQL queries instantly using plain English. 
              No more syntax errors, no more documentation hunting. 
              Just describe what you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="/query"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl inline-flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5" />
                Start Generating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => window.open('https://youtu.be/XBHkLXKXpFk', '_blank')} className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-gray-800/50">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Live Example Demo */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">Live Example</span>
              </div>
              
              <div className="text-left space-y-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-300 text-sm mb-2">Natural Language Input:</div>
                  <div className="text-white font-medium">
                    {examples[currentExample].query}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-purple-400 animate-pulse" />
                </div>
                
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-300 text-sm mb-2">Generated SQL:</div>
                  <code className="text-white font-mono text-sm">
                    {examples[currentExample].sql}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Technology Section */}
      <section id="architecture" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built with <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Modern Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powered by cutting-edge AI and robust architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* AI Model Section */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Model</h3>
                  <p className="text-purple-300">Meta-Llama via GroqCloud</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Leveraging Meta’s LLaMA 4 Maverick 17B (128E) Instruct model via GroqCloud's hosted API to enable fast,
                 accurate, and privacy-conscious natural language to SQL translation.
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">System Architecture</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <Code className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="font-semibold text-blue-300">Frontend</div>
                    <div className="text-sm text-gray-300">React.js</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <Database className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="font-semibold text-green-300">Backend</div>
                    <div className="text-sm text-gray-300">Node.js + Express.js</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-semibold text-purple-300">AI Interface</div>
                    <div className="text-sm text-gray-300">FastAPI</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <Database className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold text-yellow-300">Database</div>
                    <div className="text-sm text-gray-300">SQL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
}

export default Home;