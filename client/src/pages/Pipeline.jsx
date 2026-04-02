import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { dealsAPI, leadsAPI } from "../services/api";

export default function Pipeline() {
  const [deals, setDeals] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dealsRes, leadsRes] = await Promise.all([
        dealsAPI.getAll(),
        leadsAPI.getAll(),
      ]);
      setDeals(dealsRes.data.data || []);
      setLeads(leadsRes.data.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
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

  // Lead Pipeline
  const leadStages = {
    New: leads.filter((l) => l.status === "new").length,
    Contacted: leads.filter((l) => l.status === "contacted").length,
    Qualified: leads.filter((l) => l.status === "qualified").length,
  };

  const leadConversion = {
    newToContacted:
      leadStages.New > 0
        ? ((leadStages.Contacted / leadStages.New) * 100).toFixed(1)
        : 0,
    contactedToQualified:
      leadStages.Contacted > 0
        ? ((leadStages.Qualified / leadStages.Contacted) * 100).toFixed(1)
        : 0,
    overallConversion:
      leadStages.New > 0
        ? ((leadStages.Qualified / leadStages.New) * 100).toFixed(1)
        : 0,
  };

  // Deal Pipeline
  const dealStages = {
    Prospecting: deals.filter((d) => d.stage === "prospecting").length,
    Negotiation: deals.filter((d) => d.stage === "negotiation").length,
    Proposal: deals.filter((d) => d.stage === "proposal").length,
    Won: deals.filter((d) => d.stage === "won").length,
    Lost: deals.filter((d) => d.stage === "lost").length,
  };

  const dealValues = {
    Prospecting: deals
      .filter((d) => d.stage === "prospecting")
      .reduce((sum, d) => sum + (d.amount || 0), 0),
    Negotiation: deals
      .filter((d) => d.stage === "negotiation")
      .reduce((sum, d) => sum + (d.amount || 0), 0),
    Proposal: deals
      .filter((d) => d.stage === "proposal")
      .reduce((sum, d) => sum + (d.amount || 0), 0),
    Won: deals
      .filter((d) => d.stage === "won")
      .reduce((sum, d) => sum + (d.amount || 0), 0),
    Lost: deals
      .filter((d) => d.stage === "lost")
      .reduce((sum, d) => sum + (d.amount || 0), 0),
  };

  const dealConversion = {
    prospectingToNegotiation:
      dealStages.Prospecting > 0
        ? ((dealStages.Negotiation / dealStages.Prospecting) * 100).toFixed(1)
        : 0,
    negotiationToProposal:
      dealStages.Negotiation > 0
        ? ((dealStages.Proposal / dealStages.Negotiation) * 100).toFixed(1)
        : 0,
    proposalToWon:
      dealStages.Proposal > 0
        ? ((dealStages.Won / dealStages.Proposal) * 100).toFixed(1)
        : 0,
    totalDealValue: Object.values(dealValues).reduce((a, b) => a + b, 0),
    winRate:
      dealStages.Won + dealStages.Lost > 0
        ? ((dealStages.Won / (dealStages.Won + dealStages.Lost)) * 100).toFixed(
            1,
          )
        : 0,
  };

  const PipelineStage = ({ stage, count, value, conversion, label }) => (
    <Card sx={{ position: "relative", overflow: "visible", mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {stage}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                {count}
              </Typography>
            </Box>
          </Grid>
          {value !== undefined && (
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Pipeline Value
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#2196f3" }}
                >
                  ₹{(value / 100000).toFixed(1)}L
                </Typography>
              </Box>
            </Grid>
          )}
          {conversion !== undefined && (
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color:
                      conversion > 50
                        ? "#4caf50"
                        : conversion > 25
                          ? "#ff9800"
                          : "#f44336",
                  }}
                >
                  {conversion}%
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        📊 Sales Pipeline & Funnel Analysis
      </Typography>

      {/* Lead Pipeline */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", mt: 4 }}>
        📈 Lead Pipeline Funnel
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <PipelineStage
            stage="🆕 New Leads"
            count={leadStages.New}
            conversion={100}
            label="Total"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PipelineStage
            stage="📞 Contacted"
            count={leadStages.Contacted}
            conversion={leadConversion.newToContacted}
            label="From New"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PipelineStage
            stage="✅ Qualified"
            count={leadStages.Qualified}
            conversion={leadConversion.contactedToQualified}
            label="From Contacted"
          />
        </Grid>
      </Grid>

      {/* Lead Conversion Metrics */}
      <Paper sx={{ p: 2, mb: 4, backgroundColor: "#f5f5f5" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Overall Qualification Rate
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#2196f3" }}
              >
                {leadConversion.overallConversion}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Total Leads
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {leadStages.New + leadStages.Contacted + leadStages.Qualified}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Deal Pipeline */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", mt: 4 }}>
        💰 Deal Pipeline Funnel
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={2.4}>
          <PipelineStage
            stage="🎯 Prospecting"
            count={dealStages.Prospecting}
            value={dealValues.Prospecting}
            conversion={100}
            label="Total"
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <PipelineStage
            stage="💬 Negotiation"
            count={dealStages.Negotiation}
            value={dealValues.Negotiation}
            conversion={dealConversion.prospectingToNegotiation}
            label="From Prosp."
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <PipelineStage
            stage="📑 Proposal"
            count={dealStages.Proposal}
            value={dealValues.Proposal}
            conversion={dealConversion.negotiationToProposal}
            label="From Neg."
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <PipelineStage
            stage="✨ Won"
            count={dealStages.Won}
            value={dealValues.Won}
            conversion={dealConversion.proposalToWon}
            label="From Prop."
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <PipelineStage
            stage="❌ Lost"
            count={dealStages.Lost}
            value={dealValues.Lost}
            conversion={
              dealStages.Lost > 0
                ? (
                    (dealStages.Lost /
                      (dealStages.Won + dealStages.Lost === 0
                        ? 1
                        : dealStages.Won + dealStages.Lost)) *
                    100
                  ).toFixed(1)
                : 0
            }
            label="Lost Rate"
          />
        </Grid>
      </Grid>

      {/* Deal Metrics Summary */}
      <Paper sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Total Pipeline Value
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#2196f3" }}
              >
                ₹{(dealConversion.totalDealValue / 10000000).toFixed(1)}Cr
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                (across all stages)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Win Rate
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: dealConversion.winRate > 50 ? "#4caf50" : "#ff9800",
                }}
              >
                {dealConversion.winRate}%
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                ({dealStages.Won} won, {dealStages.Lost} lost)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Average Deal Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                ₹
                {deals.length > 0
                  ? (
                      dealConversion.totalDealValue /
                      deals.length /
                      100000
                    ).toFixed(1)
                  : 0}
                L
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                (across {deals.length} deals)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Conversion to Close
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#2196f3" }}
              >
                {dealConversion.prospectingToNegotiation}%
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                (First stage)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Legend & Notes */}
      <Paper sx={{ p: 2, mt: 3, backgroundColor: "#fafafa" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
          ℹ️ Key Metrics Explained:
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
          • <strong>Conversion Rate:</strong> Percentage of deals/leads moving
          to next stage
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
          • <strong>Pipeline Value:</strong> Total amount of all deals in each
          stage
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
          • <strong>Win Rate:</strong> Percentage of deals won vs lost
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          • <strong>Average Deal Value:</strong> Mean value per deal
        </Typography>
      </Paper>
    </Box>
  );
}
