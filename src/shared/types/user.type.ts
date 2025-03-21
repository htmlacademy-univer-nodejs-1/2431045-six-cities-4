export type User = {
    name: string;
    email: string;
    avatar?: string;
    password: string;
    userType: 'base' | 'pro'
}
