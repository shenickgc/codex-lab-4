import { ObjectId } from 'mongodb';
import { db } from '../config/db.js';

function collection() {
  return db.collection('users');
}

export function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

export function createUserDocument(data) {
  return collection().insertOne(data);
}

export function findUserByEmail(email) {
  return collection().findOne({ email: email.toLowerCase() });
}

export function findUserById(id) {
  return collection().findOne({ _id: new ObjectId(id) });
}

export function findUserByResetToken(resetPasswordToken) {
  return collection().findOne({ resetPasswordToken });
}

export function listUsers(filters = {}) {
  return collection().find(filters).sort({ createdAt: -1 }).toArray();
}

export function updateUserById(id, payload) {
  return collection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: payload },
    { returnDocument: 'after' }
  );
}

export function deleteUserById(id) {
  return collection().findOneAndDelete({ _id: new ObjectId(id) });
}
