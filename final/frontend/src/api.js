import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: { 'Content-Type': 'application/json' }
});

const getInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/api"
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

getInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

const getDisorders = async () => {
  const data = await getInstance.get('/disorders/')
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
  const data = await getInstance.get('/accounts/therapists/categories/', {
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

const getInfo = async (username) => {
  const data = await getInstance.get('/accounts/getinfo/', {
    params: { username }
  }).then(res => res.data)
    .catch(e => console.error('getInfo failed', e));

  return data;
};

const updateInfo = async (input) => {
  const data = await instance.put('/accounts/updateinfo/', input)
    .then(res => res.data)
    .catch(e => console.error('updateInfo failed', e));

  return data;
}

const search = async (symptoms) => {
  const data = await instance.post('/search/', { symptoms })
    .then(res => res.data)
    .catch(e => console.error('search error', e));

  return data;
}

const uploadAvatar = async (option) => {
  let { file } = option;
  let formData = new FormData();
  formData.append('image', file);
  const link = await axios.post('https://api.imgur.com/3/image', formData, {
    headers: {
      'Authorization': "Client-ID 5738f5e768b634b",
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data.data.link)
    .catch(e => console.error('uploadAvatar error', e));

  return link;
};

export { getDisorders, getTherapists, signup, login, getInfo, updateInfo, search, uploadAvatar };