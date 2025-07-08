import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommentTable from '../components/CommentTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { saveFilters, loadFilters } from '../utils/localStorageHelpers';

function Dashboard() {
  const [comments, setComments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const saved = loadFilters();
    if (saved) {
      setSearch(saved.search || '');
      setSortBy(saved.sortBy || '');
      setSortOrder(saved.sortOrder || '');
      setPage(saved.page || 1);
      setPageSize(saved.pageSize || 10);
    }
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => {
        const updated = data.map(comment => ({
          ...comment,
          fakePostId: 10000000 + comment.id
        }));
        setComments(updated);
      });
  }, []);

  useEffect(() => {
    let result = [...comments];

    if (search) {
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        const aVal = a[sortBy].toString().toLowerCase();
        const bVal = b[sortBy].toString().toLowerCase();
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFiltered(result);
    saveFilters({ search, sortBy, sortOrder, page, pageSize });
  }, [comments, search, sortBy, sortOrder, page, pageSize]);

  const handleSort = (field) => {
    if (sortBy !== field) {
      setSortBy(field);
      setSortOrder('asc');
    } else {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
      if (sortOrder === 'desc') setSortBy('');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return '⬍';
    return sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '⬍';
  };

  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container">
      <h1>Comments Dashboard</h1>
      <Link to="/profile">View Profile</Link>

      <div className="sort-controls">
        <button onClick={() => handleSort('fakePostId')}>Sort Post ID {getSortIcon('fakePostId')}</button>
        <button onClick={() => handleSort('name')}>Sort Name {getSortIcon('name')}</button>
        <button onClick={() => handleSort('email')}>Sort Email {getSortIcon('email')}</button>
      </div>

      <SearchBar value={search} onChange={setSearch} />
      <CommentTable
        data={paginatedData}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <Pagination
        total={filtered.length}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
}

export default Dashboard;
