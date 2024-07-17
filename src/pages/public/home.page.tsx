export const HomePage = () => {
  const socket = new WebSocket("ws:localhost:3000");

  socket.onopen = (event) => {
    console.log(event);
    console.log("connected");
  };

  socket.onclose = (event) => {
    console.log(event);
    console.log("disconnected");
  };

  /*
  const handleClick = () => {
    console.log('click')
  }
  */
  return (
    <>
      <h1 className="text-3xl font-bold underline">Home </h1>
      {/* <button onClick={() => handleClick()}>Send Message</button> */}
    </>
  );
};

export default HomePage;
