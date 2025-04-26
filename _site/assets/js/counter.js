/**
 * Visitor Counter Script
 * This script is only visible to site admin (you)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Firebase configuration - you'll need to replace this with your own Firebase project details
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };
    
    // Only initialize Firebase in production environment
    if (firebase && typeof firebase.initializeApp === 'function') {
      // Initialize Firebase if not already initialized
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      
      const analytics = firebase.analytics();
      
      // Log page view
      analytics.logEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
      
      // Check if admin (you) is logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in, show admin panel with visitor statistics
          showVisitorStats(analytics);
        }
      });
      
      // Admin login button handler
      const adminButton = document.getElementById('admin-login');
      if (adminButton) {
        adminButton.addEventListener('click', function() {
          // Only prompt for password if not logged in
          firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
              const password = prompt('Enter admin password:');
              if (password === 'YOUR_SECRET_PASSWORD') { // Store this securely - only known to you
                // Sign in with your admin email/password
                firebase.auth().signInWithEmailAndPassword('your-email@example.com', 'YOUR_ADMIN_PASSWORD')
                  .catch(function(error) {
                    console.error('Authentication error:', error);
                  });
              }
            } else {
              // Already logged in, toggle stats panel visibility
              const existingPanel = document.getElementById('visitor-stats');
              if (existingPanel) {
                existingPanel.style.display = existingPanel.style.display === 'none' ? 'block' : 'none';
              } else {
                showVisitorStats(analytics);
              }
            }
          });
        });
      }
    }
    
    /**
     * Display visitor statistics panel
     * @param {Object} analytics - Firebase analytics instance
     */
    function showVisitorStats(analytics) {
      // Create stats container if it doesn't exist
      let statsContainer = document.getElementById('visitor-stats');
      if (!statsContainer) {
        statsContainer = document.createElement('div');
        statsContainer.id = 'visitor-stats';
        statsContainer.className = 'admin-panel';
        document.body.appendChild(statsContainer);
      }
      
      // Fetch analytics data
      fetchVisitorStats(analytics)
        .then(stats => {
          // Update stats display
          statsContainer.innerHTML = `
            <h4>Visitor Statistics</h4>
            <div class="counter-stat">
              <strong>Today:</strong> ${stats.today || 0}
            </div>
            <div class="counter-stat">
              <strong>This Week:</strong> ${stats.thisWeek || 0}
            </div>
            <div class="counter-stat">
              <strong>This Month:</strong> ${stats.thisMonth || 0}
            </div>
            <div class="counter-stat">
              <strong>Total:</strong> ${stats.total || 0}
            </div>
            <div class="counter-stat">
              <strong>Current Page:</strong> ${stats.currentPage || 0}
            </div>
            <button id="close-stats">Close</button>
          `;
          
          // Close button handler
          document.getElementById('close-stats').addEventListener('click', function() {
            statsContainer.style.display = 'none';
          });
        })
        .catch(error => {
          console.error('Error fetching visitor stats:', error);
          statsContainer.innerHTML = `
            <h4>Visitor Statistics</h4>
            <p>Error loading statistics. Please try again later.</p>
            <button id="close-stats">Close</button>
          `;
          
          document.getElementById('close-stats').addEventListener('click', function() {
            statsContainer.style.display = 'none';
          });
        });
    }
    
    /**
     * Fetch visitor statistics from Firebase
     * @param {Object} analytics - Firebase analytics instance
     * @returns {Promise<Object>} Visitor statistics
     */
    function fetchVisitorStats(analytics) {
      // In a real implementation, you would use Firebase Analytics API
      // to fetch actual statistics. This is a simplified example.
      
      // For demonstration purposes, we'll return dummy data
      // In a real implementation, you would use the Firebase Analytics API
      // or a custom solution with Firebase Firestore to store and retrieve visit counts
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            today: Math.floor(Math.random() * 50) + 1,
            thisWeek: Math.floor(Math.random() * 200) + 50,
            thisMonth: Math.floor(Math.random() * 500) + 200,
            total: Math.floor(Math.random() * 2000) + 500,
            currentPage: Math.floor(Math.random() * 30) + 1
          });
        }, 500);
      });
    }
  });