import React from "react";
import styles from "./StatsSidebar.module.scss";

// Типы данных для пропсов
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: {
    date: string;
  };
  address: string;
  picture: string;
  gender: "male" | "female";
}

interface Props {
  users: User[];
}

const calculateAge = (dobString: string): number => {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

interface Stats {
  ageGroups: {
    [key: string]: number;
  };
  genderGroups: {
    male: number;
    female: number;
  };
}

const calculateStats = (users: User[]): Stats => {
  const stats: Stats = {
    ageGroups: {
      "11-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51+": 0,
    },
    genderGroups: {
      male: 0,
      female: 0,
    },
  };

  users.forEach((user) => {
    const age = calculateAge(user.dob.date);

    let ageGroup = "51+";
    if (age <= 20) {
      ageGroup = "11-20";
    } else if (age <= 30) {
      ageGroup = "21-30";
    } else if (age <= 40) {
      ageGroup = "31-40";
    } else if (age <= 50) {
      ageGroup = "41-50";
    }
    stats.ageGroups[ageGroup] += 1;

    if (user.gender === "male" || user.gender === "female") {
      stats.genderGroups[user.gender] += 1;
    }
  });

  return stats;
};

const StatsSidebar: React.FC<Props> = ({ users }) => {
  const { ageGroups, genderGroups } = calculateStats(users);

  return (
    <aside className={styles.statsSidebar}>
      <h2>{`${users.length} Users`}</h2>
      <section>
        <h3>Age Groups</h3>
        {Object.entries(ageGroups).map(([key, value]) => (
          <p key={key}>{`${key}: ${value} users`}</p>
        ))}
      </section>
      <section>
        <h3>Gender Groups</h3>
        {Object.entries(genderGroups).map(([key, value]) => (
          <p key={key}>{`${key}: ${value} users`}</p>
        ))}
      </section>
    </aside>
  );
};

export default StatsSidebar;
