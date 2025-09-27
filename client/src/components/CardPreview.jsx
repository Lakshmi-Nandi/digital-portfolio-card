import React from 'react';
import './CardPreview.css';

function CardPreview({ card, onEdit }) {
  const publicUrl = `${window.location.origin}/${card.slug}`;

  return (
    <div className="card-preview">
      <div className="preview-header">
        <h3 className="preview-name">{card.displayName}</h3>
        <p className="preview-title">{card.title}</p>
        {card.bio && <p className="preview-bio">{card.bio}</p>}
      </div>
      
      {/* The Public URL is now before the button */}
      <div className="public-url-display">
        <span>Public URL: </span>
        <a href={publicUrl} target="_blank" rel="noopener noreferrer">
          {publicUrl}
        </a>
      </div>
      
      {/* The Edit Card button is now at the end */}
      <div className="preview-actions">
        <button onClick={onEdit} className="preview-button edit-btn">Edit Card</button>
      </div>
    </div>
  );
}

export default CardPreview;

