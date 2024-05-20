const redis = require('redis');
async function ConnectToRedis() {
    try {
        const client = redis.createClient({ host: '127.0.0.1', port: 6379 });
        client.on('error', (err) => {
            console.log('Error connecting to Redis:', err);
        });
        await client.connect();
        return client;
    } catch (err) {
        console.error('Error connecting to Redis:', err);
        throw err;
    }
}
const AddTokenToBlackList = async (token) => {
    const client = await ConnectToRedis();
    await client.set(token, '1', 'EX', 60 * 60 * 24);
};
const tokenInBlackList = async (token) => {
    const client = await ConnectToRedis();
    const result = await client.get(token);
    return result === '1';
};


module.exports = { AddTokenToBlackList, tokenInBlackList }