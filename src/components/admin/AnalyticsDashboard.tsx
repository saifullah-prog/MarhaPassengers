import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function AnalyticsDashboard() {
  const [bookingsData, setBookingsData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [vehicleData, setVehicleData] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    // Load bookings by month
    const { data: bookings } = await supabase
      .from('bookings')
      .select('created_at, status');

    if (bookings) {
      // Group by month
      const monthlyData: Record<string, number> = {};
      bookings.forEach((booking) => {
        const month = new Date(booking.created_at).toLocaleString('default', { month: 'short' });
        monthlyData[month] = (monthlyData[month] || 0) + 1;
      });

      setBookingsData(
        Object.entries(monthlyData).map(([month, count]) => ({ month, bookings: count }))
      );

      // Group by status
      const statusCount: Record<string, number> = {};
      bookings.forEach((booking) => {
        statusCount[booking.status] = (statusCount[booking.status] || 0) + 1;
      });

      setStatusData(
        Object.entries(statusCount).map(([status, count]) => ({ status, count }))
      );
    }

    // Load vehicle popularity
    const { data: vehicles } = await supabase
      .from('vehicles')
      .select('name, type');

    const { data: bookingsByVehicle } = await supabase
      .from('bookings')
      .select('vehicle_type');

    if (vehicles && bookingsByVehicle) {
      const vehicleCount: Record<string, number> = {};
      bookingsByVehicle.forEach((booking) => {
        vehicleCount[booking.vehicle_type] = (vehicleCount[booking.vehicle_type] || 0) + 1;
      });

      setVehicleData(
        Object.entries(vehicleCount).map(([vehicle, count]) => ({ vehicle, bookings: count }))
      );
    }
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings Over Time</CardTitle>
            <CardDescription>Monthly booking trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.status}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="count"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Popularity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vehicle Popularity</CardTitle>
            <CardDescription>Most booked vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehicleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vehicle" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
