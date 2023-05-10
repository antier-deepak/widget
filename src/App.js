import "./App.css";
import { Box, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import CampaignCard from "./components/CampaignCard/CampaignCard";

function App(props) {
  // const { title, counterData } = props;
  const [show, setShow] = useState(true);
  const [campaigns, setCampaigns] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const getCollections = () => {
    setIsLoading(true);
    fetch("https://qa-api.stumpup.org/user/api/v1/users/campaign/list/2/1", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({}), // body data type must match "Content-Type" header
    })
      .then((res) => {
        return res?.json();
      })
      .then((data) => {
        setIsLoading(false);
        setCampaigns(data?.data?.rows);
      });
  };

  useEffect(() => {
    getCollections();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const buttonClickHandler = (campaign) => {
    setIsLoading(true);

    let data = {
      campaign_id: campaign?.id,
      amount: 1,
      coin: "matic",
    };

    fetch("https://qa-api.stumpup.org/user/api/v1/users/donation/donate", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwYmU4MDQ3LWY0M2UtNDM5My04YTI0LTViZWFmODY5MWY5OCIsInJvbGUiOiJmdW5kcmFpc2VyIiwiaWF0IjoxNjgzNjI5OTk5LCJleHAiOjE2ODM3MTYzOTl9.eUMEZXwQ5cdIKKNcKpwiJtZgVSk9DtXb7VpinIYJM4M",

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((res) => {
        return res?.json();
      })
      .then((data) => {
        if (data?.error) {
          setIsLoading(false);
          setDonationSuccess(true);
        }
      });
  };
  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Loading...
          </Typography>
        ) : donationSuccess ? (
          <div style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h2">
              Donation Successfull!
            </Typography>
            <Button onClick={() => setDonationSuccess(false)}>Back</Button>
          </div>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Campaigns
            </Typography>
            {campaigns?.length > 0 && (
              <Grid container spacing={2}>
                {campaigns?.map((item) => {
                  return (
                    <Grid item key={item?.id}>
                      <CampaignCard
                        data={item}
                        buttonClickHandler={() => buttonClickHandler(item)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
}

export default App;
