export interface User {
    id: number;
    email: string;
    name: string;
    bio: string;
    dob: string;
    height_in: number;
    weight_lb: number;
    favorites: string;
}

/*
 * TODO add user profie picture both here and in backend, probably just a path
 * to where the file is stored. To that end we'll have to come up with a naming
 * scheme and locations for any images users upload.
 */