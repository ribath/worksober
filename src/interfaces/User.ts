interface User {
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
}

export default User;
