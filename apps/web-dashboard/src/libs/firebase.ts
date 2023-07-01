import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCtIIQhN_XHq4jhdpADMh_iwsA-CT21gcI',
  authDomain: 'resnity-29032023.firebaseapp.com',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
