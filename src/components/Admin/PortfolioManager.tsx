import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Trash2, Edit2, Plus, Link as LinkIcon } from 'lucide-react';

export default function PortfolioManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');

  const [pageContent, setPageContent] = useState({
    headerTitle: 'Crafting digital \n<span className="text-gradient">experiences that endure.</span>',
    headerSub: 'A curated selection of our recent work across web, mobile, and complex systems architecture.',
    builtWithTitle: 'Built with precision.',
    builtWithDesc: 'We leverage industry-leading technologies to ensure our solutions are robust, scalable, and maintainable. Our stack is carefully chosen to balance performance with developer velocity.',
    techStack: ['React', 'Flutter', 'Node.js', 'AWS']
  });

  useEffect(() => {
    fetchProjects();
    fetchPageContent();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'portfolio'));
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPageContent = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'settings', 'portfolio_page'));
      if (docSnap.exists()) setPageContent(prev => ({ ...prev, ...docSnap.data() }));
    } catch (error) {
      console.error("Error fetching page content:", error);
    }
  };

  const savePageContent = async () => {
    try {
      await setDoc(doc(db, 'settings', 'portfolio_page'), pageContent);
      alert('Page settings saved!');
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handlePageContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageContent(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateTechStack = (index: number, value: string) => {
    const newStack = [...pageContent.techStack];
    newStack[index] = value;
    setPageContent(prev => ({ ...prev, techStack: newStack }));
  };

  const addTech = () => setPageContent(prev => ({ ...prev, techStack: [...prev.techStack, 'New Tech'] }));
  const removeTech = (index: number) => {
    const newStack = [...pageContent.techStack];
    newStack.splice(index, 1);
    setPageContent(prev => ({ ...prev, techStack: newStack }));
  };

  const resetForm = () => {
    setTitle('');
    setTags('');
    setDesc('');
    setImg('');
    setEditingId(null);
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setTitle(project.title);
    setTags(project.tags ? project.tags.join(', ') : '');
    setDesc(project.desc);
    setImg(project.img || '');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteDoc(doc(db, 'portfolio', id));
      fetchProjects();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      title,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      desc,
      img,
      offset: false
    };

    if (editingId) {
      await updateDoc(doc(db, 'portfolio', editingId), projectData);
    } else {
      await addDoc(collection(db, 'portfolio'), projectData);
    }
    resetForm();
    fetchProjects();
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">Portfolio Page Content</h2>
        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 space-y-6">
          <div className="space-y-4 border-b border-outline-variant pb-6">
            <h3 className="font-bold">Main Header (use regular text)</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Header Title (use \n for line breaks)</label>
              <textarea name="headerTitle" value={pageContent.headerTitle} onChange={handlePageContentChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Header Subtext</label>
              <textarea name="headerSub" value={pageContent.headerSub} onChange={handlePageContentChange} rows={2} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
          </div>

          <div className="space-y-4 border-b border-outline-variant pb-6">
            <h3 className="font-bold">Built With Precision</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input name="builtWithTitle" value={pageContent.builtWithTitle} onChange={handlePageContentChange} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="builtWithDesc" value={pageContent.builtWithDesc} onChange={handlePageContentChange} rows={3} className="w-full p-2 bg-surface border border-outline-variant rounded" />
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium">Tech Stack</label>
                <button onClick={addTech} className="text-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4"/> Add Tech</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {pageContent.techStack.map((tech, i) => (
                  <div key={i} className="flex items-center gap-1 bg-surface border border-outline-variant rounded p-1">
                    <input value={tech} onChange={e => updateTechStack(i, e.target.value)} className="bg-transparent w-24 px-1 text-sm outline-none" />
                    <button onClick={() => removeTech(i)} className="text-red-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={savePageContent} className="px-6 py-2 bg-primary text-white font-bold rounded">
            Save Page Content
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-6 text-on-surface">Portfolio Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-surface border border-outline-variant rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Web, Design, React" className="w-full p-2 bg-surface border border-outline-variant rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="w-full p-2 bg-surface border border-outline-variant rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Image URL
                </label>
                <input required value={img} onChange={e => setImg(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full p-2 bg-surface border border-outline-variant rounded" />
              </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-primary text-on-primary font-bold py-2 rounded flex items-center justify-center gap-2">
                  {editingId ? <><Edit2 className="w-4 h-4"/> Update</> : <><Plus className="w-4 h-4"/> Add Project</>}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="px-4 bg-surface border border-outline-variant rounded">Cancel</button>
                )}
              </div>
            </form>
          </div>

          <div>
            {loading ? (
              <div>Loading projects...</div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {projects.length === 0 && <div className="text-on-surface-variant">No projects found. Add one!</div>}
                {projects.map(proj => (
                  <div key={proj.id} className="flex gap-4 p-4 bg-surface-container-low border border-outline-variant rounded-lg items-center">
                    {proj.img && <img src={proj.img} alt={proj.title} className="w-16 h-16 object-cover rounded" />}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate">{proj.title}</h4>
                      <p className="text-xs text-on-surface-variant truncate">{proj.desc}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(proj)} className="p-2 text-on-surface-variant hover:text-primary transition"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(proj.id)} className="p-2 text-on-surface-variant hover:text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
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
