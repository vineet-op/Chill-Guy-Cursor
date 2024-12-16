# Custom Chill Cursor

![78083-chillguy](https://github.com/user-attachments/assets/a3c54903-e80f-4c52-8530-01bf82fa3fb5)

A highly customizable animated cursor component for React applications with smooth particle effects and click animations.



https://github.com/user-attachments/assets/b6afdfcd-ddae-482c-8978-e34e7f0808a6



## Features

- 🎯 Smooth cursor movement
- ✨ Particle trail effects
- 💫 Click burst animations
- 🎨 Fully customizable appearance
- 🖼️ Support for custom cursor images

## Installation

To install the `custom-chill-cursor` package, you can use npm. Run the following command in your project directory:

```bash
npm i custom-chill-cursor
```

## Usage

1. **Import the Package**: Import the `CustomCursor` component into your project.

   ```javascript
   import CustomCursor from "custom-chill-cursor";
   ```

2. **Use the Component**: Use the `CustomCursor` component in your React application.

   ```jsx
   <CustomCursor cursorImage={chillGuy} />
   ```

   **Note**: You can change the image URL according to your choice. The example uses an image stored locally.

3. **Configure the Image**: If you encounter CORS issues with images hosted on GitHub, consider using a CORS-enabled image hosting service or a CORS proxy.

   - **CORS-Enabled Hosting**: Use services like Amazon S3, Google Cloud Storage, or Imgur.
   - **CORS Proxy**: Temporarily use a CORS proxy service to fetch the image.
   - **GitHub Pages**: Host the image on a GitHub Pages site to avoid CORS issues.

By following these steps, you can successfully integrate and customize the `CustomCursor` component in your React application.
