export const UserModal = ({ data }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg">
        <h2 className="text-xl font-bold">{data.name}</h2>
        <img src={data.image} alt={data.name} className="w-full h-auto" />
        <p>Type: {data.type}</p>
        <p>Department: {data.department}</p>
        <p>Invited by: {data.invited_by}</p>
        <p>Last recorded time: {data.last_recorded_time}</p>
        <p>Reference No: {data.ref_no}</p>
        <p>Status: {data.registered}</p>
      </div>
    </div>
  );
};
