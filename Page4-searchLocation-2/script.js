document.getElementById('submit-button').addEventListener('click', async () => {
  const startLocation = document.getElementById('start-location').value;
  const destination = document.getElementById('destination').value;

  if (!startLocation || !destination) {
    alert("Please enter both start location and destination.");
    return;
  }

  // Send the start and destination to the backend to get the shortest path
  try {
    const response = await fetch('http://127.0.0.1:5000/process_path', {  // Update URL here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: startLocation,
        end: destination
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Log the response for debugging

      // Check if files object contains start and end floor URLs
      if (data.files && data.files.start_floor && data.files.end_floor) {
        renderFloorMaps(data.files); // Render the floor maps
      } else {
        alert('Start and end floor maps are missing.');
      }

      // If path data exists, render the path
      if (data.path) {
        renderPath(data.path);
      } 

    } else {
      alert('Error in finding the path. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while searching for the path.');
  }
});

function renderFloorMaps(files) {
  // Check if the start and end floor map URLs are valid and display them
  if (files.start_floor) {
    document.getElementById('start-floor-container').innerHTML = `<img src="http://127.0.0.1:5000${files.start_floor}" alt="Start Floor" onError="this.onerror=null;this.src='http://127.0.0.1:5000/direction/default-image.svg';">`;
  } else {
    document.getElementById('start-floor-container').innerHTML = `<p>Start floor map not available.</p>`;
  }

  if (files.end_floor) {
    document.getElementById('end-floor-container').innerHTML = `<img src="http://127.0.0.1:5000${files.end_floor}" alt="End Floor" onError="this.onerror=null;this.src='http://127.0.0.1:5000/direction/default-image.svg';">`;
  } else {
    document.getElementById('end-floor-container').innerHTML = `<p>End floor map not available.</p>`;
  }
}

function renderPath(path) {
  // Render the shortest path (only if path data is valid)
  const svgDisplay = document.getElementById('svg-display');
  if (path) {
    const svgPath = `<svg width="100%" height="500px" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">
                        <path d="${path}" fill="transparent" stroke="red" stroke-width="2" />
                      </svg>`;
    svgDisplay.innerHTML = svgPath;
  } else {
    svgDisplay.innerHTML = `<p>No valid path data available.</p>`;
  }
}

