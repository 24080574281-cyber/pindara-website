import React, { useState } from 'react';
import { VALID_CLAIM_CODES } from '../data/mockData';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimedCodes: string[];
  onClaimSuccess: (code: string, points: number) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  claimedCodes,
  onClaimSuccess,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isScanningCam, setIsScanningCam] = useState(false);

  if (!isOpen) return null;

  const handleClaim = (codeToTest?: string) => {
    const raw = (codeToTest || inputCode).trim().toUpperCase();
    setErrorMsg('');
    setSuccessMsg('');

    if (!raw) {
      setErrorMsg('Silakan masukkan kode kemasan Anda');
      return;
    }

    // Check anti-duplication
    if (claimedCodes.includes(raw)) {
      setErrorMsg(`Kode ${raw} sudah pernah diklaim sebelumnya oleh akun ini.`);
      return;
    }

    // Check validity
    const isValid =
      VALID_CLAIM_CODES.includes(raw) ||
      (raw.startsWith('PND-') && raw.length >= 8);

    if (!isValid) {
      setErrorMsg('Kode kemasan tidak valid atau tidak terdaftar di sistem PINDARA.');
      return;
    }

    // Success
    setSuccessMsg(`🎉 Berhasil! Kode ${raw} terverifikasi otentik. +50 Poin Streak ditambahkan!`);
    setTimeout(() => {
      onClaimSuccess(raw, 50);
      setInputCode('');
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  const simulateCameraScan = () => {
    setIsScanningCam(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsScanningCam(false);
      // Pick an unclaimed code from valid mock codes
      const availableCode = VALID_CLAIM_CODES.find((c) => !claimedCodes.includes(c)) || 'PND-9930-BHR';
      setInputCode(availableCode);
      handleClaim(availableCode);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123E46]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#FFF8F1] rounded-3xl p-6 shadow-2xl border border-[#123E46]/10 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006A66] text-[26px]">
              qr_code_scanner
            </span>
            <h3 className="font-['Chewy',sans-serif] text-2xl text-[#123E46] tracking-wide">
              Klaim Kode Kemasan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#123E46]/10 hover:bg-[#123E46]/20 flex items-center justify-center text-[#123E46] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#1F1B12]/80 leading-relaxed">
          Masukkan 8 hingga 12 karakter kode otentik yang tercetak di bagian belakang atau dalam bungkus
          PINDARA Mi Instan Pindang Serani Anda. Setiap kode hanya dapat diklaim <strong>1 kali</strong>.
        </p>

        {/* Camera simulation viewport */}
        {isScanningCam ? (
          <div className="relative w-full h-44 rounded-2xl bg-[#123E46] overflow-hidden flex flex-col items-center justify-center text-[#FFF8F1]">
            <div className="w-32 h-32 border-2 border-dashed border-[#55C6C0] rounded-xl flex items-center justify-center relative animate-pulse">
              <span className="material-symbols-outlined text-4xl text-[#55C6C0]">document_scanner</span>
              <div className="absolute inset-x-0 h-0.5 bg-[#DE9050] shadow-[0_0_8px_#DE9050] animate-bounce" />
            </div>
            <span className="text-xs font-semibold mt-2 text-[#86F5EE]">
              Mendeteksi QR Code Kemasan...
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Contoh: PND-8891-JPR"
                maxLength={16}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#123E46]/20 text-[#123E46] font-mono text-center tracking-widest uppercase outline-none focus:ring-2 focus:ring-[#55C6C0] focus:border-transparent text-sm placeholder:tracking-normal placeholder:font-sans"
              />
              {inputCode && (
                <button
                  onClick={() => setInputCode('')}
                  className="absolute right-3 top-3 text-[#1F1B12]/40 hover:text-[#123E46]"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>

            {/* Quick Sample Code Chips */}
            <div className="flex flex-col gap-1 text-[11px] text-[#1F1B12]/60">
              <span>Coba contoh kode kemasan baru:</span>
              <div className="flex flex-wrap gap-1.5">
                {VALID_CLAIM_CODES.slice(0, 3).map((code) => {
                  const isClaimed = claimedCodes.includes(code);
                  return (
                    <button
                      key={code}
                      onClick={() => setInputCode(code)}
                      disabled={isClaimed}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-colors ${
                        isClaimed
                          ? 'bg-gray-200 text-gray-400 line-through cursor-not-allowed'
                          : 'bg-[#55C6C0]/20 text-[#006A66] hover:bg-[#55C6C0]/40 font-bold'
                      }`}
                    >
                      {code} {isClaimed ? '(Sudah Diklaim)' : ''}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error or Success notification */}
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-100 text-red-700 text-xs flex items-center gap-1.5 animate-shake">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-2.5 rounded-xl bg-[#86F5EE]/40 text-[#006A66] text-xs font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>{successMsg}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={simulateCameraScan}
            disabled={isScanningCam}
            className="flex-1 py-2.5 rounded-full bg-[#86F5EE] text-[#00201E] font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all hover:bg-[#55C6C0]"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            <span>Scan Kamera</span>
          </button>
          <button
            type="button"
            onClick={() => handleClaim()}
            disabled={isScanningCam}
            className="flex-1 py-2.5 rounded-full bg-[#123E46] text-[#FFF8F1] font-bold text-xs shadow-md active:scale-95 transition-all hover:bg-[#1B535D] flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Verifikasi & Klaim</span>
          </button>
        </div>
      </div>
    </div>
  );
};
