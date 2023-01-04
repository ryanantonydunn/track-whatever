import { Container, Typography } from "@mui/material";
import React from "react";
import { Layout } from "../base/Layout";

export const Error404: React.FC = () => {
  return (
    <Layout title="Not Found">
      <Container maxWidth="sm">
        <Typography align="center" sx={{ p: 2 }}>
          Sorry, we cannot find what you're looking for, please go back and try
          again.
        </Typography>
      </Container>
    </Layout>
  );
};
