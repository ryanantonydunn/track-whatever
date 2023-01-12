import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Layout } from "../base/Layout";
import { Link } from "react-router-dom";

export const Error404: React.FC = () => {
  return (
    <Layout title="Not Found">
      <Container maxWidth="md">
        <Typography align="center" sx={{ p: 2 }}>
          Sorry, we cannot find what you're looking for.
        </Typography>
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            component={Link}
            to="/"
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};
