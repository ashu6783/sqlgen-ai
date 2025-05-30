import React, { useState, useEffect } from 'react';
import { 
  User, 
  Monitor, 
  Server, 
  Database, 
  Zap, 
  ArrowRight, 
  ArrowDown,
  Globe,
  Code,
  Brain,
  MessageSquare,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react';

const SystemArchitecture = () => {
  const [activeFlow, setActiveFlow] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const flowSteps = [
    { id: 'user', label: 'User Input', description: 'Natural language query' },
    { id: 'frontend', label: 'React Frontend', description: 'UI processes input' },
    { id: 'backend', label: 'Node.js Backend', description: 'Request routing & validation' },
    { id: 'fastapi', label: 'FastAPI Service', description: 'AI model interface' },
    { id: 'huggingface', label: 'Hugging Face API', description: 'CodeLlama processing' },
    { id: 'response', label: 'SQL Generation', description: 'Generated SQL query' },
    { id: 'validation', label: 'Validation', description: 'SQL syntax checking' },
    { id: 'result', label: 'User Result', description: 'Formatted response' }
  ];

  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % flowSteps.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isAnimating, flowSteps.length]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              System Architecture
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Complete data flow from natural language to SQL generation
          </p>
          <button
            onClick={toggleAnimation}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAnimating ? 'Pause Animation' : 'Start Animation'}
          </button>
        </div>

        {/* Architecture Diagram */}
        <div className="relative">
          {/* User Layer */}
          <div className="flex justify-center mb-8">
            <div className={`bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 rounded-2xl p-6 transition-all duration-500 ${
              activeFlow === 0 ? 'border-blue-400 shadow-lg shadow-blue-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">User</h3>
                  <p className="text-gray-300">"Show me customers from NY who spent over $1000"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center mb-8">
            <ArrowDown className={`w-8 h-8 transition-colors duration-500 ${
              activeFlow === 1 ? 'text-blue-400' : 'text-gray-500'
            }`} />
          </div>

          {/* Frontend Layer */}
          <div className="flex justify-center mb-8">
            <div className={`bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 rounded-2xl p-6 transition-all duration-500 ${
              activeFlow === 1 ? 'border-green-400 shadow-lg shadow-green-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">React.js Frontend</h3>
                  <p className="text-gray-300">User interface & input validation</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">React Hooks</span>
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center mb-8">
            <ArrowDown className={`w-8 h-8 transition-colors duration-500 ${
              activeFlow === 2 ? 'text-green-400' : 'text-gray-500'
            }`} />
          </div>

          {/* Backend Layer */}
          <div className="flex justify-center mb-8">
            <div className={`bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 rounded-2xl p-6 transition-all duration-500 ${
              activeFlow === 2 ? 'border-yellow-400 shadow-lg shadow-yellow-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-xl">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Node.js + Express.js Backend</h3>
                  <p className="text-gray-300">API routing, middleware & request handling</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-yellow-500/20 rounded text-xs">Express.js</span>
                    <span className="px-2 py-1 bg-yellow-500/20 rounded text-xs">CORS</span>
                    <span className="px-2 py-1 bg-yellow-500/20 rounded text-xs">Body Parser</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center mb-8">
            <ArrowDown className={`w-8 h-8 transition-colors duration-500 ${
              activeFlow === 3 ? 'text-yellow-400' : 'text-gray-500'
            }`} />
          </div>

          {/* FastAPI Layer */}
          <div className="flex justify-center mb-8">
            <div className={`bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 rounded-2xl p-6 transition-all duration-500 ${
              activeFlow === 3 ? 'border-purple-400 shadow-lg shadow-purple-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">FastAPI Service</h3>
                  <p className="text-gray-300">AI model interface & prompt engineering</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">Python</span>
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">FastAPI</span>
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">Pydantic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center mb-8">
            <ArrowDown className={`w-8 h-8 transition-colors duration-500 ${
              activeFlow === 4 ? 'text-purple-400' : 'text-gray-500'
            }`} />
          </div>

          {/* AI Model Layer */}
          <div className="flex justify-center mb-8">
            <div className={`bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-2 rounded-2xl p-6 transition-all duration-500 ${
              activeFlow === 4 ? 'border-indigo-400 shadow-lg shadow-indigo-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-indigo-500 to-cyan-600 p-3 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Hugging Face API</h3>
                  <p className="text-gray-300">CodeLlama model for SQL generation</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-indigo-500/20 rounded text-xs">CodeLlama</span>
                    <span className="px-2 py-1 bg-indigo-500/20 rounded text-xs">Transformers</span>
                    <span className="px-2 py-1 bg-indigo-500/20 rounded text-xs">Meta AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Flow */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* SQL Generation */}
            <div className={`bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 rounded-xl p-4 transition-all duration-500 ${
              activeFlow === 5 ? 'border-emerald-400 shadow-lg shadow-emerald-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-emerald-400" />
                <h3 className="font-bold">SQL Generation</h3>
              </div>
              <p className="text-sm text-gray-300">
                Transform natural language into optimized SQL queries
              </p>
            </div>

            {/* Validation */}
            <div className={`bg-gradient-to-r from-rose-500/20 to-orange-500/20 border-2 rounded-xl p-4 transition-all duration-500 ${
              activeFlow === 6 ? 'border-rose-400 shadow-lg shadow-rose-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-rose-400" />
                <h3 className="font-bold">Validation</h3>
              </div>
              <p className="text-sm text-gray-300">
                Syntax checking and security validation
              </p>
            </div>

            {/* Response */}
            <div className={`bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-2 rounded-xl p-4 transition-all duration-500 ${
              activeFlow === 7 ? 'border-violet-400 shadow-lg shadow-violet-500/30 scale-105' : 'border-gray-600'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-violet-400" />
                <h3 className="font-bold">Formatted Response</h3>
              </div>
              <p className="text-sm text-gray-300">
                Clean, formatted SQL ready for execution
              </p>
            </div>
          </div>
        </div>

        {/* Data Flow Example */}
        <div className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">Data Flow Example</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <div className="text-blue-300 text-sm mb-2">Input:</div>
                <div className="text-white">"Find all customers from New York who spent over $1000"</div>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="text-yellow-300 text-sm mb-2">Processing:</div>
                <div className="text-white text-sm">Natural Language → Tokenization → Model Inference → SQL Generation</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="text-green-300 text-sm mb-2">Output:</div>
                <code className="text-white text-sm block">
                  SELECT * FROM customers<br/>
                  WHERE city = 'New York'<br/>
                  AND total_spent {'>'} 1000;
                </code>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <div className="text-purple-300 text-sm mb-2">Response Time:</div>
                <div className="text-white">~2-3 seconds average</div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30">
            <Monitor className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="font-bold mb-2">Frontend</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• React.js 18</li>
              <li>• Tailwind CSS</li>
              <li>• Lucide Icons</li>
              <li>• Responsive Design</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30">
            <Server className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="font-bold mb-2">Backend</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Node.js</li>
              <li>• Express.js</li>
              <li>• CORS</li>
              <li>• Rate Limiting</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="font-bold mb-2">AI Service</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• FastAPI</li>
              <li>• Python 3.9+</li>
              <li>• Pydantic</li>
              <li>• Async/Await</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-600/20 to-violet-600/20 rounded-xl p-6 border border-indigo-500/30">
            <Brain className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold mb-2">AI Model</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• CodeLlama</li>
              <li>• Hugging Face</li>
              <li>• Transformers</li>
              <li>• Meta AI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;