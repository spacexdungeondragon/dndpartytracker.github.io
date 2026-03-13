# Firebase Setup Instructions

## Files Created
- `index-firebase.html` - Firebase-enabled version of your HTML
- `scripts-firebase.js` - Firebase-integrated JavaScript
- `firebase-config.js` - Configuration template (ES6 modules)
- `FIREBASE_SETUP.md` - This setup guide

## Quick Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project (e.g., "dnd-party-tracker")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Setup Firestore Database
1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure later)
4. Select your preferred location
5. Click "Done"

### 3. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click the web app icon (`</>`)
4. Register app with name "D&D Party Tracker"
5. Copy the `firebaseConfig` object

### 4. Update Configuration Files

Replace the placeholder values in **both** files:

**In `index-firebase.html`** (around line 48):
```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

**In `scripts-firebase.js`** (around line 16):
```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 5. Test Your App
1. Open `index-firebase.html` in your browser
2. Check the sync status button - should show "☁️ Connected"
3. Add some quests/loot to test
4. Check your Firestore console to see the data

## Features Added
- ☁️ Real-time sync across devices
- 📱 Offline mode with localStorage fallback
- 🔄 Automatic migration from old localStorage data
- 🔄 Sync status indicator
- ⚡ Auto-save story text (1 second delay)

## Firestore Data Structure
Your data is stored in: `campaigns/strahd-campaign-1/`
```json
{
  "loot": ["Magic sword", "Gold coins"],
  "quests": ["Find the missing villager", "Defeat the vampire"],
  "story": "The party entered Barovia...",
  "lastUpdated": "2024-01-01T12:00:00Z"
}
```

## Security Rules (Optional)
For now, your database is in test mode. Later you can add authentication and restrict access:

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /campaigns/{campaignId} {
      allow read, write: if true; // Public access - change this!
    }
  }
}
```

## Troubleshooting
- **❌ Error**: Check browser console for Firebase errors
- **📱 Offline**: App will work with localStorage as backup
- **🔄 Syncing stuck**: Click the sync button to retry

Your original `index.html` and `scripts.js` remain unchanged as backup!
