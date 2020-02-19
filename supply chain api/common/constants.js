module.exports.StatusConstants = {
    Available: "Available",
    NotAvailable: "Not available",
    Used: "Used",
    Success: "Success",
    Failed: "Failed",
    Expired: "Expired",
    Uncompleted: "Uncompleted",
    Completed: "Completed",
    Submitted: "Submitted",
    Accepted: "Accepted",
    NotPending: "Not Pending",
    Active: "Active"
}


module.exports.MessageConstants = {
    SavedSuccessfully: "Saved successfully",
    SomethingGoesWrong: "Oops, something goes wrong",
    RegisterSuccessfully: "Register successfully, please verify your email before login",
    UsernameExistingError: "Username is existing",
    FCMNotificationItemTypes: "Oops, your link is not existing",
    VerifyEmailSuccessfully: "Verify email successfully. Thanks for be our partner",
    EmailVerified: "Email is verified",
    AccountNotExisting: "Opps, this account is not existing",
    CheckEmailMessage: "Check your email to get new password",
    OldPasswordNotCorrect: "Opps, old password is not correct",
    ChangedPasswordSuccessfully: "Changed password successfully",
    AccessDenied: "Access Denied",
    TokenNull: "Token is null",
    TokenValid: "Token is valid",
    TokenInvalid: "Token is invalid",
    TokenExpired: "Token is expired",
    ProviderIDInvalid: "Provider ID is invalid",
    CustomerIDInvalid: "Customer ID is invalid",
    NotFoundProvider: "Cannot found this provider",
    NotFoundAccount: "Cannot found this account",
    NotFoundShip: "Cannot found this ship",
    NotAllowSendNoWaitingMessage: "Cannot update the non-waiting message",
    NotAllowCancelNonePendingShip: "Cannot cancel inprogress ship",
    NotAllowAcceptOrRefuseInprogressShip: "Cannot accept or refuse in progress ship",
    NotAllowCancelNonePendingBook: "Cannot cancel inprogress book",
    NotAllowAcceptOrRefuseInprogressBook: "Cannot accept or refuse inprogress book",
    QRCodeUsed: "This QR code was used",
    NoActivePromotion: "No active promotion",
    NameExistingError: "Name is existing",
}


module.exports.Lang = {
    EN: "en",
    VI: "vi",
    KO: "ko",
    JA: "ja",
    ZH: "zh",
    DE: "de"
}

module.exports.FormActions = {
    Add: "add",
    Copy: "copy",
    Delete: "delete",
    UpdateMany: "updateMany"
}

module.exports.CurrencyCode = {
    USD: "USD",
    VND: "VND"
}

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
