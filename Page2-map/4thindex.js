document.addEventListener("DOMContentLoaded", () => {
    const svgObject = document.getElementById("floor-map");
  
    svgObject.addEventListener("load", () => {
      const svgDoc = svgObject.contentDocument; 
      const rooms = svgDoc.querySelectorAll("[id^='room']"); 
  
      const roomDetails = document.getElementById("room-details");
      const detailsContent = document.getElementById("details-content");
      const closeDetails = document.getElementById("close-details");
      const teacherLink = document.getElementById("teacher-link");
      const teacherDetails = document.getElementById("teacher-details");
  
      const roomData = {
        room432: { details: "Room 432: EDM Lab", hasTeachers: false },
        room404: { details: "Room 404: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room428: { details: "Room 428: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room412: { details: "Room 412: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room403: { details: "Room 403: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room402: { details: "Room 402: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room401: { details: "Room 401: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room431: { details: "Room 431: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room430: { details: "Room 430: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room429: { details: "Room 429: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room427: { details: "Room 427: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room426: { details: "Room 426: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room425: { details: "Room 425: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room422: { details: "Room 422: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room421: { details: "Room 421: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room420: { details: "Room 420: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room419: { details: "Room 419: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room418: { details: "Room 418: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room417: { details: "Room 417: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room416: { details: "Room 416: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room415: { details: "Room 415: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room414: { details: "Room 414: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room413: { details: "Room 413: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room411: { details: "Room 411: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room410: { details: "Room 410: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room408: { details: "Room 408: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room407: { details: "Room 407: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room406: { details: "Room 406: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room405: { details: "Room 405: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room433: { details: "Room 433: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room434: { details: "Room 434: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room409A: { details: "Room 409A: Boy's Washroom", hasTeachers: false },
        room409B: { details: "Room 409B: Boy's Washroom", hasTeachers: false },
        room423: { details: "Room 423: Girl's Washroom", hasTeachers: false },
        room424: { details: "Room 424: Girl's Washroom", hasTeachers: false },
        
        
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