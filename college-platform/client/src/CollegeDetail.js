import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./api";
function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/colleges/${id}`)
      .then((res) => res.json())
      .then((data) => setCollege(data));
  }, [id]);


  if (!college) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{college.name}</h1>
      <p>{college.location}</p>
      <p>Fees: ₹{college.fees}</p>
      <p>Rating: {college.rating}</p>
      <p>Courses: {college.courses}</p>
      <p>Placements: {college.placements}</p>
    </div>
  );
}

export default CollegeDetail;