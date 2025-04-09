using Microsoft.AspNetCore.Identity;

namespace Intex.API.Data
{
    public class NoOpEmailSender<TUser> : IEmailSender<TUser> where TUser : class
    {
        public Task SendConfirmationLinkAsync(TUser user, string email, string confirmationLink)
            => Task.CompletedTask;

        public Task SendPasswordResetLinkAsync(TUser user, string email, string resetLink)
            => Task.CompletedTask;

        public Task SendPasswordResetCodeAsync(TUser user, string email, string resetCode)
            => Task.CompletedTask;
    }
}