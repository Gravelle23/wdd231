const url = 'data/members.json'; 
const container = document.querySelector('#cards');

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsondata = await response.json();
        console.log(jsondata);

        displayMembers(jsondata);
    } catch (error) {
        console.error('Error fetching/parsing JSON:', error);
    }
}

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membership = document.createElement('p');
        let image = document.createElement('img');
        let description = document.createElement('p');

        name.textContent = member.name;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        website.textContent = member.website;
        website.href = `https://${member.website}`;
        website.target = "_blank";

        const levels = ["", "Member", "Silver", "Gold"];
        membership.textContent = `Membership level: ${levels[parseInt(member.membership_level)]}`;

        description.textContent = `About us: ${member.description}`;

        image.setAttribute('src', `images/${member.image}`);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);
        card.appendChild(image);
        card.appendChild(description);

        container.appendChild(card);
    });
};

getMemberData();
