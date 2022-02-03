const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, createSong } = require("../queries/songs.js");
const { checkName, checkFavorite } = require("../validations/checkSongs.js")

// INDEX
songs.get("/", async (req, res) => {
  try{
    const allSongs = await getAllSongs();
    if (allSongs[0]) {
      res.status(200).json(allSongs);
    } else {
      res.status(500).json({ error: "server error" });
    } 
  }catch(err){
    console.log(err);
  } 
});

// SHOW
songs.get("/:id", async (req, res)=>{
  const { id } = req.params;
  try{
    const song = await getSong(id);
    if(song.id){
      res.status(200).json(song);
    } else {
      res.status(500).json({error: "Song not found"});
    }
  }catch(err){
    console.log(err);
  }
});

songs.post("/", checkName, checkFavorite, async (req, res)=>{
  const { body } = req;
  try{
    const createdSong = await createSong(body);
    if(createdSong.id){
      res.status(200).json(createdSong);
    } else {
      res.status(500).json({error: "Song creation error"});
    }
  } catch(err){
    console.log(err);
  }
})

module.exports = songs;