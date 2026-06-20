import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AboutManager() {
  const [content, setContent] = useState({
    storyTag: 'Our Story',
    storyHeading: 'Crafting \nExcellence',
    quoteText: '"Design is not just what it looks like and feels like. Design is how it works."',
    quoteImage: 'https://picsum.photos/seed/teamwork/1000/1250',
    stat1Label: 'Projects Delivered',
    stat1Value: '50+',
    stat2Label: 'Client Retention',
    stat2Value: '99%'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'settings', 'about'));
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
      await setDoc(doc(db, 'settings', 'about'), content);
      setMessage('About settings saved successfully!');
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

  if (loading) return <div className="text-on-surface">Loading content...</div>;

  return (
    <div className="max-w-3xl bg-surface-container-low border border-outline-variant rounded-lg p-6">
      <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">About Page Extras</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-primary/20 text-primary border border-primary/30 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Header</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Story Tag</label>
            <input name="storyTag" value={content.storyTag} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heading (use \n for line breaks)</label>
            <textarea name="storyHeading" value={content.storyHeading} onChange={handleChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Quote Section</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Quote Text</label>
            <textarea name="quoteText" value={content.quoteText} onChange={handleChange} rows={3} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quote Image URL</label>
            <input name="quoteImage" value={content.quoteImage} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stat 1 Label</label>
              <input name="stat1Label" value={content.stat1Label} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 1 Value</label>
              <input name="stat1Value" value={content.stat1Value} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 2 Label</label>
              <input name="stat2Label" value={content.stat2Label} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 2 Value</label>
              <input name="stat2Value" value={content.stat2Value} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="px-6 py-3 bg-primary text-on-primary font-bold rounded hover:bg-primary/90 transition-colors w-full">
          {saving ? 'Saving...' : 'Save About Settings'}
        </button>
      </form>
    </div>
  );
}
