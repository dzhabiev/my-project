'use client';

import { useState, useEffect } from 'react';
import { Upload, Heart, Smile, Sparkles, ImagePlus } from 'lucide-react';

// Category data with rotating icons
const categories = [
  {
    name: 'Cute for loved ones',
    color: 'from-pink-200 to-rose-200',
    icons: ['💝', '🥰', '💕', '🌸', '🦋'],
  },
  {
    name: 'Funny for friends',
    color: 'from-yellow-200 to-amber-200',
    icons: ['😂', '🤪', '😎', '🎉', '🎈'],
  },
  {
    name: 'Unusual for everyday',
    color: 'from-purple-200 to-indigo-200',
    icons: ['✨', '🌈', '🎨', '🦄', '🌙'],
  },
];

// Category button component with rotating animation
function CategoryButton({ category }: { category: typeof categories[0] }) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % category.icons.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [category.icons.length]);

  return (
    <button
      className={`group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br ${category.color} p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]`}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative flex items-center gap-4">
        {/* Rotating icon preview square */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/60 shadow-md backdrop-blur-md transition-transform duration-300 group-hover:rotate-3">
          <span className="text-4xl transition-all duration-500">
            {category.icons[currentIconIndex]}
          </span>
        </div>

        {/* Category name */}
        <span className="text-left text-lg font-semibold text-gray-800">
          {category.name}
        </span>
      </div>
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main container - mobile-first vertical layout */}
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-800 md:text-5xl">
            Turn any photo into a{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              personalized set of stickers
            </span>{' '}
            for any occasion.
          </h1>
        </header>

        {/* Hero section - Upload area */}
        <section className="flex flex-col gap-6">
          {/* Upload box */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/60 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-2xl bg-gradient-to-br from-blue-200 to-purple-200 p-6 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Upload className="h-12 w-12 text-white" strokeWidth={2.5} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Upload Your Photo</h2>
                <p className="text-gray-600">
                  Drop your image here or click to browse
                </p>
              </div>

              <button className="rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                <div className="flex items-center gap-2">
                  <ImagePlus className="h-5 w-5" />
                  Choose File
                </div>
              </button>
            </div>
          </div>

          {/* Text prompt box */}
          <div className="overflow-hidden rounded-3xl bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <label htmlFor="prompt" className="mb-3 block text-sm font-semibold text-gray-700">
              Describe your sticker style (optional)
            </label>
            <textarea
              id="prompt"
              rows={3}
              placeholder="e.g., Make it vibrant and cartoon-style with big eyes..."
              className="w-full rounded-2xl border-2 border-purple-200 bg-white/80 px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-200/50"
            />
          </div>
        </section>

        {/* Sticker Categories */}
        <section className="flex flex-col gap-4">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Choose Your Style
          </h2>

          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <CategoryButton key={category.name} category={category} />
            ))}
          </div>
        </section>

        {/* Decorative elements */}
        <div className="flex items-center justify-center gap-4 opacity-40">
          <Heart className="h-6 w-6 text-pink-400" />
          <Smile className="h-6 w-6 text-yellow-400" />
          <Sparkles className="h-6 w-6 text-purple-400" />
        </div>
      </div>
    </div>
  );
}
