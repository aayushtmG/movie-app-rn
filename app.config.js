import 'dotenv/config';

export default {
  expo: {
    name: "Movie Ghar",
    slug: "mobile_movie_app",
    android: {
      package: "com.aayush.movieghar"
    },
    owner: "aayush2k2",
    extra: {
      "eas": {
        "projectId": "432fb16d-adff-4217-927c-f70aeab049f0"
      },
      EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
      EXPO_PUBLIC_APPWRITE_PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
      EXPO_PUBLIC_APPWRITE_DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      EXPO_PUBLIC_APPWRITE_COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID
    },
  },
};
