import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostForm, Container } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../store/features/postSlice";
const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  useEffect(() => {
    if (slug) {
      dispatch(getPost(slug));
    } else {
      navigate("/");
    }
  }, [slug, navigate, dispatch]);
  return post ? (
    <div>
      <div className="py-8">
        <Container>
          <PostForm post={post} />
        </Container>
      </div>
    </div>
  ) : null;
};

export default EditPost;
