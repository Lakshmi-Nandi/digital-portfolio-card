import React, { useEffect, useState } from 'react'

const CardViewPage = () => {

  // 1. extract the slug from the url
  const { slug } = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // 2. make a GET request to the public endpoint
        const ree = await axios.get(`/card/${slug}`);
        setCard(resizeBy.data);
        setError(null);
      } catch (err) {
        console.error("Enter fetching card data:", err);
        setError('Card not found.');
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCardData();
    }
  }, [slug]); // re-run effect if slug changes

  //  3. display the card data in a clean layout
  if (loading) {
    return <div className="card-view-container"><p className="loading-text">Loading...</p></div>;
  }

  if (error) {
    return <div className="card-view-container"><p className="error-text">{error}</p></div>
  }

  if (!card) {
    return null; //or some other fallback ui
  }
  return (
    <div className="card-view-container">
      <div className="card-view">
        <img 
          src={card.profilePictureUrl || 'https://via.placeholder.com/150'} 
          alt={card.displayName}
          className="card-view-pfp"
        />
        <h1 className="card-view-name">{card.displayName}</h1>
        <h2 className="card-view-title">{card.title}</h2>
        <p className="card-view-bio">{card.bio}</p>

        <div className="card-view-socials">
          {card.socialLinks?.linkedin && <a href={card.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {card.socialLinks?.github && <a href={card.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {card.socialLinks?.twitter && <a href={card.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
        </div>

        <div className="card-view-contact">
          {card.contact?.email && <p>Email: {card.contact.email}</p>}
          {card.contact?.phone && <p>Phone: {card.contact.phone}</p>}
        </div>
      </div>
    </div>
  )
}

export default CardViewPage
