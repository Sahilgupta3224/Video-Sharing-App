import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const[videos,setVideos] = React.useState([]);

/*React.useEffect(() => {
  fetch('http://localhost:3000/api/videos/random')
    .then(res=>res.json())
    .then(data=>console.log(data))

}, []);*/

/*React.useEffect(() => {
  const fetchVideos = async () => {
    const res = await axios.get(`http://localhost:3000/api/videos/${type}`);
    setVideos(res.data);
  };
  fetchVideos();
}, [type]);*/

React.useEffect(() => {
  const fetchVideos = async () => {
    try {
      //const YOUR_AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJlZTIwZmUyZjAwY2I2NmM3M2EwOWEiLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjkwNzA5MjMyfQ.EhBqmzEOiCvM3j69J_cudRYOz6T69znMQDazQzf_zFo";
      //const YOUR_AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjVjMzY4MDQ5YzI4NzRjOTZiY2QwZTUiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNjMyNDg2NzAwLCJleHAiOjE2MzI0OTMyMDB9.-5hQ9FJJ-GILV2hxBr_rY0WJJmk5qL8ghxE39Qa4wM4"
      const YOUR_AUTH_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJlZTIwZmUyZjAwY2I2NmM3M2EwOWEiLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjkwNzEwNzk3fQ.sCcyLdSp92fuw1JFn_n6WK3BvfW1jLYOk6pFpZrvGNk"
      const res = await axios.get(`/videos/${type}`, {
        headers: {
          Authorization: `Bearer ${YOUR_AUTH_TOKEN}`,
        },
      });
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      console.log("nhi ho rha bhai")
      console.log(error)
    }
  };
  fetchVideos();
}, [type]);

  return (
    <Container>
      {videos.map((video)=>(<Card />))}
    </Container>
  );
};

export default Home;
