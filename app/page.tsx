"use client";

import { useState, useEffect, useRef } from "react";

export default function GraduationInvitation() {
  const [stage, setStage] = useState<"envelope" | "card1" | "card2">("envelope");
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Toggle music
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleEnvelopeClick = () => {
    if (stage === "envelope" && !isEnvelopeOpening) {
      setIsEnvelopeOpening(true);
      setTimeout(() => {
        setStage("card1");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 800);
    }
  };

  const handleCard1Click = () => {
    if (stage === "card1") {
      setStage("card2");
    }
  };

  const handleCard2Click = () => {
    if (stage === "card2") {
      setStage("envelope");
      setIsEnvelopeOpening(false);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const colors = ["#e8a598", "#8b9a7d", "#5b8a9a", "#d4b896", "#d4af37"];
      const container = document.body;

      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
        confetti.style.animationDelay = Math.random() * 1 + "s";
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
      }
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      {/* Background Music - Đặt file nhạc vào thư mục public/ */}
      <audio
        ref={audioRef}
        loop
        src="/Attack on Titan Call of Silence x Akuma No Ko.mp3"
      />

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="music-btn"
        title={isMusicPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isMusicPlaying ? "🔊" : "🔇"}
      </button>

      <div className="marble-bg">
        {/* Cosmic Fog/Mist layers */}
        <div className="cosmic-fog fog-1"></div>
        <div className="cosmic-fog fog-2"></div>
        <div className="cosmic-fog fog-3"></div>
      </div>

      {/* Envelope Stage */}
      {stage === "envelope" && (
        <div
          className={`envelope-container ${isEnvelopeOpening ? "opened" : ""}`}
          onClick={handleEnvelopeClick}
        >
          <div className="envelope">
            <div className="envelope-back">
              {/* Animated Stars */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="floating-star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 1.5 + 0.5}px`,
                    height: `${Math.random() * 1.5 + 0.5}px`,
                    animationDuration: `${Math.random() * 4 + 4}s`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
              {/* Shooting Stars */}
              <div className="envelope-shooting-star" style={{ animationDelay: '0s' }} />
              <div className="envelope-shooting-star" style={{ animationDelay: '2s' }} />
              <div className="envelope-shooting-star" style={{ animationDelay: '4s' }} />
            </div>
            <div className="envelope-front" />
            <div className="envelope-flap">
              {/* Stars on top flap */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="floating-star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 70}%`,
                    width: `${Math.random() * 1.5 + 0.5}px`,
                    height: `${Math.random() * 1.5 + 0.5}px`,
                    animationDuration: `${Math.random() * 4 + 4}s`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
            {/* <div className="envelope-seal" /> */}
          </div>
          <div className="click-hint">BẤM ĐỂ MỞ</div>
        </div>
      )}

      {/* Card 1 */}
      {stage === "card1" && (
        <div
          className="relative cursor-pointer"
          onClick={handleCard1Click}
          style={{
            animation: "fadeInUp 0.8s ease-out"
          }}
        >
          <div className="white-envelope" />
          <div className="card card-grad">
            <div className="name-top">NGUYEN VAN A</div>

            <div className="grad-layout">
              <span className="letter letter-g">G</span>
              <span className="letter letter-r">R</span>
              <span className="letter letter-a">A</span>
              <span className="letter letter-d">D</span>

              <div className="grad-photo">
                <div className="silhouette" style={{
                  background: `
                    linear-gradient(180deg, 
                      #b8c8cc 0%, 
                      #9aaa9d 20%,
                      #7a8a6d 50%, 
                      #8a9a7d 80%,
                      #6b7a5d 100%
                    )
                  `
                }}>
                  <svg
                    viewBox="0 0 200 400"
                    className="absolute inset-0 w-full h-full"
                    style={{ opacity: 0.6 }}
                  >
                    <ellipse cx="100" cy="80" rx="35" ry="40" fill="#5a4a3a" />
                    <path
                      d="M 50 120 Q 40 180, 60 280 Q 80 350, 100 380 Q 120 350, 140 280 Q 160 180, 150 120 Q 130 100, 100 110 Q 70 100, 50 120"
                      fill="#4a5a6a"
                    />
                    <ellipse cx="70" cy="70" rx="20" ry="25" fill="#4a3a2a" />
                    <ellipse cx="130" cy="70" rx="20" ry="25" fill="#4a3a2a" />
                    <ellipse cx="100" cy="50" rx="30" ry="20" fill="#4a3a2a" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bottom-info">
              <div className="class-info">
                Thang Long University
              </div>
            </div>
          </div>

          <div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "14px",
              color: "#8b7355",
              letterSpacing: "2px",
              animation: "pulse 2s ease-in-out infinite"
            }}
          >
            BẤM ĐỂ XEM TIẾP
          </div>
        </div>
      )}

      {/* Card 2 - Invitation Details */}
      {stage === "card2" && (
        <div
          className="relative cursor-pointer"
          onClick={handleCard2Click}
          style={{
            animation: "fadeInUp 0.8s ease-out"
          }}
        >
          <div className="white-envelope" />
          <div className="card card-invite">
            <div className="photo-container">
              <div className="photo-placeholder" style={{
                background: `
                  linear-gradient(180deg, 
                    #d8d0c8 0%, 
                    #c8c0b8 15%,
                    #a8a098 30%,
                    #889078 50%, 
                    #9aa890 70%,
                    #c8c0a8 100%
                  )
                `
              }}>
                {/* Silhouette */}
                <svg
                  viewBox="0 0 350 320"
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0.5 }}
                >
                  <ellipse cx="175" cy="60" rx="30" ry="35" fill="#5a4a3a" />
                  <path
                    d="M 120 95 Q 100 150, 110 200 Q 120 280, 140 320 L 210 320 Q 230 280, 240 200 Q 250 150, 230 95 Q 200 80, 175 85 Q 150 80, 120 95"
                    fill="#2a2a2a"
                  />
                  {/* Hair */}
                  <ellipse cx="145" cy="50" rx="25" ry="30" fill="#4a3a2a" />
                  <ellipse cx="205" cy="50" rx="25" ry="30" fill="#4a3a2a" />
                  <ellipse cx="175" cy="35" rx="35" ry="25" fill="#4a3a2a" />
                </svg>
              </div>
            </div>

            <div className="invite-text">
              <div className="subtitle">YOU ARE CORDIALLY INVITED</div>
              <div className="subtitle">TO THE GRADUATION CEREMONY</div>
              <div className="main-name">NGUYEN VAN THU</div>

              <div className="details">
                <div>SATURDAY, APRIL 6, 2026</div>
                <div>AT 10:00 AM</div>
                <div>THANG LONG UNIVERSITY</div>
                <div className="highlight" style={{ marginTop: "10px" }}>RSVP: 0896557295</div>
              </div>
            </div>
          </div>

          <div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "14px",
              color: "#8b7355",
              letterSpacing: "2px",
              animation: "pulse 2s ease-in-out infinite"
            }}
          >
            BẤM ĐỂ BẮT ĐẦU LẠI
          </div>
        </div>
      )}
    </div>
  );
}
