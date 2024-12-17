```javascript
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import '@nativescript/firebase-firestore';
import { firebaseConfig } from './firebase.config';

export async function initializeFirebase() {
    try {
        if (!firebase.apps.length) {
            await firebase.initializeApp(firebaseConfig);
        }
        console.log("Firebase initialized successfully");
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        throw error;
    }
}

export const auth = {
    async signUp(email, password) {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Sign up error:", error);
            throw error;
        }
    },

    async signIn(email, password) {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Sign in error:", error);
            throw error;
        }
    },

    async signOut() {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    }
};

export const db = {
    async createUser(userId, userData) {
        try {
            await firebase.firestore()
                .collection('users')
                .doc(userId)
                .set({
                    ...userData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
        } catch (error) {
            console.error("Create user error:", error);
            throw error;
        }
    },

    async updateUser(userId, userData) {
        try {
            await firebase.firestore()
                .collection('users')
                .doc(userId)
                .update({
                    ...userData,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
        } catch (error) {
            console.error("Update user error:", error);
            throw error;
        }
    },

    async getUser(userId) {
        try {
            const doc = await firebase.firestore()
                .collection('users')
                .doc(userId)
                .get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error("Get user error:", error);
            throw error;
        }
    },

    async getServiceProviders() {
        try {
            const snapshot = await firebase.firestore()
                .collection('users')
                .where('isServiceProvider', '==', true)
                .get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Get service providers error:", error);
            throw error;
        }
    }
};
```