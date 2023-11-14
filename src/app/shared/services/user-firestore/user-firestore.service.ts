import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

interface User {
  id: string;
  username: number;
  email: string;
  endereco: Endereco;
}

interface Endereco {
  cep: string;
  number: string;
  bairro: string;
  cidade: string;
  estado: string;
  rua: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {
  userCollection!: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) { }

  // getAll(): retornará todos os Pokémon da coleção.
  getAll() {
    this.userCollection = collection(this.firestore, 'userData');
    return collectionData(this.userCollection, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  //get(id): retornará o User que corresponde ao id.
  get(id: string) {
    const userDataDocumentReference = doc(this.firestore, `user/${id}`);
    return docData(userDataDocumentReference, { idField: 'id' });
  }

  //create(user): Irá adicionar um novo User à coleção.
  create(user: User) {
    this.userCollection = collection(this.firestore, 'userData');
    console.log(user)
    return addDoc(this.userCollection, user);
  }

  //update(user): atualizará um User da coleção.
  update(user: User) {
    const userDataDocumentReference = doc(
      this.firestore,
      `user/${user.id}`
    );
    return updateDoc(userDataDocumentReference, { ...user });
  }

  //delete(id): Excluirá o User que corresponde ao id.
  delete(id: string) {
    const userDataDocumentReference = doc(this.firestore, `user/${id}`);
    return deleteDoc(userDataDocumentReference);
  }
}
