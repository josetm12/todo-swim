const index = () => {
  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      ERROR 404
      <button onClick={goToHome}>Go to Home</button>
    </>
  );
};

export default index;
