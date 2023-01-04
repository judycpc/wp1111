import axios from "axios";

const API_ROOT =
  process.env.NODE_ENV === 'production'
    ? "https://140.112.30.226:27501/api" // remote backend
    : "https://140.112.30.226:27501/api";

const instance = axios.create({
  baseURL: API_ROOT,
  headers: { 'Content-Type': 'application/json' }
});

const getInstance = axios.create({
  baseURL: API_ROOT
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

const getAppointments = async (input) => {
  Object.keys(input).forEach(key => input[key] === undefined ? delete input[key] : {});
  const data = await getInstance.get('/appointments/get/', {
    params: input
  }).then(res => res.data)
    .catch(e => console.error('getAppointments error', e));

  return data;
}

const createAppointment = async ({ therapist, client, time, meeting_code }) => {
  const data = await instance.post('/appointments/create/', { therapist, client, time, meeting_code })
    .then(res => res.data)
    .catch(e => console.error('createAppointment error', e));

  return data;
}

const updateAppointment = async ({ therapist, client, time, rating, comment, status }) => {
  const data = await instance.put('/appointments/update/', { therapist, client, time, rating, comment, status })
    .then(res => res.data)
    .catch(e => console.error('updateAppointment error', e));

  return data;
}

const getVideos = async () => {
  const data = await getInstance.get('/videos/')
    .then(res => res.data)
    .catch(e => console.error('getVideos error', e));

  let output = {};
  data.map(d => {
    output[d.disorder] = d.videos
  });

  return output;
};

export { getDisorders, getTherapists, signup, login, getInfo, updateInfo, search, uploadAvatar, getAppointments, createAppointment, updateAppointment, getVideos };