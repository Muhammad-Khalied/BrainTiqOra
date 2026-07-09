import { motion } from 'motion/react';
import Logo from './Logo';

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-8">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        className="relative"
      >
        <Logo className="h-16 w-auto" />
        <div className="absolute inset-0 bg-primary opacity-20 blur-2xl -z-10 rounded-full" />
      </motion.div>
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="font-headline tracking-widest uppercase text-sm text-primary font-bold"
      >
        {text}
      </motion.div>
    </div>
  );
}
