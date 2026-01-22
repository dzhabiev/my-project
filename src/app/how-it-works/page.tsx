'use client';

import { Upload, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 px-4 py-12 md:px-6 md:py-20">
      {/* Back Button */}
      <div className="mb-8 md:mb-12">
        <a href="/" className="inline-flex items-center gap-2 text-[#3B82F6] font-semibold hover:underline">
          ← Back to Home
        </a>
      </div>

      <div className="mx-auto w-full max-w-[600px]">
        {/* Title */}
        <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-900 md:mb-12 md:text-5xl">
          How It Works
        </h1>

        {/* Steps */}
        <section className="mb-8 md:mb-12">
          <div className="flex flex-col gap-3 md:gap-5">
        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-5 md:gap-4 md:rounded-3xl md:p-8"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-base font-bold text-white md:h-10 md:w-10 md:text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-gray-900 md:text-2xl">Upload Your Photo</h3>
          </div>
          <p className="text-sm text-gray-600 md:text-base">
            Choose any photo of yourself, a friend, or even your pet! Our AI works with all kinds of images.
          </p>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-2 flex justify-center md:mt-4"
          >
            <div className="rounded-xl bg-white p-3 shadow-lg md:p-4">
              <Upload className="h-12 w-12 text-[#3B82F6] md:h-16 md:w-16" />
            </div>
          </motion.div>
        </motion.div>
        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-5 md:gap-4 md:rounded-3xl md:p-8"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-base font-bold text-white md:h-10 md:w-10 md:text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-gray-900 md:text-2xl">AI Magic Happens</h3>
          </div>
          <p className="text-sm text-gray-600 md:text-base">
            Our advanced AI transforms your photo into a professional vector sticker with vibrant colors and clean lines.
          </p>
          <div className="mt-2 flex items-center justify-center gap-3 md:mt-4 md:gap-6">
            <motion.div
              className="overflow-hidden rounded-lg border-2 border-white shadow-lg md:rounded-xl md:border-4"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src="/examples/before.jpg"
                alt="Before"
                className="h-14 w-14 object-cover md:h-20 md:w-20"
                style={{ objectPosition: 'center 5%' }}
              />
            </motion.div>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl md:text-4xl"
            >
              →
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-lg border-2 border-white shadow-lg md:rounded-xl md:border-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <img
                src="/examples/after.jpg"
                alt="After"
                className="h-14 w-14 object-cover md:h-20 md:w-20"
                style={{ objectPosition: 'center 5%' }}
              />
            </motion.div>
          </div>
        </motion.div>
        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-5 md:gap-4 md:rounded-3xl md:p-8"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-base font-bold text-white md:h-10 md:w-10 md:text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-gray-900 md:text-2xl">Download & Enjoy</h3>
          </div>
          <p className="text-sm text-gray-600 md:text-base">
            Get your high-quality sticker instantly! Use it anywhere - social media, messaging apps, or print it out.
          </p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-2 flex justify-center md:mt-4"
          >
            <div className="rounded-xl bg-white p-3 shadow-lg md:p-4">
              <Star className="h-12 w-12 fill-amber-400 text-amber-400 md:h-16 md:w-16" />
            </div>
          </motion.div>
        </motion.div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 flex justify-center md:mt-16">
          <a href="/" className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105">
            Create Your Sticker Now →
          </a>
        </div>
      </div>
    </div>
  );
}
