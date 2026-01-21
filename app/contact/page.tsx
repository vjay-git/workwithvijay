'use client'

import { useState } from 'react'
import AnimatedDiv from '@/components/AnimatedDiv'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission - replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-dark transition-colors duration-300 relative">
      {/* Subtle background light field — Dark mode only */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-1/2 h-1/3 bg-neon-cyan/3 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-neon-cyan/2 blur-3xl"></div>
      </div>
      <div className="relative z-10">
        <div className="section-padding pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-20 sm:pb-24 md:pb-32 lg:pb-40">
          <div className="container-max">
            <div className="max-w-3xl">
              {/* Opening Context — Calm Invitation */}
              <AnimatedDiv className="section-fade mb-12 sm:mb-16 md:mb-20">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light tracking-tight">
                  Let's discuss the system you're building.
                </p>
              </AnimatedDiv>

              {/* The Conversation Path */}
              <AnimatedDiv className="section-fade mb-12 sm:mb-16 md:mb-20">
                <div className="space-y-6 sm:space-y-8">
                  <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    We work on problems that require{' '}
                    <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_4px_rgba(92,225,230,0.2)]">
                      deep technical understanding
                    </span>
                    : AI systems, RAG architectures, agent workflows, and scalable platforms. Each engagement starts with understanding your specific challenge.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    A first conversation typically covers the problem space, technical constraints, and whether there's a good fit. No pitch, no pressure—just a thoughtful discussion about what you're building.
                  </p>
                </div>
              </AnimatedDiv>

              {/* The Contact Mechanism — Minimal Form */}
              <AnimatedDiv className="section-fade mb-12 sm:mb-16 md:mb-20">
                <div className="relative">
                  {/* Subtle background field */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/30 dark:to-neutral-800/20 rounded-xl sm:rounded-2xl -z-10"></div>
                  
                  <form onSubmit={handleSubmit} className="p-8 sm:p-10 md:p-12 space-y-6 sm:space-y-8">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3 tracking-wide"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 text-base sm:text-lg text-charcoal dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neon-cyan/50 transition-colors duration-200"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3 tracking-wide"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 text-base sm:text-lg text-charcoal dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neon-cyan/50 transition-colors duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3 tracking-wide"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 text-base sm:text-lg text-charcoal dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neon-cyan/50 transition-colors duration-200 resize-none"
                        placeholder="Tell me about the system you're building..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 sm:pt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 sm:py-5 bg-charcoal dark:bg-neon-cyan text-neutral-50 dark:text-charcoal-dark rounded-lg font-medium text-base sm:text-lg transition-all duration-200 hover:opacity-90 dark:hover:shadow-neon-glow disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[52px] flex items-center justify-center"
                      >
                        {isSubmitting ? 'Sending...' : 'Send message'}
                      </button>
                    </div>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <div className="pt-4 text-sm text-neutral-600 dark:text-neutral-400">
                        Message sent. I'll respond within 24 hours.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="pt-4 text-sm text-red-600 dark:text-red-400">
                        Something went wrong. Please try emailing directly.
                      </div>
                    )}
                  </form>
                </div>
              </AnimatedDiv>

              {/* Trust Signals — Areas of Focus */}
              <AnimatedDiv className="section-fade mb-12 sm:mb-16 md:mb-20">
                <div className="pt-8 sm:pt-10 md:pt-12 border-t border-neutral-200 dark:border-neutral-800 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neon-cyan/10 to-transparent"></div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-base font-medium text-neutral-500 dark:text-neutral-400 tracking-wide uppercase">
                      Areas of Focus
                    </p>
                    <div className="flex flex-wrap gap-4 sm:gap-6">
                      <span className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        RAG Systems
                      </span>
                      <span className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        AI Agents
                      </span>
                      <span className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        Production AI
                      </span>
                      <span className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        Scalable Platforms
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-500 pt-2">
                      Response time: within 24 hours
                    </p>
                  </div>
                </div>
              </AnimatedDiv>

              {/* Alternative: Direct Email */}
              <AnimatedDiv className="section-fade mb-12 sm:mb-16">
                <div className="pt-8 sm:pt-10 border-t border-neutral-200 dark:border-neutral-800 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neon-cyan/10 to-transparent"></div>
                  
                  <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mb-4">
                    Or reach out directly:
                  </p>
                  <a
                    href="mailto:hello@workwithvijay.com"
                    className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 hover:text-charcoal dark:hover:text-neon-cyan transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan"
                  >
                    hello@workwithvijay.com
                  </a>
                </div>
              </AnimatedDiv>

              {/* Closing Reassurance */}
              <AnimatedDiv className="section-fade">
                <div className="pt-8 sm:pt-10 md:pt-12 border-t border-neutral-200 dark:border-neutral-800 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neon-cyan/20 to-transparent"></div>
                  
                  <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                    No obligation. Just a conversation.
                  </p>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
