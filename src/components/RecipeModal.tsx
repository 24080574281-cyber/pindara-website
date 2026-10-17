import React, { useState, useEffect } from 'react';
import { RecipeIdea } from '../types';

interface RecipeModalProps {
  recipe: RecipeIdea | null;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes default
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (recipe) {
      const minutes = parseInt(recipe.cookTime) || 3;
      setTimerSeconds(minutes * 60);
      setTimerRunning(false);
    }
  }, [recipe]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  if (!recipe) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#123E46]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FFF8F1] rounded-3xl overflow-hidden shadow-2xl border border-[#123E46]/10 flex flex-col max-h-[90vh]">
        {/* Modal Header Media */}
        <div className="relative h-48 w-full bg-[#123E46]">
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123E46] via-[#123E46]/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="px-2 py-0.5 rounded-full bg-[#DE9050] text-[#FFF8F1] text-[10px] font-bold uppercase tracking-wider">
              {recipe.tag} • {recipe.cookTime}
            </span>
            <h3 className="font-bold text-base sm:text-lg leading-tight mt-1">{recipe.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Interactive Cooking Timer */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#55C6C0]/40 flex items-center justify-between shadow-sm">
            <div>
              <span className="font-bold text-[#123E46] block text-xs">Timer Masak Pindara</span>
              <span className="text-[11px] text-gray-500">Hitung mundur durasi rebusan mi</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl font-extrabold text-[#006A66]">
                {formatTimer(timerSeconds)}
              </span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  timerRunning
                    ? 'bg-[#DE9050] text-white'
                    : 'bg-[#123E46] text-white hover:bg-[#1B535D]'
                }`}
              >
                {timerRunning ? 'Jeda' : timerSeconds === 0 ? 'Selesai!' : 'Mulai'}
              </button>
            </div>
          </div>

          {/* Chef Tip */}
          <div className="p-3 rounded-2xl bg-[#86F5EE]/30 border border-[#55C6C0]/30 text-[#00201E] space-y-1">
            <div className="flex items-center gap-1 font-bold text-xs text-[#006A66]">
              <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
              <span>Trik Rahasia Chef:</span>
            </div>
            <p className="text-[11px] leading-relaxed">{recipe.chefTip}</p>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="font-bold text-xs text-[#123E46] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#006A66]">kitchen</span>
              <span>Bahan yang Dibutuhkan:</span>
            </h4>
            <ul className="space-y-1.5 bg-white p-3 rounded-2xl border border-[#123E46]/10">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-[#1F1B12]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE9050] mt-1.5 shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="font-bold text-xs text-[#123E46] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#006A66]">menu_book</span>
              <span>Langkah Memasak:</span>
            </h4>
            <div className="space-y-2">
              {recipe.steps.map((st, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-white border border-[#123E46]/10 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#123E46] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-[11px] text-[#1F1B12]/80 leading-relaxed">{st}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-[#123E46]/10 text-right">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#123E46] text-white font-bold text-xs hover:bg-[#1B535D] transition-colors"
          >
            Tutup Panduan Resep
          </button>
        </div>
      </div>
    </div>
  );
};
