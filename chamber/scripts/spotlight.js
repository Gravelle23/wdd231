const url = 'data/members.json'; 
const container = document.querySelector('#cards');

async function getSpotlightMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsondata = await response.json();

        const filteredMembers = jsondata.filter(member => 
            member.membership_level === "2" || member.membership_level === "3"
        );

        const count = Math.min(filteredMembers.length, 3);
        const selectedMembers = getRandomMembers(filteredMembers, count);

        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error fetching/parsing JSON:', error);
    }
}

function getRandomMembers(arr, count) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    container.innerHTML = ''; 
    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('spotlight-card'); 

        card.innerHTML = `
            <h2>${member.name}</h2>
            <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy" width="300" height="200">
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Membership level: ${member.membership_level === "3" ? "Gold" : "Silver"}</p>
            <p><a href="https://${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        `;

        container.appendChild(card);
    });
}

getSpotlightMembers();
