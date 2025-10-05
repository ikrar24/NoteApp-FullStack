import express from "express";


const Logout = ((req, res) => {
 
  try {
    
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,      
    sameSite: "None", 
    path: "/"          
  });

  return res.status(200).json({ message: "Logged out successfully" });


  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Somethings Went Wrong" , error });
    
  }


});

export default Logout;