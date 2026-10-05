import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
  Filter,
  FileSpreadsheet
} from 'lucide-react';

export function DataTable({
  columns,
  data = [],
  searchPlaceholder = 'Search records...',
  searchKeys = [],
  filterConfigs = [],
  initialPageSize = 10,
  title,
  subtitle,
  actions
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle filter changes
  const handleFilterChange = (key, val) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: val
    }));
    setCurrentPage(1);
  };

  // Filtered and Sorted Data
  const processedData = useMemo(() => {
    let result = Array.isArray(data) ? [...data] : [];

    // 1. Instant Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        if (searchKeys.length > 0) {
          return searchKeys.some(k => {
            const val = item[k];
            return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
          });
        }
        return Object.values(item).some(
          val => val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        );
      });
    }

    // 2. Dropdown Filters
    Object.entries(activeFilters).forEach(([k, filterVal]) => {
      if (filterVal && filterVal !== 'ALL') {
        result = result.filter(item => String(item[k]) === filterVal);
      }
    });

    // 3. Sorting
    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const cmp = String(valA).localeCompare(String(valB));
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [data, searchQuery, activeFilters, sortKey, sortDirection, searchKeys]);

  // Pagination calculation
  const totalItems = processedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = processedData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header bar with Search and Filters */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
        <div>
          {title && (
            <h3 className="font-bold text-sm text-slate-900 font-serif flex items-center gap-2">
              {title}
              <span className="text-[11px] font-mono font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                {totalItems} total
              </span>
            </h3>
          )}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Instant Search Bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000]"
            />
          </div>

          {/* Dynamic Filters */}
          {filterConfigs.map(cfg => (
            <div key={cfg.key} className="flex items-center gap-1">
              <select
                value={activeFilters[cfg.key] || 'ALL'}
                onChange={e => handleFilterChange(cfg.key, e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000]"
              >
                <option value="ALL">All {cfg.label}</option>
                {cfg.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {actions}
        </div>
      </div>

      {/* Table Data Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-4 py-3 text-[11px] uppercase tracking-wider font-mono select-none ${
                    col.sortable ? 'cursor-pointer hover:bg-slate-100/80' : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rIdx) => (
                <tr
                  key={row.id || rIdx}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-slate-700 align-middle ${col.className || ''}`}
                    >
                      {col.render ? col.render(row, startIndex + rIdx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-slate-400 text-xs italic"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-3 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Showing</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 rounded border border-slate-200 bg-white font-medium text-xs text-slate-700 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>
            rows • {totalItems === 0 ? 0 : startIndex + 1}–{endIndex} of {totalItems} entries
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={safeCurrentPage === 1}
            className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 1)
            .map((p, idx, arr) => {
              const prev = arr[idx - 1];
              return (
                <React.Fragment key={p}>
                  {prev && p - prev > 1 && <span className="px-1 text-slate-400">...</span>}
                  <button
                    onClick={() => setCurrentPage(p)}
                    className={`min-w-[28px] h-7 px-2 rounded text-xs font-semibold ${
                      p === safeCurrentPage
                        ? 'bg-[#800000] text-white shadow-xs'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              );
            })}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage === totalPages || totalItems === 0}
            className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default DataTable;
