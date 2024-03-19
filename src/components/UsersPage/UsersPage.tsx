import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUsers } from "../../features/users/userSlice";
import styles from "./UsersPage.module.scss";
import { removeUser } from "../../features/users/userSlice";
import trashIcon from "../../assets/icons/trash.svg";

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleRemoveUser = (id: string) => {
    dispatch(removeUser(id));
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.usersPage}>
      {status === "succeeded" &&
        users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <div className={styles.faceName}>
              <img
                src={user.picture}
                alt={`${user.name}'s avatar`}
                className={styles.userImage}
                width="56"
                height="56"
              />
              <div className={styles.unionDiv}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userEmail}>{user.email}</div>
              </div>
            </div>
            <div
              className={styles.deleteIcon}
              onClick={() => handleRemoveUser(user.id)}
            >
              <img src={trashIcon} alt="Delete" />
            </div>
            <div className={styles.commonDiv}>
              <div className={styles.userPhone}>
                <span>Phone No</span>
                <span className={styles.phoneNumber}>{user.phone}</span>
              </div>
              <div className={styles.userBirthday}>
                <span>Birthday</span>
                <span className={styles.birthdayDate}>
                  {formatDate(user.dob)}
                </span>
              </div>
              <div className={styles.userAddress}>
                <span>Address</span>
                <span className={styles.addressDetails}>{user.address}</span>
              </div>
            </div>
          </div>
        ))}
      {status === "failed" && <div>Error: {error}</div>}
    </div>
  );
};

export default UsersPage;
