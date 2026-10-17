import React, { useState } from 'react';
import { LedgerEntry, UserAccount } from '../types';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  ledger: LedgerEntry[];
  onUseVoucher: (code: string) => void;
  onSwitchUser: (type: 'budi' | 'guest') => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  user,
  ledger,
  onUseVoucher,
  onSwitchUser,
}) => {
  const [activeTab, setActiveTab] = useState<'profil' | 'vouchers' | 'ledger' | 'codes'>('profil');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#123E46]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FFF8F1] rounded-3xl overflow-hidden shadow-2xl border border-[#123E46]/10 flex flex-col max-h-[90vh]">
        {/* Header Profile Summary */}
        <div className="bg-gradient-to-r from-[#123E46] via-[#1B535D] to-[#006A66] p-5 text-[#FFF8F1] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#86F5EE] shadow-md shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-lg text-white leading-tight truncate">
                  {user.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
                  {user.role === 'member' ? 'Member Jepara' : 'Guest'}
                </span>
              </div>
              <p className="text-xs text-[#86F5EE] mt-0.5">{user.levelName}</p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1 text-[#F4A261] font-bold">
                  <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                  {user.streakDays} Hari Streak
                </span>
                <span className="flex items-center gap-1 text-[#86F5EE] font-bold">
                  <span className="material-symbols-outlined text-[15px]">toll</span>
                  {user.points} Poin Loyalty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#123E46]/10 bg-white px-2">
          <button
            onClick={() => setActiveTab('profil')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'profil'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-[#1F1B12]/60 hover:text-[#123E46]'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('vouchers')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'vouchers'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-[#1F1B12]/60 hover:text-[#123E46]'
            }`}
          >
            <span>Voucher Saya</span>
            {user.vouchers.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#DE9050] text-white text-[9px] font-bold">
                {user.vouchers.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'ledger'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-[#1F1B12]/60 hover:text-[#123E46]'
            }`}
          >
            Buku Ledger
          </button>
          <button
            onClick={() => setActiveTab('codes')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'codes'
                ? 'border-[#006A66] text-[#006A66]'
                : 'border-transparent text-[#1F1B12]/60 hover:text-[#123E46]'
            }`}
          >
            Kode Klaim ({user.claimedCodes.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'profil' && (
            <div className="space-y-4">
              {/* Badges showcase */}
              <div>
                <h4 className="text-xs font-bold text-[#123E46] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#006A66]">workspace_premium</span>
                  <span>Koleksi Lencana Penghargaan</span>
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {user.badges.map((b) => (
                    <div
                      key={b.id}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        b.unlocked
                          ? 'bg-white border-[#55C6C0]/40 shadow-sm'
                          : 'bg-gray-100 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{b.icon}</span>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-[#123E46] block truncate">
                            {b.title}
                          </span>
                          <span className="text-[10px] text-[#006A66] font-semibold">
                            {b.unlocked ? (b.unlockedAt ? `Unlocked (${b.unlockedAt})` : 'Unlocked') : 'Terkunci'}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#1F1B12]/70 leading-snug line-clamp-2">
                        {b.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account details */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#123E46]/10 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-[#1F1B12]/60">Email Terdaftar:</span>
                  <span className="font-medium text-[#123E46]">{user.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-[#1F1B12]/60">Zona Waktu Sistem:</span>
                  <span className="font-medium text-[#123E46]">Asia/Jakarta (WIB)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#1F1B12]/60">Reset Streak Harian:</span>
                  <span className="font-medium text-[#006A66]">Pukul 00:00 WIB</span>
                </div>
              </div>

              {/* Switch user simulation button */}
              <div className="p-3 rounded-2xl bg-[#55C6C0]/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#123E46] block">Mode Pengguna</span>
                  <span className="text-[#1F1B12]/60 text-[11px]">Ganti mode akun untuk simulasi</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onSwitchUser('budi')}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.id === 'user-budi'
                        ? 'bg-[#123E46] text-white'
                        : 'bg-white text-[#123E46] border border-[#123E46]/20'
                    }`}
                  >
                    Budi (Member)
                  </button>
                  <button
                    onClick={() => onSwitchUser('guest')}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.id === 'user-guest'
                        ? 'bg-[#123E46] text-white'
                        : 'bg-white text-[#123E46] border border-[#123E46]/20'
                    }`}
                  >
                    Tamu Baru
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vouchers' && (
            <div className="space-y-3">
              {user.vouchers.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-[#123E46]/10 text-xs text-[#1F1B12]/60">
                  <span className="material-symbols-outlined text-3xl text-gray-300 block mb-1">
                    confirmation_number
                  </span>
                  Belum ada voucher aktif. Tukarkan poin streak-mu di tab DARA-STREAK!
                </div>
              ) : (
                user.vouchers.map((voc) => (
                  <div
                    key={voc.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#55C6C0]/50 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#006A66] text-[18px]">
                          confirmation_number
                        </span>
                        <h5 className="font-bold text-xs text-[#123E46] truncate">{voc.title}</h5>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="px-2 py-0.5 rounded bg-[#FFF8F1] border border-[#DE9050]/40 font-mono text-xs font-bold text-[#DE9050]">
                          {voc.code}
                        </code>
                        <span className="text-[10px] text-gray-400">Exp: {voc.expiresAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleCopy(voc.code)}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#123E46] text-xs transition-colors"
                        title="Salin Kode"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedCode === voc.code ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          onUseVoucher(voc.code);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-full bg-[#006A66] hover:bg-[#123E46] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        Pakai di Shop
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'ledger' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#1F1B12]/60 px-1">
                <span>Riwayat Transaksi Poin Terverifikasi</span>
                <span>Anti-Manipulasi Ledger</span>
              </div>
              <div className="divide-y divide-gray-100 bg-white rounded-2xl border border-[#123E46]/10 overflow-hidden">
                {ledger.map((item) => (
                  <div key={item.id} className="p-3 flex items-center justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <div className="font-bold text-[#123E46] truncate">{item.title}</div>
                      <div className="text-[11px] text-gray-400">{item.timestamp}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`font-mono font-bold ${
                          item.pointsDelta > 0 ? 'text-[#006A66]' : 'text-[#DE9050]'
                        }`}
                      >
                        {item.pointsDelta > 0 ? `+${item.pointsDelta}` : item.pointsDelta} Pts
                      </span>
                      <span className="block text-[10px] text-gray-400">
                        Saldo: {item.balanceAfter} Pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'codes' && (
            <div className="space-y-3">
              <p className="text-xs text-[#1F1B12]/70">
                Daftar kode kemasan yang telah Anda daftarkan dan divalidasi ke blockchain ledger:
              </p>
              <div className="space-y-2">
                {user.claimedCodes.map((code, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#123E46]/10 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#006A66] text-[18px]">
                        verified
                      </span>
                      <span className="font-mono font-bold text-[#123E46]">{code}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#86F5EE]/40 text-[#006A66] text-[10px] font-bold">
                      Terklaim (+50 Poin)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
