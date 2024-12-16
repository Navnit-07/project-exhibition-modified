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
        room512: { details: "Room 512: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room504: { details: "Room 504: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room528: { details: "Room 528: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
        room502: { details: "Room 502: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room501: { details: "Room 501: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room532: { details: "Room 532: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room531: { details: "Room 531: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room530: { details: "Room 530: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room529: { details: "Room 529: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room527: { details: "Room 527: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room526: { details: "Room 526: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room525: { details: "Room 525: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room522: { details: "Room 522: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room521: { details: "Room 521: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room520: { details: "Room 520: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room519: { details: "Room 519: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room518: { details: "Room 518: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room517: { details: "Room 517: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room516: { details: "Room 516: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room515: { details: "Room 515: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room514: { details: "Room 514: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room513: { details: "Room 513: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room411: { details: "Room 411: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room510: { details: "Room 510: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room508: { details: "Room 508: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room507: { details: "Room 507: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room506: { details: "Room 506: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room505: { details: "Room 505: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room433: { details: "Room 433: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room434: { details: "Room 434: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
        room509A: { details: "Room 509A: Girl's Washroom", hasTeachers: false },
        room509B: { details: "Room 509B: Girl's Washroom", hasTeachers: false },
        room524: { details: "Room 524: Boy's Washroom", hasTeachers: false },
        
        
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