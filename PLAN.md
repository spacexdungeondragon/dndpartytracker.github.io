# 🧛‍♂️ D&D Curse of Strahd Party Tracker - Master Plan

## 🎯 **Project Overview**
A collaborative web-based tracker for our Curse of Strahd campaign with real-time Firebase sync, ridiculous stats tracking, and secret DM powers!

## 🔐 **IMPORTANT ACCESS INFO**

### **🔑 DM Panel Access:**
- **Button:** Small "👑" in header (next to sync button)
- **Password:** `ZAROVICH`
- **What it unlocks:** Complete petition management, custom Strahd responses, statistics

### **🔥 Firebase Details:**
- **Project:** `dnd-curse-of-strahd`
- **Database:** Firestore (test mode)
- **Rules:** Public access (secure later if needed)

## ✅ **COMPLETED FEATURES**

### **📊 Core Tracking:**
- ⚔️ **Active Quests** - Add/remove with sync
- 💰 **Treasures & Loot** - Persistent inventory
- 📖 **Chronicle of Events** - Auto-saving story text
- ☁️ **Real-time Firebase sync** across all devices

### **😂 Ridiculous Campaign Stats:**
- 💕 "I love you"s
- 🎲 Natural Ones Rolled
- 🔥 Times Set Things on Fire
- 🗣️ Seduced the Enemy
- 🍺 Drinks Consumed
- 💀 Accidentally Killed NPCs
- 🎭 Terrible Accents Attempted
- 🏃 Times Fled from Combat

### **📈 Charts & Analytics:**
- 🎯 **Bar Chart** - Campaign Shenanigans Overview
- 🍰 **Pie Chart** - Distribution of Questionable Decisions
- 📈 **Line Chart** - The Descent into Madness Timeline

### **🧛‍♂️ Strahd Petition System:**
- 📜 **Public petition form** with 8 categories
- 🎭 **96 dramatic auto-responses** (12 per category)
- 👑 **Secret DM control panel** for managing everything

### **🎛️ DM Powers:**
- 📊 **Live statistics** dashboard
- ✏️ **Edit any Strahd response** with custom text
- 🎲 **Generate new random responses**
- 🔍 **Filter petitions** by category
- 🗑️ **Delete inappropriate petitions**
- 🔥 **Nuclear option** - purge all petitions

## 🚀 **PLANNED FEATURES** (In Order of Awesomeness)

### **🎯 Phase 1: Strahd Content**
- **📜 Strahd's Daily Decree**
  - DM posts "official announcements from Castle Ravenloft"
  - *"By order of Count Strahd: The village of Vallaki is now... slightly less depressing."*
  - Categories: Weather Reports, Village Updates, Threats, Mood Announcements

### **🎯 Phase 2: Party Social Features**
- **💬 Memorable Quotes Board**
  - Anyone can add ridiculous session quotes
  - Vote on "Quote of the Session"
  - Categories: "Famous Last Words", "Poor Life Choices", "Accidental Wisdom"
  - Auto-timestamp with session date

- **🏷️ Party Member Mini-Profiles**
  - Character portraits with funny custom stats
  - "Likely to Die First: 87%"
  - "Moral Compass: Broken"
  - "Sanity Level: Questionable"
  - "Times Saved Party: 0"

### **🎯 Phase 3: Interactive Systems**
- **🗳️ Party Vote System**
  - Democratic decisions with dramatic Strahd results
  - *"The party has voted... Strahd is displeased with your choice."*
  - Vote categories: Plans, NPCs to trust, risky decisions

- **💝 NPC Relationship Tracker**
  - Visual relationship web
  - Status updates: "Ireena: Complicated", "Ismark: Bromance", "Strahd: It's Complicated"
  - Track who loves/hates/is confused by the party

### **🎯 Phase 4: Competition Features**
- **💀 Death Pool & Betting**
  - Who dies first? Who survives longest?
  - Achievement badges: "Surprisingly Not Dead Yet", "Death Magnet", "Plot Armor"
  - Strahd commentary on each "contestant"

- **🏆 Session MVP & Awards**
  - Vote for session MVP, "Best Roleplay", "Most Creative Death"
  - Strahd-themed awards ceremony
  - "The Count Strahd Award for Excellence in Suffering"

## 📁 **File Structure**
```
📁 dndpartytracker.github.io/
├── 🌐 index.html (original localStorage version)
├── 🔥 index-firebase-fixed.html (MAIN APP - use this!)
├── 🎨 style.css (gothic D&D styling)
├── 📜 scripts.js (original localStorage version)
├── 🛠️ scripts-firebase.js (unused - code moved to HTML)
├── ⚙️ firebase-config.js (template)
├── 🔧 firebase-debug.html (troubleshooting tool)
├── 📋 FIREBASE_SETUP.md (setup instructions)
└── 📋 PLAN.md (this file!)
```

## 🚀 **Usage Instructions**

### **For Players:**
1. Open `index-firebase-fixed.html`
2. Add quests, loot, write story entries
3. Click + buttons on stats to track chaos
4. Submit petitions to Strahd (get dramatic responses!)

### **For DM:**
1. Click the tiny "👑" button in header
2. Enter password: `ZAROVICH`
3. Manage all petitions, write custom Strahd responses
4. View live statistics of party chaos
5. Rule with an iron fist! 🧛‍♂️

## 🎭 **Strahd Response Categories & Examples**

**🙏 Mercy (12 responses):**
- *"Mercy? I showed mercy once. She's buried in the castle gardens now."*

**🏃 Escape (12 responses):**
- *"You may check out any time you like, but you can never leave."*

**😤 Complaints (12 responses):**
- *"File your complaint with Strahd's Department of Not Caring."*

**🌧️ Weather (12 responses):**
- *"Weather forecast: 100% chance of despair with overcast skies of doom."*

*(96 total responses across 8 categories!)*

## 🔮 **Future Ideas Backlog**
- Session recap auto-generator
- Character death counter with eulogy generator
- Strahd mood system (responses get meaner based on party actions)
- Party member login system with individual profiles
- Combat encounter tracker
- Treasure value calculator
- Random encounter generator with Strahd commentary
- Party decision history with consequences tracker

## 🎯 **Next Steps**
1. **Test current features** with party
2. **Choose next feature** from Phase 1-4
3. **Implement and iterate**
4. **Rule Barovia with an iron fist!** 👑⚡

---
*"Welcome to Barovia. Enjoy your stay... it's permanent."* - Count Strahd von Zarovich
