import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import { useAuth } from "../services/useAuth";
import { usePosts } from "../services/usePosts";

const PostPage = () => {
	const { postId } = useParams();
    const {authUser} = useAuth()
	const {post, postLoading: isLoading} = usePosts(postId)
    
	if (isLoading) return <div>Loading post...</div>;
	if (!post?.data) return <div>Post not found</div>;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-3'>
				<Post post={post.data} />
			</div>
		</div>
	);
};
export default PostPage;