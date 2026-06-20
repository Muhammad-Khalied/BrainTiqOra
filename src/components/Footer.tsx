import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Footer() {
  const [content, setContent] = useState({
    brandName: 'Brain Tiq Ora',
    footerDesc: 'We help brands and businesses build a strong presence, reach the right audience at the right time, and achieve measurable growth through creative marketing strategies.',
    copyright: '© 2024 Brain Tiq Ora. All rights reserved. Your Growth Starts Here.',
    navLinks: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About Us' },
      { id: 'services', label: 'Services' },
      { id: 'portfolio', label: 'Portfolio' }
    ],
    socialLinks: [
      { name: 'Facebook', url: '#' },
      { name: 'Instagram', url: '#' },
      { name: 'LinkedIn', url: '#' }
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'branding'));
        if (docSnap.exists()) {
          setContent(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <footer className="bg-surface pt-24 pb-12 px-6 border-t border-outline-variant">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="logo-icon-kinetic" />
              <span className="text-xl font-bold tracking-tight text-on-surface font-headline uppercase">{content.brandName}</span>
            </div>
            <p className="text-on-surface-variant max-w-md leading-relaxed">
              {content.footerDesc}
            </p>
          </div>
          


          <div>
            <h4 className="font-headline font-bold uppercase tracking-widest text-xs text-primary mb-8 underline decoration-primary/30 underline-offset-8">Social</h4>
            <ul className="space-y-4">
              {content.socialLinks.map((social: any) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant text-center text-xs font-medium text-on-surface-variant/60">
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
