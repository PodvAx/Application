import type React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <section>
      <h1>ProfilePage</h1>
      <div>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Email Verified: {user?.isVerifiedEmail ? 'Yes' : 'No'}</p>
        <p>Password: {user?.password}</p>
      </div>
    </section>
  );
};

export default ProfilePage;
