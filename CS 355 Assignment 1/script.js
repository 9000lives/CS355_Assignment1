let itemsArray = [];
let blocksArray = [];
let mobsArray = [];

let mobIndex = 1, itemIndex = 1, blockIndex = 1;

const itemLeftArrow = document.querySelector('#item-left-arrow');
const itemRightArrow = document.querySelector('#item-right-arrow');

const blockLeftArrow = document.querySelector('#block-left-arrow');
const blockRightArrow = document.querySelector('#block-right-arrow');

const mobLeftArrow = document.querySelector('#mob-left-arrow');
const mobRightArrow = document.querySelector('#mob-right-arrow');

getProducts();

async function getProducts() {
    try {
        const response = await fetch("https://9000lives.github.io/db.json")
        const data = await response.json();
        
        itemsArray = data.items;
        blocksArray = data.blocks;
        mobsArray = data.mobs;

    }catch(error) {
        console.log("Error --> " + error);
    }
}

itemLeftArrow.addEventListener('click', () => {
    itemIndex--;
    if(itemIndex < 0) {
        itemIndex = itemsArray.length - 1;
    }

    updateItemInfo();
})

itemRightArrow.addEventListener('click', () => {
    itemIndex++;
    if(itemIndex > itemsArray.length - 1) {
        itemIndex = 0;
    }

    updateItemInfo();
})

blockLeftArrow.addEventListener('click', () => {
    blockIndex--;
    if(blockIndex < 0) {
        blockIndex = blocksArray.length - 1;
    }

    updateBlockInfo();
})

blockRightArrow.addEventListener('click', () => {
    blockIndex++;
    if(blockIndex > blocksArray.length - 1) {
        blockIndex = 0;
    }

    updateBlockInfo();
})

mobLeftArrow.addEventListener('click', () => {
    mobIndex--;
    if(mobIndex < 0) {
        mobIndex = mobsArray.length - 1;
    }

    updateMobsInfo();
})

mobRightArrow.addEventListener('click', () => {
    mobIndex++;
    if(mobIndex > mobsArray.length - 1) {
        mobIndex = 0;
    }

    updateMobsInfo();
})

function updateItemInfo() {
    const title = document.getElementById('item-title');
    title.textContent = itemsArray[itemIndex].name;

    const info1 = document.getElementById('item-info1');
    info1.textContent = itemsArray[itemIndex].use;

    const info2 = document.getElementById('item-info2');
    info2.textContent = itemsArray[itemIndex].obtain;

    console.log("Succsefully updated Items");
}

function updateBlockInfo() {
    const title = document.getElementById('block-title');
    title.textContent = blocksArray[blockIndex].name;

    const info1 = document.getElementById('block-info1');
    info1.textContent = blocksArray[blockIndex].location;

    const info2 = document.getElementById('block-info2');
    info2.textContent = "Best Tool: " + blocksArray[blockIndex].tool;

    console.log("Succsefully updated Blocks");
}

function updateMobsInfo() {
    const title = document.getElementById('mob-title');
    title.textContent = mobsArray[mobIndex].name;

    const info1 = document.getElementById('mob-info1');
    info1.textContent = mobsArray[mobIndex].hostility;

    const info2 = document.getElementById('mob-info2');
    info2.textContent = "Drops: " + mobsArray[mobIndex].drops;

    console.log("Succsefully updated Mobs");
}

