document.addEventListener("DOMContentLoaded", () => {
    const svgObject = document.getElementById("floor-map");
  
    svgObject.addEventListener("load", () => {
      const svgDoc = svgObject.contentDocument; 
      const rooms = svgDoc.querySelectorAll("[id^='room']") 
  
      const roomDetails = document.getElementById("room-details");
      const detailsContent = document.getElementById("details-content");
      const closeDetails = document.getElementById("close-details");
      const teacherLink = document.getElementById("teacher-link");
      const teacherDetails = document.getElementById("teacher-details");
  
      const roomData = {
        room205: { details: "Room 205: Vityarthi Learning Studio", hasTeachers: false },
        room203: { details: "Room 203: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room202A: { details: "Room 202A: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room202B: { details: "Room 202B: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room231: { details: "Room 231: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room206: { details: "Room 005: English Studio", hasTeachers: false },
        room209: { details: "Room 209: Recording Studio", hasTeachers: false },
        room230: { details: "Room 230: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room229: { details: "Room 229: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room208A: { details: "Room 208A: Boy's Washroom", hasTeachers: false },
        room208B: { details: "Room 208B: Boy's Washroom", hasTeachers: false },
        room228: { details: "Room 228: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room221: { details: "Room 221: MPCST Project Lab", hasTeachers: false },
        room226: { details: "Room 226: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room225: { details: "Room 225: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room018B: { details: "Room 018B: Boy's Washroom", hasTeachers: false },
        room223: { details: "Room 223: Girl's Washroom", hasTeachers: false },
        room224: { details: "Room 224: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room222: { details: "Room 222: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room220: { details: "Room 220: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room219: { details: "Room 219: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false},
        room218: { details: "Room 218: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room217: { details: "Room 217: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room216: { details: "Room 216: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room227: { details: "Room 227: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room215: { details: "Room 215: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room214: { details: "Room 214: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room213: { details: "Room 213: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room212: { details: "Room 212: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room210: { details: "Room 210: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room207: { details: "Room 207: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room204: { details: "Room 204: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room201: { details: "Studio1", hasTeachers: false },
        room214: { details: "Electrical Studio ", hasTeachers: false },
        room211: { details: "IT Service", hasTeachers: false },
        
      };
      let activeRoom = null; // Store the currently active room
      let activeRoomId = null; // Store the currently active room ID
  
      rooms.forEach((room) => {
        room.addEventListener("click", (e) => {
          const roomId = e.target.id;
  
          // Reset active room styling
          if (activeRoom) {
            activeRoom.classList.remove("active");
          }
  
          if (roomData[roomId]) {
            const roomInfo = roomData[roomId];
            detailsContent.innerHTML = roomInfo.details;
            roomDetails.classList.remove("hidden");
  
            // Show or hide "View Teacher Details" button based on room data
            if (roomInfo.hasTeachers) {
              teacherLink.style.display = "block";
              activeRoomId = roomId; // Store the active room ID
            } else {
              teacherLink.style.display = "none";
              activeRoomId = null;
            }
  
            // Mark the clicked room as active
            activeRoom = e.target;
            activeRoom.classList.add("active");
          }
        });
      });
  
      // Close button functionality
      closeDetails.addEventListener("click", () => {
        if (activeRoom) {
          activeRoom.classList.remove("active");
          activeRoom = null;
        }
        roomDetails.classList.add("hidden");
        teacherDetails.innerHTML = ""; // Clear teacher details
      });
  
      // Fetch teacher details for the active room when the link is clicked
      teacherLink.addEventListener("click", async () => {
        if (!activeRoomId) return;
  
        teacherDetails.innerHTML = "Loading teacher details...";
  
        try {
          // Construct the file path dynamically based on the room ID
          const filePath = `${activeRoomId}.xlsx`; // Example: "room001.xlsx"
  
          // Fetch the Excel file for the active room
          const response = await fetch(filePath);
          if (!response.ok) throw new Error("Failed to fetch the Excel file.");
  
          const data = await response.arrayBuffer();
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
  
          // Display teacher data
          let teacherHTML = "<ul>";
          jsonData.forEach((teacher) => {
            teacherHTML += `<li><strong>${teacher.Name}</strong><br>Cabin No.: ${teacher.Cabin}<br>Mobile No.: ${teacher.MobileNo}</li><hr>`;
          });
          teacherHTML += "</ul>";
  
          teacherDetails.innerHTML = teacherHTML;
        } catch (error) {
          teacherDetails.innerHTML = `<p>Error loading teacher details: ${error.message}</p>`;
        }
      });
    });
  });