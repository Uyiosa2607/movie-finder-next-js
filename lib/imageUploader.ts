import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Storage } from "./Firebase";

async function upload(file: any) {
  const date = new Date();
  const storageRef = ref(Storage, `profile_pictures/${date + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject("Something went wrong!" + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

export default upload;
