import React, { useState } from "react";

const QueueManagement = () => {
  const [queues, setQueues] = useState([
    { id: 1, name: "Registration", current: 5, limit: 20 },
    { id: 2, name: "Transcript Requests", current: 3, limit: 15 },
    { id: 3, name: "Clearance", current: 8, limit: 10 },
  ]);
  
  const [newQueue, setNewQueue] = useState({ name: "", current: 0, limit: 0 });

  const addQueue = () => {
    if (newQueue.name && newQueue.limit > 0) {
      setQueues([...queues, { ...newQueue, id: queues.length + 1 }]);
      setNewQueue({ name: "", current: 0, limit: 0 }); // Reset form
    }
  };

  const removeQueue = (id) => {
    setQueues(queues.filter(queue => queue.id !== id));
  };

  const updateQueue = (id, updatedQueue) => {
    setQueues(queues.map(queue => (queue.id === id ? updatedQueue : queue)));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Queue Management</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Queue</h2>
        <input
          type="text"
          placeholder="Queue Name"
          value={newQueue.name}
          onChange={(e) => setNewQueue({ ...newQueue, name: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Current Count"
          value={newQueue.current}
          onChange={(e) => setNewQueue({ ...newQueue, current: +e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Limit"
          value={newQueue.limit}
          onChange={(e) => setNewQueue({ ...newQueue, limit: +e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={addQueue}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Queue
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Current Queues</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Queue Name</th>
              <th className="border border-gray-300 p-2">Current Count</th>
              <th className="border border-gray-300 p-2">Limit</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queues.map(queue => (
              <tr key={queue.id}>
                <td className="border border-gray-300 p-2">{queue.name}</td>
                <td className="border border-gray-300 p-2">{queue.current}</td>
                <td className="border border-gray-300 p-2">{queue.limit}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => removeQueue(queue.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateQueue(queue.id, { ...queue, current: queue.current + 1 })}
                    className="bg-green-500 text-white p-1 rounded hover:bg-green-600 ml-2"
                  >
                    +1
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueueManagement;
  