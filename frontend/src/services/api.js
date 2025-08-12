import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Hero slides
  getHeroSlides: () => apiClient.get('/hero-slides'),
  getHeroSlide: (id) => apiClient.get(`/hero-slides/${id}`),
  createHeroSlide: (data) => apiClient.post('/hero-slides', data),
  updateHeroSlide: (id, data) => apiClient.put(`/hero-slides/${id}`, data),
  deleteHeroSlide: (id) => apiClient.delete(`/hero-slides/${id}`),
  
  // Cultural categories
  getCulturalCategories: () => apiClient.get('/cultural-categories'),
  getFeaturedCulturalCategories: () => apiClient.get('/cultural-categories/featured'),
  getCulturalCategory: (id) => apiClient.get(`/cultural-categories/${id}`),
  createCulturalCategory: (data) => apiClient.post('/cultural-categories', data),
  updateCulturalCategory: (id, data) => apiClient.put(`/cultural-categories/${id}`, data),
  deleteCulturalCategory: (id) => apiClient.delete(`/cultural-categories/${id}`),
  
  // Regional highlights
  getRegionalHighlights: () => apiClient.get('/regional-highlights'),
  getRegionalHighlight: (id) => apiClient.get(`/regional-highlights/${id}`),
  createRegionalHighlight: (data) => apiClient.post('/regional-highlights', data),
  updateRegionalHighlight: (id, data) => apiClient.put(`/regional-highlights/${id}`, data),
  deleteRegionalHighlight: (id) => apiClient.delete(`/regional-highlights/${id}`),
  
  // Featured stories
  getFeaturedStories: () => apiClient.get('/featured-stories'),
  getAllStories: () => apiClient.get('/featured-stories/all'),
  getStoriesByCategory: (category) => apiClient.get(`/featured-stories/category/${category}`),
  getStory: (id) => apiClient.get(`/featured-stories/${id}`),
  createStory: (data) => apiClient.post('/featured-stories', data),
  updateStory: (id, data) => apiClient.put(`/featured-stories/${id}`, data),
  deleteStory: (id) => apiClient.delete(`/featured-stories/${id}`),
  
  // Newsletter
  subscribeNewsletter: (email) => apiClient.post('/newsletter/subscribe', { email }),
  unsubscribeNewsletter: (email) => apiClient.post('/newsletter/unsubscribe', { email }),
  getNewsletterSubscribers: () => apiClient.get('/newsletter/subscribers'),
  getSubscriberCount: () => apiClient.get('/newsletter/subscribers/count'),
  
  // Health and testing
  healthCheck: () => apiClient.get('/health'),
  getAllTestData: () => apiClient.get('/test/all-data'),
};

// Error handler helper
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return defaultMessage;
};

// Loading state helper
export const createLoadingState = () => ({
  loading: false,
  error: null,
  data: null,
});

export default apiService;