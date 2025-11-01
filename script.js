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
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.content.toLowerCase().includes(filter.toLowerCase())
      );

      filteredPosts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post fade-in';
        div.innerHTML = `
          <h4>${post.title}</h4>
          <p><em>${post.date}</em></p>
          <p>${post.content}</p>
        `;
        container.appendChild(div);
      });
    }

    // Debounce input for better performance
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        renderPosts(searchInput.value);
      }, 300);
    });

    renderPosts();
  })
  .catch(error => {
    console.error('Error loading posts:', error);
    document.getElementById('blog-posts').innerHTML = '<p>Unable to load posts.</p>';
  });
