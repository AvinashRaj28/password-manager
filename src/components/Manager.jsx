import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Manager = () => {
  const [IsPasswordVisible, setIsPasswordVisible] = useState(false);
  const [website, setwebsite] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [savedData, setsavedData] = useState([]);
  const [editIndex, seteditIndex] = useState(null);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("passwordManagerData");
    if (storedData) {
      setsavedData(JSON.parse(storedData));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!IsPasswordVisible);
  };

  const copyText = (text) => {
    toast('📝 Text Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text);
  };

  const handleSave = () => {
    const newEntry = { website, username, password };
  
    let updatedData;
    
    if (editIndex !== null) {
      // Updating existing entry
      updatedData = [...savedData];
      updatedData[editIndex] = newEntry;
      seteditIndex(null);
    } else {
      // Adding a new entry
      updatedData = [...savedData, newEntry];
    }
  
    setsavedData(updatedData);
    
    // Save the updated data to localStorage after updating the state
    localStorage.setItem("passwordManagerData", JSON.stringify(updatedData));
  
    // Clearing inputs after saving
    setwebsite("");
    setusername("");
    setpassword("");
  };
  

  const handleEdit = (index) => {
    const entryToEdit = savedData[index];
    setwebsite(entryToEdit.website);
    setusername(entryToEdit.username);
    setpassword(entryToEdit.password);
    seteditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = savedData.filter((_, i) => i !== index);
    setsavedData(updatedData);
    
    // Using 'updatedData' directly for localStorage, not 'savedData'
    localStorage.setItem("passwordManagerData", JSON.stringify(updatedData));
  
    // Toast notification for successful deletion
    
  };
  
  

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
<div className="mycontainer mx-auto h-full max-w-7xl px-4"> {/* Max width for large screens and padding for smaller screens */}
  <div className="flex flex-col p-4">
    <h1 className="text-3xl sm:text-4xl font-bold text-center"> {/* Adjust font size */}
      <span className="text-green-500">&lt;</span>
      <span className="text-white">Pass</span>
      <span className="text-green-500">OP/&gt;</span>
    </h1>
    <p className="text-green-500 text-center text-base sm:text-lg mb-3">
      Your own password manager
    </p>

    <div className="flex flex-col gap-3 items-center w-full">
      <input
        value={website}
        onChange={(e) => setwebsite(e.target.value)}
        placeholder="Enter website URL"
        className="rounded-full border border-green-600 p-3 py-1 w-full"
        type="text"
      />
      <div className="flex flex-col sm:flex-row gap-4 w-full"> {/* Stack on small screens, row on larger */}
        <input
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Enter Username"
          className="rounded-full border border-green-600 w-full p-3 py-1"
          type="text"
        />
        <div className="relative w-full">
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter Password"
            className="rounded-full border border-green-600 w-full p-3 pr-10 py-1"
            type={IsPasswordVisible ? "text" : "password"}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg cursor-pointer"
          >
            {IsPasswordVisible ? <IoMdEye /> : <IoIosEyeOff />}
          </span>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full px-6 sm:px-8 py-2 w-full sm:w-auto font-semibold gap-2"
      >
        <lord-icon
          src="https://cdn.lordicon.com/jgnvfzqg.json"
          trigger="hover"
        ></lord-icon>
        Add Password
      </button>
    </div>

    <div className="passwords text-white">
      <h2 className="font-bold text-xl sm:text-2xl py-4">Your Passwords</h2>
      {savedData.length === 0 && <div>No passwords to show</div>}
      {savedData.length !== 0 && (
        <table className="table-auto w-full rounded-md overflow-hidden text-sm sm:text-base"> {/* Adjust font-size for better readability on smaller screens */}
          <thead className="bg-green-700">
            <tr>
              <th className="py-2">Site</th>
              <th className="py-2">Username</th>
              <th className="py-2">Password</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-slate-800">
            {savedData.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="py-2">
                    <div className="flex items-center justify-center">
                      <a href={item.website} target="_blank">
                        {item.website}
                      </a>
                      <div
                        className="size-7 cursor-pointer pl-3 flex text-center justify-center relative top-1"
                        onClick={() => copyText(item.website)}
                      >
                        <FaCopy />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="flex items-center justify-center">
                      {item.username}
                      <div
                        className="size-7 cursor-pointer pl-3 flex text-center justify-center relative top-1"
                        onClick={() => copyText(item.username)}
                      >
                        <FaCopy />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-center">
                    <div className="flex items-center justify-center">
                      {item.password}
                      <div
                        className="size-7 cursor-pointer pl-3 flex text-center justify-center relative top-1"
                        onClick={() => copyText(item.password)}
                      >
                        <FaCopy />
                      </div>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="invert flex justify-evenly">
                      <span
                        className="invert text-xl cursor-pointer pl-3 flex text-center justify-center relative top-0.5"
                        onClick={() => handleEdit(index)}
                      >
                        <FaEdit />
                      </span>
                      <div
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          cursor="pointer"
                          style={{ width: "23px", height: "23px" }}
                        ></lord-icon>
                      </div>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  </div>
</div>

    </div>
  );
};

export default Manager;
