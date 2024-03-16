import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchUsers } from "../features/users/userSlice";
import UsersPage from "../components/UsersPage/UsersPage";
import StatsSidebar from "../components/StatsSidebar/StatsSidebar";
import styles from "./DashboardPage.module.scss";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.toolbar}>
        <button onClick={handleRefresh}>Обновить</button>
        <input type="text" placeholder="Поиск..." />
      </div>
      <UsersPage />
      {/* @ts-ignore */}
      <StatsSidebar users={users} />
    </div>
  );
};

export default DashboardPage;
