import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Utils/Loader";
import { getAllLevels } from "../services/admin/getAllLevels";
import { getCurrentUser } from "../services/user/getCurrentUser";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getAllLevels().then((data) => {
      var users = data.docs.map((d) => d.data());
      setUsers(users);

      getCurrentUser().then((user) => {
        setCurrentUser(user);
      });
    });
  }, []);

  const userIsCurrentUser = (user) => {
    return user.userId === currentUser.uid;
  };
  return (
    <div className="pt-6">
      {users && currentUser && users.length > 0 ? (
        <div>
          {currentUser.isAnonymous ? (
            <h1 className="italic text-center pb-[100vh]">
              You don't have access to the leaderboard because you don't have an
              account.
            </h1>
          ) : (
            <>
              {users.map((user, index) => (
                <div
                  key={user.userId}
                  style={{
                    borderColor: userIsCurrentUser(user) && "#0E94D7",
                    borderWidth: userIsCurrentUser(user) && 4,
                  }}
                  className="grid grid-cols-5 items-center md:w-4/5 w-full xl:w-3/5 mr-auto ml-auto mb-6 p-6 border-2 rounded-3xl"
                >
                  {[0, 1, 2].includes(index) ? (
                    <div>
                      <img src={`images/medal${index + 1}.png`} width={40} />
                    </div>
                  ) : (
                    <h4 className="ml-4 font-semibold text-primary">
                      {index + 1}
                    </h4>
                  )}

                  <span className="justify-self-start">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        referrerPolicy="no-referrer"
                        className="rounded-full"
                        width={60}
                      />
                    ) : (
                      <img src="images/avatar.png" width={60} />
                    )}
                  </span>
                  <span className="">
                    {user.displayName ? (
                      <p className="dark:text-lightBackground">
                        {user.displayName.split(" ")[0]} -{" "}
                        <span className="italic text-primary">
                          #{user.userId.substring(0, 4)}
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm justify-self-start dark:text-lightBackground">
                        The user didn't shared his username yet.
                      </p>
                    )}
                  </span>
                  <span className="font-semibold italic justify-self-center dark:text-lightBackground">
                    Level :{" "}
                    <span className="text-primary text-2xl"> {user.level}</span>
                  </span>
                  <span className="justify-self-end">
                    <img src={`icons/Ranks/${user.rank}.png`} width={50} />
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
