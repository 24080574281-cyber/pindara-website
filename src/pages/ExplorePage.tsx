import React, { useState, useEffect } from 'react';
import { ASSETS, RECIPES, TRIVIA_QUESTIONS } from '../data/mockData';
import { RecipeIdea } from '../types';
import { oceanSoundscape } from '../utils/soundscape';

interface ExplorePageProps {
  onOpenRecipe: (recipe: RecipeIdea) => void;
  onAnswerQuiz: (points: number) => void;
  onExploreBuyHampers: () => void;
  isQuizAnsweredToday: boolean;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onOpenRecipe,
  onAnswerQuiz,
  onExploreBuyHampers,
  isQuizAnsweredToday,
}) => {
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25);

  // Quiz state
  const quiz = TRIVIA_QUESTIONS[0];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(isQuizAnsweredToday);
  const [quizFeedback, setQuizFeedback] = useState<{
    correct: boolean;
    title: string;
    desc: string;
  } | null>(
    isQuizAnsweredToday
      ? {
          correct: true,
          title: 'Sudah Diselesaikan!',
          desc: 'Kamu sudah menyelesaikan kuis trivia hari ini dan meraih +25 Poin Streak!',
        }
      : null
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 350);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAudio]);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      oceanSoundscape.stop();
      setIsPlayingAudio(false);
    } else {
      const ok = oceanSoundscape.play();
      if (ok) {
        setIsPlayingAudio(true);
      }
    }
  };

  const handleSelectQuiz = (index: number) => {
    if (quizSubmitted) return;
    setSelectedOption(index);
    setQuizSubmitted(true);

    const isCorrect = index === quiz.correctIndex;
    if (isCorrect) {
      setQuizFeedback({
        correct: true,
        title: 'Luar Biasa! Jawabanmu Benar!',
        desc: `${quiz.explanation} +25 Poin Streak ditambahkan ke akunmu!`,
      });
      onAnswerQuiz(quiz.points);
    } else {
      setQuizFeedback({
        correct: false,
        title: 'Hampir Tepat!',
        desc: `Jawaban yang tepat adalah ${quiz.options[quiz.correctIndex]}. ${quiz.explanation}`,
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-5 px-4 pb-12">
      {/* Hero Card: Explore Jepara & Pindang Serani */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123E46] via-[#1B535D] to-[#006A66] p-5 sm:p-6 text-white shadow-xl">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#86F5EE]/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-[#F4A261]/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#86F5EE] text-[#00201E] font-bold text-[10px] shadow-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">sailing</span>
            <span>Pesona Bahari Jepara</span>
          </div>

          <h2 className="font-['Chewy',sans-serif] text-3xl sm:text-4xl text-white tracking-wide">
            Explore Jepara & Pindang Serani
          </h2>

          <p className="text-xs sm:text-sm text-[#86F5EE] leading-relaxed max-w-lg">
            Kenali kekayaan rasa, kearifan nelayan lokal, dan ragam kreasi santapan istimewa khas Bumi Kartini.
          </p>

          <div className="mt-2 flex items-center justify-between p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.daraEat}
                alt="Dara Maskot"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#86F5EE] shadow-md animate-bounce"
                style={{ animationDuration: '2.5s' }}
              />
              <div className="flex flex-col">
                <span className="font-bold text-xs text-white">Disapa si Dara!</span>
                <span className="text-[11px] text-[#86F5EE]">"Yuk seruput ilmu rempah pesisir!"</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#86F5EE] text-[26px]">thumb_up</span>
          </div>
        </div>
      </div>

      {/* Mengapa Disebut Pindang Serani? */}
      <div className="rounded-3xl bg-white p-5 border border-[#123E46]/10 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#DE9050] text-[24px]">
              local_fire_department
            </span>
            <h3 className="font-bold text-base sm:text-lg text-[#123E46]">
              Mengapa Disebut Pindang Serani?
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5E5] text-[#79513A] text-[10px] font-bold border border-[#DE9050]/20">
            Filosofi Rasa
          </span>
        </div>

        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
          <img
            src={ASSETS.pindangBowl}
            alt="Mangkuk Tradisional Pindang Serani Jepara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123E46]/85 via-transparent to-transparent flex items-end p-3">
            <p className="text-[11px] text-white italic">
              Warisan akulturasi citarasa pesisir utara Jawa Tengah
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#1F1B12]/80 leading-relaxed">
          Nama <strong>Serani</strong> berakar dari kata <em>Nasrani</em>, merujuk perpaduan bumbu rempah
          lokal Jepara dengan pengaruh maritim para saudagar lintas samudra. Ciri khasnya adalah kuah
          bening kuning keemasan tanpa santan, yang memadukan keasaman alami{' '}
          <span className="text-[#006A66] font-bold">belimbing wuluh</span>, keharuman{' '}
          <span className="text-[#006A66] font-bold">daun kemangi & serai</span>, serta gurihnya kunyit
          bakar khas olahan ikan segar Jepara.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5 flex flex-col items-center">
            <span className="material-symbols-outlined text-[#DE9050] text-[20px] mb-0.5">eco</span>
            <span className="text-xs font-bold text-[#123E46]">Asem Segar</span>
            <span className="text-[10px] text-gray-500">Belimbing Wuluh</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5 flex flex-col items-center">
            <span className="material-symbols-outlined text-[#006A66] text-[20px] mb-0.5">spa</span>
            <span className="text-xs font-bold text-[#123E46]">Aroma Harum</span>
            <span className="text-[10px] text-gray-500">Kemangi & Serai</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5 flex flex-col items-center">
            <span className="material-symbols-outlined text-[#79513A] text-[20px] mb-0.5">soup_kitchen</span>
            <span className="text-xs font-bold text-[#123E46]">Gurih Ringan</span>
            <span className="text-[10px] text-gray-500">Kunyit Bakar</span>
          </div>
        </div>
      </div>

      {/* Cerita Dari Tepi Pantai */}
      <div className="rounded-3xl bg-white p-5 border border-[#123E46]/10 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006A66] text-[24px]">handshake</span>
          <h3 className="font-bold text-base sm:text-lg text-[#123E46]">Cerita Dari Tepi Pantai</h3>
        </div>

        <div className="flex gap-3.5 items-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
            <img
              src={ASSETS.pakKasto}
              alt="Pak Kasto Nelayan Pengolah Pindang Tradisional Jepara"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="font-bold text-sm text-[#123E46] truncate">Pak Kasto (56 Thn)</h4>
              <span className="material-symbols-outlined text-[#006A66] text-[16px]">verified</span>
            </div>
            <span className="text-xs text-[#006A66] font-bold">28 Tahun Pengolah Pindang Tradisional</span>
            <span className="text-[11px] text-gray-500">Pesisir Bandengan, Jepara</span>
          </div>
        </div>

        <blockquote className="p-3.5 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5 text-xs text-[#1F1B12]/80 italic relative">
          <span className="material-symbols-outlined text-[#123E46]/10 absolute right-3 top-2 text-[48px] pointer-events-none">
            format_quote
          </span>
          "PINDARA memberi harapan baru buat nelayan kecil di pesisir Jepara. Tangkapan ikan segar kami
          langsung diolah higienis dan terserap dengan harga adil tanpa dipermainkan tengkulak."
        </blockquote>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#86F5EE] text-[#00201E]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px]">water_drop</span>
            <span className="text-xs font-semibold">Dampak Hilirisasi Nelayan</span>
          </div>
          <span className="text-xs font-extrabold">140+ Keluarga Terberdayakan</span>
        </div>
      </div>

      {/* Inspirasi Kreasi Penyajian (3 Resep Kilat) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#DE9050] text-[22px]">skillet</span>
            <h3 className="font-bold text-base sm:text-lg text-[#123E46]">
              Inspirasi Kreasi Penyajian
            </h3>
          </div>
          <span className="text-xs text-[#006A66] font-bold">3 Resep Kilat</span>
        </div>
        <p className="text-xs text-[#1F1B12]/70">
          Sentuhan chef rumahan untuk semangkuk PINDARA yang semakin menggugah selera.
        </p>

        <div className="space-y-3 pt-1">
          {RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onOpenRecipe(recipe)}
              className="bg-white rounded-3xl overflow-hidden border border-[#123E46]/10 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
            >
              <div className="relative h-40 w-full bg-gray-100">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#123E46] text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[13px]">schedule</span>
                  <span>{recipe.cookTime}</span>
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                  {Array.from({ length: recipe.spiciness }).map((_, i) => (
                    <span key={i} className="text-xs">
                      🔥
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-[#123E46] leading-snug">{recipe.title}</h4>
                <p className="text-xs text-[#1F1B12]/80 line-clamp-2">{recipe.description}</p>
                <div className="pt-1 flex items-center justify-between text-[#006A66] text-xs font-bold">
                  <span className="truncate">{recipe.chefTip}</span>
                  <span className="material-symbols-outlined text-[18px] shrink-0">chevron_right</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suara Pesisir Jepara (Interactive Audio Soundscape Player) */}
      <div className="rounded-3xl bg-[#FFF5E5] p-5 border border-[#DE9050]/20 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006A66] text-[24px]">headphones</span>
            <h3 className="font-bold text-base text-[#123E46]">Suara Pesisir Jepara</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#86F5EE] text-[#00201E] text-[10px] font-bold">
            Live Audio Soundscape
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#123E46]/10 flex items-center gap-3.5 shadow-sm">
          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-md ${
              isPlayingAudio ? 'bg-[#DE9050] text-white' : 'bg-[#123E46] text-white hover:bg-[#1B535D]'
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">
              {isPlayingAudio ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-bold text-xs text-[#123E46] truncate">
              Deburan Ombak Pantai Kartini & Petikan Rempah
            </span>
            <span className="text-[11px] text-gray-500">
              {isPlayingAudio ? 'Sedang Memutar Suara Relaksasi Pesisir' : 'Soundscape Relaksasi Kuliner • 02:45'}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-[#006A66] h-full rounded-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kuis Trivia Jepara */}
      <div className="rounded-3xl bg-white p-5 border border-[#123E46]/10 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#DE9050] text-[24px]">quiz</span>
            <h3 className="font-bold text-base text-[#123E46]">Kuis Trivia Jepara</h3>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#FFF5E5] text-[#DE9050] font-bold text-xs flex items-center gap-1 border border-[#DE9050]/20 shadow-sm">
            <span>⭐</span>
            <span>+{quiz.points} POIN</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-[#FFF8F1] border border-[#123E46]/5 flex items-center gap-3">
          <img
            src={ASSETS.daraEat}
            alt="Dara Maskot"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#DE9050] shrink-0"
          />
          <p className="text-xs text-[#1F1B12]/80 leading-snug">
            "Uji wawasanmu tentang kuliner asli Bumi Kartini dan klaim poin streak-mu sekarang!"
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[#006A66]">Pertanyaan Hari Ini:</span>
          <h4 className="font-bold text-sm text-[#123E46] leading-snug">{quiz.question}</h4>
        </div>

        {/* Options */}
        <div className="space-y-2 pt-1">
          {quiz.options.map((opt, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOption === idx;
            const isCorrect = idx === quiz.correctIndex;

            let btnStyle = 'bg-white border-gray-200 text-[#1F1B12] hover:border-[#55C6C0]';
            if (quizSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-[#86F5EE]/40 border-[#006A66] text-[#00201E] font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-red-50 border-red-300 text-red-700 font-bold';
              } else {
                btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={quizSubmitted}
                onClick={() => handleSelectQuiz(idx)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.99] ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-gray-100 text-[#123E46] font-bold text-xs flex items-center justify-center">
                    {letter}
                  </span>
                  <span className="text-xs">{opt}</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">
                  {quizSubmitted
                    ? isCorrect
                      ? 'check_circle'
                      : isSelected
                      ? 'cancel'
                      : 'radio_button_unchecked'
                    : 'radio_button_unchecked'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback box */}
        {quizFeedback && (
          <div
            className={`p-3.5 rounded-2xl flex items-start gap-2.5 text-xs animate-fadeIn ${
              quizFeedback.correct
                ? 'bg-[#86F5EE]/40 text-[#006A66] border border-[#55C6C0]/40'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
              {quizFeedback.correct ? 'sentiment_very_satisfied' : 'info'}
            </span>
            <div>
              <span className="font-bold block">{quizFeedback.title}</span>
              <p className="mt-0.5 leading-snug">{quizFeedback.desc}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bawa Pulang Rasa Jepara Banner (Paket Hampers Edisi Kartini) */}
      <div className="p-5 rounded-3xl bg-[#86F5EE] text-[#00201E] flex flex-col gap-2 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-base">Bawa Pulang Rasa Jepara</h4>
            <span className="text-xs text-[#00201E]/80">Paket Hampers Pindara Edisi Kartini</span>
          </div>
          <span className="material-symbols-outlined text-[32px] text-[#006A66]">redeem</span>
        </div>
        <p className="text-xs text-[#00201E]/80 leading-relaxed">
          Rasakan gurih asam kuah serani dengan tekstur mi pipih kenyal khas racikan rempah nusantara.
        </p>
        <button
          onClick={onExploreBuyHampers}
          className="mt-1 w-full py-3 rounded-full bg-[#123E46] text-[#FFF8F1] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all hover:bg-[#1B535D]"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          <span>Beli Paket Eksplorasi Sekarang</span>
        </button>
      </div>
    </div>
  );
};
