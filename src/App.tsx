/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { TracePage } from './pages/TracePage';
import { ShopPage } from './pages/ShopPage';
import { ExplorePage } from './pages/ExplorePage';
import { StreakPage } from './pages/StreakPage';
import { ScanModal } from './components/ScanModal';
import { MemberModal } from './components/MemberModal';
import { NotificationModal } from './components/NotificationModal';
import { CartDrawer, CartItemEntry } from './components/CartDrawer';
import { RecipeModal } from './components/RecipeModal';
import {
  INITIAL_LEDGER,
  INITIAL_PRODUCT,
  INITIAL_USER,
  RECIPES,
} from './data/mockData';
import {
  LedgerEntry,
  PageTab,
  ProductDetails,
  ProductVariant,
  RecipeIdea,
  RewardItem,
  UserAccount,
  UserVoucher,
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('beranda');
  const [user, setUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('pindara_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [ledger, setLedger] = useState<LedgerEntry[]>(() => {
    const saved = localStorage.getItem('pindara_ledger');
    return saved ? JSON.parse(saved) : INITIAL_LEDGER;
  });

  const [product, setProduct] = useState<ProductDetails>(INITIAL_PRODUCT);
  const [cart, setCart] = useState<CartItemEntry[]>([]);
  const [appliedVoucher, setAppliedVoucher] = useState<UserVoucher | null>(null);

  // Trace batch code passing
  const [targetBatchCode, setTargetBatchCode] = useState('PND-JPR-2025-001');

  // Modals
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeIdea | null>(null);

  // Daily tracker flags
  const [isCheckedInToday, setIsCheckedInToday] = useState(true);
  const [isDailyClaimed, setIsDailyClaimed] = useState(false);
  const [isQuizAnsweredToday, setIsQuizAnsweredToday] = useState(false);

  // Admin Config
  const [adminWhatsApp, setAdminWhatsApp] = useState('6281234567890');

  // Toast notification
  const [toast, setToast] = useState<{ msg: string; type?: 'info' | 'success' } | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('pindara_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pindara_ledger', JSON.stringify(ledger));
  }, [ledger]);

  // Support direct route /trace/CODE from URL path or hash
  useEffect(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;

    if (path.includes('/trace/')) {
      const code = path.split('/trace/')[1];
      if (code) {
        setTargetBatchCode(code.toUpperCase());
        setCurrentTab('trace');
      }
    } else if (hash) {
      const cleanHash = hash.replace('#', '');
      if (cleanHash.startsWith('trace-')) {
        const code = cleanHash.replace('trace-', '');
        setTargetBatchCode(code.toUpperCase());
        setCurrentTab('trace');
      } else if (['beranda', 'trace', 'shop', 'explore', 'streak'].includes(cleanHash)) {
        setCurrentTab(cleanHash as PageTab);
      }
    }
  }, []);

  const showToast = (msg: string, type: 'info' | 'success' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addLedgerEntry = (title: string, desc: string, delta: number, type: 'EARNED' | 'REDEEMED') => {
    const newEntry: LedgerEntry = {
      id: `led-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }),
      title,
      description: desc,
      pointsDelta: delta,
      type,
      balanceAfter: user.points + delta,
    };
    setLedger((prev) => [newEntry, ...prev]);
  };

  // Claim packaging code (+50 pts)
  const handleClaimSuccess = (code: string, points: number) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + points,
      claimedCodes: [...prev.claimedCodes, code],
    }));
    addLedgerEntry(`Klaim Kode Kemasan: ${code}`, 'Verifikasi kemasan batch orisinil', points, 'EARNED');
    showToast(`+${points} Poin berhasil diklaim untuk kemasan ${code}!`);
  };

  // Claim batch points from Trace page (+50 pts)
  const handleClaimBatchPoints = (batchCode: string) => {
    if (user.claimedCodes.includes(batchCode)) {
      showToast(`Batch ${batchCode} sudah pernah diklaim sebelumnya.`, 'info');
      return;
    }
    setUser((prev) => ({
      ...prev,
      points: prev.points + 50,
      claimedCodes: [...prev.claimedCodes, batchCode],
    }));
    addLedgerEntry(`Verifikasi Batch ${batchCode}`, 'Pemeriksaan ketertelusuran produk orisinil', 50, 'EARNED');
    showToast(`+50 Poin Streak ditambahkan ke akunmu!`);
  };

  // Daily check in (+10 pts)
  const handleDailyCheckIn = () => {
    if (isCheckedInToday) return;
    setIsCheckedInToday(true);
    setUser((prev) => ({
      ...prev,
      points: prev.points + 10,
      streakDays: prev.streakDays + 1,
    }));
    addLedgerEntry('Daily Check-in Kuliner', 'Check-in harian di PINDARA Digital Hub', 10, 'EARNED');
    showToast(`+10 Pts berhasil didapatkan! Streak sekarang: ${user.streakDays + 1} Hari 🔥`);
  };

  // Daily claim points on homepage (+25 pts)
  const handleDailyClaimPoints = () => {
    if (isDailyClaimed) return;
    setIsDailyClaimed(true);
    setUser((prev) => ({
      ...prev,
      points: prev.points + 25,
    }));
    addLedgerEntry('Klaim Harian Beranda', 'Bonus penjelajah kuliner pesisir harian', 25, 'EARNED');
    showToast(`+25 Pts Poin Bahari Berhasil Ditambahkan ke Akunmu!`);
  };

  // Answer Quiz (+25 pts)
  const handleAnswerQuiz = (points: number) => {
    if (isQuizAnsweredToday) return;
    setIsQuizAnsweredToday(true);
    setUser((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
    addLedgerEntry('Kuis Trivia Pindang Serani', 'Menjawab kuis rempah dengan benar', points, 'EARNED');
    showToast(`Jawaban Benar! +${points} Poin Streak berhasil ditambahkan!`);
  };

  // Cart Management
  const handleAddToCart = (variant: ProductVariant, qty: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.variant.id === variant.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += qty;
        return next;
      }
      return [...prev, { variant, quantity: qty }];
    });
    showToast(`${qty}x ${variant.name} dimasukkan ke keranjang!`);
  };

  const handleBuyNow = (variant: ProductVariant, qty: number) => {
    handleAddToCart(variant, qty);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (variantId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => {
          if (it.variant.id === variantId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItemEntry[]
    );
  };

  const handleRemoveCartItem = (variantId: string) => {
    setCart((prev) => prev.filter((it) => it.variant.id !== variantId));
  };

  // Voucher Application in Cart
  const handleApplyVoucherCode = (code: string): boolean => {
    const found = user.vouchers.find((v) => v.code.toUpperCase() === code.toUpperCase() && v.status === 'ACTIVE');
    if (found) {
      setAppliedVoucher(found);
      showToast(`Voucher ${found.code} berhasil diterapkan!`);
      return true;
    }
    return false;
  };

  // Reward Redemption from Catalog
  const handleRedeemReward = (reward: RewardItem): boolean => {
    if (user.points < reward.pointsRequired) return false;

    const newCode = `PND-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${reward.type === 'percent' ? '50PCT' : 'VOC'}`;
    const newVoucher: UserVoucher = {
      id: `voc-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code: newCode,
      discountAmount: reward.discountValue || (reward.type === 'free_product' ? 8500 : 5000),
      discountType: reward.type === 'percent' ? 'percent' : reward.type === 'free_product' ? 'free_product' : 'nominal',
      minPurchase: reward.minPurchase || 0,
      expiresAt: '31 Des 2026',
      status: 'ACTIVE',
    };

    setUser((prev) => ({
      ...prev,
      points: prev.points - reward.pointsRequired,
      vouchers: [newVoucher, ...prev.vouchers],
    }));

    addLedgerEntry(
      `Tukar Hadiah: ${reward.title}`,
      `Penukaran kode voucher reward ${newCode}`,
      -reward.pointsRequired,
      'REDEEMED'
    );

    showToast(`Berhasil menukar ${reward.pointsRequired} Poin dengan "${reward.title}"!`);
    return true;
  };

  // User Switcher simulation (Budi vs Guest)
  const handleSwitchUser = (type: 'budi' | 'guest') => {
    if (type === 'budi') {
      setUser(INITIAL_USER);
      showToast('Beralih ke akun Budi Santoso (Member Kuliner Jepara)');
    } else {
      setUser({
        id: 'user-guest',
        name: 'Tamu Baru',
        email: 'tamu@pindara.id',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        role: 'member',
        points: 50,
        streakDays: 1,
        lastActiveDate: '2026-10-17',
        levelName: 'Penikmat Pemula (Level 1)',
        badges: [
          {
            id: 'badge-1',
            title: 'Starter Badge',
            description: 'Menjaga streak konsisten selama 3 hari berturut-turut.',
            icon: '🎖️',
            unlocked: false,
          },
          {
            id: 'badge-2',
            title: 'Serani Enthusiast',
            description: 'Menyelesaikan tantangan rasa 7 hari berturut-turut.',
            icon: '🌟',
            unlocked: false,
          },
        ],
        claimedCodes: [],
        vouchers: [],
      });
      showToast('Beralih ke akun Tamu Baru (Streak 1 Hari)');
    }
  };

  // Admin Config update
  const handleUpdateAdminConfig = (
    price: number,
    stock: 'Tersedia' | 'Stok Menipis' | 'Habis',
    wa: string
  ) => {
    setProduct((prev) => ({
      ...prev,
      basePrice: price,
      stockStatus: stock,
      variants: prev.variants.map((v) =>
        v.id === 'single-pack' ? { ...v, price } : v
      ),
    }));
    setAdminWhatsApp(wa);
    showToast('Pengaturan toko admin berhasil disimpan!');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-[#1F1B12] flex flex-col font-sans selection:bg-[#55C6C0]/30 selection:text-[#123E46]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 inset-x-4 z-50 max-w-sm mx-auto bg-[#123E46] text-[#FFF8F1] px-4 py-3 rounded-2xl shadow-2xl border border-[#55C6C0]/30 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#86F5EE] text-[20px]">
              verified
            </span>
            <span className="text-xs font-semibold leading-snug">{toast.msg}</span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-white/60 hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Responsive Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(t) => {
          setCurrentTab(t);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onOpenProfile={() => setIsMemberOpen(true)}
        onOpenNotifications={() => setIsNotifOpen(true)}
        onQuickBuy={() => {
          const defaultVariant = product.variants[1] || product.variants[0];
          handleBuyNow(defaultVariant, 1);
        }}
        unreadCount={2}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-24 md:pb-12">
        {currentTab === 'beranda' && (
          <HomePage
            onNavigateTab={(t) => {
              setCurrentTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickBuy={() => {
              const defaultVariant = product.variants[1] || product.variants[0];
              handleBuyNow(defaultVariant, 1);
            }}
            onOpenScanModal={() => setIsScanOpen(true)}
            onVerifyBatchCode={(code) => {
              setTargetBatchCode(code);
            }}
            streakDays={user.streakDays}
            userPoints={user.points}
            onDailyClaimPoints={handleDailyClaimPoints}
            isDailyClaimed={isDailyClaimed}
          />
        )}

        {currentTab === 'trace' && (
          <TracePage
            initialCode={targetBatchCode}
            onClaimBatchPoints={handleClaimBatchPoints}
            claimedCodes={user.claimedCodes}
          />
        )}

        {currentTab === 'shop' && (
          <ShopPage
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            adminWhatsApp={adminWhatsApp}
            onUpdateAdminConfig={handleUpdateAdminConfig}
          />
        )}

        {currentTab === 'explore' && (
          <ExplorePage
            onOpenRecipe={(rec) => setSelectedRecipe(rec)}
            onAnswerQuiz={handleAnswerQuiz}
            onExploreBuyHampers={() => {
              const hampers = product.variants.find((v) => v.id === 'kartini-hampers') || product.variants[0];
              handleBuyNow(hampers, 1);
            }}
            isQuizAnsweredToday={isQuizAnsweredToday}
          />
        )}

        {currentTab === 'streak' && (
          <StreakPage
            user={user}
            onCheckIn={handleDailyCheckIn}
            isCheckedInToday={isCheckedInToday}
            onOpenScanModal={() => setIsScanOpen(true)}
            onOpenExploreStory={() => {
              setCurrentTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRedeemReward={handleRedeemReward}
            onQuickQuiz={() => handleAnswerQuiz(25)}
            isQuizAnsweredToday={isQuizAnsweredToday}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(t) => {
          setCurrentTab(t);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        streakDays={user.streakDays}
      />

      {/* Modals & Drawers */}
      <ScanModal
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        claimedCodes={user.claimedCodes}
        onClaimSuccess={handleClaimSuccess}
      />

      <MemberModal
        isOpen={isMemberOpen}
        onClose={() => setIsMemberOpen(false)}
        user={user}
        ledger={ledger}
        onUseVoucher={(code) => {
          handleApplyVoucherCode(code);
          setCurrentTab('shop');
          setIsCartOpen(true);
        }}
        onSwitchUser={handleSwitchUser}
      />

      <NotificationModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        onNavigateToTab={(t) => {
          setCurrentTab(t);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        appliedVoucher={appliedVoucher}
        onApplyVoucherCode={handleApplyVoucherCode}
        onRemoveVoucher={() => setAppliedVoucher(null)}
        adminWhatsApp={adminWhatsApp}
      />

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
