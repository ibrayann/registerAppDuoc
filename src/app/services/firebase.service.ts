import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilities = inject(UtilsService);

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, user.email, user.password);
  }

  signUp(user: User) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, user.email, user.password);
  }

  updateProfile(displayName: string) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, {
      displayName,
    });
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  salir() {
    getAuth().signOut();
    console.log('Sesión cerrada');
    localStorage.removeItem('user');
    this.utilities.routerLink('/auth');
  }

  addAsistencia(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  getAsistencia(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(ref, collectionQuery);
  }
}
