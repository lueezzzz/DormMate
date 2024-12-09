import { Table } from '@/components/ui/table';
import { auth } from '@/firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

const ManageRooms = () => {

  const [user, isLoading] = useAuthState(auth);
  const [dormers, setDormers] = useState([]);
  const [adminDorm, setAdminDorm] = useState("");


  useEffect(()=>{
    if (!isLoading && user){
      
    }
  }, [])

  return (
    <section>
      <Table>
        


      </Table>

    </section>
  )
}

export default ManageRooms
