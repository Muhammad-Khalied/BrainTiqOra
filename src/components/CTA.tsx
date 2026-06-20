import { motion } from 'motion/react';
import { ArrowRight, Phone, MessageSquare, Mail } from 'lucide-react';

export default function CTA({ onStartProject }: { onStartProject?: () => void; onExploreWork?: () => void }) {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-accent opacity-5" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider text-primary mb-8 uppercase"
        >
          <MessageSquare className="w-3 h-3 text-primary" />
          Let's Grow Together
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-headline text-5xl md:text-7xl font-black tracking-tight mb-8"
        >
          Your Growth <br />
          <span className="text-gradient">Starts Here</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Let's Build Something Remarkable Together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
        >
          <button 
            onClick={onStartProject}
            className="bg-primary text-white border border-outline-variant px-10 py-5 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-geometric hover:bg-primary-dim hover:scale-105 transition-all"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <a 
            href="tel:+201140350305"
            className="bg-surface-container-low border border-outline-variant px-10 py-5 rounded-xl font-headline font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105 transition-all flex items-center justify-center gap-3 text-on-surface"
          >
            <Phone className="w-5 h-5 text-primary" />
            +20 114 035 0305
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center gap-8 text-on-surface-variant font-medium text-sm"
        >
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            hello@braintiqora.com
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            Brain Tiq Ora
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 border border-primary/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-tertiary rounded-full blur-sm opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 border-2 border-primary/30 rounded-lg rotate-12" />
    </section>
  );
}
