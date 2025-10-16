// src/pages/Profile.js

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  TextField,
  Avatar,
} from "@mui/material";
import axios from "axios";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += "00" + value.toString(16).slice(-2);
  }

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name || "U"),
      width: 90,
      height: 90,
      fontSize: 32,
      fontWeight: "bold",
    },
    children: name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "U",
  };
};

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

  const [flats, setFlats] = useState([]);
  const [tab, setTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // Fetch logged-in user profile
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch landlord flats
  useEffect(() => {
    if (user.role === "landlord" && user.id) {
      axios
        .get("http://localhost:5000/myflats", { withCredentials: true })
        .then((res) => setFlats(res.data.flats))
        .catch((err) => console.log(err));
    }
  }, [user.role, user.id]);

  const handleTabChange = (e, newValue) => setTab(newValue);
  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    axios
      .put(
        "http://localhost:5000/userinfo/edit",
        {
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        { withCredentials: true }
      )
      .then(() => alert("Profile updated!"))
      .catch((err) => console.log(err));
    setEditMode(false);
  };

  // ------------------- Delete Account -------------------
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      axios
        .delete("http://localhost:5000/delete_account", { withCredentials: true })
        .then((res) => {
          alert(res.data.message);
          window.location.href = "/"; // Redirect to home after deletion
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete account");
        });
    }
  };

  return (
    <Card sx={{ maxWidth: 900, margin: "40px auto", borderRadius: 3, boxShadow: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6829ad, #a463f2)",
          color: "#fff",
          p: 3,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar {...stringAvatar(user.username)} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {user.username || "Your Name"}
            </Typography>
            <Typography sx={{ fontSize: 16, mt: 0.5 }}>{user.role}</Typography>
          </Box>
        </Box>

        {user.role !== "Admin" && (
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={() => setEditMode(!editMode)}
              sx={{
                backgroundColor: "#fff",
                color: "#6829ad",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#f3f3f3" },
              }}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteAccount}
              sx={{
                backgroundColor: "red",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#a30000" },
              }}
            >
              Delete Account
            </Button>
          </Box>
        )}
      </Box>

      {/* Tabs */}
      {!editMode && (
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root.Mui-selected": {
              color: "#6829ad",
              fontWeight: "bold",
              borderBottom: "2px solid #6829ad",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
            },
          }}
        >
          <Tab label="About" />
          {user.role === "landlord" && <Tab label="My Flats" />}
        </Tabs>
      )}

      <CardContent sx={{ p: 3 }}>
        {/* Edit Mode */}
        {editMode ? (
          <Box component="form" sx={{ display: "grid", gap: 2 }}>
            <TextField label="Full Name" name="username" value={user.username} onChange={handleChange} />
            <TextField label="Email" name="email" value={user.email} onChange={handleChange} />
            <TextField label="Address" name="address" value={user.address} onChange={handleChange} />
            <TextField label="Phone Number" name="phone" value={user.phone} onChange={handleChange} />

            <Button
              variant="contained"
              sx={{ backgroundColor: "#6829ad", "&:hover": { backgroundColor: "#501f82" } }}
              onClick={handleUpdate}
            >
              Update Profile
            </Button>
          </Box>
        ) : (
          <>
            {/* About Tab */}
            {tab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  Profile Information
                </Typography>
                <Typography><b>Email:</b> {user.email || "Not provided"}</Typography>
                <Typography><b>Phone:</b> {user.phone || "Not provided"}</Typography>
                <Typography><b>Address:</b> {user.address || "Not provided"}</Typography>
              </Box>
            )}

            {/* My Flats Tab */}
            {tab === 1 && user.role === "landlord" && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  My Flats
                </Typography>
                {flats.length === 0 ? (
                  <Typography>No flats listed yet.</Typography>
                ) : (
                  flats.map((flat) => (
                    <Card key={flat.id} sx={{ my: 1, p: 2, borderRadius: 2, boxShadow: 2 }}>
                      <Typography><b>Title:</b> {flat.name}</Typography>
                      <Typography><b>Rent:</b> ₹{flat.rent}</Typography>
                      <Typography><b>Location:</b> {flat.address}</Typography>
                    </Card>
                  ))
                )}
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
