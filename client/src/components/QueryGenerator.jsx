import { useState } from "react";
import QueryInput from "./QueryInput";
import SchemaDisplay from "./SchemaDisplay";
import RelationshipDiagram from "./RelationshipDiagram";

function QueryGenerator() {
    const [result, setResult] = useState(null);

    const handleQueryResult = (data) => {
        setResult(data);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
                        SQL Query Generator
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto leading-relaxed px-4">
                        Transform natural language into powerful SQL queries with AI assistance
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            AI-Powered
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            Instant Results
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                            Copy & Use
                        </div>
                    </div>
                </div>

                {/* Query Input Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 hover:shadow-2xl transition-all duration-300">
                    <QueryInput onQueryResult={handleQueryResult} />
                </div>

                {/* Results Section */}
                {result && (
                    <div className="space-y-6 sm:space-y-8">
                        {/* SQL Query Result */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-b border-gray-200/50">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 shadow-lg flex-shrink-0">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span className="break-words">
                                            {result.error ? 'Error Detected' : 'Generated SQL Query'}
                                        </span>
                                    </h2>
                                    {result.sql && (
                                        <button
                                            onClick={() => copyToClipboard(result.sql)}
                                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy Query
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 lg:p-8">
                                {result.error ? (
                                    <div className="flex flex-col sm:flex-row sm:items-start p-4 sm:p-6 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-lg sm:rounded-xl shadow-sm">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0">
                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-red-800 font-semibold mb-1">Query Generation Failed</h3>
                                            <p className="text-red-700 text-sm sm:text-base break-words">{result.error}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-700/80 text-gray-300 px-2 sm:px-3 py-1 rounded-md text-xs font-mono z-10">
                                            SQL
                                        </div>
                                        <pre className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-green-400 p-4 sm:p-6 rounded-lg sm:rounded-xl overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed shadow-inner border border-gray-700">
                                            {result.sql}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Query Results */}
                        {result.results && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                <div className="bg-gradient-to-r from-gray-50 to-green-50/50 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-b border-gray-200/50">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 shadow-lg flex-shrink-0">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            Query Results
                                        </h2>
                                        <button
                                            onClick={() => copyToClipboard(JSON.stringify(result.results, null, 2))}
                                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy JSON
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 lg:p-8">
                                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg sm:rounded-xl p-4 sm:p-6 max-h-64 sm:max-h-80 lg:max-h-96 overflow-auto border border-gray-200/50 shadow-inner">
                                        <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                            <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded-md w-fit">
                                                JSON OUTPUT
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {Array.isArray(result.results) ? `${result.results.length} records` : 'Object'}
                                            </span>
                                        </div>
                                        <pre className="text-xs sm:text-sm font-mono text-gray-800 whitespace-pre-wrap leading-relaxed break-all sm:break-normal">
                                            {JSON.stringify(result.results, null, 2)}
                                        </pre>
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
                    <div className="text-center py-12 sm:py-16">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-3xl"></div>
                            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/50 shadow-xl mx-2 sm:mx-0">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Ready to Generate</h3>
                                <p className="text-gray-600 text-base sm:text-lg max-w-xs sm:max-w-md mx-auto leading-relaxed px-2 sm:px-0">
                                    Enter a natural language query above to transform it into SQL and see the magic happen
                                </p>
                                <div className="flex items-center justify-center mt-4 sm:mt-6 space-x-4">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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