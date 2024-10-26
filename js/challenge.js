// Select elements
const counter = document.getElementById('counter');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');

let count = 0;
let intervalId;
let likes = {}; // Object to keep track of likes for each count
let paused = false;

// Function to update the counter display
function updateCounter() {
  counter.textContent = count;
}

// Increment counter
plusButton.addEventListener('click', () => {
  count++;
  updateCounter();
});

// Decrement counter
minusButton.addEventListener('click', () => {
  count--;
  updateCounter();
});

// Add a like
heartButton.addEventListener('click', () => {
  // Increment the like count for the current number
  likes[count] = (likes[count] || 0) + 1;

  // Update likes display
  updateLikes();
});

// Function to update likes display
function updateLikes() {
  likesList.innerHTML = ''; // Clear current likes display
  for (const [key, value] of Object.entries(likes)) {
    const li = document.createElement('li');
    li.textContent = `${key} has ${value} ❤️ likes`;
    likesList.appendChild(li);
  }
}

// Pause and resume counter
pauseButton.addEventListener('click', () => {
  if (paused) {
    startCounter();
    pauseButton.textContent = 'pause';
    toggleButtons(false); // Enable buttons
  } else {
    clearInterval(intervalId);
    pauseButton.textContent = 'resume';
    toggleButtons(true); // Disable buttons except pause
  }
  paused = !paused;
});

// Function to toggle button states
function toggleButtons(disable) {
  minusButton.disabled = disable;
  plusButton.disabled = disable;
  heartButton.disabled = disable;
}

// Function to start the counter
function startCounter() {
  intervalId = setInterval(() => {
    count++;
    updateCounter();
  }, 1000);
}

// Start counter on page load
startCounter();

// Submit comment
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const comment = commentInput.value;
  if (comment) {
    const p = document.createElement('p');
    p.textContent = comment;
    commentsList.appendChild(p);
    commentInput.value = ''; // Clear input field
  }
});
