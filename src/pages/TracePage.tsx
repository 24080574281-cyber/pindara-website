import React, { useState, useEffect } from 'react';
import { ASSETS, MOCK_BATCHES } from '../data/mockData';
import { BatchTraceData } from '../types';

interface TracePageProps {
  initialCode?: string;
  onClaimBatchPoints: (batchCode: string) => void;
  claimedCodes: string[];
}

export const TracePage: React.FC<TracePageProps> = ({
  initialCode = 'PND-JPR-2025-001',
  onClaimBatchPoints,
  claimedCodes,
}) => {
  const [inputCode, setInputCode] = useState(initialCode);
  const [currentBatch, setCurrentBatch] = useState<BatchTraceData | null>(
    MOCK_BATCHES[initialCode] || MOCK_BATCHES['PND-JPR-2025-001']
  );
  const [inspectStatus, setInspectStatus] = useState<'VERIFIED' | 'REVIEW' | 'NOT_FOUND'>('VERIFIED');
  const [isScanningCam, setIsScanningCam] = useState(false);
  const [hasClaimedCurrent, setHasClaimedCurrent] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setInputCode(initialCode);
      executeLookup(initialCode);
    }
  }, [initialCode]);

  const executeLookup = (code: string) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'PND-ERR-999') {
      setInspectStatus('NOT_FOUND');
      setCurrentBatch(null);
    } else if (clean === 'PND-REV-042') {
      setInspectStatus('REVIEW');
      setCurrentBatch(MOCK_BATCHES['PND-REV-042']);
    } else if (MOCK_BATCHES[clean]) {
      setInspectStatus('VERIFIED');
      setCurrentBatch(MOCK_BATCHES[clean]);
      setHasClaimedCurrent(claimedCodes.includes(clean));
    } else {
      // Dynamic fallback checking
      if (clean.startsWith('PND-')) {
        setInspectStatus('VERIFIED');
        setCurrentBatch({
          ...MOCK_BATCHES['PND-JPR-2025-001'],
          batchCode: clean,
          productionDate: 'Terjadwal Baru',
        });
      } else {
        setInspectStatus('NOT_FOUND');
        setCurrentBatch(null);
      }
    }
  };

  const handleSimulateScan = () => {
    setIsScanningCam(true);
    setTimeout(() => {
      setIsScanningCam(false);
      setInputCode('PND-JPR-2025-001');
      executeLookup('PND-JPR-2025-001');
    }, 1000);
  };

  const handleClaimReward = () => {
    if (currentBatch && !hasClaimedCurrent) {
      onClaimBatchPoints(currentBatch.batchCode);
      setHasClaimedCurrent(true);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-5 px-4 pb-12">
      {/* Title & Provenance Subtitle */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] font-bold text-[10px] uppercase tracking-wider">
            Provenance & Authenticity
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006A66] animate-pulse" />
            Live Ledger Konsensus
          </span>
        </div>
        <h1 className="font-['Chewy',sans-serif] text-3xl sm:text-4xl text-[#123E46] tracking-wide">
          PINDARA TRACE
        </h1>
        <p className="text-xs sm:text-sm text-[#1F1B12]/80 leading-relaxed">
          Transparansi penuh dari pesisir Jepara ke mangkuk Anda. Periksa keaslian rempah, kelompok
          nelayan penangkap, hingga segel kriptografi batch.
        </p>
      </div>

      {/* Inspector Dara Mascot Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123E46] via-[#1B535D] to-[#006A66] text-white p-4 sm:p-5 shadow-lg">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#86F5EE]/20 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#86F5EE]/20 animate-pulse" />
            <img
              src={ASSETS.daraHero}
              alt="Dara Maskot Inspektur"
              className="w-full h-full object-contain filter drop-shadow-md select-none"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#DE9050] text-[#FFF8F1] font-bold text-[9px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">verified_user</span>
              <span>Inspektur Dara</span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-['Chewy',sans-serif] text-xl sm:text-2xl text-[#86F5EE] tracking-wide">
              Halo, Sedulur Rasa!
            </span>
            <p className="text-xs text-white/90 mt-1 line-clamp-3 leading-relaxed">
              Aku Dara, pemandu ketertelusuran bumbu rempah & ikan Pindang Serani aslimu. Masukkan nomor
              batch atau pindai QR kemasanmu untuk memeriksa keasliannya!
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#86F5EE]">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                100% Terverifikasi Halal BPJPH & Dinkes P-IRT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input Box & Quick Preset Chips */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#123E46]/10 shadow-sm space-y-3">
        <label className="text-xs font-bold text-[#123E46] flex items-center justify-between">
          <span>Kode Batch Kemasan</span>
          <span className="text-gray-400 font-normal text-[11px]">Tercetak di belakang kemasan</span>
        </label>

        <div className="flex items-center gap-2 bg-[#FFF8F1] border border-[#123E46]/10 rounded-2xl px-3 py-2">
          <span className="material-symbols-outlined text-gray-400 text-[20px]">qr_code_scanner</span>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
              setInputCode(val);
              executeLookup(val);
            }}
            placeholder="Masukkan Kode Batch..."
            className="bg-transparent border-0 outline-none w-full font-mono text-xs sm:text-sm text-[#123E46] tracking-wider uppercase placeholder:text-gray-400 placeholder:font-sans"
          />
          {inputCode && (
            <button
              onClick={() => {
                setInputCode('');
                executeLookup('');
              }}
              className="text-gray-400 hover:text-[#123E46] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Quick test buttons */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[11px] text-[#1F1B12]/60 font-medium">Uji Coba Kode Cepat:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setInputCode('PND-JPR-2025-001');
                executeLookup('PND-JPR-2025-001');
              }}
              className="px-2.5 py-1 rounded-full bg-[#86F5EE]/40 hover:bg-[#86F5EE] text-[#00201E] text-xs font-semibold transition-all flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              PND-JPR-2025-001 (Valid)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputCode('PND-REV-042');
                executeLookup('PND-REV-042');
              }}
              className="px-2.5 py-1 rounded-full bg-[#FFF5E5] hover:bg-[#F4A261]/30 text-[#79513A] text-xs font-semibold transition-all flex items-center gap-1 active:scale-95 border border-[#DE9050]/30"
            >
              <span className="material-symbols-outlined text-[14px]">pending</span>
              PND-REV-042 (Pemeriksaan)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputCode('PND-ERR-999');
                executeLookup('PND-ERR-999');
              }}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold transition-all flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">help</span>
              PND-ERR-999 (Tidak Ada)
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={handleSimulateScan}
            disabled={isScanningCam}
            className="py-3 px-3 rounded-full bg-[#86F5EE] text-[#00201E] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all hover:bg-[#55C6C0]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isScanningCam ? 'sync' : 'photo_camera'}
            </span>
            <span>{isScanningCam ? 'Membuka Kamera...' : 'Pindai QR'}</span>
          </button>
          <button
            type="button"
            onClick={() => executeLookup(inputCode)}
            className="py-3 px-3 rounded-full bg-[#123E46] text-[#FFF8F1] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all hover:bg-[#1B535D]"
          >
            <span className="material-symbols-outlined text-[20px]">search_check</span>
            <span>Periksa Data</span>
          </button>
        </div>
      </div>

      {/* State 1: VERIFIED */}
      {inspectStatus === 'VERIFIED' && currentBatch && (
        <div className="space-y-4 animate-fadeIn">
          {/* Main Verified Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#123E46]/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86F5EE] text-[#00201E] font-bold text-xs">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Produk Terverifikasi</span>
              </span>
              <span className="text-[11px] text-gray-400">Diperiksa: Baru Saja</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#123E46]">
                  {currentBatch.productName}
                </h3>
                <p className="text-xs font-semibold text-[#006A66] flex items-center gap-1 mt-0.5 font-mono">
                  <span className="material-symbols-outlined text-[15px]">sell</span>
                  BATCH #{currentBatch.batchCode}
                </p>
              </div>
              <span className="text-xs font-bold text-[#123E46] bg-[#FFF8F1] border border-[#123E46]/10 px-2.5 py-1 rounded-xl">
                {currentBatch.netWeight}
              </span>
            </div>

            {/* Production Dates */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-[#FFF8F1] rounded-2xl p-3 border border-[#123E46]/5">
                <span className="text-[11px] text-gray-500 flex items-center gap-1 mb-0.5">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  Tgl. Produksi
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#123E46]">
                  {currentBatch.productionDate}
                </span>
              </div>
              <div className="bg-[#FFF8F1] rounded-2xl p-3 border border-[#123E46]/5">
                <span className="text-[11px] text-gray-500 flex items-center gap-1 mb-0.5">
                  <span className="material-symbols-outlined text-[14px]">event_repeat</span>
                  Kedaluwarsa
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#123E46]">
                  {currentBatch.expiryDate}
                </span>
              </div>
            </div>

            {/* Ingredient Raw Origin Insight */}
            <div className="bg-[#FFF8F1] rounded-2xl p-3.5 border border-[#123E46]/5 space-y-1">
              <span className="text-xs font-bold text-[#006A66] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">anchor</span>
                Asal Bahan Baku Utama
              </span>
              <p className="text-xs text-[#1F1B12]/80 leading-relaxed">
                {currentBatch.rawOrigin}
              </p>
            </div>

            {/* Official Legal Certifications */}
            <div className="bg-white rounded-2xl p-3.5 border border-[#55C6C0]/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#123E46]">
                <span className="material-symbols-outlined text-[#006A66] text-[18px]">
                  workspace_premium
                </span>
                <span>Legalitas & Standar Mutu Resmi</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-0.5 border-b border-gray-100">
                  <span className="text-gray-500">Sertifikat Halal MUI/BPJPH:</span>
                  <span className="font-mono font-bold text-[#123E46]">{currentBatch.halalCert}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-gray-500">Izin Edar Dinkes (P-IRT):</span>
                  <span className="font-mono font-bold text-[#123E46]">{currentBatch.pirtCert}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Consensus Ledger Node Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#123E46]/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006A66] text-[22px]">hub</span>
                <h3 className="font-bold text-sm text-[#123E46]">Ledger Konsensus Blockchain</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
                Sealed Block
              </span>
            </div>

            <div className="bg-[#123E46] text-[#FFF8F1] rounded-2xl p-3 space-y-1">
              <span className="text-[11px] text-[#86F5EE]">Cryptographic Batch Hash:</span>
              <div className="font-mono text-[11px] leading-tight text-[#86F5EE] break-all bg-black/30 p-2 rounded-xl">
                {currentBatch.cryptographicHash}
              </div>
            </div>

            <p className="text-xs text-[#1F1B12]/80 leading-relaxed">
              Arsitektur desentralisasi siap terintegrasi publik. Data log tangkapan nelayan dan waktu
              pengemasan batch ini disegel secara permanen tanpa risiko pemalsuan.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-[#FFF8F1] p-2.5 rounded-2xl border border-[#123E46]/5">
                <span className="text-[10px] text-gray-500 block">Blok No.</span>
                <span className="text-xs font-bold text-[#123E46]">{currentBatch.blockNumber}</span>
              </div>
              <div className="bg-[#FFF8F1] p-2.5 rounded-2xl border border-[#123E46]/5">
                <span className="text-[10px] text-gray-500 block">Konsensus</span>
                <span className="text-xs font-bold text-[#006A66]">100% Valid</span>
              </div>
              <div className="bg-[#FFF8F1] p-2.5 rounded-2xl border border-[#123E46]/5">
                <span className="text-[10px] text-gray-500 block">Penyimpanan</span>
                <span className="text-xs font-bold text-[#123E46]">IPFS Pinned</span>
              </div>
            </div>
          </div>

          {/* 4-Step Provenance Timeline */}
          <div className="bg-white rounded-3xl p-5 border border-[#123E46]/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#DE9050] text-[22px]">timeline</span>
                <h3 className="font-bold text-sm text-[#123E46]">Riwayat Keterlacakan Alur</h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">4 Titik Pantau</span>
            </div>

            <div className="space-y-4 relative pl-2">
              {currentBatch.timelineSteps.map((step, idx) => (
                <div key={idx} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#86F5EE] text-[#00201E] flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[16px]">{step.icon}</span>
                    </div>
                    {idx < currentBatch.timelineSteps.length - 1 && (
                      <div className="w-0.5 h-full bg-[#55C6C0]/30 mt-1" />
                    )}
                  </div>
                  <div className="flex flex-col pb-3 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-[#006A66]">Langkah {step.step}</span>
                      <span className="text-[11px] text-gray-400">· {step.time}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600">{step.location}</span>
                    <h4 className="text-xs font-bold text-[#123E46] mt-0.5">{step.title}</h4>
                    <p className="text-xs text-[#1F1B12]/80 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamified Reward Callout Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#123E46] to-[#006A66] text-white p-5 shadow-md space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <h4 className="font-bold text-sm text-[#86F5EE]">
                  {hasClaimedCurrent ? 'Poin Telah Diklaim Untuk Batch Ini' : 'Klaim +50 Poin Streak!'}
                </h4>
                <p className="text-[11px] text-white/80">
                  {hasClaimedCurrent
                    ? 'Kemasan ini telah tercatat dalam riwayat poin akun Anda.'
                    : `Kemasan BATCH #${currentBatch.batchCode} belum pernah diklaim di akunmu.`}
                </p>
              </div>
            </div>
            {!hasClaimedCurrent ? (
              <button
                type="button"
                onClick={handleClaimReward}
                className="w-full py-2.5 rounded-full bg-[#DE9050] hover:bg-[#e78438] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 mt-2"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Klaim 50 Poin Sekarang</span>
              </button>
            ) : (
              <div className="w-full py-2 rounded-full bg-white/20 text-white font-bold text-xs text-center mt-2 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Terklaim (+50 Pts)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* State 2: REVIEW */}
      {inspectStatus === 'REVIEW' && (
        <div className="bg-white rounded-3xl p-6 border border-[#DE9050]/40 shadow-sm text-center space-y-3 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#FFF5E5] text-[#DE9050] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[36px]">schedule</span>
          </div>
          <h3 className="font-bold text-base text-[#123E46]">Perlu Pemeriksaan Lebih Lanjut</h3>
          <p className="text-xs text-[#1F1B12]/80 max-w-sm mx-auto leading-relaxed">
            Batch <strong>{inputCode}</strong> sedang dalam tahap verifikasi uji petik mutu organoleptik
            dan menunggu finalisasi sinkronisasi konsensus validator.
          </p>
          <button
            type="button"
            onClick={() => {
              setInputCode('PND-JPR-2025-001');
              executeLookup('PND-JPR-2025-001');
            }}
            className="px-5 py-2.5 rounded-full bg-[#006A66] text-white font-bold text-xs hover:bg-[#123E46] transition-colors"
          >
            Lihat Batch Yang Sudah Valid
          </button>
        </div>
      )}

      {/* State 3: NOT_FOUND */}
      {inspectStatus === 'NOT_FOUND' && (
        <div className="bg-white rounded-3xl p-6 border border-red-200 shadow-sm text-center space-y-3 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[36px]">warning</span>
          </div>
          <h3 className="font-bold text-base text-[#123E46]">Kode Tidak Ditemukan</h3>
          <p className="text-xs text-[#1F1B12]/80 max-w-sm mx-auto leading-relaxed">
            Nomor batch atau kode unik kemasan <strong>"{inputCode}"</strong> tidak terdaftar pada basis
            data produksi resmi PINDARA. Pastikan kode yang Anda ketik sesuai di kemasan.
          </p>
          <button
            type="button"
            onClick={() => {
              setInputCode('PND-JPR-2025-001');
              executeLookup('PND-JPR-2025-001');
            }}
            className="px-5 py-2.5 rounded-full bg-[#123E46] text-white font-bold text-xs"
          >
            Kembalikan Kode Standar
          </button>
        </div>
      )}

      {/* Coastal Origin Map Preview */}
      <div className="bg-white rounded-3xl p-5 border border-[#123E46]/10 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006A66] text-[22px]">explore</span>
            <h3 className="font-bold text-sm text-[#123E46]">Peta Sentra Bahari Asal Bahan</h3>
          </div>
          <span className="text-xs text-gray-500">Jepara, Jawa Tengah</span>
        </div>

        <div
          className="w-full h-44 rounded-2xl relative overflow-hidden bg-cover bg-center shadow-inner"
          style={{ backgroundImage: `url(${ASSETS.coastalMap})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#123E46]/90 via-[#123E46]/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#86F5EE]">pin_drop</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">Pesisir Bandengan & Mlonggo</span>
                <span className="text-[10px] text-white/80">Koordinat TPI: -6.5593, 110.6558</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold">
              Titik Asal Tangkapan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
