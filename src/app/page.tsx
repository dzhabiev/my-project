'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Star, Quote } from 'lucide-react';

// Sticker categories with image placeholders
const styleCategories = [
  {
    title: 'Meme version for fun',
    subtitle: 'Exaggerated & hilarious',
    stickers: [
      { color: '#FFE44D', label: 'LOL' },
      { color: '#FF9E4D', label: 'OMG' },
      { color: '#4DFFFF', label: 'WOW' },
      { color: '#FF4DFF', label: 'YOLO' },
    ],
  },
  {
    title: 'Cute version for your love',
    subtitle: 'Sweet & adorable',
    stickers: [
      { color: '#FFB6E1', label: '♥' },
      { color: '#FFD6E8', label: '✿' },
      { color: '#FFA6D5', label: '♡' },
      { color: '#FF96C5', label: '❀' },
    ],
  },
  {
    title: 'Unusual for everyday occasions',
    subtitle: 'Unique & creative',
    stickers: [
      { color: '#C9A7FF', label: '✦' },
      { color: '#A7D7FF', label: '◆' },
      { color: '#FFA7E1', label: '✧' },
      { color: '#A7FFC9', label: '◈' },
    ],
  },
];

// Hero carousel images
const heroImages = [
  { color: '#FFB6E1', label: 'CUTE', style: 'Cute Cartoon' },
  { color: '#FFE44D', label: 'FUNNY', style: 'Funny Meme' },
  { color: '#C9A7FF', label: 'COOL', style: 'Unusual Everyday' },
];

// Testimonials
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Content Creator',
    text: 'The quality blew my mind! My stickers look professional and the turnaround was instant.',
    avatar: 'SJ',
    color: '#FFB6E1',
  },
  {
    name: 'Mike Chen',
    role: 'Designer',
    text: `Best sticker service I've used. The AI captures the essence perfectly while adding that special touch.`,
    avatar: 'MC',
    color: '#A7D7FF',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Small Business Owner',
    text: 'My customers absolutely love these! Perfect for branding and adding personality to packaging.',
    avatar: 'ER',
    color: '#FFA7E1',
  },
];

