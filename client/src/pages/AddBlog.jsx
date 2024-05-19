import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
function AddBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  async function handleSaveBlogToDB() {
    const res = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.currentItem._id}`,{
            title:formData.title,
            description:formData.description
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });
    const result = await res.data;
    console.log(result);
    if (result) {
      setIsEdit(false)
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }
  useEffect(() => {
    console.log(location);
    if (location.state) {
      setIsEdit(true);
      const { currentItem } = location.state;
      setFormData({
        title: currentItem.title,
        description: currentItem.description,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Your Blog :-" : "Add your new Blog here :-"}
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter the title"
            name="title"
            id="title"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            id="description"
            placeholder="Write your blog..."
            className="w-full p-2 border border-gray-300 rounded h-32"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="text-right">
          <button
            onClick={handleSaveBlogToDB}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEdit ? "Edit Blog" : "Add Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
