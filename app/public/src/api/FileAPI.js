import axios from 'axios';

const fileUpload = (files, onUpload) => {
  const fd = new FormData();
  files.forEach((f, i) => fd.append(`files`, f));
  return axios.post('/upload', fd, {
		headers: { 'content-type': 'mutlipart/form-data' },
		onUploadProgress: onUpload
	});
};

const getFiles = () => {
  return axios.get('/list');
};

export { fileUpload, getFiles };