// Sticker component with the specific "sticker look"
function StickerPreview({ color, label, size = 'md' }: { color: string; label: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-16 w-16 text-lg',
    md: 'h-24 w-24 text-2xl',
    lg: 'h-40 w-40 text-5xl',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-xl border-4 border-white font-bold text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-all`}
      style={{
        backgroundColor: color,
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
      }}
    >
      {label}
    </motion.div>
  );
}

// Hero section with cycling stickers
function HeroSticker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-64 w-full items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <StickerPreview
              color={heroImages[currentIndex].color}
              label={heroImages[currentIndex].label}
              size="lg"
            />
          </motion.div>
          <p className="mt-4 text-center text-sm font-semibold text-gray-600">
            {heroImages[currentIndex].style}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Category card with bento-style layout
function CategoryCard({ category }: { category: typeof styleCategories[0] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % category.stickers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [category.stickers.length]);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="overflow-hidden rounded-3xl bg-[#F9FAFB] p-8 shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Internal gallery - 2x2 grid */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {category.stickers.map((sticker, idx) => (
          <motion.div
            key={idx}
            animate={{
              scale: idx === currentIndex ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <StickerPreview color={sticker.color} label={sticker.label} size="sm" />
          </motion.div>
        ))}
      </div>

      {/* Card content */}
      <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {category.title}
      </h3>
      <p className="mb-6 text-sm text-gray-600">{category.subtitle}</p>

      {/* Action button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-full border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
      >
        Create This Style
      </motion.button>
    </motion.div>
  );
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedSticker, setGeneratedSticker] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Compress image before uploading to avoid "Request Entity Too Large" errors
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set max dimensions (1024px to keep quality but reduce size)
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to base64 with good quality
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
          setUploadedImage(compressedBase64);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;

    setIsGenerating(true);
    setGeneratedSticker(null); // Clear previous result

    try {
      console.log('Sending request to generate sticker...');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: uploadedImage }),
      });

      const data = await response.json();
      console.log("Response from FAL:", data);

      if (!response.ok) {
        console.error('Full error response:', data);
        const errorMsg = data.fullError?.message || data.details || data.error || 'Failed to generate sticker';
        throw new Error(errorMsg);
      }

      console.log('Received generated sticker URL:', data.image);
      console.log('Setting generatedSticker state to:', data.image);
      setGeneratedSticker(data.image);
    } catch (error) {
      console.error('Error generating sticker:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Displaying error to user:', errorMessage);
      alert(`Failed to generate sticker: ${errorMessage}. Check console for details.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="mx-auto w-full max-w-[600px] px-6 py-16 md:py-24">

        {/* Hero Section */}
        <section className="mb-20 flex flex-col items-center gap-8">
          {/* Hero Sticker Animation */}
          <HeroSticker />

          {/* Headline */}
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-gray-900 md:text-7xl">
              Turn Your Photo<br />
              <span className="bg-gradient-to-r from-[#FF4D4D] to-[#F96161] bg-clip-text text-transparent">
                INTO A STICKER!
              </span>
            </h1>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              Loved by 150K+ users
            </motion.div>
          </div>

          {/* Main CTA with Pink Glow */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <motion.button
            onClick={handleUploadClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#F96161] px-12 py-5 text-xl font-bold text-white shadow-[0_20px_50px_rgba(255,77,77,0.4)] transition-all hover:shadow-[0_25px_60px_rgba(255,77,77,0.5)]"
          >
            <div className="flex items-center gap-3">
              <Upload className="h-6 w-6" strokeWidth={3} />
              Click Here To Upload!
            </div>
          </motion.button>

          {/* Secondary Trust */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>by 150K+ users</span>
          </div>

          {/* Image Preview and Generate Button */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
            >
              <h3 className="mb-4 text-center text-xl font-bold text-gray-900">
                Your Uploaded Image
              </h3>
              <div className="mb-6 flex justify-center">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-h-64 rounded-xl border-4 border-gray-100 object-contain"
                />
              </div>
              <motion.button
                onClick={handleGenerate}
                disabled={isGenerating}
                whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                className="w-full rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#F96161] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating Your Sticker...' : 'Generate Sticker!'}
              </motion.button>

              {/* Processing Indicator */}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mx-auto mb-2 h-8 w-8 rounded-full border-4 border-gray-200 border-t-[#FF4D4D]"
                  />
                  <p className="text-xl font-bold text-[#FF4D4D]">
                    AI is drawing...
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-600">
                    The AI is creating your custom sticker
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    This may take 10-30 seconds
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Generated Sticker Display */}
          {generatedSticker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full rounded-3xl border-4 border-[#FF4D4D] bg-white p-8 shadow-2xl"
            >
              <h3 className="mb-4 text-center text-2xl font-bold text-gray-900">
                Your Custom Sticker!
              </h3>

              {/* Image container with visible background */}
              <div className="mb-4 flex justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-8 border-4 border-dashed border-gray-400">
                <img
                  src={generatedSticker}
                  alt="Generated Sticker"
                  className="max-h-96 max-w-full rounded-xl object-contain"
                  onLoad={() => console.log('Image loaded successfully from:', generatedSticker)}
                  onError={(e) => console.error('Image failed to load:', generatedSticker, e)}
                  crossOrigin="anonymous"
                />
              </div>

              {/* Download Link */}
              <div className="text-center">
                <a
                  href={generatedSticker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                >
                  [Download Link]
                </a>
                <p className="mt-2 text-xs text-gray-500 break-all">
                  {generatedSticker}
                </p>
              </div>
            </motion.div>
          )}
        </section>

        {/* Category Cards - Bento Style */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-gray-900">
            Choose Your Style
          </h2>

          <div className="flex flex-col gap-6">
            {styleCategories.map((category, idx) => (
              <CategoryCard key={idx} category={category} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-gray-900">
            What our creators say
          </h2>

          <div className="flex flex-col gap-6 md:grid md:grid-cols-1">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      {testimonial.avatar}
                    </div>

                    {/* Name and role */}
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Quote icon */}
                  <Quote className="h-6 w-6 text-gray-300" />
                </div>

                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="leading-relaxed text-gray-700">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm"
        >
          <h3 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
            Ready to create your stickers?
          </h3>
          <p className="mb-8 text-gray-600">
            Join 150K+ happy creators and transform your photos in seconds
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gray-900 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-gray-800"
          >
            Get Started Free
          </motion.button>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 text-center">
          <div className="mb-4 flex justify-center gap-8 text-sm font-medium">
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">
              Contact
            </a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900">
              Terms
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2024 CustomStickerPack. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
