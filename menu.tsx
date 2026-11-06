import React, { useState, useMemo } from 'react';

// --- Types ---
type CourseType = 'Starter' | 'Main' | 'Dessert';

interface MenuItem {
  id: number;
  name: string;
  course: CourseType;
  description: string;
  price: number;
  imageUrl: string;
}

// --- Initial Data with Real Food Images ---
const initialMenuItems: MenuItem[] = [
  { 
    id: 1, 
    name: "Grilled Salmon", 
    course: "Main", 
    description: "Fresh salmon with seasonal vegetables", 
    price: 195, 
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&q=80' 
  },
  { 
    id: 2, 
    name: "Caesar Salad", 
    course: "Starter", 
    description: "Crisp lettuce, parmesan and Caesar dressing", 
    price: 85, 
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=200&q=80' 
  },
  { 
    id: 3, 
    name: "Chocolate Fondant", 
    course: "Dessert", 
    description: "Warm chocolate cake with a soft centre", 
    price: 75, 
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200&q=80' 
  },
  { 
    id: 4, 
    name: "Tomato Soup", 
    course: "Starter", 
    description: "Creamy roasted tomato soup with basil", 
    price: 65, 
    imageUrl: 'https://images.unsplash.com/photo-1548943487-a2e4d43b4850?w=200&q=80' 
  },
  { 
    id: 5, 
    name: "Beef Wellington", 
    course: "Main", 
    description: "Tender beef wrapped in puff pastry", 
    price: 250, 
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80' 
  }
];

export default function MyMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('All');

  // --- Filter Logic ---
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = activeTab === 'All' || item.course === activeTab;
      return matchesSearch && matchesCourse;
    });
  }, [menuItems, searchTerm, activeTab]);

  // --- Delete Logic ---
  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Menu</h1>
          <p style={styles.subtitle}>Manage your dishes</p>
        </div>
        <div style={styles.avatar}>C</div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search dishes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Filter Tabs */}
      <div style={styles.tabs}>
        {['All', 'Starter', 'Main', 'Dessert'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={activeTab === tab ? styles.activeTab : styles.inactiveTab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Item Count */}
      <p style={styles.itemCount}>{filteredItems.length} dishes</p>

      {/* Menu Items List */}
      <div style={styles.listContainer}>
        {filteredItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No dishes found.</p>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} style={styles.card}>
              
              {/* Left Side: Image & Details */}
              <div style={styles.cardLeft}>
                <img src={item.imageUrl} alt={item.name} style={styles.image} />
                
                <div style={styles.details}>
                  <div style={styles.nameRow}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                  </div>
                  <span style={styles.courseBadge}>{item.course}</span>
                  <p style={styles.description}>{item.description}</p>
                </div>
              </div>

              {/* Right Side: Price & Delete Action */}
              <div style={styles.cardRight}>
                <span style={styles.price}>R{item.price}</span>
                <button 
                  onClick={() => handleDelete(item.id, item.name)}
                  style={styles.deleteBtn}
                  title="Delete Dish"
                >
                  🗑️
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <button style={styles.fab}>+</button>
    </div>
  );
}

// --- Styles ---
const styles: Record<string, React.CSSProperties> = {
  page: { backgroundColor: '#fdfaf5', minHeight: '100vh', padding: '20px 20px 80px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', position: 'relative' },
  
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  title: { margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#2c2c2c' },
  subtitle: { margin: '5px 0 0 0', color: '#888', fontSize: '15px' },
  avatar: { backgroundColor: '#e86a4c', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' },
  
  searchContainer: { marginBottom: '15px' },
  searchInput: { width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#ffffff', fontSize: '16px', boxSizing: 'border-box', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
  
  tabs: { display: 'flex', gap: '10px', marginBottom: '20px' },
  activeTab: { padding: '8px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#e86a4c', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  inactiveTab: { padding: '8px 20px', borderRadius: '20px', border: '1px solid #f0f0f0', backgroundColor: '#ffffff', color: '#555', cursor: 'pointer' },
  
  itemCount: { color: '#888', fontSize: '14px', marginBottom: '15px' },
  
  listContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  
  // Card Layout
  card: { backgroundColor: 'white', borderRadius: '16px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' },
  cardLeft: { display: 'flex', gap: '15px', alignItems: 'center', flex: 1 },
  
  // The Real Image
  image: { width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' },
  
  details: { display: 'flex', flexDirection: 'column', gap: '4px' },
  nameRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  itemName: { margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#2c2c2c' },
  courseBadge: { backgroundColor: '#f5f5f5', color: '#666', fontSize: '12px', padding: '2px 8px', borderRadius: '10px', alignSelf: 'flex-start' },
  description: { margin: '5px 0 0 0', color: '#888', fontSize: '14px' },
  
  // Right Side Actions
  cardRight: { display: 'flex', alignItems: 'center', gap: '15px', paddingLeft: '15px' },
  price: { fontWeight: 'bold', color: '#e86a4c', fontSize: '16px' },
  deleteBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', opacity: 0.5, transition: 'opacity 0.2s' },
  
  // Floating Button
  fab: { position: 'fixed', bottom: '80px', right: '20px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e86a4c', color: 'white', fontSize: '32px', border: 'none', boxShadow: '0 4px 12px rgba(232,106,76,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};