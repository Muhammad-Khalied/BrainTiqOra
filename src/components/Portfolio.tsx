import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from './Loader';

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageContent, setPageContent] = useState({
    headerTitle: 'Crafting digital \n<span className="text-gradient">experiences that endure.</span>',
    headerSub: 'A curated selection of our recent work across marketing campaigns, visual branding, and digital growth.',
    builtWithTitle: 'Platforms We Master',
    builtWithDesc: 'We leverage industry-leading platforms and tools to ensure our campaigns are highly targeted, scalable, and data-driven.',
    techStack: ['Meta Ads', 'Google Ads', 'Shopify', 'WordPress']
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        const projs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projs);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-32"
        >
          <h2 
            className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-8 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: pageContent.headerTitle }}
          />
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed whitespace-pre-line">
            {pageContent.headerSub}
          </p>
        </motion.div>

        {loading ? (
          <Loader text="Loading Projects" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {projects.map((project, i) => (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -10 }}
                className={`flex flex-col group ${project.offset ? 'lg:mt-24' : ''}`}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-geometric group-hover:shadow-2xl transition-all duration-500 border border-outline-variant relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  {project.img && (
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div className="flex gap-3 mb-4 flex-wrap">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-primary/5 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">{project.title}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">{project.desc}</p>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-headline text-4xl font-bold mb-6 tracking-tighter uppercase">{pageContent.builtWithTitle}</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
              {pageContent.builtWithDesc}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {pageContent.techStack.map((tech: string, i: number) => (
              <motion.div 
                key={tech} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-surface-container-low border border-outline-variant p-8 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg rotate-45 group-hover:rotate-90 group-hover:bg-primary transition-all duration-500" />
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-center group-hover:text-primary transition-colors">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
