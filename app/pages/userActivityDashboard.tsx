'use client';

import React, { useEffect, useState } from 'react';
import { fetchUserActivities, fetchUserMetrics } from '../../services/userServices';
import { useRouter } from 'next/router';

const UserActivityDashboard: React.FC = () => {
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const [activityData, metricsData] = await Promise.all([
          fetchUserActivities(),
          fetchUserMetrics(),
        ]);
        setActivities(activityData as never[]);
        setMetrics(metricsData);
      } catch (err) {
        setError('Failed to load activities or metrics');
      } finally {
          setLoading(false);
      }
    };
    loadActivities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 lg:p-24">
      <div className="flex items-center mb-4">
        <button onClick={() => router.push('/userProfile')} className="mr-4">
          ← Back
        </button>
        <h1 className="text-3xl font-bold">User Activity Dashboard</h1>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">User Metrics</h2>
        {metrics ? (
          <ul>
            <li>Active Users: {metrics['activeUsers']}</li>
            <li>Session Duration: {metrics['sessionDuration']} mins</li>
            <li>Page Views: {metrics['pageViews']}</li>
            <li>Bounce Rate: {metrics['bounceRate']}%</li>
          </ul>
        ) : (
          <div>No metrics available</div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold">User Activities</h2>
        <ul className="space-y-4">
          {activities.map((activity: { id: string; description: string }) => (
            <li key={activity.id} className="p-4 bg-white rounded shadow">
              {activity.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserActivityDashboard;