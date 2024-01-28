const elList = document.querySelector('.list__user');
const userTemp = document.querySelector('.user_temp').content;

const elListPost = document.querySelector('.list__post');
const postTemp = document.querySelector('.post_temp').content;

const elListcomment = document.querySelector('.list__comment');
const commentTemp = document.querySelector('.comment_temp').content;

async function renderUsers() {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    elList.innerHTML = '';
    users.forEach(user => {
        const userrender = userTemp.cloneNode(true);
        userrender.querySelector('.user_title').textContent = user.name;
        userrender.querySelector('.user_heading').textContent = user.username;
        userrender.querySelector('.user_text').textContent = user.email;
        userrender.querySelector('.user_btn').dataset.userId = user.id;
        elList.appendChild(userrender);
    });
}

elList.addEventListener('click', async (evt) => {
    if (evt.target.matches('.user_btn')) {
        const userId = evt.target.dataset.userId;
        await renderPosts(userId);
    }
});


async function renderPosts(userId) {
    const posts = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    elListPost.innerHTML = '';
    posts.forEach(post => {
        const postElement = postTemp.cloneNode(true);
        postElement.querySelector('.post_heading').textContent = post.title;
        postElement.querySelector('.post_text').textContent = post.body;
        postElement.querySelector('.post_btn').dataset.postId = post.id;
        elListPost.appendChild(postElement);
    });
}

elListPost.addEventListener('click', async (evt) => {
    if (evt.target.matches('.post_btn')) {
        const postId = evt.target.dataset.postId;
        await renderComments(postId);
    }
});


async function renderComments(postId) {
    const comments = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    elListcomment.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = commentTemp.cloneNode(true);
        commentElement.querySelector('.comment_title').textContent = comment.name;
        commentElement.querySelector('.comment_heading').textContent = comment.email;
        commentElement.querySelector('.comment_text').textContent = comment.body;
        elListcomment.appendChild(commentElement);
    });
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function nmadr() {
    try {
        await renderUsers();
    } catch (error) {
        console.err('Xatolik:', error);
    }
}
nmadr();
