import { motion } from 'motion/react';
import { Share2, PenTool, BarChart, ArrowRight } from 'lucide-react';

export default function Services() {
  const serviceCategories = [
    {
      id: 'digital',
      icon: <Share2 />,
      title: 'Digital Marketing',
      desc: 'Connect with your audience and drive growth across digital channels.',
      items: [
        'Social Media Management',
        'Content Creation',
        'Content Strategy',
        'Paid Advertising Campaigns',
        'Community Management',
        'Performance Marketing'
      ]
    },
    {
      id: 'branding',
      icon: <PenTool />,
      title: 'Branding & Creative',
      desc: 'Build a memorable identity that resonates with your target market.',
      items: [
        'Brand Identity Design',
        'Visual Branding',
        'Graphic Design',
        'Motion Graphics',
        'Creative Campaigns'
      ]
    },
    {
      id: 'consultancy',
      icon: <BarChart />,
      title: 'Marketing Consultancy',
      desc: 'Strategic guidance to navigate the complex digital landscape.',
      items: [
        'Marketing Plans',
        'Competitor Analysis',
        'Market Research',
        'Growth Strategies'
      ]
    }
  ];

  const processSteps = [
    { id: '1', title: 'Discovery & Analysis', desc: 'Understand the business, goals, and market.' },
    { id: '2', title: 'Strategy Development', desc: 'Build a customized marketing strategy.' },
    { id: '3', title: 'Creative Production', desc: 'Produce content, visuals, and creative assets.' },
    { id: '4', title: 'Campaign Launch', desc: 'Launch marketing campaigns across the right channels.' },
    { id: '5', title: 'Performance Tracking', desc: 'Monitor campaign performance and analyze results.' },
    { id: '6', title: 'Growth & Optimization', desc: 'Continuously improve and scale successful strategies.' }
  ];

  return (
    <div className="py-32 overflow-hidden">
      {/* Our Services */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-24"
          >
            <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-8">
              Integrated solutions to elevate your brand.
            </h2>
            <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed">
              We offer a full suite of digital marketing and creative services designed to build your brand, engage your audience, and drive measurable growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.15) }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-geometric p-10 group hover:border-primary/40 transition-all duration-300 flex flex-col h-full hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-tertiary/20 flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <div className="w-8 h-8 *:w-full *:h-full">
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-headline text-3xl font-bold mb-4">{category.title}</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">{category.desc}</p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-semibold">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:gap-4 transition-all mt-auto w-fit bg-primary/5 px-6 py-3 rounded-lg group-hover:bg-primary group-hover:text-white">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-surface-container-low py-32 px-6 border-y border-outline-variant relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6">Our Process</h2>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
              A structured, transparent methodology ensuring precision from initial concept to final optimization.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12 relative">
            <div className="absolute left-10 md:left-[3.25rem] top-0 bottom-0 w-1 bg-outline-variant/30 hidden md:block rounded-full" />
            
            {processSteps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-10 items-start relative z-10 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 w-24 h-24 rounded-2xl bg-surface border-4 border-outline-variant flex items-center justify-center font-headline font-black text-4xl text-outline-variant shadow-geometric group-hover:border-primary group-hover:text-primary transition-all duration-300 relative z-20"
                >
                  {step.id}
                </motion.div>
                <div className="card-geometric p-8 flex-grow hover:border-primary/40 bg-surface hover:shadow-xl group-hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100%] -z-10 transition-all duration-500 group-hover:bg-primary/10" />
                  <h4 className="font-headline text-2xl font-bold mb-4">{step.title}</h4>
                  <p className="text-on-surface-variant text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
