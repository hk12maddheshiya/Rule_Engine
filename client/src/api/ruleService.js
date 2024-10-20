import axios from 'axios';

export const createRule = (ruleString) => {
  return axios.post('/api/rules', { ruleString });
};

export const evaluateRule = (ruleId, data) => {
  return axios.post(`/api/rules/evaluate`, { ruleId, data });
};
