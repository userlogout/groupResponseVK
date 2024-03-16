import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUsers } from '../../features/users/userSlice';
import styles from './UsersPage.module.scss';

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <div className={styles.usersPage}>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' &&
        users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <img src={user.thumbnail} alt={user.name} />
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        ))}
      {status === 'failed' && <div>Error: {error}</div>}
    </div>
  );
};


export default UsersPage;
