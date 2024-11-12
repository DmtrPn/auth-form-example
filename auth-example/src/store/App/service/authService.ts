class AuthService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async loadAuthorizedUser(): Promise<void> {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async login(_: object): Promise<void> {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async logout(): Promise<void> {}
}

export const authService = new AuthService();
