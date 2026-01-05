'use client';

import { useState, useEffect } from 'react';
import { Upload, Star, Sparkles } from 'lucide-react';

const heroStyles = [
  { name: 'Cute Cartoon', emoji: '🥰', bg: 'from-pink-100 to-rose-100' },
  { name: 'Funny Meme', emoji: '🤪', bg: 'from-yellow-100 to-orange-100' },
  { name: 'Unusual Everyday', emoji: '✨', bg: 'from-purple-100 to-indigo-100' },
];

const styleCategories = [
  {
    title: 'Meme version for fun',
    stickers: ['😂', '🤣', '😎', '🤪', '😜'],
    color: 'from-yellow-50 to-amber-50',
  },
  {
    title: 'Cute version for your love',
    stickers: ['💕', '🥰', '💝', '🌸', '🦋'],
    color: 'from-pink-50 to-rose-50',
  },
  {
    title: 'Unusual for everyday occasions',
    stickers: ['✨', '🎨', '🌈', '🦄', '🌙'],
    color: 'from-purple-50 to-indigo-50',
  },
];

function DynamicHeroPreview() {
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentStyleIndex((prev) => (prev + 1) % heroStyles.length);
        setFadeState('fade-in');
      }, 300);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const currentStyle = heroStyles[currentStyleIndex];

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${currentStyle.bg} transition-opacity duration-300 ${
          fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-9xl drop-shadow-lg">{currentStyle.emoji}</span>
          <p className="rounded-full bg-white/80 px-6 py-2 text-sm font-semibold tracking-tight text-gray-800 shadow-md backdrop-blur-sm">
            {currentStyle.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function StyleCategoryCard({ category }: { category: typeof styleCategories[0] }) {
  const [currentStickerIndex, setCurrentStickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStickerIndex((prev) => (prev + 1) % category.stickers.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [category.stickers.length]);

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`bg-gradient-to-br ${category.color} p-6`}>
        <div className="mb-6 flex h-32 items-center justify-center">
          <div className="grid grid-cols-3 gap-3">
            {category.stickers.slice(0, 3).map((sticker, idx) => (
              <div
                key={idx}
                className={`flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-500 ${
                  idx === currentStickerIndex % 3 ? 'scale-110' : 'scale-100'
                }`}
              >
                <span className="text-3xl">{sticker}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="mb-4 text-center text-lg font-bold tracking-tight text-gray-900">
          {category.title}
        </h3>

        <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98]">
          Create
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="mx-auto flex max-w-[600px] flex-col gap-12 px-6 py-12">

        {/* Dynamic Hero Preview */}
        <div className="flex flex-col gap-8">
          <DynamicHeroPreview />

          {/* Main Headline */}
          <h1 className="text-center text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
            Turn your photo<br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              INTO A STICKER!
            </span>
          </h1>

          {/* Primary CTA with pulse animation */}
          <div className="flex justify-center">
            <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-10 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95">
              <div className="absolute inset-0 animate-pulse bg-white opacity-0 group-hover:opacity-20"></div>
              <div className="flex items-center gap-3">
                <Upload className="h-6 w-6" strokeWidth={2.5} />
                <span className="text-lg tracking-tight">Upload Photo</span>
              </div>
            </button>
          </div>
        </div>

        {/* Style Category Cards */}
        <section className="flex flex-col gap-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Choose your style
          </h2>

          <div className="flex flex-col gap-4">
            {styleCategories.map((category, idx) => (
              <StyleCategoryCard key={idx} category={category} />
            ))}
          </div>
        </section>

        {/* Social Proof - Reviews */}
        <section className="flex flex-col gap-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            What our creators say
          </h2>

          <div className="flex flex-col gap-4">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Content Creator',
                text: 'The quality is incredible! My stickers look professional and the turnaround was super fast.',
                avatar: '👩‍💼',
                rating: 5,
              },
              {
                name: 'Mike Chen',
                role: 'Designer',
                text: `Best sticker service I've used. The AI transforms photos perfectly while keeping the original vibe.`,
                avatar: '👨‍🎨',
                rating: 5,
              },
              {
                name: 'Emma Rodriguez',
                role: 'Small Business Owner',
                text: 'My customers love these! I use them for packaging and they add such a personal touch.',
                avatar: '👩‍💻',
                rating: 5,
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-2xl shadow-sm">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold tracking-tight text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="leading-relaxed text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
          <Sparkles className="h-12 w-12 text-purple-500" strokeWidth={2} />
          <h3 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Ready to create your stickers?
          </h3>
          <p className="text-center text-gray-600">
            Upload your photo and transform it in seconds
          </p>
          <button className="rounded-xl bg-gray-900 px-8 py-3 font-semibold tracking-tight text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-800 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 text-center">
          <div className="mb-4 flex justify-center gap-8 text-sm">
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">Contact</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">Privacy</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">Terms</a>
          </div>
          <p className="text-sm text-gray-500">© 2024 CustomStickerPack. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
