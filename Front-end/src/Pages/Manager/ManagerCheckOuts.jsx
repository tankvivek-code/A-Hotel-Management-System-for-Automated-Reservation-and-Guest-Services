import { useEffect, useState } from "react";
import axios from "axios";

const ManagerCheckOuts = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/manager/checkouts/today", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setList(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Today Check-Outs</h1>

      {list.map((b) => (
        <div key={b._id} className="bg-white p-4 mb-2 shadow rounded">
          {b.userId?.name} – Room {b.roomId?.type}
        </div>
      ))}
    </div>
  );
};

export default ManagerCheckOuts;
