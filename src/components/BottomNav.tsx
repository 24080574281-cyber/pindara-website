import React from 'react';
import { PageTab } from '../types';

interface BottomNavProps {
  currentTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  streakDays: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, streakDays }) => {
  const tabs = [
    { id: 'beranda' as PageTab, label: 'Beranda', icon: 'roofing' },
    { id: 'trace' as PageTab, label: 'Trace', icon: 'qr_code_scanner' },
    { id: 'shop' as PageTab, label: 'Shop', icon: 'storefront' },
    { id: 'explore' as PageTab, label: 'Explore', icon: 'sailing' },
    {
      id: 'streak' as PageTab,
      label: 'Streak',
      icon: 'local_fire_department',
      badge: `${streakDays}d`,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#FFF8F1]/95 backdrop-blur-xl border-t border-[#123E46]/10 shadow-[0_-4px_24px_-4px_rgba(18,62,70,0.08)] pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5">
      <div className="flex items-center justify-around max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#00282E] font-bold scale-105'
                  : 'text-[#1F1B12]/60 hover:text-[#00282E]'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isActive ? 'text-[#006A66]' : ''
                  }`}
                  style={tab.id === 'streak' && isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#DE9050] text-[#FFF8F1] text-[9px] font-extrabold rounded-full leading-tight shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-[#00282E]' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#006A66] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
