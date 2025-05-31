import { useState, useEffect, useRef } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import useResizeObserver from '@react-hook/resize-observer';
import { Lock, Unlock } from 'lucide-react';

function RelationshipDiagram() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const containerRef = useRef(null);
  const [locked, setLocked] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const API_URL = import.meta.env.VITE_API_URL || 'https://sqlgen-ai.onrender.com';

  useResizeObserver(containerRef, (entry) => {
    const { width, height } = entry.contentRect;
    setDimensions({ width, height });
  });

  const toggleLock = () => setLocked((prev) => !prev);

  useEffect(() => {
    async function fetchSchema() {
      try {
        const response = await fetch(`${API_URL}/schema`);
        if (!response.ok) throw new Error('Failed to fetch schema');
        const schema = await response.json();

        const tableNodes = schema.map((tableObj, index) => {
          const baseCol = index % 4;
          const baseRow = Math.floor(index / 4);

          const isHighlighted = searchTerm && tableObj.table.toLowerCase().includes(searchTerm.toLowerCase());
          const isSelected = selectedTable === tableObj.table;

          return {
            id: tableObj.table,
            type: 'default',
            data: {
              label: (
                <div
                  className={`
                    relative group cursor-pointer transition-all duration-300 transform hover:scale-105
                    ${isSelected ? 'ring-4 ring-purple-400 ring-opacity-60' : ''}
                    ${isHighlighted ? 'ring-2 ring-yellow-400' : ''}
                  `}
                  onClick={() => setSelectedTable(isSelected ? null : tableObj.table)}
                >
                  <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 border-2 border-blue-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] max-w-[200px] backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-gray-600 rounded-full shadow-sm"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-ping opacity-20"></div>
                      </div>
                      <span className="font-bold text-gray-800 text-sm truncate flex-1">{tableObj.table}</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-500">Table</span>
                      </div>
                      {tableObj.relationships?.length > 0 && (
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <span className="text-green-600 font-medium">{tableObj.relationships.length} relations</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      Click to highlight connections
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              )
            },
            position: {
              x: 50 + baseCol * 250,
              y: 100 + baseRow * 150
            },
            style: {
              background: 'transparent',
              border: 'none',
              padding: 0,
            }
          };
        });

        const tableEdges = [];
        schema.forEach((tableObj) => {
          tableObj.relationships.forEach((rel, index) => {
            const isConnectedToSelected = selectedTable && (tableObj.table === selectedTable || rel.referencedTable === selectedTable);
            tableEdges.push({
              id: `${tableObj.table}-${rel.referencedTable}-${index}`,
              source: tableObj.table,
              target: rel.referencedTable,
              type: 'smoothstep',
              animated: isConnectedToSelected,
              style: {
                stroke: isConnectedToSelected ? '#8B5CF6' : '#6366F1',
                strokeWidth: isConnectedToSelected ? 3 : 2,
                opacity: selectedTable && !isConnectedToSelected ? 0.3 : 1,
              }
            });
          });
        });

        setNodes(tableNodes);
        setEdges(tableEdges);
        setError('');
      } catch (err) {
        setError('Failed to load database relationships');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSchema();
  }, [searchTerm, selectedTable]);

  if (loading) {
    return <div className="p-10 text-center">Loading schema...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl shadow-2xl border border-slate-200 mt-8 h-[85vh] w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 bg-white border-b border-slate-200">
        <h2 className="text-xl font-bold text-indigo-700">Database Relationship Diagram</h2>
        <input
          type="text"
          placeholder="Search tables..."
          className="mt-2 md:mt-0 px-3 py-2 border border-slate-300 rounded-md shadow-sm text-sm w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div ref={containerRef} className="w-full h-[calc(100%-60px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          panOnDrag={!locked}
          zoomOnScroll={!locked}
          zoomOnPinch={!locked}
          panOnScroll={!locked}
          elementsSelectable={!locked}
          nodesDraggable={!locked}
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <Controls />
          <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}>
            <button
              onClick={() => setLocked((prev) => !prev)}
              title={locked ? 'Unlock view' : 'Lock view'}
              className="p-2 bg-white border border-gray-300 rounded shadow-md hover:bg-gray-50 transition-all"
            >
              {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>
          </div>

          <MiniMap />
          <Background gap={16} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default RelationshipDiagram;