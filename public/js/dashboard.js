// CREATE
const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const author = document.querySelector('#blog-author').value.trim();
    //const dateCreated = document.querySelector('#blog-dateCreated').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && author && content) {
        const response = await fetch(`/homepage`, {
          method: 'POST',
          body: JSON.stringify({ title, author, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create blog post');
        }
      }
};

// DELETE
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('blogpost-id')) {
      const id = event.target.getAttribute('blogpost-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog post');
      }
    }
  };

document
.querySelector('.new-blogpost-form')
.addEventListener('submit', newFormHandler);

document
  .querySelector('.blogpost-list')
  .addEventListener('click', delButtonHandler);