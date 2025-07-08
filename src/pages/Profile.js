import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUser(data[0]));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <h2>User Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Website:</b> {user.website}</p>
      <p><b>Company:</b> {user.company.name}</p>
      <Link to="/">← Back to Dashboard</Link>
    </div>
  );
}

export default Profile;
