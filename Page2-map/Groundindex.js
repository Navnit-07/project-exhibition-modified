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
      room012: { details: "Room 012: Auditorium1<br>Features: Air Conditioned, Projector, Wi-Fi", hasTeachers: false },
      room004: { details: "Room 004: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
      room003: { details: "Room 003: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room005: { details: "Room 005: Electrical Panel Room", hasTeachers: false },
      room006: { details: "Room 006: Indian Bank", hasTeachers: false },
      room007: { details: "Room 007: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room008: { details: "Room 008: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room009A: { details: "Room 009A: Boy's Washroom", hasTeachers: false },
      room009B: { details: "Room 009B: Boy's Washroom", hasTeachers: false },
      room010: { details: "Room 010: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room011: { details: "Room 011: Dr Anant Kant Shukla's Cabin", hasTeachers: false },
      room020: { details: "Room 020: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room017: { details: "Room 017: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room018B: { details: "Room 018B: Boy's Washroom", hasTeachers: false },
      room018A: { details: "Room 018A: Girl's Washroom", hasTeachers: false },
      room016: { details: "Room 016: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room021: { details: "Room 021: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room002: { details: "Room 002: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room001: { details: "Room 001: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false},
      room025: { details: "Room 025: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room024: { details: "Room 024: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room023: { details: "Room 023: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      room022: { details: "Room 022: Teacher's Cabin<br>Features: Desks, Computers, Wi-Fi", hasTeachers: true },
      room015: { details: "Room 015: Classroom<br>Features: Desks, Computers, Wi-Fi", hasTeachers: false },
      roomWaiting: { details: "Waiting Area", hasTeachers: false },
      roomSankar1: { details: "Sankar Vishwanthan's Office", hasTeachers: false },
      roomG: { details: "G Vishwanthan's Office", hasTeachers: false },
      roomRamsai: { details: "Ramasai Balswami's Office", hasTeachers: false },
      roomStore: { details: "Store room3", hasTeachers: false },
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