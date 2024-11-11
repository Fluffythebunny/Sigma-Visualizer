# Sigma Visualizer

This project is an interactive audio visualizer that uses HTML5, JavaScript, and the Web Audio API to create a dynamic, particle-based liquid effect visualizer. The particles react to the audio data from a file input and simulate fluid movement with pulsating and glowing effects.

## Features

- **Audio Input:** Upload an audio file and visualize its frequency data in real-time.
- **Play/Pause:** Control playback of the audio with a simple play/pause button.
- **Reset:** Reset the audio to the beginning and restart visualization.
- **Dynamic Fall Speed:** Adjust the fall speed of particles based on audio intensity with a slider input.
- **Particle-Based Fluid Simulation:** Particles are influenced by the frequency data, creating a fluid, liquid-like effect.
- **Responsive Canvas:** The canvas resizes to fit the browser window, ensuring the visualizer adapts to different screen sizes.

## Technologies Used

- **HTML5:** For the structure of the web page.
- **CSS:** For basic styling.
- **JavaScript:** For the logic, including file handling, audio processing, and the visualizer animation.
- **Web Audio API:** For audio analysis and frequency data processing.
- **Canvas API:** For rendering the particle-based visual effects.

## Usage

1. **Upload an Audio File:** Click the file input to select an audio file from your device.
2. **Play/Pause Audio:** Click the play/pause button to control the playback of the audio file.
3. **Reset Audio:** Click the reset button to restart the audio and visualizer.
4. **Adjust Fall Speed:** Use the speed factor slider to dynamically adjust the fall speed of particles.

## Customization

- **Fall Speed Factor:** The fall speed of particles is influenced by the audio intensity and can be adjusted dynamically using a slider.
- **Particle Color:** Particles are assigned a random color each time they are created. You can modify the `Particle` class to use a fixed color or other color effects.

## Demo

You can view a live demo of the project at [Sigma Visualizer](https://sigma-visualizer.pages.dev).

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make improvements, and submit pull requests.


## Acknowledgements

- Web Audio API documentation: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Canvas API documentation: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
