import express from "express";


const Logout = ((req, res) => {
  // Cookie clear karte waqt same options use karo jo login me diye the
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,       // production me true
    sameSite: "None",   // frontend cross-origin ke liye
    path: "/"           // default path
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default Logout;