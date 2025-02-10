document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.querySelectorAll('.btn')[1];
    const yesBtn = document.querySelectorAll('.btn')[0];
    const img = document.querySelector('.container img');
    const container = document.querySelector('.container');
    const celebrationContainer = document.querySelector('.celebration-container');
    const backBtn = document.querySelector('.back-btn');

    let currentScale = 1;
    let clickCount = 1;
    let sadImageNumber = 1;
    let happyImageNumber = 1;

    function reset() {
        currentScale = 1;
        clickCount = 1;
        sadImageNumber = 1;
        happyImageNumber = 1;
        noBtn.style.transform = `scale(${currentScale})`;
        yesBtn.style.transform = `scale(${currentScale})`;
        noBtn.style.position = 'relative';
        noBtn.style.opacity = '1';
        noBtn.style.cursor = 'pointer';
        noBtn.disabled = false;
    }

    function updateImage(isHappy) {
        if (isHappy) {
            happyImageNumber = happyImageNumber % 3 + 1;
            img.src = `images/happy-${happyImageNumber}.gif`;
            document.querySelector('.celebration-container img').src = `images/happy-${happyImageNumber}.gif`;
        } else {
            sadImageNumber = sadImageNumber % 3 + 1;
            img.src = `images/sad-${sadImageNumber}.gif`;
        }
    }

    function showCelebration() {
        container.classList.add('hidden');
        celebrationContainer.classList.remove('hidden');
    }

    noBtn.addEventListener('click', function() {
        currentScale -= 0.2;
        noBtn.style.transform = `scale(${currentScale})`;

        yesBtn.style.transform = `scale(${2 - currentScale})`;

        updateImage(false);

        if (currentScale < 0.5) {
            noBtn.style.position = 'absolute';
            noBtn.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
            noBtn.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        }

        if (currentScale < 0.2) {
            noBtn.style.opacity = '0.5';
            noBtn.style.cursor = 'not-allowed';
            noBtn.disabled = true;
        }
    });

    yesBtn.addEventListener('click', function() {
        updateImage(true);

        clickCount++;
        yesBtn.style.transform = `scale(${1 + (clickCount * 0.2)})`;

        showCelebration();
    });

    backBtn.addEventListener('click', function() {
        location.reload(); 
    });
});
