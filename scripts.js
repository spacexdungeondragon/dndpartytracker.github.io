document.addEventListener('DOMContentLoaded', () => {
    const lootList = document.getElementById('loot-list');
    const storyText = document.getElementById('story-text');
    const questsList = document.getElementById('quests-list');

    function addItemToList(list, item) {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    }

    function addLootItem() {
        const item = prompt('Enter loot item:');
        if (item) {
            addItemToList(lootList, item);
        }
    }

    function addQuest() {
        const quest = prompt('Enter quest:');
        if (quest) {
            addItemToList(questsList, quest);
        }
    }

    document.getElementById('add-loot').addEventListener('click', addLootItem);
    document.getElementById('add-quest').addEventListener('click', addQuest);
});
