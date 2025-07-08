import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(res => res.json())
      .then(data => {
        setComment(data);
        console.log("Fetched Comment ID:", data.id); // ✅ Debug print
      });
  }, [id]);

  if (!comment) return <p>Loading comment details...</p>;

  const initials = comment.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="container">
      <div className="form-header-flex">
        <div className="avatar-circle">{initials}</div>
        <div>
          <h2 className="form-name">{comment.name}</h2>
          <p className="form-email">{comment.email}</p>
        </div>
      </div>

      <div className="form-box">
        <div className="form-field">
          <label>Full Name</label>
          <div className="form-value">{comment.name}</div>
        </div>

        <div className="form-field">
          <label>Email</label>
          <div className="form-value">{comment.email}</div>
        </div>

        <div className="form-field">
          <label>Post ID</label>
          <div className="form-value">{10000000 + comment.id}</div>
        </div>

        <div className="form-field">
          <label>Comment</label>
          <div className="form-value" style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</div>
        </div>
      </div>

      <Link to="/" className="back-link">← Back to Dashboard</Link>
    </div>
  );
}

export default UserDetails;
