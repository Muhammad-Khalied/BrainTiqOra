import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Trash2, Edit2, Plus, ArrowUp, ArrowDown } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // Page Content State
  const [pageContent, setPageContent] = useState({
    servicesHeaderTitle: 'Integrated solutions to elevate your brand.',
    servicesHeaderSub: "We offer a full suite of digital marketing and creative services designed to build your brand, engage your audience, and drive measurable growth.",
    processTitle: 'Our Process',
    processSub: 'A structured, transparent methodology ensuring precision from initial concept to final optimization.',
    processSteps: [
      { id: '1', title: 'Discovery & Analysis', desc: 'Understand the business, goals, and market.' },
      { id: '2', title: 'Strategy Development', desc: 'Build a customized marketing strategy.' },
      { id: '3', title: 'Creative Production', desc: 'Produce content, visuals, and creative assets.' },
      { id: '4', title: 'Campaign Launch', desc: 'Launch marketing campaigns across the right channels.' },
      { id: '5', title: 'Performance Tracking', desc: 'Monitor campaign performance and analyze results.' },
      { id: '6', title: 'Growth & Optimization', desc: 'Continuously improve and scale successful strategies.' }
    ]
  });

  useEffect(() => {
    fetchServices();
    fetchPageContent();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      setServices(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPageContent = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'settings', 'services_page'));
      if (docSnap.exists()) {
        setPageContent(prev => ({ ...prev, ...docSnap.data() }));
      }
    } catch (error) {
      console.error("Error fetching page content:", error);
    }
  };

  const savePageContent = async () => {
    try {
      await setDoc(doc(db, 'settings', 'services_page'), pageContent);
      alert('Page settings saved!');
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setEditingId(null);
  };

  const handleEdit = (srv: any) => {
    setEditingId(srv.id);
    setTitle(srv.title);
    setDesc(srv.desc);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteDoc(doc(db, 'services', id));
      fetchServices();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, 'services', editingId), { title, desc });
    } else {
      await addDoc(collection(db, 'services'), { title, desc });
    }
    resetForm();
    fetchServices();
  };

  const handlePageContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageContent(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateProcessStep = (index: number, field: string, value: string) => {
    const newSteps = [...pageContent.processSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setPageContent(prev => ({ ...prev, processSteps: newSteps }));
  };

  return (
    <div className="space-y-12">
      
      {/* Page Headers & Process Manager */}
      <div>
        <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">Services Page Content</h2>
        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 space-y-6">
          <div className="space-y-4 border-b border-outline-variant pb-6">
            <h3 className="font-bold">Main Header</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Header Title</label>
              <input name="servicesHeaderTitle" value={pageContent.servicesHeaderTitle} onChange={handlePageContentChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Header Subtext</label>
              <textarea name="servicesHeaderSub" value={pageContent.servicesHeaderSub} onChange={handlePageContentChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
          </div>

          <div className="space-y-4 border-b border-outline-variant pb-6">
            <h3 className="font-bold">Process Header</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Process Title</label>
              <input name="processTitle" value={pageContent.processTitle} onChange={handlePageContentChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Process Subtext</label>
              <textarea name="processSub" value={pageContent.processSub} onChange={handlePageContentChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Process Steps</h3>
            {pageContent.processSteps.map((step, i) => (
              <div key={i} className="flex gap-2 items-start bg-surface p-2 border border-outline-variant rounded">
                <div className="font-bold text-primary w-6 pt-2">{i + 1}.</div>
                <div className="flex-1 space-y-2">
                  <input value={step.title} onChange={(e) => updateProcessStep(i, 'title', e.target.value)} placeholder="Step Title" className="w-full p-2 bg-surface border border-outline-variant rounded font-bold" />
                  <textarea value={step.desc} onChange={(e) => updateProcessStep(i, 'desc', e.target.value)} placeholder="Description" rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded text-sm" />
                </div>
              </div>
            ))}
          </div>

          <button onClick={savePageContent} className="px-6 py-2 bg-primary text-white font-bold rounded">
            Save Page Content
          </button>
        </div>
      </div>

      {/* Services List Manager (Existing) */}
      <div>
        <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">Service Offerings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-surface border border-outline-variant rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="w-full p-2 bg-surface border border-outline-variant rounded" />
              </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-primary text-on-primary font-bold py-2 rounded flex items-center justify-center gap-2">
                  {editingId ? <><Edit2 className="w-4 h-4"/> Update</> : <><Plus className="w-4 h-4"/> Add Service</>}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="px-4 bg-surface border border-outline-variant rounded">Cancel</button>
                )}
              </div>
            </form>
          </div>

          <div>
            {loading ? (
              <div>Loading services...</div>
            ) : (
              <div className="space-y-3">
                {services.length === 0 && <div className="text-on-surface-variant">No services found. Add one!</div>}
                {services.map(srv => (
                  <div key={srv.id} className="flex gap-4 p-4 bg-surface-container-low border border-outline-variant rounded-lg items-center">
                    <div className="flex-1">
                      <h4 className="font-bold">{srv.title}</h4>
                      <p className="text-sm text-on-surface-variant line-clamp-2">{srv.desc}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(srv)} className="p-2 text-on-surface-variant hover:text-primary transition"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(srv.id)} className="p-2 text-on-surface-variant hover:text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
