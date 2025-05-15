# School of Computing

## CSC1049 Year 3 Project Proposal Form

### SECTION A

**Project Title:** DCU Parking Availability App

**Student 1:**  
Name: Abul Hasan Sheik Madhar Ali  
ID Number: 22390436

**Student 2:**  
Name: Samuel Murphy  
ID Number: 22425664

**Staff Member Consulted:** Graham Healy

---

### Description:

The DCU Parking Availability App is designed to improve parking on campus by providing real-time data on available parking spaces.

There will be two versions of the app:

**Student Version:**  
This version will allow students, staff, and visitors to log in, check real-time parking availability, and register their vehicle by selecting the space they are parked in and entering their car registration number. When they leave, they will log their departure, updating the system in real-time. They will be able to create tickets which will be sent to the management version.

**Management Version:**  
This version will be for campus management and staff. This would be accessible with admin login details. It will allow them to monitor parking availability, review parking trends, and manage administrative tasks, such as reviewing reports, adjusting settings, and sending notifications. This would also allow them to easily find illegally parked cars.

Because this is a computer science project, we will develop the app in **phases** to minimize risk. The initial phase will focus on the core elements of the app development. To simplify the project and lower risk early on, we will use placeholder still images of car parks instead of live camera feeds. These static images will allow us to build and test the app’s functionalities, such as the user interface, database, and real-time interaction.

If time permits, we will implement the camera-based system using machine learning to analyze live video feeds from the parking areas. However, this will be a stretch goal based on the timeline available.

Eventually, if DCU Estates would like to implement this system, cameras will be installed in all the car parks in the Glasnevin campus. The system could potentially be expanded to other areas, including St. Patrick’s and All Hallows campuses. The app will use machine learning and computer vision to analyze camera feeds and determine if parking spaces are free or occupied.

---

### Division of Work:

We will both work together to implement machine learning and computer vision models. We will collaborate on the creation of the SQL database. The implementation of the frontend and backend will be split among ourselves, with Abul focusing more on the frontend and Sam on the backend. This may change as we progress through the project and discover the workload involved and our strengths in certain areas.

---

### Programming Languages:

- Backend: Python (Django)  
- Frontend: JavaScript (React) / HTML / CSS  
- Database: SQL  
- TensorFlow / PyTorch  
- OpenCv

---

### Programming Tools:

Backend development will use Django for REST API development. The frontend will be built using React, and machine learning models (if implemented) will be developed using TensorFlow or PyTorch. The database will be managed using SQL, and Docker will be used to containerize the application for deployment. GitLab will be used for version control, and AWS or Google Cloud will be used for cloud hosting and scaling.

---

### Learning Challenges:

We will need to learn how to implement machine learning and computer vision models for analyzing camera feeds (if time allows). Initially, placeholder still images will be used to simplify the parking space detection process. Later, these can be replaced with live camera feeds. Other learning challenges include creating distinct versions of the app for different user roles (students and management) and using Docker for containerization and cloud deployment. This will be a new challenge, combining all aspects of our course into building this one system.

---

### Hardware/Software Platform:

Standard PCs will be used for development, and mobile devices will be used for testing. Backend development will be done on Windows/Linux systems, and cloud platforms such as AWS or Google Cloud will be used for deployment.

---

### Special Hardware/Software Requirements:

In the later stages of the project, cameras may be installed in various campus parking locations to monitor parking availability. However, during the initial development phases, placeholder still images of car parks will be used to reduce complexity. If the full camera-based system is implemented, coordination with DCU Facilities will be required for camera installation and integration into the app.
