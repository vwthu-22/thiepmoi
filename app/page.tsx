"use client";

import { useState, useEffect, useRef } from "react";

export default function GraduationInvitation() {
  const [stage, setStage] = useState<"envelope" | "card1" | "card2">("envelope");
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto play music when user first interacts with page
  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current && !isMusicPlaying) {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(() => {
          // Autoplay blocked, user needs to click button
        });
      }
      // Remove listener after first interaction
      document.removeEventListener('click', playMusic);
    };

    document.addEventListener('click', playMusic);
    return () => document.removeEventListener('click', playMusic);
  }, []);

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
              {/* Animated Stars - fixed positions */}
              {[10, 25, 40, 55, 70, 85, 15, 30, 45, 60, 75, 90, 20, 35, 50].map((pos, i) => (
                <div
                  key={i}
                  className="floating-star"
                  style={{
                    left: `${pos}%`,
                    top: `${(i * 7 + 5) % 100}%`,
                    width: `${1 + (i % 3) * 0.5}px`,
                    height: `${1 + (i % 3) * 0.5}px`,
                    animationDuration: `${5 + (i % 4)}s`,
                    animationDelay: `${i * 0.3}s`,
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
              {/* Stars on top flap - fixed positions */}
              {[15, 30, 45, 60, 75, 90, 25, 50, 70, 85].map((pos, i) => (
                <div
                  key={i}
                  className="floating-star"
                  style={{
                    left: `${pos}%`,
                    top: `${(i * 6 + 10) % 70}%`,
                    width: `${1 + (i % 2) * 0.5}px`,
                    height: `${1 + (i % 2) * 0.5}px`,
                    animationDuration: `${5 + (i % 3)}s`,
                    animationDelay: `${i * 0.4}s`,
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
            <div className="name-top">NGUYEN VAN THU</div>

            <div className="grad-layout">
              <span className="letter letter-g">G</span>
              <span className="letter letter-r">R</span>
              <span className="letter letter-a">A</span>
              <span className="letter letter-d">D</span>

              {/* CARD 1 - Thay ảnh: đặt file vào public/ và đổi src */}
              <div className="grad-photo">
                <img
                  src="/photo1.jpg"
                  alt="Photo"
                  className="grad-photo-img"
                />
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
            {/* CARD 2 - Thay ảnh: đặt file vào public/ và đổi src */}
            <div className="photo-container">
              <img
                src="/photo2.jpg"
                alt="Photo"
                className="photo-img"
              />
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
