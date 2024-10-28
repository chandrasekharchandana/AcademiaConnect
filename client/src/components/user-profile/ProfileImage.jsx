import React, { useState } from "react";
import "./UserProfile.css"; // Include updated CSS

function ProfileImage({ isOpen, onClose, currentImage, onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(currentImage || null);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  const handleSave = () => {
    onClose();
  };

  const handleRotateLeft = () => {
    setRotation((prevRotation) => prevRotation - 90);
  };

  const handleRotateRight = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleReset = () => {
    setSelectedImage(currentImage || null);
    setRotation(0);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Upload a New Avatar</h2>

        <div className="image-preview-container">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Avatar Preview"
              className="avatar-preview"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          ) : (
            <div className="placeholder-preview">No image selected</div>
          )}
        </div>

        <div className="edit-buttons">
          <button type="button" onClick={handleRotateLeft}>⟲</button>
          <button type="button" onClick={handleRotateRight}>⟳</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>

        <label className="choose-image">
          Choose Image
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        </label>

        <div className="button-container">
          <button type="button" className="save" onClick={handleSave}>Save</button>
          <button type="button" className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
