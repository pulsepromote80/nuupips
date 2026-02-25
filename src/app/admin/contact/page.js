"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactUs } from '@/app/redux/slices/blogSlice';
import {
  RiSearchLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiLoader4Line,
  RiEyeLine // Added for a view action
} from 'react-icons/ri';

const statusColors = {
  unapproved: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400'
  },
  approved: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400'
  }
};

export default function AdminContactPage() {
  const dispatch = useDispatch();
  const { contactUsData, loading } = useSelector((state) => state.blog);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getContactUs());
  }, [dispatch]);

  const contactSubmissions = contactUsData && contactUsData.length > 0
    ? contactUsData.map((item, index) => ({
      id: item.id || index + 1,
      fullName: item.name || '-',
      email: item.email || '-',
      subject: item.subject || '-',
      message: item.message || '-',
      status: item.status?.toLowerCase() || 'new',
      date: item.createdDate ? new Date(item.createdDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      time: item.createdDate ? new Date(item.createdDate).toLocaleTimeString() : '-'
    }))
    : [];

  const filteredContacts = contactSubmissions.filter(contact => {
    const searchStr = searchTerm.toLowerCase();
    return (
      contact.fullName.toLowerCase().includes(searchStr) ||
      contact.email.toLowerCase().includes(searchStr) ||
      contact.subject.toLowerCase().includes(searchStr) ||
      contact.message.toLowerCase().includes(searchStr)
    );
  });

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const getStatusBadge = (status) => {
    const colors = statusColors[status] || statusColors.new;
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap ${colors.bg} ${colors.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-2 md:p-4 lg:p-4 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
          Contact Us
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Manage and respond to your website inquiries.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <RiLoader4Line className="text-4xl text-emerald-500 animate-spin" />
          <p className="mt-2 text-sm text-gray-500">Fetching messages...</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Search by name, email...."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Table Wrapper for Horizontal Scroll on Mobile */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">S.No</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentItems.length > 0 ? (
                  currentItems.map((contact, index) => (
                    <tr 
                      key={contact.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                      onClick={() => handleViewDetails(contact)}
                    >
                      <td className="px-4 py-4 text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-white">{contact.fullName}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{contact.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="max-w-[150px] md:max-w-[200px] truncate">{contact.subject}</div>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(contact.status)}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{contact.date}</td>
                      <td className="px-4 py-4 text-right">
                        <button className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 rounded-lg transition-colors">
                          <RiEyeLine className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      No submissions found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredContacts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> to <span className="font-medium text-gray-900 dark:text-white">{Math.min(indexOfLastItem, filteredContacts.length)}</span> of <span className="font-medium text-gray-900 dark:text-white">{filteredContacts.length}</span> entries
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <RiArrowLeftSLine />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                     // Simple pagination logic for brevity
                     if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                              currentPage === page 
                              ? 'bg-emerald-500  shadow-sm shadow-emerald-200' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {page}
                          </button>
                        );
                     }
                     return null;
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <RiArrowRightSLine />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Responsive Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Contact Details</h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <RiCloseLine className="text-2xl text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Name</label>
                  <p className="mt-1 text-gray-900 dark:text-gray-100 font-medium">{selectedContact.fullName}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</label>
                  <p className="mt-1 text-emerald-600 dark:text-emerald-400">{selectedContact.email}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Subject</label>
                  <p className="mt-1 text-gray-900 dark:text-gray-100 font-semibold">{selectedContact.subject}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Message</label>
                  <div className="mt-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 text-sm font-medium bg-black text-white dark:text-gray-300 hover:text-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}