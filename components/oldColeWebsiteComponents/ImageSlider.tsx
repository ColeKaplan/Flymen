import { useState } from "react"
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react"
import "./ImageSlider.css"


// type MediaItem = 
//   | { type: "image"; url: string; alt: string }
//   | { type: "video"; url: string; alt: string }

// type ImageSliderProps = {
//   images: MediaItem[]
// }

type ImageSliderProps = {
  images: {
    type: string
    url: string
    alt: string
  }[]
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0)

  function showNextImage() {
    setImageIndex(index => {
      if (index === images.length - 1) return 0
      return index + 1
    })
  }

  function showPrevImage() {
    setImageIndex(index => {
      if (index === 0) return images.length - 1
      return index - 1
    })
  }

  return (
    <section
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <a href="#after-image-slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map(({ type, url, alt }, index) => (
          // <img
          //   key={url}
          //   src={url}
          //   alt={alt}
          //   aria-hidden={imageIndex !== index}
          //   className="img-slider-img"
          //   style={{ translate: `${-100 * imageIndex}%` }}
          // />
          type === "image" ? (
            <img
              key={url}
              src={url}
              alt={alt}
              aria-hidden={imageIndex !== index}
              className="img-slider-img"
              style={{ translate: `${-100 * imageIndex}%` }}
            />
          ) : (
            // other JSX if type !== "image"
            <video
              key={url}
              src={url}
              aria-hidden={imageIndex !== index}
              className="img-slider-img"
              style={{
                translate: `${-100 * imageIndex}%`,
                objectFit: "contain", // 👈 keeps full video visible, no cropping
                width: "100%",
                height: "100%",
                backgroundColor: "black", // 👈 optional: makes letterboxing look clean
              }}
              autoPlay
              muted
              loop
              playsInline
              controls
              poster={alt} // You can use alt as poster or pass another prop if you want a thumbnail before play
            >
              Your browser does not support the video tag.
            </video>
          )
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  )
}