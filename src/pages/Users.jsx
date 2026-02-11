import React, { useState } from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { users } from '../data/users';
import { cn } from '../lib/utils';

const Users = () => {
  const [userList, setUserList] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'Active' });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-bold",
          row.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" :
          row.status === 'Inactive' ? "bg-muted text-muted-foreground" :
          "bg-amber-500/10 text-amber-500"
        )}>
          {row.status}
        </span>
      )
    },
    { key: 'date', label: 'Date Joined' },
  ];

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    
    const user = {
      ...newUser,
      id: userList.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    
    setUserList([user, ...userList]);
    setNewUser({ name: '', email: '', status: 'Active' });
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = userList.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(userList.length / pageSize);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">User Directory</h2>
            <p className="text-sm text-muted-foreground">Manage your application users and their roles.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
          >
            Add New User
          </button>
        </div>

        <Table columns={columns} data={paginatedData} />
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1); // Reset to first page
          }}
        />
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-md rounded-2xl border border-border p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-2">Add New User</h3>
            <p className="text-sm text-muted-foreground mb-6">Enter the details of the new user below.</p>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input 
                  autoFocus
                  type="text" 
                  required
                  placeholder="enter your name"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="enter your email"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Status</label>
                <select 
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium shadow-lg shadow-primary/20"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
