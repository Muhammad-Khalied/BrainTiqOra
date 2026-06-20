import { motion } from 'motion/react';
import { Target, Eye, Lightbulb, Shield, Heart, Zap, Award } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Successful Campaigns', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Years of Experience', value: '5+' },
    { label: 'Audience Reached', value: '1M+' },
  ];

  const values = [
    { icon: <Lightbulb />, title: 'Creativity', desc: 'Creativity is the foundation of everything we do.' },
    { icon: <Award />, title: 'Professionalism', desc: 'We deliver with excellence and maintain effective communication.' },
    { icon: <Shield />, title: 'Transparency', desc: 'We provide clear plans, transparent reports, and honest results.' },
    { icon: <Heart />, title: 'Commitment', desc: 'Our clients\' success is our success.' },
    { icon: <Zap />, title: 'Innovation', desc: 'We continuously develop new ideas to stay ahead of the competition.' },
    { icon: <Target />, title: 'Results Driven', desc: 'Every step we take is focused on measurable outcomes.' },
  ];

  return (
    <div className="w-full pt-32 pb-20 overflow-hidden">
      {/* About Us */}
      <section className="px-6 mb-32 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" 
        />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider text-primary mb-8 uppercase font-headline">
              <Zap className="w-3 h-3 text-primary" />
              Who We Are
            </div>
            
            <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
              We are a specialized team passionate about helping brands establish a powerful market presence.
            </h2>

            <p className="text-xl text-on-surface-variant leading-relaxed mb-8">
              Our goal is to connect brands with the right audience at the perfect time through effective marketing strategies, creative content, and impactful advertising campaigns.
            </p>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              We combine creativity with data-driven insights to transform ideas into measurable results based on customer behavior and market understanding.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                className="card-geometric p-8 flex flex-col items-center justify-center text-center group hover:border-primary/30"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl md:text-5xl font-headline font-black text-primary mb-2 text-gradient group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                <div className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 py-32 bg-surface-container-low border-y border-outline-variant relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
            className="card-geometric p-12 relative overflow-hidden group shadow-lg"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-accent" />
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              To become a trusted marketing partner for ambitious brands seeking growth, visibility, and long-term success.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="card-geometric p-12 relative overflow-hidden group shadow-lg"
          >
            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-accent" />
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 group-hover:bg-tertiary group-hover:text-white transition-all duration-300">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              We don't just market brands. We build stories, experiences, and results. Our mission is to provide integrated marketing solutions that help businesses achieve their goals through innovative strategies, creative content, and advertising campaigns that deliver real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-6 py-32 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-on-surface-variant text-xl">The principles that guide our work and partnerships.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card-geometric p-10 group hover:border-primary/40 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-surface border-2 border-outline-variant flex items-center justify-center text-on-surface mb-8 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {val.icon}
                </div>
                <h4 className="font-headline text-2xl font-bold mb-4">{val.title}</h4>
                <p className="text-on-surface-variant leading-relaxed text-lg">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
