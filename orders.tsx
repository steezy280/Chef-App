import React, { useState } from 'react';

// --- Types ---
type OrderStatus = 'Pending' | 'Preparing' | 'Completed';

interface Order {
  id: string;
  table: number;
  items: string[];
  total: number;
  status: OrderStatus;
}

// --- Initial Data (Matching your screenshot) ---
const initialOrders: Order[] = [
  { id: '#1042', table: 4, items: ['Grilled Salmon', 'Caesar Salad'], total: 280, status: 'Pending' },
  { id: '#1041', table: 2, items: ['Beef Wellington'], total: 280, status: 'Preparing' },
  { id: '#1040', table: 7, items: ['Tomato Soup', 'Steak'], total: 150, status: 'Pending' },
  { id: '#1039', table: 1, items: ['Ice Cream'], total: 60, status: 'Completed' },
];

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<string>('All');

  // --- Filter Logic ---
  const filteredOrders = orders.filter(order => 
    activeTab === 'All' ? true : order.status === activeTab
  );

  // --- DELETE LOGIC ---
  const handleDeleteOrder = (orderId: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete order ${orderId}?`);
    if (isConfirmed) {
      // Filters out the deleted order and updates the state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }
  };

  // --- Status Update Logic ---
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Orders</h1>
          <p style={styles.subtitle}>Manage today's orders</p>
        </div>
        <div style={styles.badge}>{orders.length}</div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['All', 'Pending', 'Preparing', 'Completed'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={activeTab === tab ? styles.activeTab : styles.inactiveTab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div style={styles.listContainer}>
        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No orders found.</p>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} style={styles.card}>
              
              {/* CARD HEADER WITH DELETE ICON */}
              <div style={styles.cardHeader}>
                <div>
                  <h2 style={styles.orderId}>{order.id}</h2>
                  <p style={styles.tableNum}>Table {order.table}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Status Badge */}
                  <span style={getStatusStyle(order.status)}>{order.status}</span>
                  
                  {/* DELETE BUTTON (Trash Icon) */}
                  <button 
                    onClick={() => handleDeleteOrder(order.id)}
                    style={styles.deleteIconBtn}
                    title="Delete Order"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Items */}
              <div style={styles.divider}></div>
              <p style={styles.itemsList}>{order.items.join(', ')}</p>

              {/* Footer / Action */}
              <div style={styles.cardFooter}>
                <div style={styles.totalRow}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalAmount}>R{order.total}</span>
                </div>
                
                {/* Action Button */}
                {order.status === 'Pending' && (
                  <button 
                    onClick={() => handleUpdateStatus(order.id, 'Preparing')} 
                    style={styles.actionBtn}
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === 'Preparing' && (
                  <button 
                    onClick={() => handleUpdateStatus(order.id, 'Completed')} 
                    style={styles.actionBtn}
                  >
                    Mark Completed
                  </button>
                )}
                {order.status === 'Completed' && (
                  <button 
                    onClick={() => handleDeleteOrder(order.id)} 
                    style={styles.clearBtn}
                  >
                    Clear from List
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

// --- Helper for Status Colors ---
const getStatusStyle = (status: OrderStatus): React.CSSProperties => {
  const base = { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' };
  switch(status) {
    case 'Pending': return { ...base, backgroundColor: '#ffe5d9', color: '#d9534f' };
    case 'Preparing': return { ...base, backgroundColor: '#fff3cd', color: '#856404' };
    case 'Completed': return { ...base, backgroundColor: '#d4edda', color: '#155724' };
    default: return base;
  }
};

// --- Styles ---
const styles: Record<string, React.CSSProperties> = {
  page: { backgroundColor: '#fcf9f2', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  title: { margin: 0, fontSize: '28px', color: '#2c2c2c' },
  subtitle: { margin: '5px 0 0 0', color: '#6c757d', fontSize: '14px' },
  badge: { backgroundColor: '#e86a4c', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' },
  
  tabs: { display: 'flex', gap: '10px', marginBottom: '20px' },
  activeTab: { padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: '#e86a4c', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  inactiveTab: { padding: '8px 16px', borderRadius: '20px', border: '1px solid #e0e0e0', backgroundColor: '#ffffff', color: '#555', cursor: 'pointer' },

  listContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  orderId: { margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#2c2c2c' },
  tableNum: { margin: '5px 0 0 0', color: '#888', fontSize: '14px' },
  
  // The new Delete Button style
  deleteIconBtn: { 
    background: 'none', 
    border: 'none', 
    fontSize: '20px', 
    cursor: 'pointer', 
    padding: '5px',
    opacity: 0.6,
    transition: 'opacity 0.2s'
  },

  divider: { height: '1px', backgroundColor: '#f0f0f0', margin: '15px 0' },
  itemsList: { margin: 0, color: '#555', fontSize: '15px' },
  
  cardFooter: { marginTop: '20px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  totalLabel: { color: '#888', fontSize: '14px' },
  totalAmount: { color: '#e86a4c', fontSize: '18px', fontWeight: 'bold' },
  
  actionBtn: { width: '100%', padding: '12px', backgroundColor: '#fcf9f2', color: '#e86a4c', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  clearBtn: { width: '100%', padding: '12px', backgroundColor: '#f0f0f0', color: '#555', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }
};