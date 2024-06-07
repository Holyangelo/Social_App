import {  useQuery,} from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get("/post").then(
        (response) => {
          return response.data.results;
        }
      ).catch((error) => {
        console.log(error);
      }),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return <div className="posts">
    {
      error 
      ? "something went wrong!"
      :isPending 
      ? "Loading" 
      : data.map(post => (
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
