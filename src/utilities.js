// Drawing Function

export const drawHand = (predictions, ctx) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab landmarks
      const landmarks = prediction.landmarks;

      // Loop through landmarks and draw them
      for (let i = 0; i < landmarks.length; i++) {
        // Get x point
        const x = landmarks[i][0];
        // Get y point
        const y = landmarks[i][1];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 3 * Math.PI); /* arc(x,y,radius,start andgle, end angle) */

        // Set line color
        ctx.fillStyle = 'orange';
        ctx.fill();
      }
    });
  }
};
