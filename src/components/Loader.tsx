import { motion } from 'motion/react';

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-8">
      <motion.div 
        animate={{ 
          rotate: [45, 225, 225, 405],
          scale: [1, 1.2, 1, 1],
          borderRadius: ["20%", "20%", "50%", "20%"]
        }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut", 
          times: [0, 0.5, 0.8, 1], 
          repeat: Infinity 
        }}
        className="w-12 h-12 bg-primary relative"
      >
        <div className="absolute inset-0 bg-primary opacity-50 blur-lg" />
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
