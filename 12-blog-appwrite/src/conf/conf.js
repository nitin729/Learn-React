const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWITE_BUCKET_ID),
};

export default conf;
