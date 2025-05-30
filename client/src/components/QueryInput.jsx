import { useState } from "react";
import { Search, Loader2, Database } from "lucide-react";
import { generateQuery } from "../services/api";

function QueryInput({ onQueryResult }) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await generateQuery(input);
            onQueryResult(result);
        } catch (error) {
            console.error('Error getting query:', error);
            onQueryResult({ error: 'Failed to generate query' });
        }
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>

                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-6">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Database className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white">Natural Language to SQL</h2>
                            <p className="text-blue-100 mt-1 text-sm sm:text-base font-medium">
                                Transform your ideas into powerful SQL queries instantly
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 right-16 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>
                </div>

                {/* Input Section */}
                <div className="relative p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <label htmlFor="query-input" className="block text-sm font-semibold text-gray-800 mb-2">
                                Describe Your Query
                            </label>
                            <div className="relative">
                                <textarea
                                    id="query-input"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Example: Show all customers from New York who made purchases over $500 last month"
                                    className="w-full h-32 sm:h-40 px-4 sm:px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-400 bg-white/70 backdrop-blur-sm shadow-inner transition-all duration-300 hover:border-gray-300 group-hover:shadow-lg"
                                    disabled={loading}
                                    required
                                />
                                <div className="absolute bottom-4 right-4 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                                    <Search className="w-4 h-4 text-white" />
                                </div>
                                <div className="absolute top-3 right-3">
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                                        input.length > 400 ? 'bg-red-100 text-red-600' :
                                        input.length > 300 ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-gray-100 text-gray-500'
                                    }`}>
                                        {input.length}/500
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                                        <kbd className="font-mono">Ctrl</kbd>
                                        <span>+</span>
                                        <kbd className="font-mono">Enter</kbd>
                                    </div>
                                    <span>for quick submit</span>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="flex-1 relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="relative z-10">Generating SQL...</span>
                                    </>
                                ) : (
                                    <>
                                        <Database className="w-5 h-5" />
                                        <span className="relative z-10">Generate SQL Query</span>
                                    </>
                                )}
                            </button>
                            {input && !loading && (
                                <button
                                    type="button"
                                    onClick={() => setInput('')}
                                    className="px-6 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transform hover:scale-105"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Examples */}
                    <div className="mt-8 pt-8 border-t border-gray-200/50">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                            Try these examples
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "Show all customers from California",
                                "Find orders placed in the last 30 days",
                                "List products with low inventory",
                                "Get top 10 customers by revenue"
                            ].map((example, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setInput(example)}
                                    disabled={loading}
                                    className="group text-left p-4 text-sm text-gray-600 hover:text-blue-700 bg-white/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 border border-gray-200/50 hover:border-blue-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:transform-none"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-2 group-hover:scale-150 transition-transform duration-200"></div>
                                        <span className="font-medium">"{example}"</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            </div>
        </div>
    );
}

export default QueryInput;
