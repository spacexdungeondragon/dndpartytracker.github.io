// Firebase-integrated version of the D&D Party Tracker
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {
    getFirestore,
    doc,
    collection,
    onSnapshot,
    setDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    getDoc
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

let db = null;
let isOnline = false;

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBD2zEBCmVRRVBKroDWKsJ9S7oXBPuzGgs",
    authDomain: "dnd-curse-of-strahd.firebaseapp.com",
    projectId: "dnd-curse-of-strahd",
    storageBucket: "dnd-curse-of-strahd.firebasestorage.app",
    messagingSenderId: "1003543560913",
    appId: "1:1003543560913:web:7eea96491d237038bc7bf0",
    measurementId: "G-0V2V3CQ8K5"
};

// Initialize Firebase
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isOnline = true;
    console.log('Firebase connected successfully');
} catch (error) {
    console.error('Firebase connection failed:', error);
    isOnline = false;
}

// Document reference for the campaign data
const campaignId = 'strahd-campaign-1'; // You can make this configurable
const campaignRef = db ? doc(db, 'campaigns', campaignId) : null;

document.addEventListener('DOMContentLoaded', () => {
    const lootList = document.getElementById('loot-list');
    const storyText = document.getElementById('story-text');
    const questsList = document.getElementById('quests-list');
    const syncStatus = document.getElementById('sync-status');

    // Local data storage (fallback and cache)
    let lootData = [];
    let questData = [];
    let storyData = '';

    // Update sync status
    function updateSyncStatus(status) {
        if (syncStatus) {
            switch(status) {
                case 'connected':
                    syncStatus.textContent = '☁️ Connected';
                    syncStatus.className = 'btn btn-crimson';
                    break;
                case 'syncing':
                    syncStatus.textContent = '🔄 Syncing...';
                    syncStatus.className = 'btn btn-gold';
                    break;
                case 'offline':
                    syncStatus.textContent = '📱 Offline';
                    syncStatus.className = 'btn btn-gold';
                    break;
                case 'error':
                    syncStatus.textContent = '❌ Error';
                    syncStatus.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
                    break;
            }
        }
    }

    // Migrate localStorage data to Firebase (run once)
    async function migrateLocalStorageToFirebase() {
        if (!isOnline || !campaignRef) return;

        const localLoot = JSON.parse(localStorage.getItem('dndLoot')) || [];
        const localQuests = JSON.parse(localStorage.getItem('dndQuests')) || [];
        const localStory = localStorage.getItem('dndStory') || '';

        if (localLoot.length > 0 || localQuests.length > 0 || localStory) {
            try {
                updateSyncStatus('syncing');

                // Check if Firebase document exists
                const docSnapshot = await getDoc(campaignRef);

                if (!docSnapshot.exists()) {
                    // Create new document with migrated data
                    await setDoc(campaignRef, {
                        loot: localLoot,
                        quests: localQuests,
                        story: localStory,
                        lastUpdated: new Date(),
                        migrated: true
                    });

                    console.log('Successfully migrated localStorage data to Firebase');

                    // Mark migration as complete
                    localStorage.setItem('firebaseMigrated', 'true');
                    updateSyncStatus('connected');
                }
            } catch (error) {
                console.error('Migration failed:', error);
                updateSyncStatus('error');
            }
        }
    }

    // Initialize Firebase listener
    function setupFirebaseListener() {
        if (!isOnline || !campaignRef) {
            loadFromLocalStorage();
            updateSyncStatus('offline');
            return;
        }

        const unsubscribe = onSnapshot(campaignRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                lootData = data.loot || [];
                questData = data.quests || [];
                storyData = data.story || '';

                renderList(lootList, lootData);
                renderList(questsList, questData);
                storyText.value = storyData;

                updateSyncStatus('connected');

                // Cache data locally as backup
                localStorage.setItem('dndLoot', JSON.stringify(lootData));
                localStorage.setItem('dndQuests', JSON.stringify(questData));
                localStorage.setItem('dndStory', storyData);
            } else {
                // Document doesn't exist, try migration
                migrateLocalStorageToFirebase();
            }
        }, (error) => {
            console.error('Firebase listener error:', error);
            loadFromLocalStorage();
            updateSyncStatus('error');
        });

        return unsubscribe;
    }

    // Load data from localStorage (fallback)
    function loadFromLocalStorage() {
        lootData = JSON.parse(localStorage.getItem('dndLoot')) || [];
        questData = JSON.parse(localStorage.getItem('dndQuests')) || [];
        storyData = localStorage.getItem('dndStory') || '';

        renderList(lootList, lootData);
        renderList(questsList, questData);
        storyText.value = storyData;
    }

    // Render list items
    function renderList(list, data) {
        list.innerHTML = '';
        data.forEach((item, index) => {
            addItemToList(list, item, index);
        });
    }

    function addItemToList(list, item, index) {
        const li = document.createElement('li');
        li.textContent = item;

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕ Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            removeItem(list, index);
        };
        li.appendChild(deleteBtn);

        list.appendChild(li);
    }

    // Remove item (Firebase + localStorage)
    async function removeItem(list, index) {
        if (list === lootList) {
            lootData.splice(index, 1);
            await updateFirebaseData('loot', lootData);
        } else if (list === questsList) {
            questData.splice(index, 1);
            await updateFirebaseData('quests', questData);
        }
    }

    // Add loot item
    async function addLootItem() {
        const item = prompt('Enter loot item:');
        if (item && item.trim()) {
            lootData.push(item.trim());
            await updateFirebaseData('loot', lootData);
        }
    }

    // Add quest
    async function addQuest() {
        const quest = prompt('Enter quest:');
        if (quest && quest.trim()) {
            questData.push(quest.trim());
            await updateFirebaseData('quests', questData);
        }
    }

    // Update Firebase data
    async function updateFirebaseData(field, data) {
        if (isOnline && campaignRef) {
            try {
                updateSyncStatus('syncing');
                await updateDoc(campaignRef, {
                    [field]: data,
                    lastUpdated: new Date()
                });
                updateSyncStatus('connected');
            } catch (error) {
                console.error('Firebase update failed:', error);
                updateSyncStatus('error');
                // Fallback to localStorage
                if (field === 'loot') {
                    localStorage.setItem('dndLoot', JSON.stringify(data));
                    renderList(lootList, data);
                } else if (field === 'quests') {
                    localStorage.setItem('dndQuests', JSON.stringify(data));
                    renderList(questsList, data);
                }
            }
        } else {
            // Offline mode - use localStorage
            if (field === 'loot') {
                localStorage.setItem('dndLoot', JSON.stringify(data));
                renderList(lootList, data);
            } else if (field === 'quests') {
                localStorage.setItem('dndQuests', JSON.stringify(data));
                renderList(questsList, data);
            }
        }
    }

    // Update story data
    async function updateStoryData(story) {
        storyData = story;
        if (isOnline && campaignRef) {
            try {
                await updateDoc(campaignRef, {
                    story: story,
                    lastUpdated: new Date()
                });
            } catch (error) {
                console.error('Story update failed:', error);
                // Fallback to localStorage
                localStorage.setItem('dndStory', story);
            }
        } else {
            localStorage.setItem('dndStory', story);
        }
    }

    // Story text auto-save
    let storyTimeout;
    storyText.addEventListener('input', () => {
        clearTimeout(storyTimeout);
        storyTimeout = setTimeout(() => {
            updateStoryData(storyText.value);
        }, 1000); // Save after 1 second of no typing
    });

    // Initialize the app
    if (isOnline && !localStorage.getItem('firebaseMigrated')) {
        migrateLocalStorageToFirebase().then(() => {
            setupFirebaseListener();
        });
    } else {
        setupFirebaseListener();
    }

    // Event listeners
    document.getElementById('add-loot').addEventListener('click', addLootItem);
    document.getElementById('add-quest').addEventListener('click', addQuest);

    // Sync button click handler
    if (syncStatus) {
        syncStatus.addEventListener('click', () => {
            if (!isOnline) {
                alert('Currently in offline mode. Data is saved locally and will sync when connection is restored.');
            } else {
                updateSyncStatus('syncing');
                // Force a re-sync by reloading from Firebase
                setupFirebaseListener();
            }
        });
    }
});
