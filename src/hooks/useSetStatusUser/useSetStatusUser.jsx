import { useEffect, useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from '../../../firebase';
import useGetUsers from '../../hooks/useGetUsers/useGetUsers'

const useSetStatusUser = () => {
    const { userList } = useGetUsers();
  
    const updateUserStatus = async (newStatus) => {
      if (auth.currentUser && userList != null) {
        const usuario = userList.find((item) => item.email === auth.currentUser.email);
        if (usuario) {
          const usuarioDoc = doc(db, "users", usuario.id);
          await updateDoc(usuarioDoc, { online: newStatus });
        }
      }
    };
  
    useEffect(() => {

    }, []);
  
    return {
      setStatusUser: updateUserStatus,
    };
  };

export default useSetStatusUser