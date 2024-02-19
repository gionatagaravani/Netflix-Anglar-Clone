export interface Profile {
    name: string;
    isChild: boolean;
    language?: string;
    image?: string;
}
export interface ProfileData {
    id?: string;
    data: Profile;
}