import axios from 'axios';

// --- This is the corrected line ---
// It now points to your live backend server on Render
axios.defaults.baseURL = 'https://digital-portfolio-card-1.onrender.com/api';
// --- End of correction ---

// Function to set the authorization token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;