$(document).ready(function() {
    let currentScale = 1;
    let clickCount = 1;
    let sadImageNumber = 1;
    let happyImageNumber = 1;

    function createHearts() {
        const heartsContainer = $('.hearts-bg');
        const numberOfHearts = 20;

        for (let i = 0; i < numberOfHearts; i++) {
            const heart = $('<div>').addClass('heart').html('❤️');
            const startPositionLeft = Math.random() * 100;
            const animationDuration = 3 + Math.random() * 7;
            const size = 10 + Math.random() * 20;

            heart.css({
                left: `${startPositionLeft}%`,
                fontSize: `${size}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `heart-rain ${animationDuration}s linear infinite`
            });

            heartsContainer.append(heart);

            setTimeout(() => {
                heart.remove();
            }, animationDuration * 1000);
        }
    }

    createHearts();

    function updateImage(isHappy) {
        const img = $('.container img');
        const celebrationImg = $('.celebration-container img');

        img.fadeOut(300, function() {
            if (isHappy) {
                happyImageNumber = happyImageNumber % 3 + 1;
                img.attr('src', `images/happy-${happyImageNumber}.gif`);
                celebrationImg.attr('src', `images/happy-${happyImageNumber}.gif`);
            } else {
                sadImageNumber = sadImageNumber % 3 + 1;
                img.attr('src', `images/sad-${sadImageNumber}.gif`);
            }
            img.fadeIn(300);
        });
    }

    function showCelebration() {
        gsap.to('.main-content-wrapper', {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                $('.container').addClass('hidden');
                $('.celebration-container')
                    .removeClass('hidden')
                    .addClass('active');

                gsap.from('.celebration-content', {
                    scale: 0.5,
                    opacity: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                });

                createCelebrationHearts();
            }
        });
    }

    function createCelebrationHearts() {
        const container = $('.hearts-celebration');
        for (let i = 0; i < 50; i++) {
            const heart = $('<div>').html('❤️').css({
                position: 'fixed',
                fontSize: `${Math.random() * 20 + 10}px`,
                left: '50%',
                top: '50%',
                opacity: Math.random() * 0.7 + 0.3,
                transform: 'translate(-50%, -50%)'
            });
            container.append(heart);

            gsap.to(heart, {
                x: (Math.random() - 0.5) * window.innerWidth,
                y: (Math.random() - 0.5) * window.innerHeight,
                rotation: Math.random() * 360,
                duration: 2 + Math.random() * 3,
                ease: "power2.out",
                opacity: 0,
                onComplete: () => heart.remove()
            });
        }
    }

    $('.no-btn').on('click', function() {
        currentScale -= 0.2;
        const noBtn = $(this);
        const yesBtn = $('.yes-btn');

        gsap.to(noBtn, {
            scale: currentScale,
            duration: 0.3
        });

        gsap.to(yesBtn, {
            scale: 2 - currentScale,
            duration: 0.3
        });

        updateImage(false);

        if (currentScale < 0.5) {
            noBtn.css({
                position: 'absolute'
            });

            gsap.to(noBtn, {
                left: Math.random() * (window.innerWidth - 100),
                top: Math.random() * (window.innerHeight - 50),
                duration: 0.5,
                ease: "power2.out"
            });
        }

        if (currentScale < 0.2) {
            noBtn.css({
                opacity: 0.5,
                cursor: 'not-allowed'
            }).prop('disabled', true);
        }
    });

    $('.yes-btn').on('click', function() {
        updateImage(true);
        clickCount++;

        gsap.to(this, {
            scale: 1 + (clickCount * 0.2),
            duration: 0.3,
            onComplete: showCelebration
        });
    });

    $('.back-btn').on('click', function() {
        gsap.to('.celebration-container', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => location.reload()
        });
    });
});
