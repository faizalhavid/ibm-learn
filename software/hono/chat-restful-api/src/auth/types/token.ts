export enum TokenUsage {
    Access = "ACCESS",
    Refresh = "REFRESH",
    PasswordReset = "PASSWORD_RESET",
    EmailVerification = "EMAIL_VERIFICATION"
}

export interface TokenPublic {
    token: string;
    expiresAt: Date;
    createdAt: Date;
    userId: string;
    usedFor: TokenUsage;
}