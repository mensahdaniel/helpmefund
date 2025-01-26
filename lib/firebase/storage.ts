import { storage } from "./config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export async function uploadImage(
  imageData: string,
  path: string,
): Promise<string> {
  try {
    // Create a storage reference
    const storageRef = ref(storage, path);

    // Upload the image
    const snapshot = await uploadString(storageRef, imageData, "data_url");

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
