class AuthService {
    public async loadAuthorizedUser(): Promise<void> {}

    public async login(_: object): Promise<void> {}

    public async logout(): Promise<void> {}
}

export const authService = new AuthService();
