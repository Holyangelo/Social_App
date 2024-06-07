import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Share = () => {

  /* Create useState for File */
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const {currentUser} = useContext(AuthContext);

  /* Upload method */
  const upload = async() => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await makeRequest.post("/upload/storage", formData);
      return response.data.clientPath;
    } catch (error) {
      console.log(error);
    }
  }

  // Access the client
  const queryClient = useQueryClient();

  //Request Mutation
  const fetchPost = async (newPost) => {
    const response = await makeRequest.post("/post", newPost);
    return response;  
  }

  // Mutations
  const mutation = useMutation({
    mutationFn: fetchPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  });

  const handleClick = async(e) => {
    e.preventDefault();
    let imgUrl = ``;
    if(file) imgUrl = await upload();
    mutation.mutate({description, img: imgUrl });
    setDescription("");
    setFile(null);
  }
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={currentUser.profilePicture}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`}  value={description}
          onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="right">
          {file && <img className="file" src={URL.createObjectURL(file)} alt="" />}
        </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" name="file" style={{display:"none"}} onChange={e => setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
