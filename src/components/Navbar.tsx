import React from 'react';
import { PageTab, UserAccount } from '../types';
import { ASSETS } from '../data/mockData';

interface NavbarProps {
  currentTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  user: UserAccount;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onQuickBuy: () => void;
  unreadCount?: number;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  user,
  onOpenProfile,
  onOpenNotifications,
  onQuickBuy,
  unreadCount = 2,
  cartCount = 0,
}) => {
  const getTabLabel = (tab: PageTab) => {
    switch (tab) {
      case 'beranda':
        return 'Beranda';
      case 'trace':
        return 'DARA-TRACE';
      case 'shop':
        return 'DARA-SHOP';
      case 'explore':
        return 'DARA-EXPLORE';
      case 'streak':
        return 'DARA-STREAK';
      default:
        return 'Digital Hub';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#FFF8F1]/90 backdrop-blur-xl border-b border-[#123E46]/10 shadow-[0_4px_20px_-2px_rgba(18,62,70,0.06)] transition-all">
      <div className="max-w-6xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('beranda')}
            className="flex items-center gap-2 group text-left transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#55C6C0]/20 p-0.5 border border-[#55C6C0] shrink-0">
              <img
                src={ASSETS.daraEat}
                alt="Maskot Dara"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-['Chewy',sans-serif] text-2xl tracking-wide text-[#123E46] leading-none">
                  PINDARA
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] font-bold text-[10px] tracking-wider uppercase">
                  JEPARA
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#123E46]/70 hidden sm:inline">
                Mi Instan Pindang Serani
              </span>
              <span className="text-[11px] font-semibold text-[#006A66] sm:hidden line-clamp-1">
                {getTabLabel(currentTab)}
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links (4-5 concise single-line text links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#123E46]/80">
          <button
            onClick={() => onTabChange('beranda')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              currentTab === 'beranda'
                ? 'text-[#006A66] font-bold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#006A66] after:rounded-full'
                : 'hover:text-[#123E46]'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => onTabChange('trace')}
            className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1 ${
              currentTab === 'trace'
                ? 'text-[#006A66] font-bold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#006A66] after:rounded-full'
                : 'hover:text-[#123E46]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>DARA-TRACE</span>
          </button>
          <button
            onClick={() => onTabChange('shop')}
            className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1 ${
              currentTab === 'shop'
                ? 'text-[#006A66] font-bold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#006A66] after:rounded-full'
                : 'hover:text-[#123E46]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span>DARA-SHOP</span>
          </button>
          <button
            onClick={() => onTabChange('explore')}
            className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1 ${
              currentTab === 'explore'
                ? 'text-[#006A66] font-bold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#006A66] after:rounded-full'
                : 'hover:text-[#123E46]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">sailing</span>
            <span>DARA-EXPLORE</span>
          </button>
          <button
            onClick={() => onTabChange('streak')}
            className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1 ${
              currentTab === 'streak'
                ? 'text-[#DE9050] font-bold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#DE9050] after:rounded-full'
                : 'hover:text-[#DE9050]'
            }`}
          >
            <span className="text-[16px]">🔥</span>
            <span>DARA-STREAK</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#F4A261]/20 text-[#79513A] font-bold">
              {user.streakDays}d
            </span>
          </button>
        </nav>

        {/* Action Zone: Notifications, Cart / Buy CTA, Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#123E46]/80 hover:text-[#123E46] hover:bg-[#123E46]/5 transition-colors active:scale-95"
            title="Pemberitahuan"
            aria-label="Pemberitahuan"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#DE9050] ring-2 ring-[#FFF8F1]" />
            )}
          </button>

          {/* Primary CTA (Desktop & Tablet) */}
          <button
            onClick={onQuickBuy}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#123E46] text-[#FFF8F1] hover:bg-[#1B535D] font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Beli Sekarang</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#DE9050] text-[#FFF8F1] text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Member Profile Avatar button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-[#123E46]/5 transition-colors active:scale-95"
            title="Profil & Saldo Poin"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#86F5EE] shadow-sm">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-[#123E46] leading-tight line-clamp-1 max-w-[90px]">
                {user.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-[#006A66] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">toll</span>
                {user.points} Pts
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
