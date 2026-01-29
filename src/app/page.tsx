'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Star, Quote, User, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  { image: '/examples/sticker1.png', style: 'Sticker Example 1' },
  { image: '/examples/sticker2.png', style: 'Sticker Example 2' },
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
    lg: 'h-32 w-32 text-4xl md:h-40 md:w-40 md:text-5xl',
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
    <div className="relative flex h-56 w-full items-center justify-center md:h-72">
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
            <img
              src={heroImages[currentIndex].image}
              alt={heroImages[currentIndex].style}
              className="h-40 w-40 md:h-56 md:w-56 object-contain"
              style={{ 
                objectPosition: 'center 5%',
                filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))'
              }}
            />
          </motion.div>
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

interface UserSticker {
  id: string;
  image_url: string;
  is_unlocked: boolean;
  created_at: string;
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedSticker, setGeneratedSticker] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStickersModal, setShowStickersModal] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [savedStickers, setSavedStickers] = useState<UserSticker[]>([]);
  const [selectedStickerIndex, setSelectedStickerIndex] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showPaymentFailedModal, setShowPaymentFailedModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  // Check for payment status from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus === 'success') {
      setShowPaymentSuccessModal(true);
      // Clean URL
      window.history.replaceState({}, '', '/');
      // Reload stickers after a short delay to allow webhook to complete
      setTimeout(() => {
        if (user) {
          loadUserStickers(user.id);
        }
      }, 2000);
    } else if (paymentStatus === 'failed') {
      setShowPaymentFailedModal(true);
      window.history.replaceState({}, '', '/');
    }
  }, [user]);

  // Check for user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserStickers(session.user.id);
        checkSuperAdmin(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserStickers(session.user.id);
        checkSuperAdmin(session.user.id);
      } else {
        setSavedStickers([]);
        setIsSuperAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check if user is super admin
  const checkSuperAdmin = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_super_admin')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking super admin status:', error);
    } else if (data?.is_super_admin) {
      setIsSuperAdmin(true);
      setIsAdmin(true);
      console.log('🔥 Super Admin mode activated');
    }
  };

  // Load user stickers from Supabase
  const loadUserStickers = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_stickers')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading stickers:', error);
    } else if (data) {
      setSavedStickers(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const downloadSticker = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sticker-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading sticker:', error);
    }
  };

  // Check for admin code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminCode = urlParams.get('admin');
    if (adminCode === process.env.NEXT_PUBLIC_ADMIN_CODE) {
      setIsAdmin(true);
      console.log('🔓 Admin mode activated');
    }
  }, []);

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

  const handleScrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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

      console.log('Received sticker URL:', data.imageUrl);
      
      // Validate URL before saving
      if (!data.imageUrl || typeof data.imageUrl !== 'string' || !data.imageUrl.startsWith('https://v3b.fal.media/')) {
        throw new Error('Invalid sticker URL received');
      }
      
      setGeneratedSticker(data.imageUrl);
      
      // Save sticker to Supabase (locked by default)
      if (user) {
        try {
          const { data: stickerData, error: insertError } = await supabase
            .from('user_stickers')
            .insert({
              user_id: user.id,
              image_url: data.imageUrl,
              is_unlocked: false
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error saving sticker to Supabase:', insertError);
          } else if (stickerData) {
            setSavedStickers((prev) => [stickerData, ...prev]);
            setSelectedStickerIndex(0);
          }
        } catch (storageError) {
          console.error('Error saving to Supabase:', storageError);
        }
      }
      
      // Show stickers modal after generation
      setTimeout(() => setShowStickersModal(true), 500);
    } catch (error) {
      console.error('Error generating sticker:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Displaying error to user:', errorMessage);
      alert(`Failed to generate sticker: ${errorMessage}. Check console for details.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUnlockSticker = async () => {
    if (savedStickers.length === 0 || !user) return;

    setIsProcessingPayment(true);

    try {
      const currentSticker = savedStickers[selectedStickerIndex];
      
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stickerId: currentSticker.id,
          stickerUrl: currentSticker.image_url,
          amount: 3.00,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Payment creation failed:', data);
        throw new Error(data.error || data.message || 'Failed to create payment');
      }

      console.log('Payment created:', data);

      // Open payment page in new window
      if (data.paymentUrl) {
        window.open(data.paymentUrl, '_blank');
        alert('Payment window opened! Complete the payment to unlock your sticker.');
      } else {
        // Show payment details for manual payment
        alert(`Payment created!\nAmount: ${data.payAmount} ${data.payCurrency}\nAddress: ${data.payAddress}\n\nSend payment to unlock your sticker.`);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert(`Failed to create payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Dots Pattern */}
        <div className="absolute left-10 top-20 h-3 w-3 rounded-full bg-blue-300 opacity-40"></div>
        <div className="absolute left-20 top-40 h-2 w-2 rounded-full bg-cyan-300 opacity-50"></div>
        <div className="absolute left-32 top-60 h-4 w-4 rounded-full bg-indigo-300 opacity-30"></div>
        <div className="absolute right-10 top-32 h-3 w-3 rounded-full bg-sky-300 opacity-40"></div>
        <div className="absolute right-24 top-56 h-2 w-2 rounded-full bg-blue-400 opacity-50"></div>
        <div className="absolute right-16 top-80 h-4 w-4 rounded-full bg-cyan-300 opacity-30"></div>

        {/* Larger decorative circles */}
        <div className="absolute -left-20 top-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 opacity-20 blur-3xl"></div>
        <div className="absolute -right-20 top-1/3 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-200 to-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 h-36 w-36 rounded-full bg-gradient-to-br from-cyan-200 to-sky-200 opacity-20 blur-3xl"></div>

        {/* Symbols */}
        <div className="absolute left-16 bottom-40 text-3xl opacity-10">✨</div>
        <div className="absolute right-20 bottom-60 text-2xl opacity-10">⭐</div>
        <div className="absolute left-24 top-1/2 text-4xl opacity-10">🎨</div>
        <div className="absolute right-32 top-1/4 text-3xl opacity-10">💫</div>

        {/* Stripes/Lines */}
        <div className="absolute left-0 top-1/3 h-px w-32 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"></div>
        <div className="absolute right-0 top-2/3 h-px w-40 bg-gradient-to-l from-transparent via-cyan-300 to-transparent opacity-30"></div>
      </div>

      {/* Auth Buttons - Top Right */}
      <div className="fixed right-4 top-4 z-40 flex items-center gap-3">
        {savedStickers.length > 0 && (
          <motion.button
            onClick={() => setShowStickersModal(true)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-[#3B82F6] bg-white px-4 py-2 text-sm font-bold text-[#3B82F6] shadow-lg transition-all hover:bg-[#3B82F6] hover:text-white"
          >
            <span className="hidden sm:inline">My Stickers</span>
            <span className="sm:hidden">Stickers</span>
          </motion.button>
        )}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-2 shadow-lg">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">
                {user.email?.split('@')[0]}
              </span>
            </div>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-gray-200 bg-white p-2 shadow-lg transition-all hover:border-gray-300 sm:px-4 sm:py-2"
            >
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4 text-gray-600" />
                <span className="hidden sm:inline text-sm font-semibold text-gray-700">Sign Out</span>
              </div>
            </motion.button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-lg transition-all hover:border-gray-300 sm:px-5"
              >
                Login
              </motion.button>
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-3 py-2 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl sm:px-5"
              >
                Sign Up
              </motion.button>
            </Link>
          </>
        )}
      </div>

      <div ref={uploadSectionRef} className="relative z-10 mx-auto w-full max-w-[600px] px-4 py-6 md:px-6 md:py-10">

        {/* Hero Section */}
        <section className="mb-8 flex flex-col items-center gap-3 md:mb-12 md:gap-5">
          {/* Hero Sticker Animation */}
          <HeroSticker />

          {/* Headline */}
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-extrabold leading-[0.95] tracking-[-0.05em] text-gray-900 md:mb-3 md:text-6xl">
              Turn Your Photo<br />
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                INTO A STICKER!
              </span>
            </h1>
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
            className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-8 py-3 text-base font-bold text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition-all hover:shadow-[0_15px_40px_rgba(59,130,246,0.5)] md:px-12 md:py-5 md:text-xl"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Upload className="h-5 w-5 md:h-6 md:w-6" strokeWidth={3} />
              Upload photo
            </div>
          </motion.button>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 md:mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 md:px-4 md:py-2 md:text-sm"
          >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400 md:h-4 md:w-4" />
            Loved by 150K+ users
          </motion.div>

          {/* Image Preview and Generate Button */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-lg md:rounded-3xl md:p-8"
            >
              <h3 className="mb-3 text-center text-lg font-bold text-gray-900 md:mb-4 md:text-xl">
                Your Uploaded Image
              </h3>
              <div className="mb-4 flex justify-center md:mb-6">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-h-48 rounded-lg border-2 border-gray-100 object-contain md:max-h-64 md:rounded-xl md:border-4"
                />
              </div>
              <motion.button
                onClick={handleGenerate}
                disabled={isGenerating}
                whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                className="w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 md:px-8 md:py-4 md:text-lg"
              >
                {isGenerating ? 'Generating Your Sticker...' : 'Generate Sticker!'}
              </motion.button>


            </motion.div>
          )}
        </section>

        {/* How It Works Link */}
        <div className="mb-8 md:mb-12 mt-3 md:mt-4 flex justify-center">
          <motion.button
            onClick={() => setShowHowItWorksModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-8 py-3 text-base font-bold text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition-all hover:shadow-[0_15px_40px_rgba(59,130,246,0.5)] md:px-12 md:py-4 md:text-lg"
          >
            Learn How It Works →
          </motion.button>
        </div>

        {/* Testimonials Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 md:mb-5 md:text-4xl">
            What our creators say
          </h2>

          <div className="flex flex-col gap-3 md:grid md:grid-cols-1 md:gap-4">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:rounded-2xl md:p-6"
              >
                <div className="mb-3 flex items-start justify-between md:mb-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Avatar */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white md:h-12 md:w-12 md:text-sm"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      {testimonial.avatar}
                    </div>

                    {/* Name and role */}
                    <div>
                      <p className="text-sm font-bold text-gray-900 md:text-base">{testimonial.name}</p>
                      <p className="text-xs text-gray-600 md:text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Quote icon */}
                  <Quote className="h-5 w-5 text-gray-300 md:h-6 md:w-6" />
                </div>

                {/* Stars */}
                <div className="mb-2 flex gap-0.5 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 md:h-4 md:w-4" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-sm leading-relaxed text-gray-700 md:text-base">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm md:mb-8 md:rounded-3xl md:p-10"
        >
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 md:mb-3 md:text-3xl">
            Ready to create your stickers?
          </h3>
          <p className="mb-4 text-sm text-gray-600 md:mb-5 md:text-base">
            Join 150K+ happy creators and transform your photos in seconds
          </p>

          <motion.button
            onClick={handleScrollToUpload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-8 py-3 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl md:px-10 md:py-4 md:text-lg"
          >
            Get Started
          </motion.button>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-4 text-center md:pt-6">
          <div className="mb-3 flex justify-center gap-4 text-xs font-medium md:mb-4 md:gap-8 md:text-sm">
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
          <p className="text-xs text-gray-500 md:text-sm">© 2024 CustomStickerPack. All rights reserved.</p>
        </footer>

      </div>

      {/* Generation Overlay Modal */}
      <AnimatePresence>
        {isGenerating && uploadedImage && !showStickersModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Generating state */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative mx-4 max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 to-orange-50 p-8 shadow-2xl"
            >
              <div className="mb-6 flex justify-center">
                <motion.img
                  src={uploadedImage}
                  alt="Generating"
                  className="h-64 w-64 rounded-2xl object-cover shadow-lg"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Floating sticker emojis */}
              <motion.div
                className="absolute left-8 top-12 text-4xl"
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                🎨
              </motion.div>
              <motion.div
                className="absolute right-8 top-16 text-3xl"
                animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute right-12 bottom-32 text-3xl"
                animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
              >
                🔥
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-center"
              >
                <h3 className="mb-1 text-2xl font-black text-gray-900">
                  Making your{' '}
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                    sticker
                  </span>{' '}
                  now!
                </h3>
              </motion.div>

              {/* Progress Bar */}
              <div className="relative h-3 overflow-hidden rounded-full bg-white shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 25, ease: "linear" }}
                />
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-center text-sm font-medium text-gray-600"
              >
                This may take 10-30 seconds ⏱️
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Stickers Modal */}
      <AnimatePresence>
        {showStickersModal && savedStickers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowStickersModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 p-4 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Your Custom Stickers</h2>
                <button
                  onClick={() => setShowStickersModal(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/50 text-gray-600 hover:bg-white transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Alert */}
              <div className="mb-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 border border-[#3B82F6] px-3 py-2 flex items-center gap-2">
                <span className="text-[#3B82F6] text-base">🔒</span>
                <p className="text-xs font-semibold text-[#3B82F6]">
                  You have {savedStickers.length} sticker{savedStickers.length > 1 ? 's' : ''} waiting for you!
                </p>
              </div>

              {/* Storage Warning */}
              <div className="mb-3 px-1">
                <p className="text-[9px] text-gray-400">
                  Notice: Stickers are securely saved in your account • Sync across all devices
                </p>
              </div>

              {/* Sticker Gallery - Thumbnails */}
              <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {savedStickers.map((sticker, index) => (
                  <motion.button
                    key={sticker.id}
                    onClick={() => setSelectedStickerIndex(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedStickerIndex === index
                        ? 'border-[#3B82F6] ring-2 ring-[#3B82F6] ring-offset-2'
                        : 'border-white/50'
                    }`}
                  >
                    <img
                      src={`/api/proxy-image?url=${encodeURIComponent(sticker.image_url)}`}
                      alt={`Sticker ${index + 1}`}
                      className={`h-full w-full object-cover ${!sticker.is_unlocked ? 'blur-sm' : ''}`}
                    />
                    {!sticker.is_unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    )}
                    {selectedStickerIndex === index && (
                      <div className="absolute inset-0 bg-[#3B82F6]/20"></div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Selected Sticker Display */}
              <div className="mb-4 rounded-xl bg-white p-4">
                <div className="relative">
                  <img
                    src={`/api/proxy-image?url=${encodeURIComponent(savedStickers[selectedStickerIndex].image_url)}`}
                    alt="Generated Sticker"
                    className={`w-full rounded-lg object-contain ${!savedStickers[selectedStickerIndex].is_unlocked && !isAdmin ? 'blur-sm' : ''}`}
                  />
                  
                  {/* Lock Overlay - Hidden for Admin or unlocked stickers */}
                  {!savedStickers[selectedStickerIndex].is_unlocked && !isAdmin && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-2xl"
                      >
                        <svg
                          className="h-6 w-6 text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </motion.div>
                      <div className="rounded-full bg-white px-3 py-1 shadow-lg">
                        <p className="text-xs font-bold text-gray-900">Locked</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Payment Button - Hidden for Admin or unlocked stickers */}
              {!savedStickers[selectedStickerIndex].is_unlocked && !isAdmin && (
                <div>
                  <motion.button
                    onClick={handleUnlockSticker}
                    disabled={isProcessingPayment}
                    whileHover={{ scale: isProcessingPayment ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessingPayment ? 1 : 0.98 }}
                    className="w-full rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-5 py-3 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    {isProcessingPayment ? 'Processing...' : 'Unlock now ($3.00)'}
                  </motion.button>
                </div>
              )}

              {/* Admin Badge */}
              {isAdmin && (
                <div className="flex items-center justify-center gap-2 rounded-lg bg-green-100 px-4 py-2">
                  <span className="text-lg">🔓</span>
                  <p className="text-sm font-semibold text-green-700">Admin Mode - Free Access</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How It Works Modal */}
      <AnimatePresence>
        {showHowItWorksModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowHowItWorksModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowHowItWorksModal(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>

              {/* Title */}
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">How It Works</h2>

              {/* Steps */}
              <div className="flex flex-col gap-4 md:gap-6">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-6"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-xl font-bold text-white">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">Upload Your Photo</h3>
                    <p className="text-sm text-gray-600">Choose any photo of yourself, a friend, or even your pet! Our AI works with all kinds of images.</p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-6"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-xl font-bold text-white">
                      2
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">AI Magic Happens</h3>
                      <p className="text-sm text-gray-600">Our advanced AI transforms your photo into a professional vector sticker with vibrant colors and clean lines.</p>
                    </div>
                  </div>
                  
                  {/* Before/After Images */}
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <div className="overflow-hidden rounded-lg border-2 border-white shadow-lg">
                      <img
                        src="/examples/before.jpg"
                        alt="Before"
                        className="h-20 w-20 object-cover"
                        style={{ objectPosition: 'center 5%' }}
                      />
                    </div>
                    <div className="text-2xl font-bold text-[#3B82F6]">→</div>
                    <div className="overflow-hidden rounded-lg border-2 border-white shadow-lg">
                      <img
                        src="/examples/after.jpeg"
                        alt="After"
                        className="h-20 w-20 object-cover"
                        style={{ objectPosition: 'center 5%' }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-4 md:p-6"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-xl font-bold text-white">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">Download & Enjoy</h3>
                    <p className="text-sm text-gray-600">Get your high-quality sticker instantly! Use it anywhere - social media, messaging apps, or print it out.</p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => setShowHowItWorksModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl md:mt-8"
              >
                Create Your Sticker Now →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Success Modal */}
      <AnimatePresence>
        {showPaymentSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowPaymentSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                >
                  <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>
              
              <h3 className="mb-3 text-center text-2xl font-bold text-gray-900">Оплата успешна! 🎉</h3>
              <p className="mb-6 text-center text-gray-600">
                Ваш стикер разблокирован и готов к скачиванию. Проверьте галерею!
              </p>

              <div className="space-y-3">
                {savedStickers.length > 0 && savedStickers[0].is_unlocked && (
                  <button
                    onClick={() => downloadSticker(savedStickers[0].image_url, 0)}
                    className="w-full rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Скачать стикер
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowPaymentSuccessModal(false);
                    setShowStickersModal(true);
                  }}
                  className="w-full rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  Открыть галерею
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Failed Modal */}
      <AnimatePresence>
        {showPaymentFailedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowPaymentFailedModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-rose-500"
                >
                  <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.div>
              </div>
              
              <h3 className="mb-3 text-center text-2xl font-bold text-gray-900">Оплата отменена</h3>
              <p className="mb-6 text-center text-gray-600">
                Оплата не была завершена. Попробуйте снова когда будете готовы.
              </p>

              <button
                onClick={() => setShowPaymentFailedModal(false)}
                className="w-full rounded-lg bg-gray-200 px-6 py-3 font-bold text-gray-800 shadow-lg transition-all hover:bg-gray-300"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
