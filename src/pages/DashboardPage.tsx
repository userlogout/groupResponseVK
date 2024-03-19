import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchUsers } from "../features/users/userSlice";
import UsersPage from "../components/UsersPage/UsersPage";
import StatsSidebar from "../components/StatsSidebar/StatsSidebar";
import styles from "./DashboardPage.module.scss";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Фильтрация пользователей по запросу
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    );
  });

  return (
    <>
      <div className={styles.forButtons}>
        <div className={styles.buttonSearch}>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchButton}
          />
        </div>
        <div className={styles.buttonRefresh}>
          <span onClick={handleRefresh} className={styles.refreshText}>
            Refresh
          </span>
        </div>
      </div>
      <div className={styles.dashboard}>
        <UsersPage users={filteredUsers} />
        <div className={styles.stickyContainer}>
          {/* Обертка для сайдбара */}
          {/* @ts-ignore */}
          <StatsSidebar users={users} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
