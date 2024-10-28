import React, { useEffect, useState, useContext } from "react";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import ProfileImage from './ProfileImage'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { userLoginContext } from "../../contexts/userLoginContext";
import './UserProfile.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function UserProfile() {
  const { logoutUser, userLoginStatus, currentUser } = useContext(userLoginContext); 
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [presentHours, setPresentHours] = useState(0);
  const [absentHours, setAbsentHours] = useState(0);
  const [holidayDays, setHolidayDays] = useState(0);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // Changed to hold image URL

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const upcomingEvents = [
    { name: "AR/VR Hackathon", date: "November 29, 2024", location: "Online", description: "Join us for an immersive AR/VR experience!" },
    { name: "Hackathon 2024", date: "November 20, 2024", location: "Campus", description: "Compete for exciting prizes and learn from experts." },
    { name: "End of Semester Fest", date: "December 20, 2024", location: "Auditorium", description: "Celebrate the end of the semester with fun activities." }
  ];

  const userPosts = [
    { title: "Exploring the Future of AI", date: "October 1, 2024", content: "A deep dive into the advancements in artificial intelligence." },
    { title: "Understanding Virtual Reality", date: "October 10, 2024", content: "Exploring the possibilities of VR technology." },
    { title: "Tips for Successful Hackathons", date: "October 15, 2024", content: "Best practices for participating in hackathons." }
  ];

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const rollnum = currentUser?.rollnum;

        if (!token || !rollnum) return;

        const response = await fetch(`http://localhost:4000/user-api/attendance/${rollnum}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          let presentCount = 0;
          let absentCount = 0;
          let holidayCount = 0;

          if (data.attendance) {
            data.attendance.forEach(item => {
              if (item.status === 'present') presentCount += 7;
              if (item.status === 'absent') absentCount += 7;
              if (item.status === 'holiday') holidayCount += 1;
            });
          }

          setPresentHours(presentCount);
          setAbsentHours(absentCount);
          setHolidayDays(holidayCount);
        } else {
          console.error("Failed to fetch attendance data");
        }
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };

    if (currentUser) fetchAttendanceData();
  }, [currentUser]);

  // Pie chart data
  const totalDaysInSemester = 30 * 4; 
  const workingDays = totalDaysInSemester - holidayDays;
  const totalHours = Math.max(workingDays * 7, 1);
  const remainingHours = Math.max(0.75 * totalHours - presentHours, 0);

  const chartData = {
    labels: ["Present", "Absent", "Remaining"],
    datasets: [
      {
        label: "Attendance",
        data: [presentHours, absentHours, remainingHours],
        backgroundColor: ["#4caf50", "#f44336", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  const handleNextPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % userPosts.length);
  };

  const handlePreviousPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex - 1 + userPosts.length) % userPosts.length);
  };

  const handleNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % upcomingEvents.length);
  };

  const handlePreviousEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="profile-box">
          <img src={uploadedImage || "defaultProfileImage.jpg"} alt="Profile" className="profile-image" /> {/* Add a default image if no upload */}
          <h3>{currentUser?.name || "Chandra Sekhar"}</h3>
          <p>Web Developer</p>
          <button className="edit-profile" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
        </div>
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><button onClick={() => document.getElementById("posts").scrollIntoView()}>My Posts</button></li>
            <li><button onClick={() => document.getElementById("events").scrollIntoView()}>Upcoming Events</button></li>
            <li><button onClick={() => document.getElementById("syllabus").scrollIntoView()}>Syllabus</button></li>
            <li><button onClick={() => document.getElementById("events").scrollIntoView()}>Events</button></li>
            <li><button onClick={() => document.getElementById("tracker").scrollIntoView()}>Attendance Tracker</button></li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="combined-sections">
          <div className="events-section" id="events">
            <h2 className="events-header">Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.length > 0 && (
                <div className="event-card">
                  <h3 className="event-title">{upcomingEvents[currentEventIndex].name}</h3>
                  <p className="event-date">Date: {upcomingEvents[currentEventIndex].date}</p>
                  <p className="event-location">Location: {upcomingEvents[currentEventIndex].location}</p>
                  <p className="event-description">{upcomingEvents[currentEventIndex].description}</p>
                </div>
              )}
              <div className="scroll-buttons">
                <button className="scroll-button" onClick={handlePreviousEvent}>Previous</button>
                <button className="scroll-button" onClick={handleNextEvent}>Next</button>
              </div>
            </div>
          </div>

          <div className="posts-section" id="posts">
            <h2 className="posts-header">My Posts</h2>
            {userPosts.length > 0 && (
              <div className="post-card">
                <h3 className="post-title">{userPosts[currentPostIndex].title}</h3>
                <p className="post-date">{userPosts[currentPostIndex].date}</p>
                <p className="post-content">{userPosts[currentPostIndex].content}</p>
              </div>
            )}
            <div className="scroll-buttons">
              <button className="scroll-button" onClick={handlePreviousPost}>Previous</button>
              <button className="scroll-button" onClick={handleNextPost}>Next</button>
            </div>
          </div>
        </div>

        <div className="attendance-tracker" id="tracker">
          <h2 className="attendance-header">Attendance Tracker</h2>
          <div className="attendance-chart-container">
            <div className="attendance-chart">
              <Pie data={chartData} />
            </div>
            <div className="legend-section">
              <div className="stat-item">
                <span className="legend-icon present-circle"></span>
                <p>Present: {Math.round((presentHours / totalHours) * 100)}%</p>
              </div>
              <div className="stat-item">
                <span className="legend-icon absent-circle"></span>
                <p>Absent: {Math.round((absentHours / totalHours) * 100)}%</p>
              </div>
              <div className="stat-item">
                <span className="legend-icon remaining-circle"></span>
                <p>Remaining: {Math.round((remainingHours / totalHours) * 100)}%</p>
              </div>
            </div>
          </div>
          <div className="attendance-summary">
            <p>Total Present Hours: {presentHours}</p>
            <p>Total Absent Hours: {absentHours}</p>
            <p>Holidays: {holidayDays}</p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProfileImage
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentImage={uploadedImage}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}

export default UserProfile;
