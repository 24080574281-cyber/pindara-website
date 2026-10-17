import React, { useState } from 'react';
import { ASSETS, REWARD_ITEMS } from '../data/mockData';
import { RewardItem, UserAccount } from '../types';

interface StreakPageProps {
  user: UserAccount;
  onCheckIn: () => void;
  isCheckedInToday: boolean;
  onOpenScanModal: () => void;
  onOpenExploreStory: () => void;
  onRedeemReward: (reward: RewardItem) => boolean;
  onQuickQuiz: () => void;
  isQuizAnsweredToday: boolean;
}

export const StreakPage: React.FC<StreakPageProps> = ({
  user,
  onCheckIn,
  isCheckedInToday,
  onOpenScanModal,
  onOpenExploreStory,
  onRedeemReward,
  onQuickQuiz,
  isQuizAnsweredToday,
}) => {
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);
  const [redeemErrorMsg, setRedeemErrorMsg] = useState<string | null>(null);

  // Quick inline quiz state for Mission 2
  const [inlineQuizAnswered, setInlineQuizAnswered] = useState(isQuizAnsweredToday);
  const [inlineQuizFeedback, setInlineQuizFeedback] = useState<string | null>(
    isQuizAnsweredToday ? 'Kuis telah dijawab hari ini (+25 Pts)' : null
  );

  const handleInlineQuiz = (isCorrect: boolean) => {
    if (inlineQuizAnswered) return;
    setInlineQuizAnswered(true);
    if (isCorrect) {
      setInlineQuizFeedback('🎉 Luar biasa! Asam belimbing wuluh & asam jawa Jepara memberi kesegaran alami. (+25 Pts)');
      onQuickQuiz();
    } else {
      setInlineQuizFeedback('PINDARA hanya memakai rempah asli nusantara! Coba lagi besok ya.');
    }
  };

  const handleRedeem = (reward: RewardItem) => {
    setRedeemErrorMsg(null);
    setRedeemSuccessMsg(null);

    if (user.points < reward.pointsRequired) {
      setRedeemErrorMsg(`Poin tidak cukup untuk menukarkan ${reward.title}. Kumpulkan ${reward.pointsRequired - user.points} poin lagi!`);
      return;
    }

    const success = onRedeemReward(reward);
    if (success) {
      setRedeemSuccessMsg(`🎉 Berhasil menukarkan "${reward.title}"! Kode voucher telah disimpan di Akun Saya.`);
      setTimeout(() => setRedeemSuccessMsg(null), 4000);
    }
  };

  const daysOfWeek = [
    { day: 'Sen', label: 'Check-in', done: true, icon: 'check' },
    { day: 'Sel', label: 'Kuis', done: true, icon: 'check' },
    { day: 'Rab', label: 'Cerita', done: true, icon: 'check' },
    { day: 'Kam', label: 'Scan', done: true, icon: 'check' },
    { day: 'Jum', label: 'Kuis', done: true, icon: 'check' },
    { day: 'Sab', label: 'Hari Ini', done: true, isToday: true, icon: 'local_fire_department' },
    { day: 'Min', label: 'Besok', done: false, isLocked: true, icon: 'lock' },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-5 px-4 pb-12">
      {/* Gamified Streak Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123E46] via-[#1B535D] to-[#006A66] text-white p-5 sm:p-6 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#86F5EE]/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-[#F4A261]/30 blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DE9050] text-[#FFF8F1] text-[10px] font-bold tracking-wide shadow-sm animate-pulse">
              <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
              <span>{user.streakDays} HARI STREAK AKTIF 🔥</span>
            </div>
            <h2 className="font-['Chewy',sans-serif] text-2xl sm:text-3xl text-white tracking-wide truncate">
              Halo, {user.name}
            </h2>
            <div className="inline-flex items-center gap-1 text-[#86F5EE] text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Member Kuliner Jepara</span>
            </div>
          </div>

          {/* Dara Mascot Enjoying Noodles */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-md animate-ping opacity-25" />
            <img
              src={ASSETS.daraEat}
              alt="Dara menikmati semangkuk mi Pindara"
              className="w-full h-full object-contain drop-shadow-lg relative z-10 scale-110"
            />
          </div>
        </div>

        {/* Points Balance Pill & Action */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between gap-3 border border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF5E5] text-[#79513A] flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[24px]">toll</span>
            </div>
            <div>
              <span className="block text-[10px] text-white/70 uppercase tracking-wider font-semibold">
                Saldo Poin Kamu
              </span>
              <span className="text-xl sm:text-2xl font-mono font-extrabold text-white leading-none">
                {user.points} <span className="text-xs font-bold text-[#86F5EE]">Pts</span>
              </span>
            </div>
          </div>
          <a
            href="#katalog-hadiah"
            className="px-4 py-2 rounded-full bg-[#DE9050] hover:bg-[#e78438] text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1"
          >
            <span>Tukar Poin</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        {/* Milestone Progress Track */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1 text-[#86F5EE] font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[15px]">military_tech</span>
              {user.streakDays}/14 Hari menuju Explorer Badge & Bonus 150 Poin!
            </span>
            <span className="font-bold text-xs font-mono">
              {Math.min(100, Math.round((user.streakDays / 14) * 100))}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#86F5EE] to-[#DE9050] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, Math.round((user.streakDays / 14) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weekly Activity Calendar Strip */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#123E46]/10 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#123E46] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006A66] text-[22px]">calendar_month</span>
              <span>Aktivitas Mingguan</span>
            </h3>
            <p className="text-[11px] text-gray-500">Konsistensi jelajah rasa pesisir Jepara</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
            WIB (Reset 00:00)
          </span>
        </div>

        {/* 7-Day Interactive Nodes */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 pt-1 text-center">
          {daysOfWeek.map((d, i) => (
            <div
              key={i}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
                d.isToday
                  ? 'bg-[#FFF5E5] border border-[#DE9050]/40 shadow-md scale-105'
                  : d.isLocked
                  ? 'bg-gray-50 opacity-60'
                  : 'bg-[#FFF8F1] border border-[#123E46]/5'
              }`}
            >
              <span
                className={`text-[10px] font-semibold ${
                  d.isToday ? 'text-[#DE9050] font-bold' : 'text-gray-500'
                }`}
              >
                {d.day}
              </span>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center my-1.5 text-xs shadow-sm ${
                  d.isToday
                    ? 'bg-[#DE9050] text-white'
                    : d.done
                    ? 'bg-[#006A66] text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{d.icon}</span>
              </div>
              <span
                className={`text-[9px] font-bold truncate max-w-full ${
                  d.isToday ? 'text-[#DE9050]' : d.done ? 'text-[#006A66]' : 'text-gray-400'
                }`}
              >
                {d.label}
              </span>
            </div>
          ))}
        </div>

        {/* Fairness Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#86F5EE]/30 text-[#00201E] border border-[#55C6C0]/30 text-xs">
          <span className="material-symbols-outlined text-[18px] text-[#006A66] shrink-0 mt-0.5">
            sentiment_satisfied
          </span>
          <p className="text-[11px] leading-relaxed">
            <strong>Santai & Asyik!</strong> Aktivitas dihitung sekali per hari. Tidak ada kewajiban
            membeli atau mengonsumsi mi setiap hari untuk menjaga streak tetap menyala!
          </p>
        </div>
      </section>

      {/* Daily Missions to Maintain Streak */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-[#123E46] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#DE9050] text-[22px]">bolt</span>
            <span>Misi Harian Pindara</span>
          </h3>
          <span className="text-[11px] text-gray-500">Misi Segar Hari Ini</span>
        </div>

        <div className="space-y-2.5">
          {/* Mission 1: Check-in */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#123E46]/10 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#86F5EE]/40 text-[#006A66] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">task_alt</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#123E46] truncate">
                  Daily Check-in Kuliner
                </h4>
                <p className="text-[11px] text-gray-500 truncate">Buka aplikasi & rasakan semangat Jepara</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
                +10 Pts
              </span>
              <button
                onClick={onCheckIn}
                disabled={isCheckedInToday}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isCheckedInToday
                    ? 'bg-gray-100 text-gray-400 cursor-default'
                    : 'bg-[#123E46] text-white hover:bg-[#1B535D] active:scale-95'
                }`}
              >
                {isCheckedInToday ? 'Selesai ✓' : 'Check-in'}
              </button>
            </div>
          </div>

          {/* Mission 2: Interactive Inline Quiz */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#123E46]/10 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF5E5] text-[#DE9050] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">psychology_alt</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-[#123E46] truncate">
                      Kuis Harian Pindang Serani
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#DE9050] text-white text-[10px] font-bold">
                      +25 Pts
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    "Tahukah kamu rempah khas apa yang memberi asam segar alami?"
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <button
                type="button"
                disabled={inlineQuizAnswered}
                onClick={() => handleInlineQuiz(true)}
                className="p-2 rounded-xl bg-[#FFF8F1] border border-[#123E46]/10 hover:bg-[#86F5EE]/40 text-[#123E46] font-semibold text-center transition-all disabled:opacity-60"
              >
                A. Belimbing Wuluh & Asam Jawa
              </button>
              <button
                type="button"
                disabled={inlineQuizAnswered}
                onClick={() => handleInlineQuiz(false)}
                className="p-2 rounded-xl bg-[#FFF8F1] border border-[#123E46]/10 hover:bg-[#86F5EE]/40 text-[#123E46] font-semibold text-center transition-all disabled:opacity-60"
              >
                B. Cuka Buatan Sintesis
              </button>
            </div>

            {inlineQuizFeedback && (
              <div className="p-2 rounded-xl bg-[#86F5EE]/30 text-[#006A66] text-[11px] font-semibold text-center">
                {inlineQuizFeedback}
              </div>
            )}
          </div>

          {/* Mission 3: Input Kode Unik Kemasan */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#123E46]/10 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#123E46]/10 text-[#123E46] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-[#123E46] truncate">
                    Input Kode Unik Kemasan
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
                    +50 Pts
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate">
                  Maks 1 klaim per kemasan, terverifikasi anti-duplikasi
                </p>
              </div>
            </div>
            <button
              onClick={onOpenScanModal}
              className="px-4 py-2 rounded-full bg-[#123E46] hover:bg-[#1B535D] text-white text-xs font-bold shrink-0 shadow-sm active:scale-95 transition-all"
            >
              Klaim
            </button>
          </div>

          {/* Mission 4: Baca Cerita Nelayan */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#123E46]/10 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#FFF5E5] text-[#79513A] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">auto_stories</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-[#123E46] truncate">
                    Kisah Nelayan Jepara
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF5E5] text-[#DE9050] text-[10px] font-bold border border-[#DE9050]/20">
                    +15 Pts
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate">
                  Pelajari tradisi pengolahan ikan bandeng & kakap segar
                </p>
              </div>
            </div>
            <button
              onClick={onOpenExploreStory}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-[#86F5EE] text-[#123E46] text-xs font-bold shrink-0 transition-colors"
            >
              Jelajahi
            </button>
          </div>
        </div>
      </section>

      {/* Badges Collection & Prestasi */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-[#123E46] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006A66] text-[22px]">
              workspace_premium
            </span>
            <span>Koleksi Badge & Prestasi</span>
          </h3>
          <span className="text-[11px] text-gray-500">
            {user.badges.filter((b) => b.unlocked).length} dari {user.badges.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                badge.unlocked
                  ? 'bg-white border-[#55C6C0]/40 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="relative w-12 h-12 rounded-full bg-[#86F5EE]/30 flex items-center justify-center my-1">
                <span className="text-2xl">{badge.icon}</span>
                {badge.unlocked && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#006A66] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#123E46] mt-1">{badge.title}</h4>
                <span className="text-[10px] text-gray-500 block leading-tight mt-0.5">
                  {badge.unlocked ? badge.unlockedAt || 'Unlocked' : badge.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards Store (Katalog Penukaran Hadiah) */}
      <section className="space-y-3 pt-2" id="katalog-hadiah">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#123E46] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#DE9050] text-[22px]">redeem</span>
              <span>Katalog Penukaran Hadiah</span>
            </h3>
            <p className="text-[11px] text-gray-500">Tukarkan poin loyalty dengan hadiah spesial</p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#123E46] text-white">
            {user.points} Pts
          </span>
        </div>

        {/* Feedback message for redemption */}
        {redeemSuccessMsg && (
          <div className="p-3 rounded-2xl bg-[#86F5EE]/40 text-[#006A66] text-xs font-semibold flex items-center gap-2 border border-[#55C6C0]/40 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{redeemSuccessMsg}</span>
          </div>
        )}
        {redeemErrorMsg && (
          <div className="p-3 rounded-2xl bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200 animate-shake">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{redeemErrorMsg}</span>
          </div>
        )}

        <div className="space-y-3">
          {REWARD_ITEMS.map((reward) => {
            const canAfford = user.points >= reward.pointsRequired;
            return (
              <div
                key={reward.id}
                className="p-4 rounded-3xl bg-white border border-[#123E46]/10 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5E5] text-[#79513A] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[28px]">{reward.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#006A66] uppercase tracking-wide block">
                      {reward.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#123E46] leading-tight truncate">
                      {reward.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5 text-[#DE9050] font-bold text-xs font-mono">
                      <span className="material-symbols-outlined text-[15px]">toll</span>
                      <span>{reward.pointsRequired} Poin</span>
                      {!canAfford && (
                        <span className="text-[10px] text-gray-400 font-sans font-normal ml-1">
                          (Kurang {reward.pointsRequired - user.points})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-full font-bold text-xs shadow-sm transition-all shrink-0 active:scale-95 ${
                    canAfford
                      ? 'bg-[#006A66] hover:bg-[#123E46] text-white cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Tukarkan' : 'Kumpulkan Poin'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security & Ledger Card */}
      <div className="p-4 rounded-3xl bg-white border border-[#123E46]/10 text-xs flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#123E46] text-white flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">security</span>
        </div>
        <div className="min-w-0">
          <h5 className="font-bold text-[#123E46]">Keamanan Saldo & Riwayat Ledger</h5>
          <p className="text-[11px] text-gray-500 leading-snug">
            Sistem ledger poin terlindung dari manipulasi. Seluruh log transaksi dan perolehan poin harian
            terarsip otomatis dan dapat diaudit secara transparan.
          </p>
        </div>
      </div>
    </div>
  );
};
