'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Submission {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message?: string;
  description?: string;
  language: string;
  status: string;
  type?: string;
}

interface Stats {
  totalContacts: number;
  totalFreeTrials: number;
  totalSubmissions: number;
  statusBreakdown: {
    new: number;
    contacted: number;
    converted: number;
    closed: number;
  };
  recentSubmissions: Submission[];
  serviceBreakdown: Record<string, number>;
}

export default function SubmissionsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [submissions, setSubmissions] = useState<{
    contacts: Submission[];
    freeTrials: Submission[];
  }>({ contacts: [], freeTrials: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'free-trials'>('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, submissionsResponse] = await Promise.all([
        fetch('/api/contact/submissions?type=stats'),
        fetch('/api/contact/submissions')
      ]);

      const statsData = await statsResponse.json();
      const submissionsData = await submissionsResponse.json();

      if (statsData.success) {
        setStats(statsData.data);
      }

      if (submissionsData.success) {
        setSubmissions(submissionsData.data);
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type: 'contact' | 'free-trial', rowIndex: number, status: string) => {
    try {
      const response = await fetch('/api/contact/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, rowIndex, status }),
      });

      if (response.ok) {
        // Refresh data after update
        await fetchData();
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  const exportData = async (type: 'contact' | 'free-trial' | 'all') => {
    try {
      const response = await fetch(`/api/contact/export?type=${type}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ignite-submissions-${type}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError('Failed to export data');
      }
    } catch (err) {
      setError('Failed to export data');
      console.error('Error exporting data:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <Button onClick={fetchData} className="mt-2">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submissions Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={() => exportData('contact')} variant="outline">
              Export Contacts
            </Button>
            <Button onClick={() => exportData('free-trial')} variant="outline">
              Export Free Trials
            </Button>
            <Button onClick={() => exportData('all')} variant="outline">
              Export All
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Submissions</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500">Contact Forms</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalContacts}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500">Free Trial Requests</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalFreeTrials}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500">New Submissions</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.statusBreakdown.new}</p>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'contacts', label: 'Contact Forms' },
              { id: 'free-trials', label: 'Free Trial Requests' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Status Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(stats.statusBreakdown).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="capitalize text-gray-600">{status}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Submissions */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Submissions</h3>
              <div className="space-y-3">
                {stats.recentSubmissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{submission.name}</p>
                      <p className="text-gray-500">{submission.service}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'contacts' && (
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Form Submissions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.contacts.map((submission, index) => (
                    <tr key={submission.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(submission.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {submission.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={submission.status}
                          onChange={(e) => updateStatus('contact', index, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-xs"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'free-trials' && (
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Free Trial Requests</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.freeTrials.map((submission, index) => (
                    <tr key={submission.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(submission.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {submission.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={submission.status}
                          onChange={(e) => updateStatus('free-trial', index, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-xs"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 