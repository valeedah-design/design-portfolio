import React, { useEffect } from 'react';
import './ProjectDetailModal.css';

// Full-screen detail view for an App Design project.
// Uses the project's detail fields, falling back to the card fields
// so older projects without detail data still open cleanly.
const ProjectDetailModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const image = project.detailImage || project.image;
  const description = project.detailDescription || project.description;
  const roles = Array.isArray(project.roles) ? project.roles.filter(Boolean) : [];

  return (
    <div className="pdm-overlay" onClick={onClose} role="presentation">
      <div
        className="pdm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="pdm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M5 5 L19 19 M19 5 L5 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>

        <div className="pdm-grid">
          <div className="pdm-frame pdm-frame-image">
            <div className="pdm-frame-inner">
              {image && <img src={image} alt={project.title} className="pdm-image" />}
            </div>
          </div>

          <div className="pdm-frame pdm-frame-info">
            <div className="pdm-frame-inner pdm-info">
              <h2 id="pdm-title" className="pdm-title">{project.title}</h2>

              {description && (
                <>
                  <h3 className="pdm-heading">Project Description</h3>
                  <p className="pdm-description">{description}</p>
                </>
              )}

              {roles.length > 0 && (
                <>
                  <h4 className="pdm-subheading">Roles</h4>
                  <ul className="pdm-roles">
                    {roles.map((role) => (
                      <li key={role} className="pdm-role">{role}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.readMoreUrl && (
                <a
                  className="pdm-read-more"
                  href={project.readMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Read more</span>
                  <span className="pdm-chevrons" aria-hidden="true">&gt;&gt;&gt;</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
