// Dark mode toggle with icon switching
const toggleButton = document.getElementById('toggle-mode');
if (toggleButton) {
  const icon = toggleButton.querySelector('i');

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (icon) {
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  });
}

// Blog post rendering (only on blog.html)
const blogContainer = document.getElementById('blog-posts');
const searchInput = document.getElementById('search');

if (blogContainer && searchInput) {
  fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
      function renderPosts(filter = '') {
        blogContainer.innerHTML = '';
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
          blogContainer.appendChild(div);
        });
      }

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
      blogContainer.innerHTML = '<p>Unable to load posts.</p>';
    });
}
``
