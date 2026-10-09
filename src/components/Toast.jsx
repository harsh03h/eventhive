import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 ${
              isSuccess
                ? 'bg-slate-900/95 border-amber-500/50 text-white'
                : isError
                ? 'bg-rose-950/95 border-rose-500/50 text-rose-200'
                : 'bg-slate-900/95 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
              )}
              <span className="text-xs font-semibold">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
