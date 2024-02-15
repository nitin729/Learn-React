import { useEffect } from "react";
import { Card, Container } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { postsThunk } from "../store/features/postSlice";

const AllPosts = () => {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postsThunk());
  }, [dispatch]);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div key={post.$id} className="p-2 w-1/4">
                <Card {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
