import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);


const getDisorders = async () => {
  const data = await instance.get('/disorders/')
    .then(res => res.data)
    .catch(e => console.error('getDisorders failed', e));

  return (data.map(({ level_1_name, level_2 }) => {
    const symptoms = [...new Set(level_2.map(({ symptoms }) => (symptoms)).flat())];
    return {
      label: level_1_name,
      value: level_1_name,
      children: symptoms.map(s => ({ label: s, value: s }))
    };
  }));
};

const getTherapists = async (category) => {
  const data = await instance.get('/therapists/categories/', {
    params: { category }
  }).then(res => res.data)
    .catch(e => console.error('getTherapists failed', e));

  return data;
};

const signup = async ({ username, password, identity, name, email }) => {
  const data = await instance.post('/signup/', { username, password, identity, name, email })
    .then(res => res.data)
    .catch(e => console.error('signup failed', e));

  return data;
};

const login = async ({ username, password }) => {
  const data = await instance.post('/login/', { username, password })
    .then(res => res.data)
    .catch(e => console.error('login failed', e));

  return data;
};

export { getDisorders, getTherapists, signup, login };