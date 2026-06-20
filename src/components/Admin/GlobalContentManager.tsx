import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function GlobalContentManager() {
  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    aboutText: '',
    ctaText: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'global'));
        if (docSnap.exists()) {
          setContent(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'global'), content);
      setMessage('Content saved successfully!');
    } catch (error) {
      console.error("Error saving:", error);
      setMessage('Error saving content.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="text-on-surface">Loading content...</div>;

  return (
    <div className="max-w-3xl bg-surface-container-low border border-outline-variant rounded-lg p-6">
      <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">Global Text Content</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-primary/20 text-primary border border-primary/30 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Hero Section</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Title (use \n for line breaks)</label>
            <textarea name="heroTitle" value={content.heroTitle} onChange={handleChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <textarea name="heroSubtitle" value={content.heroSubtitle} onChange={handleChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hero Image URL</label>
            <input name="heroImage" value={content.heroImage} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">About Section</h3>
          <div>
            <label className="block text-sm font-medium mb-1">About Us Text</label>
            <textarea name="aboutText" value={content.aboutText} onChange={handleChange} rows={4} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Call to Action (CTA) Section</h3>
          <div>
            <label className="block text-sm font-medium mb-1">CTA Header (Supports basic HTML like &lt;span&gt;)</label>
            <textarea name="ctaHeader" value={content.ctaHeader} onChange={handleChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CTA Subtext</label>
            <textarea name="ctaText" value={content.ctaText} onChange={handleChange} rows={3} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Primary Button</label>
              <input name="ctaButtonPrimary" value={content.ctaButtonPrimary} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Secondary Button</label>
              <input name="ctaButtonSecondary" value={content.ctaButtonSecondary} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={saving} className="px-6 py-3 bg-primary text-on-primary font-bold rounded hover:bg-primary/90 transition-colors w-full">
            {saving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
}
