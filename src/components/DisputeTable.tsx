
"use client";

import { Pencil, Download, Send, Trash2, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Letter {
  id: string;
  date: string;
  to: string;
  name: string;
  status: string;
  active: boolean;
}

export default function DisputeTable({ initialLetters }: { initialLetters: Letter[] }) {
  const [letters, setLetters] = useState(initialLetters);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  // Sync state with incoming props when search/filters change server-side
  useEffect(() => {
    setLetters(initialLetters);
    setSelectedIds(new Set()); // Reset selection when letters change
  }, [initialLetters]);

  const toggleSelectAll = () => {
    if (selectedIds.size === letters.length && letters.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(letters.map(l => l.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleEdit = async (id: string) => {
    const letter = letters.find(l => l.id === id);
    const newContent = prompt("Edit Dispute Content:", letter?.name);
    if (!newContent) return;
     
    try {
      const response = await fetch(`/api/letters/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'EDIT', content: newContent })
      });

      if (response.ok) {
        setLetters(letters.map(l => l.id === id ? { ...l, name: newContent } : l));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dispute letter?")) return;
    
    try {
      const response = await fetch(`/api/letters/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setLetters(letters.filter(l => l.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} selected items?`)) return;

    try {
      const deletePromises = Array.from(selectedIds).map(id => fetch(`/api/letters/${id}`, { method: 'DELETE' }));
      const results = await Promise.all(deletePromises);
      
      if (results.every(r => r.ok)) {
        setLetters(letters.filter(l => !selectedIds.has(l.id)));
        setSelectedIds(new Set());
        router.refresh();
      }
    } catch (error) {
      console.error("Bulk delete failed:", error);
    }
  };

  const handleSend = async (id: string) => {
    try {
      const response = await fetch(`/api/letters/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SEND' })
      });

      if (response.ok) {
        setLetters(letters.map(l => l.id === id ? { ...l, status: 'Sent' } : l));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (id: string) => {
    const letter = letters.find(l => l.id === id);
    const content = `DISPUTE LETTER\nDate: ${letter?.date}\nTo: ${letter?.to}\n\nSubject: Formal Dispute of Accuracy\n\nThis is a formal dispute regarding ${letter?.name}. Please investigate this account...`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispute_${id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {/* Table Toolbar Area */}
      <div className="flex items-center justify-between px-8 py-4 bg-slate-50/50 border-b border-slate-100">
         <div className="flex items-center gap-4">
            <button 
              onClick={handleBulkDelete}
              disabled={selectedIds.size === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm
                ${selectedIds.size > 0 
                  ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100' 
                  : 'bg-white text-slate-300 border border-slate-100 cursor-not-allowed opacity-50'}`}>
               <Trash2 size={14} />
               Delete Selected ({selectedIds.size})
            </button>
         </div>
      </div>

      <div className="overflow-x-auto">
        {letters.length > 0 ? (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
              <tr>
                <th className="px-8 py-5 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.size === letters.length && letters.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                  />
                </th>
                <th className="px-4 py-5">Date Generated</th>
                <th className="px-4 py-5">Recipient Info</th>
                <th className="px-4 py-5">Letter Context</th>
                <th className="px-4 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {letters.map((letter) => (
                <tr key={letter.id} className={`group hover:bg-slate-50/50 transition-colors ${selectedIds.has(letter.id) ? 'bg-indigo-50/30' : ''}`}>
                  <td className="px-8 py-6">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(letter.id)}
                      onChange={() => toggleSelect(letter.id)}
                      className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                    />
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap font-medium text-slate-900">{letter.date}</td>
                  <td className="px-4 py-6 font-semibold text-slate-700">{letter.to}</td>
                  <td className="px-4 py-6 text-slate-500 truncate max-w-[200px]">{letter.name}</td>
                  <td className="px-4 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                      ${letter.status === 'Sent' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${letter.status === 'Sent' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                      {letter.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(letter.id)}
                        className="p-2 rounded-lg bg-white border border-slate-100 text-sky-500 shadow-sm hover:bg-sky-50 transition-all">
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDownload(letter.id)}
                        className="p-2 rounded-lg bg-white border border-slate-100 text-sky-500 shadow-sm hover:bg-sky-50 transition-all">
                        <Download size={16} />
                      </button>
                      <button 
                        disabled={letter.status === 'Sent'}
                        onClick={() => handleSend(letter.id)}
                        className={`p-2 rounded-lg bg-white border border-slate-100 shadow-sm transition-all
                          ${letter.status === 'Sent' ? 'text-slate-300 cursor-not-allowed grayscale' : 'text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}>
                        <Send size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(letter.id)}
                        className="p-2 rounded-lg bg-white border border-slate-100 text-rose-500 shadow-sm hover:bg-rose-50 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
               <Grid size={40} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Queue is Empty</h4>
            <p className="text-slate-400 max-w-xs mx-auto">Upload a credit report to start generating AI-powered dispute letters.</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center px-8 py-6 border-t border-slate-50 bg-slate-50/20">
         <div className="text-xs text-slate-400 font-bold tracking-tight">Total Items: {letters.length}</div>
         <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed transition-all"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-indigo-600 text-indigo-600 font-black text-[10px] shadow-sm shadow-indigo-600/10">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-300 transition-all"><ChevronRight size={16} /></button>
         </div>
      </div>
    </div>
  );
}
