import { useState, useEffect } from 'react';
import { Database, Table, Key, Hash, AlertCircle, Loader2, ChevronDown, ChevronRight } from 'lucide-react';

function SchemaDisplay() {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedTables, setExpandedTables] = useState({});

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch('http://localhost:5000/schema');
        const data = await response.json();
        console.log('Schema data received:', data);
        setSchema(data);
      } catch (err) {
        console.error('Schema fetch error:', err);
        setError('Failed to fetch schema');
      }
      setLoading(false);
    };
    fetchSchema();
  }, []);

  const toggleTable = (tableName) => {
    setExpandedTables(prev => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  const getKeyIcon = (key) => {
    if (key === 'PRI') return <Key className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />;
    if (key === 'UNI') return <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />;
    return null;
  };

  const getTypeColor = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('int') || lowerType.includes('decimal') || lowerType.includes('float')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (lowerType.includes('varchar') || lowerType.includes('text') || lowerType.includes('char')) {
      return 'bg-green-50 text-green-700 border-green-200';
    }
    if (lowerType.includes('date') || lowerType.includes('time')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    if (lowerType.includes('bool')) {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    }
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mt-4 sm:mt-8 mx-2 sm:mx-0">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-blue-500" />
          <p className="text-gray-600 font-medium text-sm sm:text-base">Loading schema...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mt-4 sm:mt-8 mx-2 sm:mx-0">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <p className="font-medium text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (!schema) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mt-4 sm:mt-8 mx-2 sm:mx-0">
        <p className="text-gray-600 text-sm sm:text-base">No schema data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg border border-slate-200 p-3 sm:p-6 mt-4 sm:mt-8 mx-2 sm:mx-0">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
          <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Database Schema</h2>
          <p className="text-gray-600 text-xs sm:text-sm">{Object.keys(schema).length} tables found</p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {schema.map((tableData) => {
          // Handle both old and new schema formats
          const tableName = tableData.table;
          const columns = tableData.columns;
          const relationships = tableData.relationships || [];
          
          // Ensure columns is an array
          if (!Array.isArray(columns)) {
            console.error(`Table ${tableName} columns is not an array:`, columns);
            return null;
          }

          return (
            <div key={tableName} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-gray-150 transition-colors duration-200"
                onClick={() => toggleTable(tableName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <Table className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{tableName}</h3>
                    <div className="hidden sm:flex items-center space-x-2">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {columns.length} columns
                      </span>
                      {relationships.length > 0 && (
                        <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {relationships.length} relationships
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="sm:hidden flex flex-col text-xs text-gray-600">
                      <span>{columns.length} cols</span>
                      {relationships.length > 0 && <span>{relationships.length} rels</span>}
                    </div>
                    {expandedTables[tableName] ? (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              {expandedTables[tableName] && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Column
                        </th>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                          Nullable
                        </th>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Key
                        </th>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                          Default
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {columns.map((col, index) => (
                        <tr key={col.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                <span className="font-medium text-gray-900 text-sm">{col.name}</span>
                                {col.key && getKeyIcon(col.key)}
                              </div>
                              <div className="sm:hidden mt-1">
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                  col.nullable 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {col.nullable ? 'Null' : 'Not Null'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(col.type)}`}>
                              <span className="hidden sm:inline">{col.type}</span>
                              <span className="sm:hidden">{col.type.split('(')[0]}</span>
                            </span>
                          </td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center hidden sm:table-cell">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              col.nullable 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {col.nullable ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                            {col.key ? (
                              <div className="flex items-center justify-center space-x-1">
                                {getKeyIcon(col.key)}
                                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{col.key}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                            <span className={`text-sm ${col.default ? 'text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded' : 'text-gray-400'}`}>
                              {col.default || '-'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {relationships.length > 0 && (
                    <div className="bg-blue-50 px-3 sm:px-6 py-3 sm:py-4 border-t border-blue-100">
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">Relationships</h4>
                      <div className="space-y-1">
                        {relationships.map((rel, index) => (
                          <div key={index} className="text-xs sm:text-sm text-blue-700 break-all sm:break-normal">
                            <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">
                              {rel.column}
                            </code>
                            <span className="mx-1">→</span>
                            <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">
                              {rel.referencedTable}.{rel.referencedColumn}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SchemaDisplay;