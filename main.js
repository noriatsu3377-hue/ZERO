document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial settings for background
    gsap.set("#bg-water", { opacity: 0 });
    gsap.set("#bg-neural", { opacity: 0 });
    gsap.set("#bg-silence", { opacity: 0 });
    gsap.set("#bg-noise-heavy", { opacity: 0 });
    gsap.set("#bg-light", { opacity: 0 });

    // Breath effect for water (base subtle animation)
    gsap.to("#bg-water", {
        scale: 1.05,
        opacity: 0.8,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // --- Hero Sequence (Pinning) ---
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-hero",
            start: "top top",
            end: "+=300%", // Increased for slower, more cinematic pacing
            scrub: 1,
            pin: true
        }
    });

    // Initial dark water is shown
    // text 1
    heroTl.fromTo(".text-1", { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: -20, filter: "blur(0px)", duration: 1 })
          .to(".text-1", { opacity: 0, y: -40, filter: "blur(10px)", duration: 1 }, "+=0.5");
    
    // text 2 + Neural BG
    heroTl.to("#bg-neural", { opacity: 1, duration: 1 }, "-=0.5")
          .fromTo(".text-2", { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: -20, filter: "blur(0px)", duration: 1 }, "-=0.5")
          .to(".text-2", { opacity: 0, y: -40, filter: "blur(10px)", duration: 1 }, "+=0.5");
    
    // text 3 & Silhouette
    heroTl.fromTo(".text-3", { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: -20, filter: "blur(0px)", duration: 1 })
          .to("#bg-silhouette", { opacity: 0.6, duration: 1.5 }, "-=1") // Silhouette fades in
          .to(".text-3", { opacity: 0, y: -40, filter: "blur(10px)", duration: 1 }, "+=0.5");
    
    // text 4 (Massive ZERO) + Hide Neural and Silhouette
    heroTl.to("#bg-neural", { opacity: 0, duration: 1 }, "-=0.5")
          .to("#bg-silhouette", { opacity: 0, duration: 1 }, "-=1")
          .fromTo(".text-4", { opacity: 0, scale: 0.9, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2 })
          .to(".hero-cta-wrapper", { opacity: 1, y: -20, duration: 1 }, "-=0.5");

    // --- Generic Fade Up Animations ---
    gsap.utils.toArray('.gs-fade-up').forEach(elem => {
        let delay = 0;
        if (elem.classList.contains('delay-1')) delay = 0.3;
        else if (elem.classList.contains('delay-2')) delay = 0.6;
        else if (elem.classList.contains('delay-3')) delay = 0.9;

        gsap.fromTo(elem, 
            { opacity: 0, y: 50, filter: "blur(5px)" },
            { 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                duration: 1.5, 
                delay: delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 80%",
                }
            }
        );
    });

    // Stagger for Section 2 Pillars
    gsap.fromTo('.gs-stagger', 
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".pillars-container",
                start: "top 80%",
            }
        }
    );

    // --- Section 3: Silence Background ---
    ScrollTrigger.create({
        trigger: ".section-3",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => gsap.to("#bg-silence", { opacity: 1, duration: 1 }),
        onLeave: () => gsap.to("#bg-silence", { opacity: 0, duration: 1 }),
        onEnterBack: () => gsap.to("#bg-silence", { opacity: 1, duration: 1 }),
        onLeaveBack: () => gsap.to("#bg-silence", { opacity: 0, duration: 1 })
    });

    // --- Section 4: Before / After Transition ---
    const baTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-4",
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1
        }
    });

    // Before appears with noise
    gsap.fromTo('.ba-before', 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: ".ba-before", start: "top 70%" } }
    );
    
    ScrollTrigger.create({
        trigger: ".section-4",
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => gsap.to("#bg-noise-heavy", { opacity: 1, duration: 1 }),
        onLeave: () => gsap.to("#bg-noise-heavy", { opacity: 0, duration: 1 }),
        onEnterBack: () => gsap.to("#bg-noise-heavy", { opacity: 1, duration: 1 }),
        onLeaveBack: () => gsap.to("#bg-noise-heavy", { opacity: 0, duration: 1 })
    });

    // After appears, transition to light
    gsap.fromTo('.ba-after', 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: ".ba-after", start: "top 70%" } }
    );

    ScrollTrigger.create({
        trigger: ".ba-after",
        start: "top 60%",
        onEnter: () => {
            gsap.to("#bg-noise-heavy", { opacity: 0, duration: 1 });
            gsap.to("#bg-light", { opacity: 1, duration: 1 });
        },
        onLeaveBack: () => {
            gsap.to("#bg-noise-heavy", { opacity: 1, duration: 1 });
            gsap.to("#bg-light", { opacity: 0, duration: 1 });
        }
    });

    // --- Section 5: Awakening Sequence ---
    const awakenTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-5-text",
            start: "top top",
            end: "+=150%", // Slower reading pace
            scrub: 1,
            pin: true
        }
    });

    awakenTl.fromTo(".awaken-1", { opacity: 0, filter: "blur(10px)" }, { opacity: 1, scale: 1.1, filter: "blur(0px)", duration: 1 })
            .to(".awaken-1", { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1 }, "+=0.5")
            .to("#bg-awakening", { opacity: 0.8, duration: 1.5 }, "+=0.2")
            .fromTo(".awaken-2", { opacity: 0, filter: "blur(10px)" }, { opacity: 1, scale: 1.1, filter: "blur(0px)", duration: 1 }, "-=1.5")
            .to(".awaken-2", { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1 }, "+=1")
            .to("#bg-awakening", { opacity: 0, duration: 1 }, "-=1");

    gsap.fromTo(".awakening-body", 
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0, duration: 1.5,
            scrollTrigger: { trigger: ".awakening-body", start: "top 80%" }
        }
    );

    // --- Section 7 & Outro ---
    // Hide light bg
    ScrollTrigger.create({
        trigger: ".section-7",
        start: "top 80%",
        onEnter: () => gsap.to("#bg-light", { opacity: 0, duration: 1 })
    });

    const outroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-outro",
            start: "top top",
            end: "+=150%", // Increased for smoother pacing
            scrub: 1,
            pin: true
        }
    });

    outroTl.fromTo(".outro-text", { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 1 })
           .to(".outro-text", { opacity: 0, filter: "blur(10px)", duration: 1 }, "+=1")
           .fromTo(".outro-massive", { opacity: 0, scale: 0.9, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2 });
});
