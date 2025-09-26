import axios from 'axios';

// --- This is the only line that needs to be changed ---
// It now points to your live backend server on Render
axios.defaults.baseURL = 'https://digital-portfolio-card-1.onrender.com/api';
// --- End of change ---

// Function to set the authorization token
const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
