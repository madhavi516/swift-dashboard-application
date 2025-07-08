import React from 'react';
import { Link } from 'react-router-dom';

function CommentTable({ data }) {
  return (
    <table className="comment-table">
      <thead>
        <tr>
          <th>Post ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.fakePostId}</td>
            <td>
              <Link
                to={`/user/${item.id}`}
                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                {item.name}
              </Link>
            </td>
            <td>{item.email}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CommentTable;
