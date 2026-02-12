import { useEffect, useState } from "react";
import axios from "axios";

const ManagerCheckIns = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/manager/checkins/today", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setList(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Today Check-Ins</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-2">Guest</th>
            <th className="p-2">Room</th>
            <th className="p-2">Payment</th>
          </tr>
        </thead>
        <tbody>
          {list.map((b) => (
            <tr key={b._id} className="border-t">
              <td className="p-2">{b.userId?.name}</td>
              <td className="p-2">{b.roomId?.type}</td>
              <td className="p-2">{b.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerCheckIns;
