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

React.useEffect(() => {
  const fetchVideos = async () => {
    const res = await axios.get(`/videos/${type}`);
    setVideos(res.data);
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
