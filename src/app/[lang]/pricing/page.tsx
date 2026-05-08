"use client";

import { Check, X, Building2, Globe2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingPage({ params }: { params: { lang: string } }) {
  // Using client component to enable framer-motion animations
  
  const tiers = [
    {
      name: "Free",
      price: "₩0",
      period: "forever",
      description: "Basic profile for small manufacturers",
      features: [
        { name: "Company Profile Listing", active: true },
        { name: "Up to 5 Products", active: true },
        { name: "Receive RFQs (Delayed)", active: true },
        { name: "Verified Badge", active: false },
        { name: "Analytics Dashboard", active: false },
      ],
      recommended: false,
      buttonText: "Start Free",
      color: "border-slate-200 dark:border-slate-800"
    },
    {
      name: "Basic",
      price: "₩49,000",
      period: "/month",
      description: "Standard visibility for growing businesses",
      features: [
        { name: "Company Profile Listing", active: true },
        { name: "Up to 50 Products", active: true },
        { name: "Receive RFQs (Instant)", active: true },
        { name: "Verified Badge", active: true },
        { name: "Analytics Dashboard", active: false },
      ],
      recommended: false,
      buttonText: "Get Basic",
      color: "border-slate-200 dark:border-slate-800"
    },
    {
      name: "Pro",
      price: "₩149,000",
      period: "/month",
      description: "Priority search and full analytics access",
      features: [
        { name: "Company Profile Listing", active: true },
        { name: "Up to 500 Products", active: true },
        { name: "Receive RFQs (Instant)", active: true },
        { name: "Verified Badge", active: true },
        { name: "Analytics Dashboard", active: true },
        { name: "Priority Search Ranking", active: true },
      ],
      recommended: true,
      buttonText: "Upgrade to Pro",
      color: "border-blue-500 shadow-blue-500/20 shadow-xl scale-105 z-10"
    },
    {
      name: "Premium",
      price: "₩399,000",
      period: "/month",
      description: "Unlimited products and direct buyer messaging",
      features: [
        { name: "Unlimited Products", active: true },
        { name: "Lead Generation Analytics", active: true },
        { name: "Direct Buyer Messaging", active: true },
        { name: "Top-tier Search Ranking", active: true },
        { name: "CAD File Hosting", active: true },
      ],
      recommended: false,
      buttonText: "Get Premium",
      color: "border-slate-200 dark:border-slate-800"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Custom API and dedicated account manager",
      features: [
        { name: "Everything in Premium", active: true },
        { name: "Custom API Integration", active: true },
        { name: "Dedicated Account Manager", active: true },
        { name: "Top Banner Placements", active: true },
        { name: "Custom SLA", active: true },
      ],
      recommended: false,
      buttonText: "Contact Sales",
      color: "border-slate-200 dark:border-slate-800"
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Membership Plans for Every Manufacturer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400"
          >
            Choose the right tier to increase your global visibility and capture high-quality B2B leads across Korea and Japan.
          </motion.p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-slate-900 rounded-2xl border-2 p-6 flex flex-col h-full ${tier.color} ${tier.recommended ? 'relative' : ''}`}
            >
              {tier.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                <p className="text-slate-500 text-sm h-10">{tier.description}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{tier.price}</span>
                <span className="text-slate-500 font-medium">{tier.period}</span>
              </div>
              
              <Button 
                className={`w-full mb-8 font-semibold ${tier.recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white'}`}
                variant={tier.recommended ? 'default' : 'secondary'}
              >
                {tier.buttonText}
              </Button>
              
              <div className="flex-1">
                <ul className="space-y-4 text-sm">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.active ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-slate-300 dark:text-slate-700 flex-shrink-0" />
                      )}
                      <span className={feature.active ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-400 dark:text-slate-600'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
