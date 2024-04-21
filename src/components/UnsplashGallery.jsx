import React, { useEffect, useState } from "react";
import axios from "axios";

const UnsplashGallery = () => {
  const [images, setImages] = useState([]); // State to store the combined list of images

  useEffect(() => {
    const fetchImages = async () => {
      const ACCESS_KEY = "zzHHYSfhTlNtjnQOJdfODdYBF_lfBezEHhCFvI2NqrM"; // Your Unsplash Access Key

      // List of queries to fetch images for
      const queries = ["clothing", "fashion", "apparel", "baby", "nature"];
      const fetchedImages = []; // Initialize a list to store fetched images

      // Fetch images for each query
      for (const query of queries) {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query, // current query in the loop
              per_page: 5, // Fetch fewer images per query to avoid rate limits
              orientation: "squarish", // Optional: preferred orientation
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`, // Use your Access Key
            },
          }
        );

        fetchedImages.push(...response.data.results); // Combine results into the list
      }

      // Shuffle the combined list for randomness
      const shuffledImages = fetchedImages.sort(() => Math.random() - 0.5);

      setImages(shuffledImages); // Update the state with the shuffled list
    };

    fetchImages(); // Trigger fetching when the component mounts
  }, []); // Empty dependency array ensures it runs once on mount (page refresh)

  return (
    <div>
      {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description || "Image"}
          style={{ margin: "10px", maxWidth: "200px" }}
        />
      ))}
    </div>
  );
};

export default UnsplashGallery;
