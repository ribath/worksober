import axios from 'axios';

export function fetchUsers() {
  return axios.get('http://localhost:8000/club');
}

export function fetchUserById(id: string) {
  return axios.get(`http://localhost:8000/club/${id}`);
}

export function deleteUserById(id: string) {
  return axios.delete(`http://localhost:8000/club/${id}`);
}

export function postUser(name: string,
  email: string,
  age: number,
  sex: string,
  adress1: string,
  adress2: string,
  member: boolean,
  profielPic: File) {
  const bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('email', email);
  bodyFormData.append('age', age.toString());
  bodyFormData.append('sex', sex);
  bodyFormData.append('adress1', adress1);
  bodyFormData.append('adress2', adress2);
  bodyFormData.append('member', member.toString());
  bodyFormData.append('avatar', profielPic);
  return axios({
    method: 'post',
    url: 'http://localhost:8000/club',
    data: bodyFormData
  });
}

export function updateUserbyId(id:string,
  name: string,
  email: string,
  age: number,
  sex: string,
  adress1: string,
  adress2: string,
  member: boolean,
  profielPic: File) {
  const bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('email', email);
  bodyFormData.append('age', age.toString());
  bodyFormData.append('sex', sex);
  bodyFormData.append('adress1', adress1);
  bodyFormData.append('adress2', adress2);
  bodyFormData.append('member', member.toString());
  bodyFormData.append('avatar', profielPic);
  return axios({
    method: 'put',
    url: `http://localhost:8000/club/${id}`,
    data: bodyFormData
  });
}
