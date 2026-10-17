import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  unread: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'beranda' | 'trace' | 'shop' | 'explore' | 'streak') => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Streak Harian Anda Menyala! 🔥',
      message: 'Kamu sudah mencapai 7 hari berturut-turut! Lencana Serani Enthusiast kini terbuka.',
      time: '10 menit yang lalu',
      icon: 'local_fire_department',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Batch Baru Terverifikasi: PND-JPR-2025-002',
      message: 'Batch produksi segar pesisir Mlonggo telah dicatat di konsensus blockchain.',
      time: '1 jam yang lalu',
      icon: 'verified',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'Kuis Trivia Hari Ini Tersedia',
      message: 'Jawab kuis rempah Pindang Serani & dapatkan +25 Poin loyalty secara instan.',
      time: 'Pagi ini',
      icon: 'quiz',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123E46]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-[#FFF8F1] rounded-3xl p-5 shadow-2xl border border-[#123E46]/10 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006A66] text-[24px]">notifications</span>
            <h3 className="font-['Chewy',sans-serif] text-xl text-[#123E46]">Pemberitahuan</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#123E46]/10 hover:bg-[#123E46]/20 flex items-center justify-center text-[#123E46]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.id === 'notif-1' || item.id === 'notif-3') {
                  onNavigateToTab('streak');
                } else if (item.id === 'notif-2') {
                  onNavigateToTab('trace');
                }
                onClose();
              }}
              className={`p-3 rounded-2xl cursor-pointer transition-all ${
                item.unread ? 'bg-white border border-[#55C6C0]/50 shadow-sm' : 'bg-[#FFF8F1] border border-transparent'
              }`}
            >
              <div className="flex gap-2.5 items-start">
                <span className="material-symbols-outlined text-[#006A66] text-[20px] mt-0.5">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#123E46] truncate">{item.title}</span>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-[#1F1B12]/80 mt-0.5 leading-snug">{item.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#123E46] text-white text-xs font-bold"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
