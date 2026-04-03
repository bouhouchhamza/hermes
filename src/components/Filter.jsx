function Filter({ currentFilter, onChangeFilter }) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div className="filter-buttons">
      {filters.map((filterOption) => (
        <button
          key={filterOption.value}
          type="button"
          className={`filter-btn ${
            currentFilter === filterOption.value ? "active-filter" : ""
          }`}
          onClick={() => onChangeFilter(filterOption.value)}
        >
          {filterOption.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;

