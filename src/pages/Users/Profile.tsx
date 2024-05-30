import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconPhone from '../../components/Icon/IconPhone';
import IconUser from '../../components/Icon/IconUser';
import IconLock from '../../components/Icon/IconLock';
import IconMessage from '../../components/Icon/IconMessage';
import IconMenuMailbox from '../../components/Icon/Menu/IconMenuMailbox';

// Define the StaffData interface
interface StaffData {
  profileImageUrl: string;
  name: string;
  address: string;
  email: string;
  phone_number: string;
  userName: string;
}

const Profile = () => {
  const staffId = localStorage.getItem('staffId');
  const [staffData, setStaffData] = useState<StaffData | null>(null);

  useEffect(() => {
    const fetchStaffData = async () => {
      if (staffId) {
        try {
          const db = getFirestore();
          const staffDocRef = doc(db, 'users', staffId);
          const staffDocSnap = await getDoc(staffDocRef);

          if (staffDocSnap.exists()) {
            setStaffData(staffDocSnap.data() as StaffData);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      }
    };

    fetchStaffData();
  }, [staffId]);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="#" className="text-primary hover:underline">
            Users
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Profile</span>
        </li>
      </ul>
      <div className="pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-1 gap-5 mb-5">
          <div className="panel">
            <div className="flex items-center justify-between mb-5">
              <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
              <Link to="/users/user-account-settings" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                <IconPencilPaper />
              </Link>
            </div>
            {staffData && (
              <div className="mb-5">
                <div className="flex flex-col justify-center items-center">
                  <img src={staffData.profileImageUrl} alt="img" className="w-24 h-24 rounded-full object-cover mb-5" />
                  <p className="font-semibold text-primary text-xl">{staffData.name}</p>
                </div>
                <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                  <li className="flex items-center gap-2">
                    <p>Address: {staffData.address}</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconMenuMailbox/>
                    <p>Email:<br />{staffData.email} </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconPhone />
                    <p>Phone Number: {staffData.phone_number}</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconUser />
                    <p>User Name: {staffData.userName}</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconLock />
                    <p>Password : {staffData.password}</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
