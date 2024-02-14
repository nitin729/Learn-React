import service from "../appwrite/config";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostForm, Container } from "../components/index";
const EditPost = () => {
  const [posts, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return posts ? (
    <div>
      <div className="py-8">
        <Container>
          <PostForm post={posts} />
        </Container>
      </div>
    </div>
  ) : null;
};

export default EditPost;
