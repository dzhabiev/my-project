'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect to get started',
    features: [
      '5 stickers per month',
      'Basic sticker styles',
      'Standard quality',
      'Email support',
    ],
    cta: 'Get Started',
    href: '/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '9.99',
    description: 'For regular sticker creators',
    features: [
      'Unlimited stickers',
      'All sticker styles',
      'HD quality',
      'Priority support',
      'Commercial use',
      'No watermark',
    ],
    cta: 'Start Pro',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '49.99',
    description: 'For teams and businesses',
    features: [
      'Everything in Pro',
      'API access',
      'Custom styles',
      'Team collaboration',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-sky-50 to-cyan-50 px-4 py-12"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your sticker creation needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-4 py-1 text-sm font-bold text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className={`h-full rounded-3xl border bg-white p-8 shadow-lg transition-all hover:shadow-xl ${
                  plan.popular
                    ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20'
                    : 'border-gray-200'
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">${plan.price}</span>
                    {plan.price !== '0' && (
                      <span className="ml-2 text-gray-600">/month</span>
                    )}
                  </div>
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] p-1">
                          <Check className="h-4 w-4 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full rounded-full px-6 py-3 text-base font-bold shadow-lg transition-all hover:shadow-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white'
                        : 'border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600">
            All plans include a 14-day money-back guarantee.{' '}
            <Link href="/contact" className="font-semibold text-[#3B82F6] hover:underline">
              Contact us
            </Link>{' '}
            if you have questions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
