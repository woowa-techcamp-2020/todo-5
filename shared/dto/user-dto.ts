import { UserDTO } from '.';

interface CREATE {
	uid: string;
	name: string;
}

interface RESPONSE {
	user_id: number;
	uid: string;
	name: string;
}

export { CREATE, RESPONSE };
