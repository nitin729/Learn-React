import { Container, Card } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { postsThunk } from "../store/features/postSlice";

const Home = () => {
  const posts = useSelector((state) => state.post.posts);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postsThunk());
  }, [dispatch]);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col justify-center items-center ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/2">
              <Card {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
