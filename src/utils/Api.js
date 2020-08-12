let Request_url = 'http://www.dahaikj.com';
if (global.__DEV__) {
    Request_url = 'https://192.168.5.241/';
}else{
    Request_url = 'http://27.17.59.250:8888/';
}
const Api = {
    Request_url
};
export default Api;
