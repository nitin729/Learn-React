import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, editPost, getPost } from "../../store/features/postSlice";

const PostForm = ({ post }) => {
  //  const post = useSelector((state) => state.post.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const postId = useSelector((state) => state.post.postId);
  const { register, reset, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: useMemo(() => {
        console.log(post);
        return {
          title: post?.title || "",
          slug: post?.$id || "",
          content: post?.content || "",
          status: post?.status || "active",
          featuredimage: post?.featuredimage || null,
        };
      }, [post]),
    });
  const imagePreview =
    post && post.featuredimage
      ? service.getFilePreview(post.featuredimage)
      : "";
  console.log(post);
  const submit = (data) => {
    if (post) {
      dispatch(editPost({ data, post })).then(() =>
        navigate(`/post/${post.$id}`)
      );
    } else {
      dispatch(addPosts(data)).then(() => {
        if (postId) {
          navigate(`/post/${postId}`);
        }
      });
    }
    //  navigate(`/`); /* .then((dat) => {
    /*   if (postId) {
          console.log(postId);
          navigate(`/post/${postId}`);
        }
      });  */
    // console.log(
    //   dispatch(addPosts(data)).then((dat) => {
    //     console.log(dat);
    //     if (postId) {
    //       console.log(postId);
    //       navigate(`/post/${postId}`);
    //     }
    //   })
    // );
    /* try {
      if (post) {
        const file = (await data.image[0])
          ? service.uploadFile(data.image[0])
          : null;
        if (file) {
          service.deleteFile(post.featuredimage);
        }
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredimage: file ? file.id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await service.uploadFile(data.image[0]);

        console.log(file);
        if (file) {
          const fileId = file.$id;
          console.log(fileId);

          data.featuredimage = fileId;
          const dbPost = await service.createPost({
            ...data,
            userid: userData.$id,
          });
          
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.log(error);
    } */
  };
  useEffect(() => {
    dispatch(getPost(slug));
  }, [slug, dispatch]);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {})}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={imagePreview} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
