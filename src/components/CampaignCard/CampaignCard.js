import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./CampaignCard.css";

const CampaignCard = ({ data, buttonClickHandler }) => {
  return (
    <Card sx={{ minWidth: 275 }} className="campaignCard">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data?.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data?.collectionName}
        </Typography>
        <Typography variant="body2">{data?.description}</Typography>
      </CardContent>

      <Button size="small" onClick={buttonClickHandler}>
        Donate
      </Button>
    </Card>
  );
};

export default CampaignCard;
