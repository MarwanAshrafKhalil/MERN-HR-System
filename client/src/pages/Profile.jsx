import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../firebase";
import {
  deleteEmployee,
  updateEmployee,
} from "../redux/features/employee/employee.actions";
import { current } from "@reduxjs/toolkit";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const { currentEmployee, isLoading, error } = useSelector(
    (state) => state.employee
  );
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const checkError = () => {
    setErrorMsg(error);
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setUpdateSuccess(false);
    e.preventDefault();
    const employeeID = currentEmployee._id;
    try {
      const success = await dispatch(updateEmployee({ formData, employeeID }));

      if (success) {
        setUpdateSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteEmployee());
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSignOut = async () => {
  //   try {
  //     dispatch(openLoader());
  //     await fetch("/api/auth/signout");
  //     dispatch(signoutEmployee());
  //   } catch (error) {
  //     dispatch(loaderError());
  //   }
  // };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentEmployee.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentEmployee.username}
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="text"
          defaultValue={currentEmployee.email}
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span onClick={handleDelete} className=" text-red-700 cursor-pointer">
          Delete Account
        </span>
        {/* <span onClick={handleSignOut} className=" text-red-700 cursor-pointer">
          Sign out
        </span> */}
      </div>
      <div className=" mt-4 slef-center text-center ">
        <p className="text-red-700 ">{error && "Something went wrong!"}</p>
        <p className="text-green-700 ">
          {updateSuccess && "User is updated successfully!"}
        </p>
      </div>
    </div>
  );
}
