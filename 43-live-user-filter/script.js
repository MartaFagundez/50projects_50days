
{
    const result = document.getElementById('result');
    const filter = document.getElementById('filter');
    const listItems = [];
    
    getData();

    filter?.addEventListener('input', (e) => filterData(e.target?.value));

    async function getData() {
        const res = await fetch('https://api.martafagundez.com/basic-users-api/users');

        const { users } = await res.json()

        // Clear result
        result.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');

            listItems.push(li);

            li.innerHTML = `
                <img src="${user.image}" alt="${user.firstName}">
                <div class="user-info">
                    <h4>${user.firstName} ${user.lastName}</h4>
                    <p>${user.state}, ${user.country}</p>
                </div>
            `;

            result.appendChild(li);
        })
    }

    function filterData(searchTerm) {
        listItems.forEach(item => {
            if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
                item.classList.remove('hide')
            } else {
                item.classList.add('hide')
            }
        })
    }
}