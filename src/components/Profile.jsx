import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../services/firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FiEdit2, FiCamera } from "react-icons/fi";
import colors from "../constants/colors";

export default function ProfilePage() {
  const [user, setUser] = useState(auth.currentUser);
  const [profileData, setProfileData] = useState({ username: "", bio: "", location: "", photoURL: "" });
  const [editing, setEditing] = useState({ username: false, bio: false, location: false });
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [hoverPhoto, setHoverPhoto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData({ username: data.username || "", bio: data.bio || "", location: data.location || "", photoURL: data.photoURL || "" });
      }
    };
    fetchData();
  }, [user]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoadingPhoto(true);
    const storageRef = ref(storage, `profilePhotos/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateProfile(user, { photoURL: url });
    await setDoc(doc(db, "users", user.uid), { photoURL: url }, { merge: true });
    setProfileData({ ...profileData, photoURL: url });
    setLoadingPhoto(false);
  };

  const handleFieldSave = async (field) => {
    await setDoc(doc(db, "users", user.uid), { [field]: profileData[field] }, { merge: true });
    setEditing({ ...editing, [field]: false });
  };

  const handleChangePassword = async () => {
    const newPassword = prompt("Enter new password:");
    if (!newPassword) return;
    await updatePassword(user, newPassword);
    alert("Password updated!");
  };

  const inputStyle = { width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', backgroundColor: '#72717140', color: 'white', marginBottom: 10, outline: 'none' };
  const buttonStyle = { padding: 10, borderRadius: 8, border: 'none', backgroundColor: colors.Primary, color: 'white', cursor: 'pointer', fontWeight: 'bold' };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, background: colors.backgroundGradient, borderRadius: 16 }}>
      <h2 style={{ color: 'white', borderBottom: `2px solid ${colors.Primary}`, paddingBottom: 10 }}>Profile</h2>

      {/* Profile photo */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div
          style={{
            width: 150, height: 150, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.15)",
            display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden",
            cursor: "pointer", backgroundColor: "#72717140", position: "relative"
          }}
          onClick={() => document.getElementById("photoInput").click()}
          onMouseEnter={() => setHoverPhoto(true)}
          onMouseLeave={() => setHoverPhoto(false)}
        >
          {profileData.photoURL ? <img src={profileData.photoURL} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: "#ccc" }}>Click to add</span>}
          {hoverPhoto && <div style={{ position: "absolute", bottom: 5, right: 5, backgroundColor: "#000a", padding: 5, borderRadius: "50%", color: "white" }}><FiCamera size={20} /></div>}
        </div>
        <input type="file" id="photoInput" style={{ display: "none" }} onChange={handlePhotoUpload} />
        {loadingPhoto && <p>Uploading...</p>}
      </div>

      {/* Username */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold", color: 'white' }}>Username:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          {editing.username ? <>
            <input style={inputStyle} value={profileData.username} onChange={e => setProfileData({ ...profileData, username: e.target.value })} />
            <button style={buttonStyle} onClick={() => handleFieldSave("username")}>Save</button>
          </> : <>
            <span style={{ marginRight: 10, color: 'white' }}>{profileData.username || "Not set"}</span>
            <FiEdit2 style={{ cursor: "pointer", color: 'white' }} onClick={() => setEditing({ ...editing, username: true })} />
          </>}
        </div>
      </div>

      {/* Bio */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold", color: 'white' }}>Bio:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          {editing.bio ? <>
            <textarea style={inputStyle} value={profileData.bio} onChange={e => setProfileData({ ...profileData, bio: e.target.value })} />
            <button style={buttonStyle} onClick={() => handleFieldSave("bio")}>Save</button>
          </> : <>
            <span style={{ marginRight: 10, color: 'white' }}>{profileData.bio || "Not set"}</span>
            <FiEdit2 style={{ cursor: "pointer", color: 'white' }} onClick={() => setEditing({ ...editing, bio: true })} />
          </>}
        </div>
      </div>

      {/* Location */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold", color: 'white' }}>Location:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          {editing.location ? <>
            <input style={inputStyle} value={profileData.location} onChange={e => setProfileData({ ...profileData, location: e.target.value })} />
            <button style={buttonStyle} onClick={() => handleFieldSave("location")}>Save</button>
          </> : <>
            <span style={{ marginRight: 10, color: 'white' }}>{profileData.location || "Not set"}</span>
            <FiEdit2 style={{ cursor: "pointer", color: 'white' }} onClick={() => setEditing({ ...editing, location: true })} />
          </>}
        </div>
      </div>

      {/* Change Password */}
      <div style={{ marginTop: 20 }}>
        <button style={buttonStyle} onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
}
