import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();
  /*  const [data, setData] = useState([]);
   useEffect(() => {
    fetch(`https://api.github.com/users/nitin729`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []); */
  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
      Github Followers: {data.followers}
      <div className="flex justify-center align-items-center">
        <img src={data.avatar_url} alt="Git picture" width={300} />
      </div>
    </div>
  );
}

export default Github;
