export function saveFilters(state) {
  localStorage.setItem('dashboard-filters', JSON.stringify(state));
}

export function loadFilters() {
  const data = localStorage.getItem('dashboard-filters');
  return data ? JSON.parse(data) : null;
}