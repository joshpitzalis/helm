import { storage } from '../../constants/firebase';

export const uploadImage = (file, pollId, handleTransfer) => {
  const uploadTask = storage
    .ref(`polls/${pollId}`)
    .child(`${file.name}`)
    .put(file);

  uploadTask.on('state_changed', (snap) => {
    console.log(`${snap.bytesTransferred / snap.totalBytes * 100}% uploaded.`);
    handleTransfer('transferCurrent', snap.bytesTransferred);
    handleTransfer('transferTotal', snap.totalBytes);
  });

  return uploadTask.then(res => res.downloadURL).catch(error => console.error(error.message));
};
