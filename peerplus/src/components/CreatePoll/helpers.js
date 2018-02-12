import { storage } from '../../constants/firebase';

export const uploadImage = (file, pollId) => {
  console.log('file', file);
  const uploadTask = storage
    .ref(`polls/${pollId}`)
    .child(`${file.name}`)
    .put(file);

  uploadTask.on('state_changed', (snap) => {
    console.log(`${snap.bytesTransferred / snap.totalBytes * 100}% uploaded.`);
  });

  return uploadTask.then(res => res.downloadURL).catch(error => console.error(error.message));
};
