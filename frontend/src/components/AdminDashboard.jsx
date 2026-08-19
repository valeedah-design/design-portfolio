import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const emptyForm = {
  id: null,
  category: 'Digital Designs',
  subsection: 'App Designs',
  title: '',
  description: '',
  tag: '',
  image: '',
  bgColor: 'black',
  order: 0,
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('admin_token');

  const authHeaders = useCallback(
    (extra = {}) => ({ Authorization: `Bearer ${token}`, ...extra }),
    [token]
  );

  const loadProjects = useCallback(() => {
    setLoading(true);
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setError('Could not load projects'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    loadProjects();
  }, [token, navigate, loadProjects]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: authHeaders(),
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          return;
        }
        throw new Error(data.error || 'Upload failed');
      }

      setForm((f) => ({ ...f, image: data.url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => setForm(emptyForm);

  const handleEdit = (project) => {
    setForm({
      id: project.id,
      category: project.category || 'Digital Designs',
      subsection: project.subsection || '',
      title: project.title || '',
      description: project.description || '',
      tag: project.tag || '',
      image: project.image || '',
      bgColor: project.bgColor || 'black',
      order: project.order || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error('Delete failed');
      loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      category: form.category,
      subsection: form.subsection || null,
      title: form.title,
      description: form.description,
      tag: form.tag || null,
      image: form.image || null,
      bgColor: form.bgColor,
      order: Number(form.order) || 0,
    };

    try {
      const res = form.id
        ? await fetch(`/api/projects?id=${form.id}`, {
            method: 'PUT',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(payload),
          })
        : await fetch('/api/projects', {
            method: 'POST',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(payload),
          });

      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Save failed');
      }

      resetForm();
      loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        <div className="admin-dashboard-header">
          <h1 className="admin-title">Projects</h1>
          <button className="admin-button admin-button-secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <form className="admin-card admin-form" onSubmit={handleSubmit}>
          <h2 className="admin-subtitle">{form.id ? 'Edit project' : 'Add a new project'}</h2>

          <div className="admin-form-grid">
            <label className="admin-label">
              Category
              <input className="admin-input" value={form.category} onChange={handleChange('category')} required />
            </label>

            <label className="admin-label">
              Subsection (leave blank if none)
              <input className="admin-input" value={form.subsection} onChange={handleChange('subsection')} placeholder="e.g. App Designs, App Icons, Web Design" />
            </label>

            <label className="admin-label">
              Title
              <input className="admin-input" value={form.title} onChange={handleChange('title')} required />
            </label>

            <label className="admin-label">
              Tag
              <input className="admin-input" value={form.tag} onChange={handleChange('tag')} placeholder="e.g. Case study" />
            </label>

            <label className="admin-label admin-label-wide">
              Description
              <textarea className="admin-input" value={form.description} onChange={handleChange('description')} rows={2} />
            </label>

            <label className="admin-label">
              Card color
              <select className="admin-input" value={form.bgColor} onChange={handleChange('bgColor')}>
                <option value="black">Black</option>
                <option value="green">Green</option>
                <option value="transparent">Transparent</option>
              </select>
            </label>

            <label className="admin-label">
              Order
              <input className="admin-input" type="number" value={form.order} onChange={handleChange('order')} />
            </label>

            <label className="admin-label admin-label-wide">
              Image
              <input className="admin-input" type="file" accept="image/*" onChange={handleImageUpload} />
              {uploading && <span className="admin-hint">Uploading...</span>}
              {form.image && (
                <img src={form.image} alt="preview" className="admin-image-preview" />
              )}
            </label>
          </div>

          <div className="admin-form-actions">
            <button className="admin-button" type="submit" disabled={saving || uploading}>
              {saving ? 'Saving...' : form.id ? 'Update project' : 'Add project'}
            </button>
            {form.id && (
              <button type="button" className="admin-button admin-button-secondary" onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <div className="admin-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="admin-list-item">
                {project.image && <img src={project.image} alt={project.title} className="admin-list-thumb" />}
                <div className="admin-list-info">
                  <strong>{project.title}</strong>
                  <span className="admin-hint">
                    {project.category}{project.subsection ? ` / ${project.subsection}` : ''}
                  </span>
                </div>
                <div className="admin-list-actions">
                  <button className="admin-button admin-button-small" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="admin-button admin-button-small admin-button-danger" onClick={() => handleDelete(project.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
