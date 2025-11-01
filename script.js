
document.getElementById('toggle-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
        const container = document.getElementById('blog-posts');
        const searchInput = document.getElementById('search');

        function renderPosts(filter = '') {
            container.innerHTML = '';
            posts.filter(post =>
                post.title.toLowerCase().includes(filter.toLowerCase()) ||
                post.content.toLowerCase().includes(filter.toLowerCase())
            ).forEach(post => {
                const div = document.createElement('div');
                div.className = 'post fade-in';
                div.innerHTML = `<h3>${post.title}</h3><small>${post.date}</small><p>${post.content}</p>`;
                container.appendChild(div);
            });
        }

        searchInput.addEventListener('input', () => {
            renderPosts(searchInput.value);
        });

        renderPosts();
    });
