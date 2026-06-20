import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2 } from 'lucide-react';

export default function HomeManager() {
  const [content, setContent] = useState({
    engagementRate: '92.4%',
    engagementGrowth: '↑ 4.2% from last month',
    velocityStats: [40, 60, 90, 75, 50, 85, 65],
    recentActivity: [
      { label: 'Design Audit Completed', time: '2m ago', active: true },
      { label: "New branch: 'feat-ui'", time: '1h ago', active: false },
      { label: 'Asset export successful', time: '3h ago', active: false },
    ],
    trustedByText: 'Trusted by visionary teams'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'settings', 'home'));
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
      await setDoc(doc(db, 'settings', 'home'), content);
      setMessage('Home settings saved successfully!');
    } catch (error) {
      console.error("Error saving:", error);
      setMessage('Error saving content.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Activity Handlers
  const updateActivity = (index: number, field: string, value: any) => {
    const newArr = [...content.recentActivity];
    newArr[index] = { ...newArr[index], [field]: value };
    setContent(prev => ({ ...prev, recentActivity: newArr }));
  };

  const addActivity = () => {
    setContent(prev => ({ ...prev, recentActivity: [...prev.recentActivity, { label: 'New Activity', time: 'Just now', active: false }] }));
  };

  const removeActivity = (index: number) => {
    const newArr = [...content.recentActivity];
    newArr.splice(index, 1);
    setContent(prev => ({ ...prev, recentActivity: newArr }));
  };

  // Velocity Handlers
  const updateVelocity = (index: number, value: string) => {
    const newArr = [...content.velocityStats];
    newArr[index] = Number(value);
    setContent(prev => ({ ...prev, velocityStats: newArr }));
  };

  if (loading) return <div className="text-on-surface">Loading content...</div>;

  return (
    <div className="max-w-3xl bg-surface-container-low border border-outline-variant rounded-lg p-6">
      <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">Home Page Extras</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-primary/20 text-primary border border-primary/30 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Engagement Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Engagement Card</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Engagement Rate</label>
            <input name="engagementRate" value={content.engagementRate} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Growth Text</label>
            <input name="engagementGrowth" value={content.engagementGrowth} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
        </div>

        {/* Trusted By */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Trusted By Section</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Trusted By Text</label>
            <input name="trustedByText" value={content.trustedByText} onChange={handleChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
          </div>
        </div>

        {/* Velocity Chart */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-outline-variant pb-2">Velocity Chart (Heights 0-100)</h3>
          <div className="flex gap-2">
            {content.velocityStats.map((stat, i) => (
              <input key={i} type="number" min="0" max="100" value={stat} onChange={(e) => updateVelocity(i, e.target.value)} className="w-full p-2 bg-surface border border-outline-variant rounded text-center" />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-outline-variant pb-2">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <button type="button" onClick={addActivity} className="text-primary flex items-center gap-1 text-sm"><Plus className="w-4 h-4"/> Add Item</button>
          </div>
          {content.recentActivity.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input type="checkbox" checked={item.active} onChange={(e) => updateActivity(i, 'active', e.target.checked)} className="w-4 h-4 accent-primary" />
              <input placeholder="Label" value={item.label} onChange={(e) => updateActivity(i, 'label', e.target.value)} className="w-1/2 p-2 bg-surface border border-outline-variant rounded text-sm" />
              <input placeholder="Time (e.g. 2m ago)" value={item.time} onChange={(e) => updateActivity(i, 'time', e.target.value)} className="w-1/3 p-2 bg-surface border border-outline-variant rounded text-sm" />
              <button type="button" onClick={() => removeActivity(i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4"/></button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-3 bg-primary text-on-primary font-bold rounded hover:bg-primary/90 transition-colors w-full">
          {saving ? 'Saving...' : 'Save Home Settings'}
        </button>
      </form>
    </div>
  );
}
