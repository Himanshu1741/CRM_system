import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TaskIcon from '@mui/icons-material/Task';
import { leadsAPI, customersAPI, dealsAPI, tasksAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCustomers: 0,
    totalDeals: 0,
    totalTasks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const [leadsRes, customersRes, dealsRes, tasksRes] = await Promise.all([
        leadsAPI.getAll(),
        customersAPI.getAll(),
        dealsAPI.getAll(),
        tasksAPI.getAll(),
      ]);

      setStats({
        totalLeads: leadsRes.data.data?.length || 0,
        totalCustomers: customersRes.data.data?.length || 0,
        totalDeals: dealsRes.data.data?.length || 0,
        totalTasks: tasksRes.data.data?.length || 0,
      });
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ label, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight:'bold' }}>
        Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Leads"
            value={stats.totalLeads}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Customers"
            value={stats.totalCustomers}
            icon={<PersonIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Deals"
            value={stats.totalDeals}
            icon={<AttachMoneyIcon />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Tasks"
            value={stats.totalTasks}
            icon={<TaskIcon />}
            color="#7b1fa2"
          />
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Quick Stats
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Welcome to your CRM Dashboard! Manage your leads, customers, deals, and tasks from here.
        </Typography>
      </Paper>
    </Box>
  );
}
          <p className="text-3xl font-bold mt-2">$0</p>
        </div>
      </div>
    </div>
  );
}
