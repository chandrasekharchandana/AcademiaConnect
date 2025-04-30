import React, { useEffect, useState, useContext } from "react";
import { Pie } from "react-chartjs-2";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import ProfileImage from './ProfileImage'; 
=======
import { useNavigate, Link } from "react-router-dom";
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"; // Import icons
import { userLoginContext } from "../../contexts/userLoginContext";
import md5 from 'md5'; 
import './UserProfile.css';
<<<<<<< HEAD
=======
import ProfileImage from "./ProfileImage";
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada

ChartJS.register(ArcElement, Tooltip, Legend);

function UserProfile() {
<<<<<<< HEAD
  const { logoutUser, userLoginStatus, currentUser } = useContext(userLoginContext); 
=======
  const { userLoginStatus, currentUser } = useContext(userLoginContext);
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [presentHours, setPresentHours] = useState(0);
  const [absentHours, setAbsentHours] = useState(0);
  const [holidayDays, setHolidayDays] = useState(0);
<<<<<<< HEAD
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // Changed to hold image URL

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };
=======
  const [currentPostIndex, setCurrentPostIndex] = useState(0); 
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada

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

<<<<<<< HEAD
  // Pie chart data
  const totalDaysInSemester = 30 * 4; 
=======
  const totalDaysInSemester = 30 * 4;
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
  const workingDays = totalDaysInSemester - holidayDays;
  const totalHours = Math.max(workingDays * 7, 1);
  const remainingDays = Math.max(totalDaysInSemester - (presentHours / 7) - (absentHours / 7) - holidayDays, 0);

  const presentPercentage = ((presentHours / totalHours) * 100).toFixed(2);
  const absentPercentage = ((absentHours / totalHours) * 100).toFixed(2);
  const remainingPercentage = 100 - (parseFloat(presentPercentage) + parseFloat(absentPercentage));

  const chartData = {
    labels: ["Present", "Absent", "Remaining"],
    datasets: [
      {
        label: "Attendance",
        data: [presentHours, absentHours, remainingDays], 
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

  const emailHash = md5(currentUser.email.trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

  if (!userLoginStatus || !currentUser) {
    return (
      <div className="auth-error-message">
        <h3>
          Please{" "}
          <a
            href="/auth"
            className="btn btn-lg active"
            role="button"
            aria-pressed="true"
          >
            Sign Up / Login
          </a>{" "}
          to continue
        </h3>
        <p>
          You need to create an account or log in to view your dashboard.
        </p>
      </div>
    )
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // Changed to hold image URL

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  return (
    <div className="profile-page">
        
      <div className="sidebar">
        <div className="profile-box">
<<<<<<< HEAD
          <img src={uploadedImage || "defaultProfileImage.jpg"} alt="Profile" className="profile-image" /> {/* Add a default image if no upload */}
          <h3>{currentUser?.name || "Chandra Sekhar"}</h3>
          <p>Web Developer</p>
          <button className="edit-profile" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
        </div>
=======
          <img src={gravatarUrl || uploadedImage}  alt="Profile" className="profile-image" />
          <h3>{currentUser.username}</h3>
          <p>{currentUser.rollnum}</p>
          <p>{currentUser.email}</p>
          <button className="edit-profile" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
                  </div>
        <br />
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
        <div className="quick-links">
          <h4 className="text-center bold">Quick Links</h4>
          <ul>
<<<<<<< HEAD
            <li><button onClick={() => document.getElementById("posts").scrollIntoView()}>My Posts</button></li>
            <li><button onClick={() => document.getElementById("events").scrollIntoView()}>Upcoming Events</button></li>
            <li><button onClick={() => document.getElementById("syllabus").scrollIntoView()}>Syllabus</button></li>
            <li><button onClick={() => document.getElementById("events").scrollIntoView()}>Events</button></li>
            <li><button onClick={() => document.getElementById("tracker").scrollIntoView()}>Attendance Tracker</button></li>
=======
            <li><Link to="/tutorials">Tutorials</Link></li>
            <li><Link to="/syllabus">Syllabus</Link></li>
            <li><Link to="/pyqs">Previous Year Questions (PYQs)</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/tracker">Tracker</Link></li>
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="combined-sections">
          <div className="events-section" id="events">
            <h2 className="events-header">Upcoming Events</h2>
            <div className="events-list">
              <div className="event-card1">
                <h3 className="event-title">{upcomingEvents[currentEventIndex].name}</h3>
                <p>{upcomingEvents[currentEventIndex].date}</p>
                <p>{upcomingEvents[currentEventIndex].description}</p>
              </div>
              <div className="navigation-arrows">
                <span className="arrow" onClick={handlePreviousEvent}>{"<"}</span>
                <span className="arrow" onClick={handleNextEvent}>{">"}</span>
              </div>
            </div>
          </div>
<<<<<<< HEAD

          <div className="posts-section" id="posts">
            <h2 className="posts-header">My Posts</h2>
            {userPosts.length > 0 && (
              <div className="post-card">
                <h3 className="post-title">{userPosts[currentPostIndex].title}</h3>
                <p className="post-date">{userPosts[currentPostIndex].date}</p>
                <p className="post-content">{userPosts[currentPostIndex].content}</p>
=======
          <div className="posts-section">
            <h2 className="events-header">User Posts</h2>
            <div className="posts-container">
              <div className="post-card">
                <h3 className="post-title">{userPosts[currentPostIndex].title}</h3>
                <p>{userPosts[currentPostIndex].date}</p>
                <p>{userPosts[currentPostIndex].content}</p>
              </div>
              <div className="navigation-arrows">
                <span className="arrow" onClick={handlePreviousPost}>{"<"}</span>
                <span className="arrow" onClick={handleNextPost}>{">"}</span>
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
              </div>
            )}
            <div className="scroll-buttons">
              <button className="scroll-button" onClick={handlePreviousPost}>Previous</button>
              <button className="scroll-button" onClick={handleNextPost}>Next</button>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="attendance-tracker" id="tracker">
          <h2 className="attendance-header">Attendance Tracker</h2>
          <div className="attendance-chart-container">
            <div className="attendance-chart">
              <Pie data={chartData} />
=======
        {/* Attendance Tracker */}
        <div className="attendance-section">
          <h3 className="text-center events-header">Your Attendance</h3>
          <div className="pie-chart-section">
            <div className="small-pie-chart">
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
            </div>
            <div className="legend-section">
              <div className="stat-item1">
                <FaCheckCircle color="#4caf50" size={20} /> {/* Present icon */}
                <span className="stat-label">Present:</span>
                <span className="stat-value">{presentPercentage}% ({presentHours / 7} days)</span>
              </div>
              <div className="stat-item1">
                <FaTimesCircle color="#f44336" size={20} /> {/* Absent icon */}
                <span className="stat-label"> Absent:</span>
                <span className="stat-value">{absentPercentage}% ({absentHours / 7} days)</span>
              </div>
<<<<<<< HEAD
              <div className="stat-item">
                <span className="legend-icon remaining-circle"></span>
                <p>Remaining: {Math.round((remainingHours / totalHours) * 100)}%</p>
=======
              <div className="stat-item1">
                <FaClock color="#ffc107" size={20} /> {/* Remaining icon */}
                <span className="stat-label"> Yet to Come:</span>
                <span className="stat-value">{remainingDays} days</span>
>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
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
<<<<<<< HEAD
=======

>>>>>>> 68c9771fccd09b836e1599687fc484382610eada
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
