const loadButton = document.getElementById('load-users');
const filterInput = document.getElementById('filter-input');
const statusP = document.getElementById('status');
const usersList = document.getElementById('users-list');

let allUsers = [];

function renderUsers(list) {
    usersList.innerHTML = '';
    
    if (list.length === 0) {
        statusP.textContent = 'No users match your filter.';
        return;
    }
    
    // Clear status or show success if needed
    statusP.textContent = `Showing ${list.length} user(s).`;

    list.forEach(user => {
        const li = document.createElement('li');
        
        const nameStrong = document.createElement('strong');
        nameStrong.textContent = user.name;
        
        const details = document.createTextNode(` - Email: ${user.email} | City: ${user.address.city} | Company: ${user.company.name}`);
        
        li.appendChild(nameStrong);
        li.appendChild(details);
        usersList.appendChild(li);
    });
}

async function loadUsers() {
    loadButton.disabled = true;
    statusP.textContent = 'Loading users...';
    usersList.innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allUsers = await response.json();
        renderUsers(allUsers);
        statusP.textContent = 'Users loaded successfully!';
    } catch (error) {
        statusP.textContent = `Error: Failed to load users. Please try again later.`;
        console.error('Fetch error:', error);
    } finally {
        loadButton.disabled = false;
    }
}

loadButton.addEventListener('click', loadUsers);

filterInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );
    renderUsers(filtered);
});