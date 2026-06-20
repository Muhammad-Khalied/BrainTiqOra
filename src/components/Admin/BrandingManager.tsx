import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2 } from 'lucide-react';

export default function BrandingManager() {
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
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'settings', 'branding'));
      if (docSnap.exists()) {
        setContent(docSnap.data() as any);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'branding'), content);
      setMessage('Branding saved successfully!');
    } catch (error) {
      console.error("Error saving:", error);
      setMessage('Error saving content.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateArray = (arrayName: 'navLinks' | 'socialLinks', index: number, field: string, value: string) => {
    const newArray = [...content[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setContent(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addArrayItem = (arrayName: 'navLinks' | 'socialLinks') => {
    if (arrayName === 'navLinks') {
      setContent(prev => ({ ...prev, navLinks: [...prev.navLinks, { id: 'new-link', label: 'New Link' }] }));
    } else {
      setContent(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { name: 'New Social', url: '#' }] }));
    }
  };

  const removeArrayItem = (arrayName: 'navLinks' | 'socialLinks', index: number) => {
    const newArray = [...content[arrayName]];
    newArray.splice(index, 1);
    setContent(prev => ({ ...prev, [arrayName]: newArray }));
  };

  if (loading) return <div className="text-on-surface">Loading content...</div>;

  return (
    <div className="max-w-3xl bg-surface-container-low border border-outline-variant rounded-lg p-6">
      <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">Branding & Navigation</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-primary/20 text-primary border border-primary/30 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Basic Info</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Brand Name</label>
            <input name="brandName" value={content.brandName} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Footer Description</label>
            <textarea name="footerDesc" value={content.footerDesc} onChange={handleChange} rows={3} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Copyright Text</label>
            <input name="copyright" value={content.copyright} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-outline-variant pb-2">
            <h3 className="text-lg font-bold">Navigation Links</h3>
            <button type="button" onClick={() => addArrayItem('navLinks')} className="text-primary flex items-center gap-1 text-sm"><Plus className="w-4 h-4"/> Add Link</button>
          </div>
          {content.navLinks.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input placeholder="ID (e.g. home)" value={link.id} onChange={(e) => updateArray('navLinks', i, 'id', e.target.value)} className="w-1/3 p-2 bg-surface border border-outline-variant rounded text-sm" />
              <input placeholder="Label (e.g. Home)" value={link.label} onChange={(e) => updateArray('navLinks', i, 'label', e.target.value)} className="w-1/3 p-2 bg-surface border border-outline-variant rounded text-sm" />
              <button type="button" onClick={() => removeArrayItem('navLinks', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4"/></button>
            </div>
          ))}
          <p className="text-xs text-on-surface-variant">Note: ID must match the component ID in PublicApp for scrolling to work correctly.</p>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-outline-variant pb-2">
            <h3 className="text-lg font-bold">Social Links</h3>
            <button type="button" onClick={() => addArrayItem('socialLinks')} className="text-primary flex items-center gap-1 text-sm"><Plus className="w-4 h-4"/> Add Social</button>
          </div>
          {content.socialLinks.map((social, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input placeholder="Name (e.g. Twitter)" value={social.name} onChange={(e) => updateArray('socialLinks', i, 'name', e.target.value)} className="w-1/3 p-2 bg-surface border border-outline-variant rounded text-sm" />
              <input placeholder="URL" value={social.url} onChange={(e) => updateArray('socialLinks', i, 'url', e.target.value)} className="w-1/2 p-2 bg-surface border border-outline-variant rounded text-sm" />
              <button type="button" onClick={() => removeArrayItem('socialLinks', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4"/></button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-3 bg-primary text-on-primary font-bold rounded hover:bg-primary/90 transition-colors w-full">
          {saving ? 'Saving...' : 'Save Branding'}
        </button>
      </form>
    </div>
  );
}
