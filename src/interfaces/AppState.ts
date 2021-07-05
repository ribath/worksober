import User from './User';

interface AppState {
    loading: boolean;
    isAdd: boolean;
    imgUrl: string;
    delId: string;
    _id: string;
    name: string;
    email: string;
    age: number;
    sex: string;
    adress1: string;
    adress2: string;
    member: boolean;
    profilePic: Buffer|null;
    profilePicThumbnail: Buffer|null;
    allUser: User[];
}

export default AppState;
