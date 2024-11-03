export async function fetchUsers() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Network response was not ok');
        const users = await res.json();
        users.forEach((user) => {
            console.log(user.name);
        })

        return users;
    } catch (error) {
        console.log('Error fetching products: ' + error.message, 'error');
        throw error
    }
}