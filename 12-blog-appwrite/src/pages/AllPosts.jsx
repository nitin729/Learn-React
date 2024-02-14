import service from "../appwrite/config";
import { useState, useEffect } from "react";
import { Card, Container } from "../components/index";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  console.log(posts);
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
