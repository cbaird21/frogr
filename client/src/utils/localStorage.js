export const getSavedPostIds = () => {
    const savedPostIds = localStorage.getItem('saved_posts')
        ? JSON.parse(localStorage.getItem('saved_posts'))
        : [];

    return savedPostIds;
};

export const savePostIds = (postIdArr) => {
    if (postIdArr.length) {
        localStorage.setItem('saved_posts', JSON.stringify(postIdArr));
    } else {
        localStorage.removeItem('saved_posts');
    }
};

export const removePostId = (postId) => {
    const savedPostIds = localStorage.getItem('saved_posts')
        ? JSON.parse(localStorage.getItem('saved_posts'))
        : null;

    if (!savedPostIds) {
        return false;
    }

    const updatedsavedPostIds = savedPostIds?.filter((savedPostId) => savedPostId !== postId);
    localStorage.setItem('saved_posts', JSON.stringify(updatedsavedPostIds));

    return true;
};