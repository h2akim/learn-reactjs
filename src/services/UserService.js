import axios from "axios"

export default {
	async get() {
		const user = await axios.get('/api/user');
		return user;
	},
	async randomize() {
		const user = await axios.get('/api/user/random');
		return user;
	}
};