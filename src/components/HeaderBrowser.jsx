import { useState } from "react";
import { useSelector } from "react-redux";
// `firebaseConfig` file does not exist — import `auth` from the actual firebase module
import { auth } from "../utils/firebase";
import { clearUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BrowseHeader = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = ()=>{
    auth.signOut();
    dispatch(clearUser());
    navigate("/");
  }

  return (
    <header className="absolute top-0 w-full z-50 bg-gradient-to-b from-black/80 px-12 py-4 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-8">
        {/* Netflix Logo */}
        <img
          className="w-28 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        {/* Menu items */}
        <nav className="flex items-center gap-6 text-white text-sm font-medium">
          <span className="cursor-pointer hover:text-gray-300">Home</span>
          <span className="cursor-pointer hover:text-gray-300">TV Shows</span>
          <span className="cursor-pointer hover:text-gray-300">Movies</span>
          <span className="cursor-pointer hover:text-gray-300">New & Popular</span>
          <span className="cursor-pointer hover:text-gray-300">My List</span>
          <span className="cursor-pointer hover:text-gray-300">Browse by Languages</span>
        </nav>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-8 text-white relative">

        {/* Search Icon */}
        <i className="fa-solid fa-magnifying-glass text-lg cursor-pointer"></i>

        {/* Profile Dropdown */}
        <div className="relative">
          
          <img
            onClick={() => setOpen(!open)}
            className="w-8 rounded cursor-pointer"
            src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
            alt="profile"
          />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 bg-black/90 text-white w-40 rounded shadow-lg p-3 text-sm">
              <div className="pb-2 border-b border-gray-700">
                {user?.displayName || "User"}
              </div>

              <ul className="mt-2">
                <li className="py-1 hover:text-gray-300 cursor-pointer">Manage Profiles</li>
                <li className="py-1 hover:text-gray-300 cursor-pointer">Account</li>
                <li className="py-1 hover:text-gray-300 cursor-pointer">Help Centre</li>
                <li className="py-1 hover:text-red-400 cursor-pointer" 
                onClick={handleSignOut}>Sign Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default BrowseHeader;
