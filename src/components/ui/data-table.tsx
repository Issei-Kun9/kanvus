"use client";

import * as React from "react";
import {
  ChevronDown, ChevronUp, ChevronsUpDown, Check, ChevronsLeft,
  ChevronsRight, ChevronLeft, ChevronRight, Search, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Column<T> {
  id: string;
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  bulkActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: (selected: T[]) => void;
    variant?: "default" | "destructive";
  }[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = "Search...",
  bulkActions = [],
  onRowClick,
  emptyMessage = "No data found",
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

  // Filter data
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(q)
      )
    );
  }, [data, searchQuery]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof T];
      const bVal = b[sortConfig.key as keyof T];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset page on search
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((row) => row.id)));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getSortIcon = (key: string, sortable?: boolean) => {
    if (!sortable) return null;
    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="h-3 w-3" />
      ) : (
        <ChevronDown className="h-3 w-3" />
      );
    }
    return <ChevronsUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50" />;
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      {(searchable || bulkActions.length > 0) && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            {searchable && (
              <div className="relative flex-1 max-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-8 text-sm bg-white/[0.04] border border-white/[0.08] rounded-[12px] text-white placeholder:text-white/30 outline-none focus:border-[#00C896]/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedRows.size > 0 && bulkActions.length > 0 && (
            <div className="flex items-center gap-2 animate-scale-in">
              <Badge className="gradient-primary text-white border-0 text-[10px]">
                {selectedRows.size} selected
              </Badge>
              {bulkActions.map((action, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={action.variant === "destructive" ? "destructive" : "default"}
                  onClick={() => {
                    const selected = data.filter((row) => selectedRows.has(row.id));
                    action.onClick(selected);
                  }}
                  className={cn(
                    "h-8 text-xs rounded-[10px]",
                    action.variant !== "destructive" && "gradient-primary text-white"
                  )}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="glass-card rounded-[16px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {bulkActions.length > 0 && (
                  <th className="w-10 px-4 py-3">
                    <button
                      onClick={handleSelectAll}
                      className={cn(
                        "h-4 w-4 rounded-[4px] border flex items-center justify-center transition-colors",
                        selectedRows.size === paginatedData.length && selectedRows.size > 0
                          ? "bg-[#00C896] border-[#00C896]"
                          : "border-white/20 hover:border-white/40"
                      )}
                    >
                      {selectedRows.size === paginatedData.length && selectedRows.size > 0 && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </button>
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      "px-4 py-3 text-left font-medium text-[11px] uppercase tracking-wider text-white/40",
                      column.sortable && "cursor-pointer select-none group",
                      column.width
                    )}
                    onClick={() => column.sortable && handleSort(column.id)}
                  >
                    <div className="flex items-center gap-1.5">
                      {column.header}
                      {getSortIcon(column.id, column.sortable)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (bulkActions.length > 0 ? 1 : 0)}
                    className="px-4 py-12 text-center text-white/30"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "border-b border-white/[0.04] last:border-0 transition-colors",
                      onRowClick && "cursor-pointer hover:bg-white/[0.02]",
                      selectedRows.has(row.id) && "bg-white/[0.03]"
                    )}
                  >
                    {bulkActions.length > 0 && (
                      <td className="w-10 px-4 py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRow(row.id);
                          }}
                          className={cn(
                            "h-4 w-4 rounded-[4px] border flex items-center justify-center transition-colors",
                            selectedRows.has(row.id)
                              ? "bg-[#00C896] border-[#00C896]"
                              : "border-white/20 hover:border-white/40"
                          )}
                        >
                          {selectedRows.has(row.id) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </button>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.id} className={cn("px-4 py-3", column.width)}>
                        {column.cell
                          ? column.cell(row)
                          : column.accessorKey
                          ? String(row[column.accessorKey] ?? "")
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <p className="text-xs text-white/30">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
              {sortedData.length}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-7 w-7 rounded-[8px] text-white/40 hover:text-white/60 disabled:opacity-20"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-7 w-7 rounded-[8px] text-white/40 hover:text-white/60 disabled:opacity-20"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "h-7 w-7 rounded-[8px] text-xs",
                      currentPage === page
                        ? "gradient-primary text-white"
                        : "text-white/40 hover:text-white/60"
                    )}
                  >
                    {page}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-7 w-7 rounded-[8px] text-white/40 hover:text-white/60 disabled:opacity-20"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-7 w-7 rounded-[8px] text-white/40 hover:text-white/60 disabled:opacity-20"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
