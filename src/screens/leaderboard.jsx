import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Utils/Loader";
import { getAllLevels } from "../services/admin/getAllLevels";
import { getLevels } from "../services/levels/getLevels";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllLevels().then((data) => {
      var users = data.docs.map((d) => d.data());
      setUsers(users);
    });
  }, []);
  return (
    <div>
      {users && users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <>
              <div className="grid grid-cols-5  items-center w-3/5 mr-auto ml-auto mt-6 p-6 border-2 rounded-3xl">
                {[0, 1, 2].includes(index) ? (
                  <div>
                    <img src={`images/medal${index + 1}.png`} width={40} />
                  </div>
                ) : (
                  <div></div>
                )}
                <span className="justify-self-start">
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      className="rounded-full"
                      width={60}
                    />
                  ) : (
                    <img src="images/avatar.png" width={60} />
                  )}
                </span>
                <span className="">
                  {user.displayName
                    ? user.displayName
                    : "The user didn't shared his username yet."}
                </span>
                <span className="font-semibold italic justify-self-center">
                  Level : {user.level}
                </span>
                <span className="justify-self-end">
                  <img src={`icons/Ranks/${user.rank}.png`} width={50} />
                </span>
              </div>
            </>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
