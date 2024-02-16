import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { getPost, deletePosts } from "../store/features/postSlice";

export default function Post() {
  const post = useSelector((state) => state.post.post);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;
  const imagePreview =
    post && post.featuredimage
      ? service.getFilePreview(post.featuredimage)
      : "";

  useEffect(() => {
    if (slug) {
      dispatch(getPost(slug)); /* .then(() => navigate("/")) */
    } else {
      navigate("/");
    }
  }, [slug, navigate, dispatch]);

  const deletePost = () => {
    dispatch(deletePosts(post)).then(() => navigate("/"));
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img src={imagePreview} alt={post.title} className="rounded-xl" />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content || "")}</div>
      </Container>
    </div>
  ) : null;
}
