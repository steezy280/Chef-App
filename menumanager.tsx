import React, { useState, useMemo } from 'react';

// --- 1. Types ---
type CourseType = 'Starter' | 'Main Course' | 'Dessert';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  course: CourseType;
}

// --- 2. Initial Data ---
const initialMenuItems: MenuItem[] = [
  { id: 1, name: "Tomato Soup", price: 8.50, course: "Starter" },
  { id: 2, name: "Steak", price: 25.00, course: "Main Course" },
  { id: 3, name: "Ice Cream", price: 6.00, course: "Dessert" },
  { id: 4, name: "Caesar Salad", price: 9.00, course: "Starter" }
];

export default function MenuManager() {
  // --- State ---
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // --- 3. Derived State (Filtering) ---
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [menuItems, searchTerm, courseFilter]);

  // --- 4. Statistics ---
  const stats = useMemo(() => {
    const total = menuItems.length;
    const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
    const avgPrice = total > 0 ? (totalPrice / total).toFixed(2) : "0.00";
    
    const starters = menuItems.filter(i => i.course === "Starter").length;
    const mains = menuItems.filter(i => i.course === "Main Course").length;
    const desserts = menuItems.filter(i => i.course === "Dessert").length;

    return { total, avgPrice, starters, mains, desserts };
  }, [menuItems]);

  // --- 5. Handlers ---

  // *** UPDATED DELETE FUNCTION ***
  const handleDelete = (id: number, name: string) => {
    // 1. Ask for confirmation
    const isConfirmed = window.confirm(`Are you sure you want to delete "${name}" from the menu?`);
    
    if (isConfirmed) {
      // 2. Filter out the item with the matching ID
      setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
      
      // Note: We do not need to manually update stats or the table. 
      // React's useMemo hooks will automatically recalculate them.
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCourseFilter('All');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setMenuItems(prev => 
      prev.map(item => item.id === editingItem.id ? editingItem : item)
    );
    setEditingItem(null); 
  };

  // --- 6. Render ---
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Menu Management Dashboard</h1>

      {/* Search & Filter Bar */}
      <div style={styles.controls}>
        <input 
          type="text" 
          placeholder="Search by item name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select 
          value={courseFilter} 
          onChange={(e) => setCourseFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Courses</option>
          <option value="Starter">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
        </select>
        <button onClick={handleClearFilters} style={styles.primaryBtn}>
          Clear Filters
        </button>
      </div>

      {/* Menu Items Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No items match your current search or filter.
              </td>
            </tr>
          ) : (
            filteredItems.map(item => (
              <tr key={item.id} style={styles.tr}>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.course}</td>
                <td style={styles.td}>${item.price.toFixed(2)}</td>
                <td style={styles.td}>
                  <button 
                    onClick={() => setEditingItem(item)} 
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  {/* Passing both ID and Name to the delete handler */}
                  <button 
                    onClick={() => handleDelete(item.id, item.name)} 
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Statistics Dashboard */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Total Items</h3>
          <p style={styles.statValue}>{stats.total}</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Average Price</h3>
          <p style={styles.statValue}>${stats.avgPrice}</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Items by Course</h3>
          <p style={styles.statSmall}>Starters: {stats.starters}</p>
          <p style={styles.statSmall}>Mains: {stats.mains}</p>
          <p style={styles.statSmall}>Desserts: {stats.desserts}</p>
        </div>
      </div>

      {/* Edit Modal (Unchanged) */}
      {editingItem && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Edit Menu Item</h2>
            <form onSubmit={handleSaveEdit} style={styles.form}>
              <label>Name:</label>
              <input 
                type="text" 
                value={editingItem.name} 
                onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                required
                style={styles.input}
              />
              
              <label>Price:</label>
              <input 
                type="number" 
                step="0.01" 
                value={editingItem.price} 
                onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value) || 0})}
                required
                style={styles.input}
              />

              <label>Course:</label>
              <select 
                value={editingItem.course}
                onChange={e => setEditingItem({...editingItem, course: e.target.value as CourseType})}
                style={styles.select}
              >
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
              </select>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="submit" style={styles.primaryBtn}>Save Changes</button>
                <button type="button" onClick={() => setEditingItem(null)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 7. Inline Styles ---
const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
  header: { textAlign: 'center', color: '#333' },
  controls: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flex: 1, width: '100%', boxSizing: 'border-box' },
  select: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' },
  primaryBtn: { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  cancelBtn: { padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  editBtn: { padding: '5px 10px', marginRight: '5px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
  tableHeader: { backgroundColor: '#f8f9fa', textAlign: 'left' },
  th: { padding: '12px', borderBottom: '2px solid #ddd' },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '12px' },
  statsContainer: { display: 'flex', gap: '15px', marginTop: '20px' },
  statCard: { flex: 1, backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center', border: '1px solid #e9ecef' },
  statTitle: { margin: '0 0 10px 0', fontSize: '14px', color: '#555' },
  statValue: { margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' },
  statSmall: { margin: '2px 0', fontSize: '14px', color: '#333' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }
};