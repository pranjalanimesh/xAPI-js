const axios = require("axios");

const config = require("./config");

// Get userid with username
//GET /2/users/by/username/:username
exports.getUserId = async (username) => {
  try{
    const response = await axios.get(`${config.base_url}/2/users/by/username/${username}`, {
      headers: {
        Authorization: `Bearer ${config.bearer_token}`,
      },
    });
    return response.data.data.id;
  } catch (error) {
    return;
    }
};

// Get tweets of a user
// GET /2/users/:id/tweets
exports.getPosts = async (userId, n) => {
    try {
        const response = await axios.get(`${config.base_url}/2/users/${userId}/tweets`, {
        headers: {
            Authorization: `Bearer ${config.bearer_token}`,
        },
        params: {
            max_results: n,
        },
        });
        return response.data;
    } catch (error) {
        return;
    }
}

// Get users who liked a tweet
// GET /2/tweets/:id/liking_users
exports.getLikingUsers = async (postId) => {
    try {
        const response = await axios.get(`${config.base_url}/2/tweets/${postId}/liking_users`, {
        headers: {
            Authorization: `Bearer ${config.bearer_token}`,
        },
        });
        return response.data;
    } catch (error) {
        return;
    }
}

// Get replies to a tweet
exports.getReplies = async (postId) => {
    try {
        const response = await axios.get(`${config.base_url}/2/tweets/${postId}?tweet.fields=conversation_id`, {
            headers: {
                Authorization: `Bearer ${config.bearer_token}`,
            },
            params: {
                expansions: "referenced_tweets.id"
            },
        });

        const conversationId = response.data.data.conversation_id;

        const response2 = await axios.get(`${config.base_url}/2/tweets/search/recent?query=conversation_id:${conversationId}`, {
            headers: {
                Authorization: `Bearer ${config.bearer_token}`,
            },
        });
        return response2.data;
    }
    catch (error) {
        return;
    }
}
