import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  customersAPI,
  dealsAPI,
  leadsAPI,
  notesAPI,
  tasksAPI,
} from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [leadsRes, customersRes, dealsRes, tasksRes, notesRes] =
        await Promise.all([
          leadsAPI.getAll(),
          customersAPI.getAll(),
          dealsAPI.getAll(),
          tasksAPI.getAll(),
          notesAPI.getAll(),
        ]);

      const leads = leadsRes.data.data || [];
      const customers = customersRes.data.data || [];
      const deals = dealsRes.data.data || [];
      const tasks = tasksRes.data.data || [];
      const notes = notesRes.data.data || [];

      // Calculate statistics
      const leadStatus = {
        new: leads.filter((l) => l.status === "new").length,
        contacted: leads.filter((l) => l.status === "contacted").length,
        qualified: leads.filter((l) => l.status === "qualified").length,
      };

      const dealStages = {
        prospecting: deals.filter((d) => d.stage === "prospecting").length,
        negotiation: deals.filter((d) => d.stage === "negotiation").length,
        proposal: deals.filter((d) => d.stage === "proposal").length,
        won: deals.filter((d) => d.stage === "won").length,
        lost: deals.filter((d) => d.stage === "lost").length,
      };

      const totalDealValue = deals.reduce((sum, d) => sum + (d.amount || 0), 0);

      const taskStatus = {
        todo: tasks.filter((t) => t.status === "todo").length,
        inProgress: tasks.filter((t) => t.status === "in-progress").length,
        completed: tasks.filter((t) => t.status === "completed").length,
      };

      setStats({
        leads: {
          total: leads.length,
          byStatus: leadStatus,
          conversionRate: leads.length
            ? ((leadStatus.qualified / leads.length) * 100).toFixed(1)
            : 0,
        },
        customers: {
          total: customers.length,
          active: customers.filter((c) => c.status === "active").length,
        },
        deals: {
          total: deals.length,
          byStage: dealStages,
          totalValue: totalDealValue.toFixed(0),
          avgValue:
            deals.length > 0 ? (totalDealValue / deals.length).toFixed(0) : 0,
          wonDeals: dealStages.won,
          winRate: deals.length
            ? (dealStages.won + dealStages.lost > 0
                ? (dealStages.won / (dealStages.won + dealStages.lost)) * 100
                : 0
              ).toFixed(1)
            : 0,
        },
        tasks: {
          total: tasks.length,
          byStatus: taskStatus,
          completionRate: tasks.length
            ? ((taskStatus.completed / tasks.length) * 100).toFixed(1)
            : 0,
        },
        notes: {
          total: notes.length,
        },
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Failed to load dashboard</Typography>
      </Box>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color = "#2196f3", trend }) => (
    <Card sx={{ p: 2.5, height: "100%" }}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "text.secondary" }}
          >
            {title}
          </Typography>
          <Box sx={{ color, opacity: 0.7 }}>
            <Icon />
          </Box>
        </Stack>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
        {trend && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            {trend.positive ? (
              <TrendingUpIcon sx={{ color: "green", fontSize: 20 }} />
            ) : (
              <TrendingDownIcon sx={{ color: "red", fontSize: 20 }} />
            )}
            <Typography
              variant="caption"
              sx={{ color: trend.positive ? "green" : "red" }}
            >
              {trend.value}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );

  const ProgressCard = ({ title, completed, total, color = "#2196f3" }) => (
    <Card sx={{ p: 2.5 }}>
      <Stack spacing={1.5}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {completed} of {total} ({((completed / total) * 100).toFixed(0)}%)
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(completed / total) * 100}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": { backgroundColor: color },
          }}
        />
      </Stack>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        📊 Dashboard Analytics
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Leads"
            value={stats.leads.total}
            icon={() => "👥"}
            trend={{
              positive: true,
              value: `${stats.leads.conversionRate}% qualified`,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Customers"
            value={stats.customers.active}
            icon={() => "🏢"}
            trend={{
              positive: true,
              value: `${stats.customers.total} total`,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Deal Value"
            value={`₹${(stats.deals.totalValue / 100000).toFixed(1)}L`}
            icon={() => "💰"}
            trend={{
              positive: true,
              value: `Avg: ₹${(stats.deals.avgValue / 1000).toFixed(0)}K`,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tasks This Week"
            value={stats.tasks.total}
            icon={() => "✅"}
            trend={{
              positive: stats.tasks.completionRate > 50,
              value: `${stats.tasks.completionRate}% completed`,
            }}
          />
        </Grid>
      </Grid>

      {/* Leads Status */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              📈 Leads Pipeline
            </Typography>
            <Stack spacing={2}>
              <ProgressCard
                title="New Leads"
                completed={stats.leads.byStatus.new}
                total={stats.leads.total || 1}
                color="#ff9800"
              />
              <ProgressCard
                title="Contacted"
                completed={stats.leads.byStatus.contacted}
                total={stats.leads.total || 1}
                color="#2196f3"
              />
              <ProgressCard
                title="Qualified"
                completed={stats.leads.byStatus.qualified}
                total={stats.leads.total || 1}
                color="#4caf50"
              />
            </Stack>
          </Card>
        </Grid>

        {/* Deals Pipeline */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              🎯 Deals Pipeline
            </Typography>
            <Stack spacing={1.5}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
              >
                <Typography>Prospecting:</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {stats.deals.byStage.prospecting}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
              >
                <Typography>Negotiation:</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {stats.deals.byStage.negotiation}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
              >
                <Typography>Proposal:</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {stats.deals.byStage.proposal}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  backgroundColor: "#e8f5e9",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Won:</Typography>
                <Typography sx={{ fontWeight: "bold", color: "green" }}>
                  {stats.deals.byStage.won}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  backgroundColor: "#ffebee",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Lost:</Typography>
                <Typography sx={{ fontWeight: "bold", color: "red" }}>
                  {stats.deals.byStage.lost}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1.5,
                  backgroundColor: "#f3e5f5",
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Win Rate:</Typography>
                <Typography sx={{ fontWeight: "bold", color: "#7b1fa2" }}>
                  {stats.deals.winRate}%
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Task Summary */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          ✅ Task Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ProgressCard
              title="To Do"
              completed={stats.tasks.byStatus.todo}
              total={stats.tasks.total || 1}
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ProgressCard
              title="In Progress"
              completed={stats.tasks.byStatus.inProgress}
              total={stats.tasks.total || 1}
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ProgressCard
              title="Completed"
              completed={stats.tasks.byStatus.completed}
              total={stats.tasks.total || 1}
              color="#4caf50"
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
