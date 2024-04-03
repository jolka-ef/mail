import axios from 'axios';

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
});

export default {
  getEmails() {
    return apiClient.get('/emails');
  },
  update(email) {
    return apiClient.put(`/emails/${email.id}`, email);
  },
};
