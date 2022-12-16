/**
 * Auth response data for signup and signin
 * registered is optional
 * REF : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
 */
export interface AuthResponseDataModel {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn:string;
    localId: string;
    registered?: boolean;
}