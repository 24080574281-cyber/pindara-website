import React, { useState } from 'react';
import { ASSETS, MOCK_BATCHES } from '../data/mockData';
import { BatchTraceData, PageTab } from '../types';

interface HomePageProps {
  onNavigateTab: (tab: PageTab) => void;
  onQuickBuy: () => void;
  onOpenScanModal: () => void;
  onVerifyBatchCode: (code: string) => void;
  streakDays: number;
  userPoints: number;
  onDailyClaimPoints: () => void;
  isDailyClaimed: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  onQuickBuy,
  onOpenScanModal,
  onVerifyBatchCode,
  streakDays,
  userPoints,
  onDailyClaimPoints,
  isDailyClaimed,
}) => {
  const [quickCode, setQuickCode] = useState('PND-JPR-2025-001');
  const [traceResult, setTraceResult] = useState<BatchTraceData | null>(null);
  const [showCookingGuide, setShowCookingGuide] = useState(false);

  const handleVerify = () => {
    const trimmed = quickCode.trim().toUpperCase();
    if (MOCK_BATCHES[trimmed]) {
      setTraceResult(MOCK_BATCHES[trimmed]);
    } else {
      // route to full trace page with this code
      onVerifyBatchCode(trimmed);
      onNavigateTab('trace');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-6 pb-12">
      {/* Hero Section */}
      <section className="relative px-4 pt-3 pb-6 overflow-hidden">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#55C6C0]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-28 -right-12 w-72 h-72 bg-[#F4A261]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">
          {/* Innovation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5E5] border border-[#DE9050]/20 shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DE9050] animate-pulse" />
            <span className="text-[11px] font-bold text-[#123E46] tracking-wider uppercase">
              Inovasi Pangan Bahari Jepara
            </span>
          </div>

          {/* Hero Mascot Centerpiece */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square mx-auto mb-1 flex items-center justify-center">
            {/* Radial Backlight Disc */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#86F5EE]/50 via-[#FFF5E5] to-[#F4A261]/40 opacity-80 blur-xl" />
            <img
              src={ASSETS.daraHero}
              alt="Dara Maskot Pindara Mi Instan Rasa Pindang Serani Jepara"
              className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            {/* Floating Taste Pill Mini Interaction */}
            <div className="absolute -bottom-2 -left-2 z-20 bg-white border border-[#123E46]/10 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform -rotate-3 hover:rotate-0 transition-transform">
              <span className="material-symbols-outlined text-[#DE9050] text-[18px]">
                soup_kitchen
              </span>
              <span className="text-xs text-[#123E46] font-extrabold">Asem Segar Autentik</span>
            </div>
            <div className="absolute top-4 -right-1 z-20 bg-white border border-[#123E46]/10 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform rotate-6 hover:rotate-0 transition-transform">
              <span className="material-symbols-outlined text-[#006A66] text-[16px]">set_meal</span>
              <span className="text-xs text-[#123E46] font-bold">100% Ikan Pesisir</span>
            </div>
          </div>

          {/* Headline & Subheadline */}
          <h1 className="font-['Chewy',sans-serif] text-3xl sm:text-5xl text-[#123E46] tracking-wide mt-2 mb-2 leading-tight">
            Cita Rasa Pindang Serani, <br className="hidden sm:inline" />
            Inovasi dalam Setiap Gigitan
          </h1>
          <p className="text-sm sm:text-base text-[#1F1B12]/80 max-w-lg mx-auto mb-5 leading-relaxed">
            Mi instan premium pertama dengan racikan rempah belimbing wuluh, serai gunung, kunyit bakar,
            dan sari ikan pindang asli hasil tangkapan nelayan pesisir Jepara.
          </p>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row w-full gap-3 max-w-sm mx-auto">
            <button
              onClick={onQuickBuy}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#123E46] text-[#FFF8F1] font-bold text-sm shadow-md hover:bg-[#1B535D] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Beli Sekarang (Rp 8.500)</span>
            </button>
            <button
              onClick={() => onNavigateTab('explore')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#86F5EE] text-[#00201E] font-bold text-sm shadow-sm hover:bg-[#55C6C0] active:scale-95 transition-all text-center"
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span>Jelajahi PINDARA</span>
            </button>
          </div>

          {/* Flavor Profile Micro-Indicator */}
          <div className="w-full mt-6 bg-white p-4 rounded-3xl border border-[#123E46]/10 shadow-sm max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#1F1B12]/60 font-bold">
                Profil Rasa Pindara
              </span>
              <span className="text-[11px] text-[#006A66] font-bold">Keseimbangan Sempurna</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-left">
              <div className="bg-[#FFF8F1] p-2.5 rounded-2xl border border-[#123E46]/5">
                <span className="text-[11px] text-[#1F1B12]/70 font-medium block">Asem Segar</span>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#DE9050] h-full rounded-full w-[92%]" />
                </div>
              </div>
              <div className="bg-[#FFF8F1] p-2.5 rounded-2xl border border-[#123E46]/5">
                <span className="text-[11px] text-[#1F1B12]/70 font-medium block">Gurih Pindang</span>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#006A66] h-full rounded-full w-[95%]" />
                </div>
              </div>
              <div className="bg-[#FFF8F1] p-2.5 rounded-2xl border border-[#123E46]/5">
                <span className="text-[11px] text-[#1F1B12]/70 font-medium block">Pedas Serani</span>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#79513A] h-full rounded-full w-[70%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid (Keunggulan Produk) */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[11px] uppercase font-bold text-[#006A66] tracking-wider block">
              Keunggulan Produk
            </span>
            <h2 className="text-xl font-bold text-[#123E46]">Standardisasi Bahari Berkualitas</h2>
          </div>
          <span className="material-symbols-outlined text-[#006A66] text-[28px]">workspace_premium</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-3xl border border-[#123E46]/10 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF5E5] flex items-center justify-center text-[#DE9050] mb-3">
              <span className="material-symbols-outlined text-[22px]">eco</span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#123E46] mb-1">100% Rempah Asli</h3>
              <p className="text-[11px] text-[#1F1B12]/70">Belimbing wuluh, serai, & kunyit bakar asli pesisir.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#123E46]/10 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#86F5EE]/40 flex items-center justify-center text-[#006A66] mb-3">
              <span className="material-symbols-outlined text-[22px]">water</span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#123E46] mb-1">Kaldu Ikan Murni</h3>
              <p className="text-[11px] text-[#1F1B12]/70">Sari ikan laut Jepara segar tanpa pengawet sintesis.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#123E46]/10 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#123E46]/10 flex items-center justify-center text-[#123E46] mb-3">
              <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#123E46] mb-1">Traceable QR</h3>
              <p className="text-[11px] text-[#1F1B12]/70">Keterlacakan batch dari pelabuhan hingga kemasan.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#123E46]/10 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#F4A261]/20 flex items-center justify-center text-[#79513A] mb-3">
              <span className="material-symbols-outlined text-[22px]">vital_signs</span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#123E46] mb-1">Omega-3 & Protein</h3>
              <p className="text-[11px] text-[#1F1B12]/70">Nutrisi lengkap mi sehat dan bernutrisi tinggi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Trace Scanner Widget ("Kenali Produkmu") */}
      <section className="px-4">
        <div className="bg-white p-5 rounded-3xl border border-[#123E46]/10 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#86F5EE]/40 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#123E46] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">fact_check</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#123E46]">Kenali Produkmu</h2>
              <p className="text-xs text-[#1F1B12]/70">Lacak riwayat tangkapan ikan & sertifikasi Halal</p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
                placeholder="PND-JPR-2025-001"
                className="w-full bg-[#FFF8F1] border border-[#123E46]/10 px-4 py-3 rounded-2xl text-xs sm:text-sm font-mono text-[#123E46] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#55C6C0] pr-12"
              />
              <button
                type="button"
                onClick={onOpenScanModal}
                title="Pindai QR Kemasan"
                className="absolute right-2 w-9 h-9 rounded-xl bg-white border border-[#123E46]/10 hover:bg-[#86F5EE]/30 flex items-center justify-center text-[#123E46] transition-all active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleVerify}
              className="w-full py-3 rounded-2xl bg-[#006A66] hover:bg-[#123E46] text-white font-bold text-xs shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>Verifikasi Keterlacakan</span>
            </button>

            {/* In-page preview result box */}
            {traceResult && (
              <div className="mt-3 p-3.5 bg-[#FFF8F1] rounded-2xl border border-[#55C6C0]/40 text-left animate-fadeIn space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#55C6C0]/20">
                  <span className="text-[11px] text-[#006A66] font-extrabold uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Batch Terverifikasi Resmi
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
                    Halal {traceResult.halalCert}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-[#1F1B12]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nomor Batch:</span>
                    <span className="font-mono font-semibold">{traceResult.batchCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tanggal Olah:</span>
                    <span className="font-semibold">{traceResult.productionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Asal Bahan Baku:</span>
                    <span className="font-semibold text-right max-w-[220px] truncate">
                      {traceResult.rawOrigin}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onVerifyBatchCode(traceResult.batchCode);
                    onNavigateTab('trace');
                  }}
                  className="w-full mt-2 py-2 rounded-xl bg-white border border-[#006A66] text-[#006A66] font-bold text-xs hover:bg-[#006A66] hover:text-white transition-colors"
                >
                  Lihat Riwayat Lengkap & Blockchain Hash →
                </button>
              </div>
            )}

            <p className="text-[11px] text-[#1F1B12]/60 text-center flex items-center justify-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[14px] text-[#006A66]">lock</span>
              Didukung simulasi ledger keterlacakan batch & standar mutu BPOM.
            </p>
          </div>
        </div>
      </section>

      {/* Streak & Gamification Preview Card */}
      <section className="px-4">
        <div className="bg-gradient-to-br from-[#123E46] via-[#1B535D] to-[#006A66] text-white p-5 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-white/5 pointer-events-none">
            <span className="material-symbols-outlined text-[140px]">local_fire_department</span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span className="font-['Chewy',sans-serif] text-2xl text-[#86F5EE] tracking-wide">
                  Streak Kuliner Bahari
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/15 text-[#86F5EE] text-[10px] font-bold">
                Level 2: Juragan Pindang
              </span>
            </div>

            {/* Streak Stats */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <span className="text-[11px] text-[#86F5EE] block font-medium">Streak Aktif</span>
                <span className="text-2xl font-extrabold text-white">{streakDays} Hari 🔥</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <span className="text-[11px] text-[#86F5EE] block font-medium">Poin Bahari</span>
                <span className="text-2xl font-extrabold text-[#86F5EE]">{userPoints} Pts</span>
              </div>
            </div>

            {/* Weekly Progress Pills */}
            <div className="flex justify-between items-center my-3 bg-black/20 p-2.5 rounded-2xl">
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => {
                const isPassed = idx < streakDays - 1;
                const isToday = idx === streakDays - 1;
                return (
                  <div key={day} className={`flex flex-col items-center ${idx >= streakDays ? 'opacity-40' : ''}`}>
                    <span className="text-[10px] text-white/70 mb-1">{day}</span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isToday
                          ? 'bg-[#DE9050] text-white ring-2 ring-[#86F5EE]'
                          : isPassed
                          ? 'bg-[#86F5EE] text-[#00201E]'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {isToday ? '🔥' : isPassed ? '✓' : idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
              <p className="text-[11px] text-[#86F5EE]/90">
                Klaim poin harian & kuis kuliner untuk unlock diskon 30%!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onDailyClaimPoints}
                  disabled={isDailyClaimed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all whitespace-nowrap ${
                    isDailyClaimed
                      ? 'bg-white/20 text-white cursor-default'
                      : 'bg-[#DE9050] hover:bg-[#e78438] text-white active:scale-95'
                  }`}
                >
                  {isDailyClaimed ? 'Terklaim ✓' : 'Klaim +25 Pts'}
                </button>
                <button
                  onClick={() => onNavigateTab('streak')}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  Buka Streak →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kisah Warisan & Bahan Baku Pesisir Jepara */}
      <section className="px-4">
        <div className="bg-white p-5 rounded-3xl border border-[#123E46]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold uppercase tracking-wider">
              Warisan Leluhur Jepara
            </span>
          </div>

          <h2 className="text-xl font-bold text-[#123E46]">
            Dari Dapur Pesisir Menembus Panggung Nasional
          </h2>

          <p className="text-xs sm:text-sm text-[#1F1B12]/80 leading-relaxed">
            Pindang Serani dikenal sebagai sup ikan rempah legendaris khas nelayan Jepara dengan kuah bening
            kuning yang asam, segar, pedas, dan beraroma kemangi laut. PINDARA mengemas cita rasa autentik
            ini menjadi sajian mi instan premium yang mendukung kemandirian nelayan lokal di Pantai Kartini dan
            sekitarnya.
          </p>

          {/* Editorial Visual Collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden shadow-sm h-36 sm:h-44 bg-gray-100">
              <img
                src={ASSETS.boatsJepara}
                alt="Perahu Nelayan Jepara saat Fajar"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-36 sm:h-44 bg-gray-100">
              <img
                src={ASSETS.spicesJepara}
                alt="Rempah Asli Belimbing Wuluh & Serai Pindang Serani"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="bg-[#FFF8F1] p-3 rounded-2xl border border-[#123E46]/5">
              <span className="text-xl sm:text-2xl font-extrabold text-[#123E46] block font-['Chewy',sans-serif]">
                45+
              </span>
              <span className="text-[11px] text-[#1F1B12]/70 font-medium">Nelayan Mitra</span>
            </div>
            <div className="bg-[#FFF8F1] p-3 rounded-2xl border border-[#123E46]/5">
              <span className="text-xl sm:text-2xl font-extrabold text-[#006A66] block font-['Chewy',sans-serif]">
                100%
              </span>
              <span className="text-[11px] text-[#1F1B12]/70 font-medium">Rempah Lokal</span>
            </div>
            <div className="bg-[#FFF8F1] p-3 rounded-2xl border border-[#123E46]/5">
              <span className="text-xl sm:text-2xl font-extrabold text-[#DE9050] block font-['Chewy',sans-serif]">
                Zero
              </span>
              <span className="text-[11px] text-[#1F1B12]/70 font-medium">Sintetis Kimia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni Konsumen Nyata */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[11px] uppercase font-bold text-[#006A66] tracking-wider block">
              Ulasan Penikmat Rasa
            </span>
            <h2 className="text-xl font-bold text-[#123E46]">Dicintai Food Enthusiast</h2>
          </div>
          <div className="flex items-center gap-1 bg-[#FFF5E5] px-2.5 py-1 rounded-full border border-[#DE9050]/20">
            <span className="text-[#DE9050] text-sm">⭐</span>
            <span className="text-xs font-bold text-[#123E46]">4.9 / 5.0</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-white p-4 rounded-3xl border border-[#123E46]/10 shadow-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#86F5EE] flex items-center justify-center font-bold text-[#00201E] text-xs">
                AS
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#123E46] block truncate">Andi Sanjaya</span>
                <span className="text-[10px] text-gray-500">Food Blogger Semarang • Terverifikasi</span>
              </div>
              <div className="ml-auto flex text-[#DE9050] text-xs">⭐⭐⭐⭐⭐</div>
            </div>
            <p className="text-xs text-[#1F1B12]/80 italic leading-relaxed">
              “Rasa asam segarnya autentik banget! Sensasi belimbing wuluh dan rempah seraninya persis
              racikan nenek saya di Jepara. Mi kenyal dan tidak bikin eneg.”
            </p>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#123E46]/10 shadow-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF5E5] flex items-center justify-center font-bold text-[#79513A] text-xs">
                DN
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#123E46] block truncate">dr. Nadia Kartika</span>
                <span className="text-[10px] text-gray-500">Ahli Gizi Komunitas Pangan Sehat</span>
              </div>
              <div className="ml-auto flex text-[#DE9050] text-xs">⭐⭐⭐⭐⭐</div>
            </div>
            <p className="text-xs text-[#1F1B12]/80 italic leading-relaxed">
              “Inovasi luar biasa. Mi instan yang mengangkat kearifan pangan maritim dengan kandungan
              Omega-3 alami dari ekstrak sari ikan pindang. Salut buat Jepara!”
            </p>
          </div>
        </div>
      </section>

      {/* Saran Penyajian Khas Banner & Drawer */}
      <section className="px-4">
        <div className="bg-[#86F5EE]/40 border border-[#55C6C0]/40 p-4 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#006A66] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#123E46]">Saran Penyajian Khas</h3>
              <p className="text-[11px] text-[#1F1B12]/70">Tambahkan irisan tomat hijau & kemangi segar</p>
            </div>
          </div>
          <button
            onClick={() => setShowCookingGuide(!showCookingGuide)}
            className="px-3 py-1.5 rounded-full bg-white text-[#123E46] font-bold text-xs shadow-sm hover:bg-[#123E46] hover:text-white transition-all flex items-center gap-1"
          >
            <span>{showCookingGuide ? 'Sembunyikan' : 'Lihat Cara Masak'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {showCookingGuide ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {showCookingGuide && (
          <div className="mt-3 p-4 bg-white rounded-3xl border border-[#123E46]/10 shadow-md animate-fadeIn space-y-2 text-xs">
            <span className="font-bold text-[#123E46] block text-xs">
              Langkah 3 Menit Menikmati Pindara:
            </span>
            <ol className="space-y-2 list-decimal list-inside text-[11px] text-[#1F1B12]/80 leading-relaxed">
              <li>Rebus mi dalam 350ml air mendidih selama 3 menit hingga tekstur pipih kenyal mengembang.</li>
              <li>Tuangkan bumbu sari rempah pindang serani, pasta belimbing wuluh & minyak aroma serai ke mangkuk.</li>
              <li>Aduk mi bersama kuah panas, beri garnish belimbing wuluh & daun kemangi untuk aroma maksimal.</li>
            </ol>
          </div>
        )}
      </section>

      {/* Footer Brand & Ekosistem */}
      <footer className="mt-8 pt-6 pb-4 px-4 bg-white rounded-3xl border border-[#123E46]/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-['Chewy',sans-serif] text-2xl text-[#123E46] tracking-wide">
              PINDARA
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#006A66] text-white text-[10px] font-bold">
              INDONESIA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'PINDARA - Mi Instan Pindang Serani Jepara',
                    url: window.location.href,
                  });
                }
              }}
              className="w-8 h-8 rounded-full bg-[#FFF8F1] flex items-center justify-center text-[#123E46] hover:bg-[#86F5EE]"
              title="Bagikan"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-[#1F1B12]/70 leading-relaxed">
          Hilirisasi Potensi Pindang Jepara melalui Inovasi Mi Instan Bercita Rasa Pindang Serani.
          Mendukung ketahanan pangan bahari dan kesejahteraan nelayan lokal di pesisir utara Jawa Tengah.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#006A66] font-medium">
          <button onClick={() => onNavigateTab('explore')} className="text-left hover:underline">
            Kemitraan Nelayan TPI
          </button>
          <button onClick={() => onNavigateTab('trace')} className="text-left hover:underline">
            Sertifikat Halal & BPOM
          </button>
          <button onClick={() => onNavigateTab('shop')} className="text-left hover:underline">
            DARA-SHOP Resmi
          </button>
          <button onClick={() => onNavigateTab('streak')} className="text-left hover:underline">
            Loyalty Pindara Streak
          </button>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
          <span>© 2026 PINDARA Jepara. Hak Cipta Dilindungi.</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-red-500">❤</span> in Jepara
          </span>
        </div>
      </footer>
    </div>
  );
};
