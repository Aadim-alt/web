// Initialize in light mode
document.body.classList.add('light-mode');

document.getElementById('toggle-mode').addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
});

fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
        const container = document.getElementById('blog-posts');
        const searchInput = document.getElementById('search');
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        function renderPosts(filter = '') {
            container.innerHTML = '';
            posts
                .filter(post =>
                    post.title.toLowerCase().includes(filter.toLowerCase()) ||
                    post.content.toLowerCase().includes(filter.toLowerCase()) ||
                    post.date.toLowerCase().includes(filter.toLowerCase())
                )
                .forEach(post => {
                    const div = document.createElement('div');
                    div.className = 'post fade-in';
                    div.innerHTML = `<h3>${post.title}</h3>
                                     <small>${post.date}</small>
                                     <p>${post.content}</p>`;
                    container.appendChild(div);
                });
        }
        searchInput.addEventListener('input', () => {
            renderPosts(searchInput.value);
        });
        renderPosts();
    });
