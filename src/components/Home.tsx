import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Target, Lightbulb, TrendingUp, Users, Settings, ChevronDown, CheckCircle2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from './Loader';

export default function Home({ onStartProject, onExploreWork }: { onStartProject: () => void, onExploreWork?: () => void }) {
  const [content, setContent] = useState({
    heroTitle: 'Digital Marketing\n& Creative Solutions',
    heroSubtitle: 'We help brands and businesses build a strong presence, reach the right audience at the right time, and achieve measurable growth through creative marketing strategies.',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
    trustedByText: 'Trusted by visionary brands'
  });

  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    { icon: <Target />, title: 'Customized Strategies', desc: 'Every brand is unique, so we create tailored marketing plans that fit your goals.' },
    { icon: <TrendingUp />, title: 'Data-Driven Decisions', desc: 'Our decisions are based on real data, analytics, and measurable insights.' },
    { icon: <Lightbulb />, title: 'Creative Content', desc: 'We create engaging content that captures attention and drives interaction.' },
    { icon: <Settings />, title: 'Continuous Optimization', desc: 'We continuously analyze and improve campaigns for better results.' },
    { icon: <Users />, title: 'Dedicated Team', desc: 'Our experienced team works closely with you every step of the journey.' }
  ];

  const testimonials = [
    { quote: "Brain Tiq Ora transformed our online presence. Our engagement rates skyrocketed within the first two months.", author: "Sarah Jenkins", role: "Marketing Director, TechFlow" },
    { quote: "Their creative strategies and data-driven approach are unmatched. They truly understand how to build a brand.", author: "Michael Chang", role: "CEO, Nexa Retail" },
    { quote: "Professional, transparent, and highly effective. They delivered exactly what they promised and more.", author: "Elena Rodriguez", role: "Founder, Bloom Co." }
  ];

  const faqs = [
    { q: "What digital marketing services do you offer?", a: "We offer a comprehensive suite of services including Social Media Management, Content Creation, Paid Advertising (PPC), Branding, and Marketing Consultancy." },
    { q: "How long does it take to see results?", a: "While some paid campaigns can show immediate traffic, organic growth and brand building typically take 3-6 months to show significant, sustainable results." },
    { q: "Do you create custom marketing strategies?", a: "Yes, we believe every business is unique. We conduct thorough market research to build a strategy specifically tailored to your goals and target audience." },
    { q: "How do you measure campaign success?", a: "We track KPIs such as conversion rates, engagement metrics, cost per acquisition (CPA), and overall ROI, providing you with transparent, detailed monthly reports." },
    { q: "Can you help rebrand an existing business?", a: "Absolutely. Our Branding & Creative team specializes in brand identity design, visual branding, and motion graphics to breathe new life into established businesses." }
  ];

  if (loading) {
    return <Loader text="Loading Experience" />;
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-tertiary/10 blur-[120px] rounded-full -z-10 pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 relative z-10">

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-[1.05] mb-8 whitespace-pre-line"
            >
              <span className="text-gradient">Digital Marketing</span><br/>& Creative Solutions
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-12 whitespace-pre-line"
            >
              {content.heroSubtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={onStartProject}
                className="bg-primary text-white border border-outline-variant px-10 py-4 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-geometric hover:bg-primary-dim hover:scale-[1.02] transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={onStartProject}
                className="bg-surface-container-low border border-outline-variant px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] transition-all duration-300"
              >
                Contact Us
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-50 group-hover:opacity-30 transition-opacity duration-700" />
              <img 
                src={content.heroImage} 
                alt="Digital Marketing Dashboard" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute -bottom-10 -right-10 w-40 h-40 gradient-accent rounded-full -z-10 blur-3xl" 
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-surface-container-low border-y border-outline-variant relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Why Choose Us?</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">We combine creativity with data-driven insights to transform ideas into measurable results.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card-geometric group hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {feat.icon}
                </div>
                <h3 className="font-headline text-xl font-bold mb-4">{feat.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant/60 mb-4">{content.trustedByText}</p>
            <h2 className="font-headline text-2xl md:text-3xl font-medium text-on-surface max-w-3xl mx-auto">We are proud to collaborate with clients from various industries.</h2>
          </motion.div>
        </div>
        
        <div className="w-full flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 items-center">
            {/* Double the list to ensure seamless looping */}
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex gap-16 md:gap-32 px-8 md:px-16 items-center">
                <div className="font-headline font-black text-3xl tracking-tighter">BRAND<span className="text-primary">CO</span></div>
                <div className="font-headline font-black text-3xl tracking-tighter italic">Vertex</div>
                <div className="font-headline font-black text-3xl tracking-tighter uppercase border-2 border-current px-3 py-1">Nexus</div>
                <div className="font-headline font-bold text-3xl tracking-widest uppercase">Lumina</div>
                <div className="font-headline font-black text-3xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface-variant">SYNTH</div>
                <div className="font-headline font-black text-3xl tracking-tighter">GLOBAL</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Client Success Stories</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">Building long-term partnerships based on trust, innovation, and shared success.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="card-geometric p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-8 text-yellow-400">
                    {[...Array(5)].map((_, j) => <CheckCircle2 key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-lg italic text-on-surface mb-10 leading-relaxed">"{test.quote}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-outline-variant pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold font-headline">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-on-surface font-headline">{test.author}</div>
                    <div className="text-sm text-on-surface-variant">{test.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-on-surface-variant text-lg">Everything you need to know about our digital marketing services.</p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-outline-variant rounded-xl overflow-hidden bg-surface-container-low shadow-sm hover:shadow-md transition-shadow"
              >
                <button 
                  className="w-full px-8 py-6 text-left flex justify-between items-center font-headline font-semibold text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  {faq.q}
                  <motion.div
                    animate={{ rotate: activeFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === i ? 'auto' : 0, opacity: activeFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 text-on-surface-variant leading-relaxed pt-2">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
