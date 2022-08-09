
const blogContainer = document.getElementById('blog-container')
const postFormEl = document.getElementById('post-form')

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
  .then(response => response.json())
  .then(data => {
    const postsArr = data.slice(0, 5)
    const html = postsArr.map(post => {
      return setHtml(post)
    }).join('')
    blogContainer.innerHTML = html
  })

postFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  const postTitle = document.getElementById('post-title').value
  const postBody = document.getElementById('post-body').value
  const data = {
    title: postTitle,
    body: postBody
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
    .then(response => response.json())
    .then(data => {
      const html = setHtml(data)
      blogContainer.insertAdjacentHTML('afterbegin', html)
      document.getElementById('post-title').value = ''
      document.getElementById('post-body').value = ''
    })
})

function setHtml(data) {
  return `
    <div class="post-container">
      <h2 class="post-title">${data.title}</h2>
      <p class="post-body">${data.body}</p>
    </div>
  `
}