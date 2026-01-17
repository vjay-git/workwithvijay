import AnimatedDiv from '@/components/AnimatedDiv'

export default function Contact() {
  return (
    <div className="section-padding py-16 lg:py-24 bg-white dark:bg-charcoal-dark transition-colors duration-300">
      <div className="container-max">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-8">
            Contact
          </h1>

          <div className="space-y-8">
            <AnimatedDiv className="section-fade">
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Whether you're exploring AI features or scaling an existing system, we help teams build intelligent products that are <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_4px_rgba(92,225,230,0.2)]">reliable, explainable, and production-ready</span>.
              </p>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                If you have a project in mind or want to discuss your system, 
                reach out. We'll respond within 24 hours.
              </p>
            </AnimatedDiv>

            <div className="space-y-6 relative dark:before:content-[''] dark:before:absolute dark:before:top-0 dark:before:left-0 dark:before:right-0 dark:before:h-[1px] dark:before:bg-gradient-to-r dark:before:from-transparent dark:before:via-neon-cyan/20 dark:before:to-transparent dark:pt-6">
              <div>
                <h2 className="text-lg font-medium text-charcoal dark:text-neutral-100 mb-2">Email</h2>
                <a
                  href="mailto:hello@workwithvijay.com"
                  className="text-base text-neutral-600 dark:text-neutral-300 hover:text-charcoal dark:hover:text-neon-cyan transition-all duration-300 dark:focus:text-neon-cyan focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan"
                >
                  hello@workwithvijay.com
                </a>
              </div>

              {/* Contact form can be added here when needed */}
              <div className="pt-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  Currently accepting new projects. Available for long-term partnerships 
                  and focused engagements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
