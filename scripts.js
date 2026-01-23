document.addEventListener('DOMContentLoaded', () => {
    const lootList = document.getElementById('loot-list');
    const storyText = document.getElementById('story-text');
    const questsList = document.getElementById('quests-list');

    // Load data from localStorage
    const lootData = JSON.parse(localStorage.getItem('dndLoot')) || [];
    const questData = JSON.parse(localStorage.getItem('dndQuests')) || [];
    const storyData = localStorage.getItem('dndStory') || '';

    // Render existing data
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

    function removeItem(list, index) {
        if (list === lootList) {
            lootData.splice(index, 1);
            localStorage.setItem('dndLoot', JSON.stringify(lootData));
            renderList(lootList, lootData);
        } else if (list === questsList) {
            questData.splice(index, 1);
            localStorage.setItem('dndQuests', JSON.stringify(questData));
            renderList(questsList, questData);
        }
    }

    function addLootItem() {
        const item = prompt('Enter loot item:');
        if (item && item.trim()) {
            lootData.push(item.trim());
            localStorage.setItem('dndLoot', JSON.stringify(lootData));
            renderList(lootList, lootData);
        }
    }

    function addQuest() {
        const quest = prompt('Enter quest:');
        if (quest && quest.trim()) {
            questData.push(quest.trim());
            localStorage.setItem('dndQuests', JSON.stringify(questData));
            renderList(questsList, questData);
        }
    }

    // Save story on input
    storyText.value = storyData;
    storyText.addEventListener('input', () => {
        localStorage.setItem('dndStory', storyText.value);
    });

    // Initial render
    renderList(lootList, lootData);
    renderList(questsList, questData);

    document.getElementById('add-loot').addEventListener('click', addLootItem);
    document.getElementById('add-quest').addEventListener('click', addQuest);
});
