import { useState } from "react";
import QueryInput from "./QueryInput";
import SchemaDisplay from "./SchemaDisplay";
import RelationshipDiagram from "./RelationshipDiagram";
import { LucideDatabaseZap, MessageSquareLockIcon } from "lucide-react";

function QueryGenerator() {
    const [result, setResult] = useState(null);

    const handleQueryResult = (data) => {
        setResult(data);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-40 left-1/2 w-60 h-60 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                        <svg className="relative w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6 px-2 tracking-tight">
                        SQL Query Generator
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-sm sm:max-w-lg lg:max-w-3xl mx-auto leading-relaxed px-4 font-light">
                        Transform natural language into powerful SQL queries with AI assistance
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:space-x-8 text-sm sm:text-base text-gray-400">
                        <div className="flex items-center group">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse shadow-lg shadow-green-500/50"></div>
                            <span className="group-hover:text-white transition-colors duration-300">AI-Powered</span>
                        </div>
                        <div className="flex items-center group">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-3 shadow-lg shadow-blue-500/50"></div>
                            <span className="group-hover:text-white transition-colors duration-300">Instant Results</span>
                        </div>
                        <div className="flex items-center group">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3 shadow-lg shadow-purple-500/50"></div>
                            <span className="group-hover:text-white transition-colors duration-300">Copy & Use</span>
                        </div>
                    </div>
                </div>

                {/* Query Input Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 hover:shadow-3xl hover:bg-white/10 transition-all duration-500 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <QueryInput onQueryResult={handleQueryResult} />
                </div>

                {/* Results Section */}
                {result && (
                    <div className="space-y-8 sm:space-y-10">
                        {/* SQL Query Result */}
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-3xl hover:bg-white/10 transition-all duration-500 group">
                            <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 px-6 sm:px-8 lg:px-10 py-6 sm:py-7 lg:py-8 border-b border-white/10">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg shadow-blue-500/30 flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span className="break-words bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                            {result.error ? 'Error Detected' : 'Generated SQL Query'}
                                        </span>
                                    </h2>
                                    {result.sql && (
                                        <button
                                            onClick={() => copyToClipboard(result.sql)}
                                            className="relative inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start group overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg className="relative w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span className="relative">Copy Query</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 sm:p-8 lg:p-10">
                                {result.error ? (
                                    <div className="flex flex-col sm:flex-row sm:items-start p-6 sm:p-8 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm">
                                        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0 shadow-lg shadow-red-500/30">
                                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-red-300 font-semibold mb-2 text-lg">Query Generation Failed</h3>
                                            <p className="text-red-200 text-sm sm:text-base break-words leading-relaxed">{result.error}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative group">
                                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gray-800/90 text-gray-300 px-3 sm:px-4 py-2 rounded-lg text-xs font-mono z-10 backdrop-blur-sm border border-gray-700/50">
                                            SQL
                                        </div>
                                        <pre className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-green-400 p-6 sm:p-8 rounded-xl sm:rounded-2xl overflow-x-auto text-sm sm:text-base font-mono leading-relaxed shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-300">
                                            {result.sql}
                                        </pre>
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Query Results */}
                        {result.results && (
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-3xl hover:bg-white/10 transition-all duration-500 group">
                                <div className="bg-gradient-to-r from-emerald-800/50 to-green-800/50 px-6 sm:px-8 lg:px-10 py-6 sm:py-7 lg:py-8 border-b border-white/10">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg shadow-green-500/30 flex-shrink-0">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Query Results</span>
                                        </h2>
                                        <button
                                            onClick={() => copyToClipboard(JSON.stringify(result.results, null, 2))}
                                            className="relative inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start group overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg className="relative w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span className="relative">Copy JSON</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 sm:p-8 lg:p-10">
                                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 max-h-80 sm:max-h-96 lg:max-h-[500px] overflow-auto border border-gray-700/30 shadow-inner relative group">
                                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                            <span className="text-xs font-bold text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg w-fit backdrop-blur-sm border border-gray-700/50">
                                                JSON OUTPUT
                                            </span>
                                            <span className="text-xs text-gray-500 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                                                {Array.isArray(result.results) ? `${result.results.length} records` : 'Object'}
                                            </span>
                                        </div>
                                        <pre className="text-sm sm:text-base font-mono text-gray-300 whitespace-pre-wrap leading-relaxed break-all sm:break-normal">
                                            {JSON.stringify(result.results, null, 2)}
                                        </pre>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <SchemaDisplay/>
                <RelationshipDiagram/>

                {/* Empty State */}
                {!result && (
                    <div className="text-center py-16 sm:py-20">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 blur-3xl"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-10 sm:p-16 border border-white/10 shadow-2xl mx-2 sm:mx-0 group hover:bg-white/10 transition-all duration-500">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                            <LucideDatabaseZap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ready to Generate</h3>
                                <p className="text-gray-300 text-lg sm:text-xl max-w-md sm:max-w-lg mx-auto leading-relaxed px-2 sm:px-0 font-light">
                                    Enter a natural language query above to transform it into SQL and see the magic happen
                                </p>
                                <div className="flex items-center justify-center mt-6 sm:mt-8 space-x-6">
                                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce shadow-lg shadow-cyan-500/50"></div>
                                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50" style={{animationDelay: '0.4s'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QueryGenerator;