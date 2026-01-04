'use client';

import { useState, useEffect } from 'react';
import { Upload, Star } from 'lucide-react';

const categories = [
  {
    name: 'Cute',
    subtitle: 'for loved ones',
    icons: ['💝', '🥰', '💕', '🌸', '🦋'],
  },
  {
    name: 'Funny',
    subtitle: 'for friends',
    icons: ['😂', '🤪', '😎', '🎉', '🎈'],
  },
  {
    name: 'Unusual',
    subtitle: 'for everyday',
    icons: ['✨', '🌈', '🎨', '🦄', '🌙'],
  },
];

const exampleImages = [
  '💝', '🎉', '🌸', '😎', '🦋', '🎨', '🥰', '✨'
];

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
      className="group flex w-full items-center gap-4 rounded-2xl bg-white/60 p-5 transition-all duration-300 hover:bg-white hover:shadow-md active:scale-[0.98]"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-300">
        <span className="text-3xl transition-all duration-500">
          {category.icons[currentIconIndex]}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-lg font-semibold text-gray-900">
          {category.name}
        </span>
        <span className="text-sm text-gray-600">
          {category.subtitle}
        </span>
      </div>
    </button>
  );
}

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % exampleImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3">
      {exampleImages.map((emoji, idx) => (
        <div
          key={idx}
          className={`flex aspect-square items-center justify-center rounded-2xl bg-white shadow-sm transition-all duration-500 ${
            idx === currentIndex ? 'scale-110 shadow-lg' : 'scale-100'
          }`}
        >
          <span className="text-4xl">{emoji}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF0F0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="mx-auto flex max-w-[500px] flex-col gap-12 px-6 py-12">

        <header className="flex flex-col gap-8 text-center">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            turn any photo into a personalized sticker! ✨
          </h1>

          <ImageCarousel />

          <p className="text-lg text-gray-700">
            <span className="font-semibold">551,289</span> photos turned into stickers! 🎉
          </p>
        </header>

        <section className="flex flex-col gap-8">
          <div
            className={`group relative cursor-pointer rounded-3xl bg-white p-12 transition-all duration-300 ${
              isDragging
                ? 'shadow-2xl ring-4 ring-blue-300'
                : 'shadow-lg hover:shadow-xl'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <div className={`rounded-full p-6 transition-all duration-300 ${
                isDragging ? 'bg-blue-100' : 'bg-pink-100'
              }`}>
                <Upload className={`h-10 w-10 transition-colors duration-300 ${
                  isDragging ? 'text-blue-600' : 'text-pink-600'
                }`} strokeWidth={2.5} />
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">
                  click here to upload!
                </p>
                <p className="text-base text-gray-600">
                  or drag and drop your photo
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="prompt" className="text-base font-semibold text-gray-900">
              describe your style (optional)
            </label>
            <textarea
              id="prompt"
              rows={3}
              placeholder="make it vibrant and cartoon-style..."
              className="w-full rounded-2xl border-0 bg-white px-5 py-4 text-gray-900 shadow-md placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            choose your vibe
          </h2>

          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <CategoryButton key={category.name} category={category} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-3xl bg-white/60 p-8">
          <h3 className="text-center text-xl font-bold text-gray-900">
            what people are saying
          </h3>

          <div className="flex flex-col gap-4">
            {[
              { name: 'Sarah M.', text: 'absolutely love my stickers! so cute and high quality 💕', avatar: '🙋‍♀️' },
              { name: 'Mike T.', text: 'perfect gift for my girlfriend, she was so happy!', avatar: '👨' },
              { name: 'Emma L.', text: 'the cutest stickers ever! ordering more soon', avatar: '🙋' },
            ].map((review, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-2xl">{review.avatar}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-4 py-8 text-center text-sm text-gray-600">
          <p>made with ❤️ for sticker lovers everywhere</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-gray-900">contact</a>
            <a href="#" className="hover:text-gray-900">privacy</a>
            <a href="#" className="hover:text-gray-900">terms</a>
          </div>
        </footer>

      </div>
    </div>
  );
}
