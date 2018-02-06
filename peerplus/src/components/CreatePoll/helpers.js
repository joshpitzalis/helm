import { storage } from "../../constants/firebase";

export const uploadImage = (file, pollId) => {
  const uploadTask = storage
    .ref(`polls/${pollId}`)
    .child(`${file.name}`)
    .put(file);

  uploadTask.on("state_changed", snap => {
    console.log(snap.bytesTransferred / snap.totalBytes * 1000 + "% uploaded.");
  });

  uploadTask.then(res => res.downloadURL);
};
